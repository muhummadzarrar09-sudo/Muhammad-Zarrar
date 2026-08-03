# DESIGN.md — Personal Brutalist Notebook Portfolio

> This is NOT AI-flung. Every token has a reason. Colors kept per your note "good in theory so lets go with them FOR NOW". Fonts = 2 mains editorial + 1 bold designed caption.

## 1. Palette — Why Clay on Paper

**Theory:** Kodak Portra film-stock — warm paper, warm ink, human clay, forest depth.

- **Canvas #FCFAF7 / Canvas Deep #F1E9DD** — paper, not pure white. Slight yellow from Portra 400. Deep used for scrollbar + dashed fold backgrounds.
- **Ink #17130F** warm near-black (not #000) — espresso, 15.8:1 on canvas AAA. Ink Soft #4E4740 for secondary.
- **Muted #8C857C / Faint #B8B0A3** — for meta, page numbers, mono labels.
- **Clay #C46B4D primary** — terracotta from Rawalpindi bricks, hands. Replaced old neon #ff4d17 spark. Clay Soft #D88A6E hover, Deep #A85A41 active, Wash #F6E8E0 selection. 4.6:1 on canvas AA for tags.
- **Forest #2D3A32 / Forest Soft #3E5248 / Moss #7A8E7E / Sand #D7C9AF** — depth when clay alone too warm. Forest for CLIENT stamp border, moss for accent.
- **Line #E6DCCF / Line Soft #EEE6DB** — 1px hairline, not hard. Used for all borders, fold lines dashed.

All borders, grain, dot-grid use these tokens — no hard-coded hex.

**Grain:** `0.012` opacity (was 0.035) — almost invisible, just enough to feel paper, not dirty.
**Dot-grid:** `28px` radial gradient of `--color-line` 1px, `0.35` opacity fixed overlay in App.

**Red margin line:** `rgba(196,107,77,0.22)` vertical line at 48px mobile / 64px desktop via `.notebook::before` — composition notebook.

## 2. Fonts — 2 Mains + 1 Bold Caption (per your note)

**Before:** Fraunces + Inter Tight + JetBrains Mono (3). Inter Tight felt generic, not bold editorial.

**Now:** 3 fonts, thoughtfully:

1. **Main 1 — Fraunces (serif display editorial)**
   - Weights: 300 light, 400 regular, italic 400-600, 700 bold
   - Use: H1 `I'm Zarrar —`, section titles `Working now — only 3 for now`, italic human emphasis `actually use`
   - Tracking: `-0.04em` tightest for display, `tracking-human -0.02em` for second line
   - Why: High contrast ink trap, soft, film-stock editorial, human.

2. **Main 2 — JetBrains Mono (typewriter, honest engineer log)**
   - Weights: 400, 500, 600, no ligatures
   - Use: 70% of body — paragraphs in About, blurb/description/outcome in Work, `typewriter` class, marginalia body, stats
   - Why: Brutalist notebook honesty. Engineer actually typed this. Not marketing.

3. **Designed Caption — Syne (bold, extra-bold editorial)**
   - Weights: 400, 600, 700, 800 ExtraBold
   - Use: Stamps `WORKING` `CLIENT` `BRUTALIST`, tags `Kotlin Lab`, `Video AI`, `Client Project`, nav labels, page numbers `p.01 / 05`, Fold labels `unfold — about`, Redline arrows, marginalia labels, footer mono — ALL caps or small mono tracking
   - Why: Feels more BOLD and MORE EDITORIAL as you asked. Syne is geometric, brutalist, used in Awwwards winners, 800 extra-bold feels designed not default. It's the caption thingy magig that makes it look thought, not flung.

**Performance:** Only latin subset, 4 weights max per family. No Inter Tight now — dropped to keep fast. Total font ~60kB.

## 3. Brutalist Notebook System — Awwwards Fast Win

**Concept:** Whole page is one long engineering letter that unfolds as you scroll. Keep fast (<100kB JS over motion) — win on ideas & typography, not heavy WebGL.

- **NotebookShell:** `App.tsx` has fixed dot-grid + grain + red margin line + `ScrollProgress`.
- **Fold:** `Brutalist.tsx Fold` — dashed line `scaleX 0 → 1` on `useInView`, double line (line + clay/20 offset 2px) for paper fold shadow. Labels `unfold — about/work — 3 only/process/contact — seal the letter`. Pure CSS transform, no canvas.
- **Staple:** Two 7px dots top center of each card.
- **Marginalia:** Absolute left/right -172px desktop only, rotates 1deg, handwritten italic display `13px` clay/80, appears on scroll with `x 12` + rotate. Example: Recto `Aug 1 — 35 commits / "so if it crashes we now know why"`.
- **Redline:** For LOCK-IN: `<old>personal OS</old> → CLIENT PROJECT` red mono.
- **Stamp:** Rubber stamp border 1.5px clay/70, rotate -8deg, mono 9px bold uppercase tracking 0.15em.

**Work:** Only 3 working builds (Recto Aug1, SwingFrame Aug1, LOCK-IN client Jul30) in `lg:grid-cols-3` notebook-page cards. No pills (per your note). Older builds (forms, TheStandard predecessor of LOCK-IN, retailflow demo catalog, Omni, TheDesiEdit) accessible via `View all projects` → GitHub sorted by latest commit, not pinned. This honesty wins content points.

## 4. Why This Is Not AI Slop

- AI slop: random 4 fonts, pure white #FFF, black #000, neon accent no wash, heavy grain 0.08, Lenis 2.8s slow, 3D blobs, pills everywhere.
- This: 3 fonts with roles documented here, paper #FCFAF7 not white, ink warm not black, clay with 4 tints + wash, grain 0.012, dot-grid 28px, red margin line composition book, no Lenis/gsap/canvas heavy, no pills, only 3 main works (confident), live GitHub data Aug 1 latest not pinned, redline correction shows thinking.

## 5. Next Awwwards Push (if we continue)

- Add hand-drawn SVG arrows circling CLIENT badge (already planned)
- Sticky left page numbers `p.01 / 05` updating on scroll
- Contact as envelope that seals on hover

All keep fast, no new deps, only CSS + framer-motion.
