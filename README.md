# tryverso.ai

Landing site for Verso — the Chrome extension that shows you a second model's
answer to the question you just asked.

Static HTML. No build step.

```bash
python3 -m http.server 8000
```

| Page | Job |
|---|---|
| `index.html` | Convert a visitor into an install. Only job. |
| `labs.html` | Credibility artefact for labs and GEO buyers. Sent as a link after a call, not an acquisition channel. `noindex`. |
| `privacy.html` | **Skeleton.** Must be real before launch. |

Read `DESIGN.md` before changing anything visual, and `CLAUDE.md` before pointing
an agent at the repo.

## Deploy

Any static host. Vercel, Netlify, Cloudflare Pages — point it at the repo root,
no build command, no output directory.

## Before launch

- [ ] Self-host the three typefaces (`@fontsource`), drop the Google CDN link
- [ ] Replace the model chips in `#models` with the models actually supported
- [ ] Step 02 copy: only claim the proactive trigger once it ships
- [ ] Write `privacy.html` for real, reviewed by counsel
- [ ] Fill the coverage table in `labs.html` from the audit pipeline, or cut it
- [ ] Check the sheet turn on a mid-range Android; if the grain janks, swap for a PNG
