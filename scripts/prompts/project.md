# Prompt: write (or rewrite) a project page

Use this with a coding agent that can read the repository, fetch URLs and run
scripts. Replace `<file>` with the entry in `src/content/projects/`.

---

Write the page of the project in `src/content/projects/<file>.md`.

## 1. Collect the facts

- Read the current entry: frontmatter and body.
- Open **every linked resource**: each `cta` URL, `playground.link`, and the
  links inside the body. For a GitHub repository read the README (and the
  report or paper when one is linked); for a website, open it and check that it
  still answers.
- The linked resources and the current text are the only sources. Do not invent
  numbers, dates, collaborators, features or motivations. Personal facts that
  appear only in the current text (why I built it, who it was for, what
  happened to it) are true: keep them.
- If a link is dead, say so in your report and do not describe the resource as
  if it were online.

## 2. Write the body

- **Two or three paragraphs, no more.** No headings, no "Abstract", no bullet
  lists unless the list is the content (e.g. a command reference).
- **The first sentence is generic**: it frames the problem or the context so
  that a reader from outside the field understands why the project exists.
  It does not start with the project name.
- Then get **specific**: what the problem is, how the project solves it
  (architecture, method, stack), and what came out of it (measured results,
  where it runs, what it was used for, what killed it). Prefer one precise
  number to three adjectives.
- A formula is welcome when it is the shortest way to say something. Write it
  in LaTeX (remark-math + KaTeX): `$F_1$` inline, and display equations
  between `$$` lines on their own, with blank lines around.
- First person singular ("I built"), "we" for team work, and name the team.
  Plain, precise English; no marketing words (revolutionary, seamless,
  blazing-fast, cutting-edge), no emoji, no exclamation marks.
- Keep code blocks, tables or command references from the current body only if
  a reader would actually use them; they do not count as paragraphs.

## 3. Add an image

- If the project **is a website or has a live demo**, screenshot it:

  ```sh
  uv run scripts/screenshot_site.py <slug> <url>            # → src/assets/uploads/<slug>/screenshot.jpg
  uv run scripts/screenshot_site.py <slug> <url> --mobile   # phone layout, when that is the real one
  ```

  `--full-page`, `--dark`, `--wait <ms>` and `--name <file>` are available.
  **Open the JPG and look at it**: a login wall, an error page, a cookie
  banner or a blank canvas is not an image of the project. If the site is
  down, do not keep the file.
- Otherwise use a figure from the linked resources (the architecture diagram
  or the main screenshot of the README), saved under
  `src/assets/uploads/<slug>/`. Do not use logos or badges.
- If the entry has no `cover`, set `cover: "/uploads/<slug>/<file>"`. If it
  already has one, keep it.
- Show the image in the body, after the first paragraph, with a real alt text:
  `![What the picture shows](../../assets/uploads/<slug>/<file>)`. Skip this
  when the same picture is already in the `gallery`.

## 4. Frontmatter

Leave `title`, `slug`, `pubDate`, `categories`, `stack`, `playground` and the
flags (`hidden`, `draft`, `featured`, `trending`) alone. Touch `description`,
`news` and `cta` only to fix something factually wrong or a dead link, and
report it.

## 5. Check and report

Run `bun run build` (or at least `bunx astro check`) and report: what you
changed, which sources you read, which links were dead, which claims you could
not verify, and the path of every image you added.
