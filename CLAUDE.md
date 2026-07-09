# Working on this repo

Static site. No build step, no framework, no package manager. Open `index.html`
in a browser and it works. Keep it that way unless there's a reason not to.

## Before you change anything visual

Read `DESIGN.md`. It is not a style guide, it is a set of constraints that were
argued for. The site deliberately avoids the conventions you would otherwise
reach for: no gradients, no stat blocks, no rounded corners, no fourth colour.
If a change would make this site look like other sites, it is the wrong change.

The two things that carry the identity:
1. The turning sheet in the hero (`#sheet`).
2. The misregistered `verso` in the `<h1>` (`.vs-h1 .ver::after`).

Neither is decoration. Do not simplify them away.

## Structure

```
index.html        homepage — sells the extension, nothing else
labs.html         for AI labs and GEO platforms. noindex. reached from the footer.
privacy.html      SKELETON. must be real before launch.
styles/tokens.css single source of truth for colour, type, spacing
styles/main.css   everything else. class prefix `vs-`.
scripts/sheet.js  the sheet turn + scroll reveal. that's all the JS there is.
```

`/labs.html` is never linked from the hero or the nav on the homepage. It is
reached from the footer and from the transparency section. That placement is a
decision, not an oversight: nobody buys a dataset from a landing page, but a
user who finds the labs page must not feel it was hidden.

## Conventions

- Every class is prefixed `vs-` to avoid specificity collisions.
- Never hardcode a hex value or a font family outside `tokens.css`.
- Section padding uses `--gap-section`. Do not add ad-hoc margins between
  sections; that's how the paddings start cancelling each other out.
- New pages reuse `.vs-page`, `.vs-block`, `.vs-two`, `.vs-table` from `main.css`.
  Don't invent a parallel set.

## Quality floor, non-negotiable

- Responsive to 360px.
- Visible keyboard focus (`:focus-visible`, `--overlap` ring).
- `prefers-reduced-motion` disables the sheet auto-turn, the misregistration
  loop, the marquee, and the scroll reveal.
- The sheet is reachable by keyboard and has an accessible name.

## Content rules

`TODO(content)` and `TODO(copy)` comments in the markup mark claims that are not
yet true. Do not remove a TODO by inventing a plausible value. Either measure it
or leave it.

Specifically, do not put a number on `labs.html` that did not come from the audit
pipeline. The metric is distinct prompts per cell, deduplicated semantically —
not total conversations.

## Running it

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## If you migrate to a framework

Astro is the fit: static by default, ships no JS except for the sheet. Port
`tokens.css` unchanged, keep `DESIGN.md` at the root, and lift the header and
footer into a layout. Do not reach for Tailwind — the palette logic lives in the
tokens and would get diluted into utility classes.
