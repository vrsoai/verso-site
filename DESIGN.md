# Verso — Design direction

This file exists so that nobody, human or model, "improves" this site back into
a template. Read it before touching a colour, a font, or the hero.

---

## The idea

**Verso** is the back of the page. The face you don't see until you turn it over.
The product shows you the answer you didn't read — a second model's response to
the same question. The name *is* the product, and the design has exactly one job:
make that legible without a sentence of explanation.

## The material: risograph printing

A riso prints one ink per pass. Blue, then pink. Where the two passes overlap you
get a third colour that neither drum contains. When the passes don't line up
perfectly, you get **misregistration** — the ghosting you see on cheap zines.

Two inks. Two models. The insight lives in the overlap.

Everything on the page comes from that: the paper stock, the registration marks,
the grain, the overprinted headline, the multiply blend modes.

## Tokens

Defined once in `styles/tokens.css`. Never hardcode a colour or a family anywhere.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#E4E5DF` | Cool newsprint grey. **Not cream.** |
| `--paper-deep` | `#D6D8D0` | Second paper tone. Bands only. |
| `--ink` | `#14151A` | The key plate. |
| `--ink-soft` | `#5A5C63` | Body copy at rest. |
| `--blue` | `#2540D4` | Ink drum 1 → model A, recto. |
| `--pink` | `#F0428C` | Ink drum 2 → model B, verso. |
| `--overlap` | `#5B2FA0` | Blue × pink. Reserved: focus rings, verdicts. |

`--overlap` is *derived*. It only ever appears where two things meet. Never use it
as a general accent — that breaks the logic of the whole palette.

**Typography.** Display: Bricolage Grotesque 800, tracking around `-.04em`.
Body: Instrument Sans. Utility: Space Mono, uppercase, wide tracking, for eyebrows,
labels, data and buttons. Three faces, three jobs, no overlap.

## The signature element

The **turning sheet** in the hero. Recto shows one model's answer; verso shows
another's. It turns once on its own about 2.6s after load — the idea has to land
before we ask anyone to click — then turns back and waits.

Boldness is spent here and nowhere else. Everything around it stays quiet.

The second, quieter signature: the word `verso` in the `<h1>` is **printed twice**,
blue and pink, out of register. Every seven seconds the drums align, then drift
apart. If you remove this, you remove the identity.

## Rules

- **Do not** add a gradient. Anywhere.
- **Do not** add a big-number-with-small-label stat block. It is the default answer.
- **Do not** round corners. This is print. `border-radius` is reserved for the
  registration target circles and the logo mark.
- **Do not** introduce a fourth typeface, or a fourth ink.
- **Numbered markers** (`STEP 01`) appear in one place because install → ask → read
  genuinely is a sequence. Do not number anything that isn't.
- Sections use hairline rules and paper tone changes to separate, never cards or
  drop shadows. The only shadow on the page is the hard offset on `.vs-btn`, which
  is a print offset, not a shadow.
- Motion: one orchestrated moment (the sheet), one ambient loop (the misregistration),
  one utility (scroll reveal). Nothing else. `prefers-reduced-motion` kills all three.

## Voice

Plain verbs. Sentence case. Short. The reader is a person who already uses AI every
day and is tired of being sold to.

The transparency section says what the business is, out loud, on the homepage:
*"Verso is free because preference is worth something."* This is not a compliance
banner. It is a position, and it is load-bearing — the whole trust argument depends
on a user reading `/labs.html` and feeling that nothing was hidden from them.

Test for any new copy: **would a user who read every page, including `/labs.html`,
feel misled?** If yes, the copy is wrong, not the page.

## Honesty

`labs.html` carries a coverage table. Every figure in it must come from the audit
pipeline. The metric that matters is **distinct prompts per cell**
(vertical × language × intent), deduplicated semantically — not total conversations.

Cells with enough distinct prompts support **rates**. Thin cells support
**model-vs-model deltas** only, because the paired design controls for prompt
variance. Say which is which. A good buyer will check.

Ship no number that has not been measured. `TODO` in the markup is honest;
a plausible invented figure is not.

## Known debt

1. **Fonts** load from the Google CDN. Self-host before production (`@fontsource`)
   or the hero flashes.
2. **The grain** is a fixed SVG with `mix-blend-mode: multiply` over the viewport.
   If low-end mobile janks on scroll, replace with a tiled PNG. Do not delete it.
3. **`privacy.html` is a skeleton.** It must be real before the homepage's
   transparency section goes live. Publishing the claim without the policy behind
   it is worse than saying nothing.
4. The model list in `#models` and the "taps you on the shoulder" line in step 02
   are placeholders. Step 02 describes the proactive trigger — only true once it ships.
