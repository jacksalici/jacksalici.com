# Prompt: write the page of a paper

Use this with a coding agent that can read the repository and run scripts.
Put the PDF in `paper-pdf/<slug>.pdf` first, named after the paper `slug`.

---

Write the page of the paper in `paper-pdf/<slug>.pdf`, as
`src/content/research/<file>.md`.

## 1. Read the paper

Read the **whole PDF**, not only the abstract: introduction, method,
experiments, and the tables. Everything you write must be traceable to it.
Do not round a number in a way that changes its meaning, do not report a result
without the setting it was obtained in (dataset, split, metric, baseline), and
do not claim more than the paper does.

## 2. Write the introduction

It goes on the page below the abstract. **Two or three paragraphs, no more**,
covering in this order **the problem, the method, the results**.

- **The first sentence is generic**: it states the broad problem in terms a
  researcher from another field understands, without the name of the method
  and without jargon. The second sentence narrows to the specific gap the
  paper addresses.
- **Then be specific.** Name the method, say what its core idea is and what it
  needs (data, labels, compute). **Do not be afraid of a formula**: when one
  equation is the heart of the method, write it, and define every symbol in the
  sentence around it. One or two equations at most.
- **Results are numbers**: the main metric, on the main benchmark, against the
  main baseline, plus the one ablation or limitation that tells the reader how
  far to trust it. No "state-of-the-art" or "significantly" without the figure
  next to it.
- "We", present tense, plain English. No marketing words, no list of
  contributions, no "in this paper", no "Abstract:" label.
- Write maths in LaTeX (remark-math + KaTeX): `$\tau_A$` inline, and display
  equations between `$$` lines on their own, with blank lines around:

  ```md
  $$
  \tau = \theta_\text{ft} - \theta_0
  $$
  ```

## 3. Export Figure 1

```sh
uv run scripts/extract_figure1.py paper-pdf/<slug>.pdf
# → src/assets/uploads/papers/<slug>/figure1.jpg, and prints the caption
```

**Open the JPG and look at it.** The crop is a heuristic: if it cuts the
figure, or includes body text, a header or the caption, redo it by hand with
`--page <n> --clip x0,y0,x1,y1` (fractions of the page). `--figure 2` exports
another figure, for the rare paper whose Figure 1 says nothing about the
method; say so in your report.

## 4. Assemble the entry

Frontmatter (see `src/content.config.ts`, and copy the shape of the other
papers): `title`, `pubDate`, `slug`, `authors`, `venue`, `acronym`, `location`,
`coordinates` as `[longitude, latitude]`, `categories`, `activities`, `news`
(one sentence, first person plural, announcing the paper), `cta` (paper link
first, then code or project site), and

```yaml
cover: "/uploads/papers/<slug>/figure1.jpg"
```

Body: the abstract verbatim from the paper, a horizontal rule, then the
introduction under a subtitle, with the figure after its first paragraph.

```md
**Abstract:** The abstract, copied from the paper.

---

## A closer look

First paragraph: the problem.

![Short alt text describing the figure](../../assets/uploads/papers/<slug>/figure1.jpg)
*Figure 1 — the caption, shortened from the paper.*

Second paragraph: the method, with the formula.

Third paragraph: the results.
```

Take the metadata (venue, dates, location, links) from the PDF or ask for it;
never guess it.

## 5. Check and report

Run `bun run build` and report: the claims and numbers you used with the
section or table each comes from, anything in the paper you were unsure how to
read, and whether the figure crop needed a manual clip.
