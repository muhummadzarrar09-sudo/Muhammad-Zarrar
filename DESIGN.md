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

All borders use these tokens — no hard-coded hex.

**Grain:** REMOVED (owner's call) — full-page overlays gave the page busy vibes.
**Dot-grid:** REMOVED (owner's call) — the "mesh" read as noise over the paper, not texture on it.

**Red margin line:** REMOVED (owner's call). It read as a harsh dark streak on the light theme and a bright streak on dark, and crossed body text at common widths — it was ruining the look instead of selling the composition-book idea.

**Clean canvas:** the page is now a full-screen, flat paper background — no dot-grid, no grain, no margin line, no gutter marginalia, no dashed fold separators. The notebook identity is carried by staples, stamps, notebook-page cards and the envelope instead.

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

- **NotebookShell:** `App.tsx` is a clean full-screen canvas + `ScrollProgress`. (Red margin line, fixed left `p.XX / 05` rail, dot-grid, grain and gutter marginalia were all removed — owner's call, cleaner look.)
- **Fold:** REMOVED — the dashed `— label —` separators between sections went with the rest of the overlay chrome; sections now breathe with whitespace only.
- **Staple:** Two 7px dots top center of each card.
- **Marginalia:** REMOVED — gutter notes were part of the cluttered-overlay look; component deleted from `Brutalist.tsx`.
- **Redline:** For LOCK-IN: `<old>personal OS</old> → CLIENT PROJECT` red mono.
- **Stamp:** Rubber stamp border 1.5px clay/70, rotate -8deg, mono 9px bold uppercase tracking 0.15em.

**Work:** Only 3 working builds (Recto Aug1, SwingFrame Aug1, LOCK-IN client Jul30) in `lg:grid-cols-3` notebook-page cards. No pills (per your note). Older builds (forms, TheStandard predecessor of LOCK-IN, retailflow demo catalog, Omni, TheDesiEdit) accessible via `View all projects` → GitHub sorted by latest commit, not pinned. This honesty wins content points.

## 4. Why This Is Not AI Slop

- AI slop: random 4 fonts, pure white #FFF, black #000, neon accent no wash, heavy grain 0.08, Lenis 2.8s slow, 3D blobs, pills everywhere, glow/mesh overlays everywhere.
- This: 3 fonts with roles documented here, paper #FCFAF7 not white, ink warm not black, clay with 4 tints + wash, CLEAN flat canvas (grain/dot-grid/mesh glows all removed), no Lenis/gsap/canvas heavy, no pills, only 3 main works (confident), live GitHub data Aug 1 latest not pinned, redline correction shows thinking.

## 5. Next Awwwards Push (if we continue)

- Add hand-drawn SVG arrows circling CLIENT badge (already planned)
- Contact envelope: DONE — closed envelope with wax seal → hover makes the flap lift + letter peek (whimsical) → click opens the flap and the letter rises out, unfolding into the form → after send the envelope closes and the seal stamps back on ("Draft sealed")

All keep fast, no new deps, only CSS + framer-motion.

## 6. The PX/PUSH Pass (Aug 2026)

Inspiration: pxpush.com — brutalist Swiss subscription-studio site. Direction per owner: "make mine look closer to this, but keep it mine." What was borrowed, mapped onto the warm-paper system (palette and Fraunces headlines stay — that's the "mine" part):

- **Type wall (`ui/TypeWall.tsx`)** — the pxpush hero signature ("●On–Demand Design Department" ×8): full-bleed rows of one phrase repeated in Syne 800 uppercase, alternating scroll directions, alternating solid / `.text-outline` (stroke-only) rows, clay ● between repeats. Hero wall phrase: "Product engineer". Pauses on hover, freezes under reduced motion, screen readers get one sr-only sentence.
- **Ticker (`ui/Marquee.tsx`)** — restyled to their system strip: mono uppercase, `v.26` leads in clay, `//` marks live status ("// Open for 1–2 projects"), items separated by long `------------------` dash runs. Edge fades removed — text runs rim to rim.
- **Nº numbering** — `SectionHeading` now renders `Nº001 /About ———` with a hairline rule filling the row and an optional right meta caption ("The builder", "Capability index", …). All five sections pass Nº00X.
- **Brutal buttons (`.btn-brutal`, `.btn-brutal-solid`, `.btn-brutal-sm` in index.css)** — rectangular, 1px ink border, uppercase mono 0.72rem / 0.14em tracking, hover inverts (solid → clay). Replaces the rounded pills on primary CTAs: hero, work film panel, contact, process CTA, nav. `↗` / `↓` glyphs like pxpush.
- **Nav** — floating pill → full-width hairline top bar (h-16): `ZARRAR ●` wordmark (Syne 800), uppercase mono links with clay dot + underline on active, `GET STARTED ↗` mailto CTA. Same focus trap / scroll lock / active observer as before.
- **Process** — card grid → pxpush "Benefits" rows: full-width hairline rows, `Nº00X` clay mono left, Syne bold uppercase title middle, body right, soft fill on hover, `//` footnote per row.
- **Expertise** — three floating cards → one Swiss table: single border frame, `divide-x` columns, hairline skill rows inside each column with clay dots on hover.
- **Footer name wall** — pxpush's giant footer marquee: "MUHAMMAD ZARRAR ●" in Syne 800 clamp(3rem,9vw,8rem), scrolls, whole band is a mailto link, text warms to clay on hover.
- **Hero scroll hint** — their "Scroll Down to Access Department" → bottom-left mono "SCROLL ——— THE EVIDENCE IS BELOW ↓".

Kept on purpose (identity, not laziness): Fraunces serif headlines + italic clay lines, paper/clay palette, notebook staples/tape/envelope, GSAP work scroll-film, section rail, clocks. The pxpush structure delivers the loudness; the warm details keep it a person, not an agency.

## 7. The Honesty Pass (Aug 19, 2026)

Owner feedback: kill Lenis + parallax (felt bad), refresh projects from real GitHub data, dedupe emails, and make the envelope an actual zoom-in scene.

- **Lenis: REMOVED** — `src/lib/scroll.ts` is now two native helpers (`scrollIntoView` + `scroll-behavior: smooth`). The `lenis` and `gsap` packages were uninstalled; the `.lenis` CSS block is gone.
- **Work scroll-film: REMOVED** — the sticky GSAP scrub (parallax ghost numbers, pinned panels) is replaced by a calm evidence list: alternating rows, fade-up reveals only, SwingFrame scrubber kept as the single interactive demo, ProjectStory modal intact.
- **Projects: REFRESHED FROM GITHUB** (Aug 2026 pull, 22 repos): featured = Sasa+ (client, live), SwingFrame, Website-Auditor (LoRA/QLoRA audit CLI), Broskie (Flutter/Flame platformer campaign), Omni (local voice agent). Experiments grid = Recto, GrindOS, Pixelfy, STREAK IT, forms, TheDesiEdit. Stats are checkable: 144 commits/30d, 33/7d, stacks match repo languages. Three new covers generated in the surreal-paper style (`surreal-{auditor,broskie,omni}.webp`).
- **Envelope: THE SCENE** — click the small envelope → fullscreen overlay, camera zooms INTO the envelope (spring scale-up + backdrop) → flap swings open, seal breaks → letter slides up out of the pocket → the letter is pulled toward you and becomes the FULL form → send → letter folds back, flap closes, wax seal stamps ("Draft sealed") → zoom out. Escape / ✕ / backdrop closes; reduced motion gets the form directly.
- **Emails: DEDUPED** — the address text is gone from the footer letterhead (removed), the contact info block, and the mobile menu. It survives exactly twice as *actions*: the nav/mobile "Get started ↗" mailto and Contact's "Email me / Copy email" buttons. Footer's giant email block → one "START A PROJECT ↗" CTA that scrolls to Nº005.
- **Signature: optional file** — `profile.signature` (empty by default). Drop a transparent PNG/SVG at e.g. `/images/signature.png` and set the path to show the real thing; otherwise the drawn "— Zarrar" stays.

## 8. The Tactile Pass (Aug 19, later)

Owner feedback: the fullscreen zoom scene lost the original envelope's feel; projects should pile into 3 heavy ones + a "view the rest" toggle.

- **Envelope: back inline, more tactile.** The zoom overlay is gone. Restored the in-section envelope with the original closed → opening → lifted → form choreography, upgraded: `.paper-finish` (paper-fiber noise + warm sheen, softer/darker in dark mode) on the body, flap, and letter; HOVER now swings the flap fully open while the letter rises in the pocket — the letter is a miniature of the form (name bar, email bar, message block, clay send chip), so it reads "the form is inside"; the caption swaps to "— it's all inside — click —". Click breaks the seal, draws the letter toward you, and it settles into the full form. Send → folds back, reseals ("Draft sealed").
- **Work: 3 + the rest.** Featured pile = Sasa+ (client, live), SwingFrame (on-page scrubber), Omni (local voice agent). The other 8 builds (Website-Auditor, Broskie, Recto, GrindOS, Pixelfy, STREAK IT, forms, TheDesiEdit) hide behind a "VIEW THE REST — 8 MORE BUILDS ↓" brutal toggle that expands/collapses with a height animation. Heading meta now says "Three heavy ones first".

## 9. The Roll Pass (Aug 19, evening)

Owner feedback: bring the scroll parallax back for the projects, and make both rolling texts better.

- **Lenis + GSAP: back in.** `lenis` and `gsap` reinstalled; `src/lib/scroll.ts` restores the singleton (same guards: no globals, reduced-motion = native scroll).
- **Work = the horizontal roll (desktop ≥lg, motion allowed).** GSAP ScrollTrigger pins the section and scrubs the track sideways: intro card ("the work rolls sideways") → three full project panels → end cap ("eight more below"). Inner parallax via `containerAnimation`: each panel's media drifts −5→+5% and its ghost number 16→−16% at its own rate. HUD = counter (01/03, display italic clay) + thin progress rail, centered bottom. Lenis feeds ScrollTrigger for smooth scrub. Mobile + reduced motion keep the alternating vertical list. `gsap.matchMedia` handles setup/teardown; GSAP stays lazy-loaded.
- **Velocity marquees (`src/lib/marquee.ts`).** Every `[data-vmarquee]` track (4 hero-wall rows, the v.26 ticker, the footer name wall) loops as plain CSS at baseline, then GSAP takes over at runtime: playback scales with scroll velocity (up to ~4.5×), flips direction when scrolling up, and `[data-vskew]` rows lean up to ±4.5° — decaying back to base speed when idle. Reduced motion never attaches; the CSS loop stays frozen.
- **Footer name wall upgrade:** repeats now alternate solid / outlined "MUHAMMAD ZARRAR" with clay dots; hover warms both the fill and the stroke to clay.
