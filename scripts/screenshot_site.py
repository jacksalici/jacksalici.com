#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["playwright>=1.45"]
# ///
"""Screenshot a website as a JPG, to use as a project image.

The picture lands in `src/assets/uploads/<slug>/screenshot.jpg`, which a
project references in its frontmatter as `/uploads/<slug>/screenshot.jpg`.

    uv run scripts/screenshot_site.py weather-station https://weather.jacksalici.com
    uv run scripts/screenshot_site.py pieno https://pieno.dev --full-page
    uv run scripts/screenshot_site.py emojipoll https://emojipoll.jacksalici.com --mobile
    uv run scripts/screenshot_site.py foo https://example.org --name home --wait 3000

It drives the Chrome already installed on the machine; when there is none it
falls back to Playwright's own Chromium, which needs a one-off
`uv run --with playwright playwright install chromium`.

LOOK at the output before using it: cookie banners, login walls, error pages
and half-loaded pages all screenshot just fine.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from playwright.sync_api import Error, sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "src" / "assets" / "uploads"

# Text of the buttons that dismiss the usual consent banners.
CONSENT = ["Accept all", "Accept", "I agree", "Got it", "Accetta tutti", "Accetta", "OK"]


def launch(playwright):
    try:
        return playwright.chromium.launch(channel="chrome")
    except Error:
        return playwright.chromium.launch()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("slug", help="project slug, names the upload folder")
    parser.add_argument("url")
    parser.add_argument("--name", default="screenshot", help="file name, without extension")
    parser.add_argument("--width", type=int, default=1440)
    parser.add_argument("--height", type=int, default=900)
    parser.add_argument("--scale", type=float, default=1.5, help="device pixel ratio")
    parser.add_argument("--mobile", action="store_true", help="390×844 phone viewport")
    parser.add_argument("--full-page", action="store_true", help="capture the whole scroll height")
    parser.add_argument("--dark", action="store_true", help="prefer the dark colour scheme")
    parser.add_argument("--wait", type=int, default=1500, help="extra ms to wait after load")
    parser.add_argument("--quality", type=int, default=85, help="JPG quality")
    parser.add_argument("--out", help="output path, overrides slug/name")
    args = parser.parse_args()

    width, height = (390, 844) if args.mobile else (args.width, args.height)
    out = Path(args.out) if args.out else OUT_DIR / args.slug / f"{args.name}.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = launch(playwright)
        context = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=args.scale,
            is_mobile=args.mobile,
            color_scheme="dark" if args.dark else "light",
            reduced_motion="reduce",
        )
        page = context.new_page()
        response = page.goto(args.url, wait_until="load", timeout=45_000)
        try:
            page.wait_for_load_state("networkidle", timeout=10_000)
        except Error:
            pass  # sites that keep polling never go idle

        for label in CONSENT:
            button = page.get_by_role("button", name=label, exact=True)
            if button.count() and button.first.is_visible():
                button.first.click()
                break

        page.wait_for_timeout(args.wait)
        page.screenshot(path=str(out), type="jpeg", quality=args.quality, full_page=args.full_page)
        status = response.status if response else "?"
        title = page.title()
        browser.close()

    try:
        shown = out.relative_to(ROOT)
    except ValueError:
        shown = out
    print(f"{'✓' if status == 200 else '!'} {args.url} [HTTP {status}] → {shown}")
    print(f"  title: {title}")
    return 0 if status == 200 else 1


if __name__ == "__main__":
    sys.exit(main())
