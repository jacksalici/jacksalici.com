#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pymupdf>=1.24", "pillow>=10"]
# ///
"""Export Figure 1 of a paper as a JPG.

The PDF is expected to be named after the paper slug (`paper-pdf/<slug>.pdf`);
the figure lands in `src/assets/uploads/papers/<slug>/figure1.jpg`, which a
paper references in its frontmatter as `/uploads/papers/<slug>/figure1.jpg`.

    uv run scripts/extract_figure1.py                      # every PDF in paper-pdf/
    uv run scripts/extract_figure1.py paper-pdf/emma.pdf   # one paper
    uv run scripts/extract_figure1.py paper-pdf/emma.pdf --figure 2
    uv run scripts/extract_figure1.py paper-pdf/emma.pdf --page 3 --clip 0.1,0.12,0.9,0.45

How the figure is found: the first text block that starts with "Figure 1" /
"Fig. 1" is taken as the caption. The figure is the cluster of raster images
and vector drawings sitting right above it (or below, when nothing is above),
grown to swallow the labels that belong to it, with the white border trimmed. The heuristic is right most of
the time, not always: LOOK at the output, and when the crop is off pass
`--page` (1-based) and `--clip` (x0,y0,x1,y1 as fractions of the page).

The caption text is printed, so it can be reused as alt text.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "paper-pdf"
OUT_DIR = ROOT / "src" / "assets" / "uploads" / "papers"

GAP = 14  # pt: how far apart two pieces of the same figure can be
LABEL_GAP = 12  # pt: how close a short label must be to count as part of it
PAD = 4  # pt: breathing room around the final crop


def caption_pattern(number: int) -> re.Pattern[str]:
    return re.compile(rf"^\s*(figure|fig\.?)\s*{number}\s*[.:|]", re.IGNORECASE)


def find_caption(doc: pymupdf.Document, number: int):
    """First block, in reading order, that opens with "Figure <number>"."""
    pattern = caption_pattern(number)
    for page in doc:
        for block in page.get_text("blocks"):
            x0, y0, x1, y1, text, _, kind = block
            if kind == 0 and pattern.match(text):
                return page, pymupdf.Rect(x0, y0, x1, y1), " ".join(text.split())
    return None


def graphics(page: pymupdf.Page) -> list[pymupdf.Rect]:
    """Bounding boxes of everything on the page that is not text."""
    page_area = abs(page.rect)
    rects = [pymupdf.Rect(info["bbox"]) for info in page.get_image_info()]
    rects += [pymupdf.Rect(d["rect"]) for d in page.get_drawings()]
    out = []
    for r in rects:
        r = r & page.rect
        if r.is_empty and r.width < 1 and r.height < 1:
            continue
        if abs(r) > 0.85 * page_area:  # page background
            continue
        out.append(r)
    return out


def column_of(page: pymupdf.Page, caption: pymupdf.Rect) -> tuple[float, float]:
    """Horizontal band the figure lives in: one column, or the whole page."""
    width, mid = page.rect.width, page.rect.width / 2
    if caption.width > 0.55 * width or caption.x0 < mid - 20 < mid + 20 < caption.x1:
        return 0, width
    return (0, mid) if (caption.x0 + caption.x1) / 2 < mid else (mid, width)


def grow(items: list[pymupdf.Rect], caption: pymupdf.Rect, upward: bool) -> pymupdf.Rect | None:
    """Chain together the items that touch (within GAP), starting at the caption."""
    region = None
    # Image boxes often carry transparent padding that overlaps the caption:
    # measure distances from the part of each item on the figure's side of it.
    def near_edge(r):
        return min(r.y1, caption.y0) if upward else max(r.y0, caption.y1)

    for r in sorted(items, key=(lambda r: -near_edge(r)) if upward else near_edge):
        if region is None:
            distance = caption.y0 - near_edge(r) if upward else near_edge(r) - caption.y1
            if distance > GAP * 2:
                break
        else:
            distance = region.y0 - r.y1 if upward else r.y0 - region.y1
            if distance > GAP:
                continue
        region = pymupdf.Rect(r) if region is None else region | r
    return region


def locate_figure(page: pymupdf.Page, caption: pymupdf.Rect) -> pymupdf.Rect | None:
    left, right = column_of(page, caption)
    single_column = right - left < page.rect.width

    def in_band(r: pymupdf.Rect) -> bool:
        return left <= (r.x0 + r.x1) / 2 <= right

    def is_above(r: pymupdf.Rect) -> bool:
        return (r.y0 + r.y1) / 2 < (caption.y0 + caption.y1) / 2

    # Rules and underlines drawn inside the caption itself are not the figure.
    inside_caption = caption + (-2, -2, 2, 2)
    items = [r for r in graphics(page) if in_band(r) and not inside_caption.contains(r)]
    upward = True
    region = grow([r for r in items if is_above(r)], caption, upward=True)
    if region is None:
        upward = False
        region = grow([r for r in items if not is_above(r)], caption, upward=False)
    if region is None:
        return None

    # Labels, legends and axis titles are text: pull in the blocks that overlap
    # the figure, plus the ones hanging right next to it without sticking out
    # sideways. Body text, running headers, other captions and whatever sits
    # past the caption stay out.
    other_caption = re.compile(r"^\s*(figure|fig\.?|table|tab\.?)\s*\d+\s*[.:|]", re.IGNORECASE)
    running_header = re.compile(r"^\d+\s|\s\d+$")
    for _ in range(2):
        for block in page.get_text("dict")["blocks"]:
            if block["type"] != 0:
                continue
            box = pymupdf.Rect(block["bbox"])
            text = " ".join(span["text"] for line in block["lines"] for span in line["spans"]).strip()
            if not text or not in_band(box) or other_caption.match(text) or is_above(box) != upward:
                continue
            if box.y1 < 0.16 * page.rect.height and len(text) < 60 and running_header.search(text):
                continue
            rows = len({round(line["bbox"][3] / 3) for line in block["lines"]})
            if rows > 2 and box.width > 0.5 * (right - left):
                continue  # a paragraph
            halo = region + (-LABEL_GAP, -LABEL_GAP, LABEL_GAP, LABEL_GAP)
            if box.intersects(region) or (box.intersects(halo) and halo.x0 <= box.x0 and box.x1 <= halo.x1):
                region |= box

    region = region + (-PAD, -PAD, PAD, PAD)
    if single_column:
        region.x0, region.x1 = max(region.x0, left), min(region.x1, right)
    # Never run into the caption.
    if upward:
        region.y1 = min(region.y1, caption.y0 - 1)
    else:
        region.y0 = max(region.y0, caption.y1 + 1)
    return region & page.rect


def trim(image: Image.Image, margin: int = 16) -> Image.Image:
    """Crop the white border left around the figure, keeping a thin margin."""
    white = Image.new("RGB", image.size, (255, 255, 255))
    box = ImageChops.difference(image, white).point(lambda v: 255 if v > 12 else 0).getbbox()
    if not box:
        return image
    x0, y0, x1, y1 = box
    return image.crop((max(0, x0 - margin), max(0, y0 - margin),
                       min(image.width, x1 + margin), min(image.height, y1 + margin)))


def export(pdf: Path, args: argparse.Namespace) -> bool:
    slug = pdf.stem
    doc = pymupdf.open(pdf)
    caption_text = ""

    if args.page:
        page = doc[args.page - 1]
        clip = page.rect
    else:
        found = find_caption(doc, args.figure)
        if not found:
            print(f"✗ {slug}: no 'Figure {args.figure}' caption found", file=sys.stderr)
            return False
        page, caption, caption_text = found
        clip = locate_figure(page, caption)
        if clip is None:
            print(f"✗ {slug}: caption on page {page.number + 1}, but no graphics next to it "
                  f"(pass --page/--clip)", file=sys.stderr)
            return False
        if args.with_caption:
            clip |= caption

    if args.clip:
        fx0, fy0, fx1, fy1 = (float(v) for v in args.clip.split(","))
        w, h = page.rect.width, page.rect.height
        clip = pymupdf.Rect(fx0 * w, fy0 * h, fx1 * w, fy1 * h)

    # Render at the requested DPI, capped so the long side stays reasonable.
    zoom = args.dpi / 72
    zoom = min(zoom, args.max_side / max(clip.width, clip.height))
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=clip, alpha=False)

    out = Path(args.out) if args.out else OUT_DIR / slug / f"figure{args.figure}.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    if not args.no_trim:
        image = trim(image)
    image.save(out, "JPEG", quality=args.quality, optimize=True)

    try:
        shown = out.relative_to(ROOT)
    except ValueError:
        shown = out
    print(f"✓ {slug}: page {page.number + 1} → {shown} ({image.width}×{image.height})")
    if caption_text:
        print(f"  caption: {caption_text}")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("pdfs", nargs="*", type=Path, help="PDFs to process (default: all of paper-pdf/)")
    parser.add_argument("--figure", type=int, default=1, help="figure number to export (default: 1)")
    parser.add_argument("--page", type=int, help="1-based page, skips the caption search")
    parser.add_argument("--clip", help="manual crop, x0,y0,x1,y1 as fractions of the page")
    parser.add_argument("--with-caption", action="store_true", help="keep the caption in the crop")
    parser.add_argument("--no-trim", action="store_true", help="keep the white border around the crop")
    parser.add_argument("--dpi", type=int, default=300)
    parser.add_argument("--max-side", type=int, default=2400, help="cap on the long side, in pixels")
    parser.add_argument("--quality", type=int, default=90, help="JPG quality")
    parser.add_argument("--out", help="output path (single PDF only)")
    args = parser.parse_args()

    pdfs = args.pdfs or sorted(PDF_DIR.glob("*.pdf"))
    if not pdfs:
        parser.error(f"no PDFs given and none found in {PDF_DIR}")
    if len(pdfs) > 1 and (args.out or args.page or args.clip):
        parser.error("--out, --page and --clip only make sense with a single PDF")

    results = [export(pdf, args) for pdf in pdfs]
    return 0 if all(results) else 1


if __name__ == "__main__":
    sys.exit(main())
