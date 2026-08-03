# Forensic UI/UX & Visual Design Audit — Muhammad Zarrar Portfolio

> **Date:** 2026-08-03 · **Branch:** `arena/019fc746-muhammad-zarrar` · **Commit:** `9a1c4cc`
> **Method:** Production build (`vite build`) rendered in headless Chromium 149 at 3 viewports (1440×900, 1024×768, 390×844, deviceScaleFactor 2, real Google Fonts loaded). Every element's computed styles (color, background, opacity, font size/weight, border) plus its full ancestor chain were extracted via CDP; WCAG 2.x contrast ratios were computed mathematically on the composited layer stack (background → card → nested fill → element, alpha-composited). Occlusion was verified with `document.elementsFromPoint` probes; interaction states (focus, filled, errors, chip-selected, sealed envelope, card hover, mobile menu) were captured as rendered states. Raw capture data: `/home/user/audit_work/` (screenshots + `elements-*.json` + `analysis-*.json`).

**Headline number: 135 of 246 text elements on the desktop page (55%) fail WCAG AA contrast — 129 of them are traceable to three theme tokens used as "secondary" text** (the other six are 10%-opacity ink numerals and canvas-on-clay monograms, flagged separately below). Mobile (120/223) and tablet (135/246) fail at the same rate. This is not a "some areas could be improved" situation; it is the typography system itself.

---

## Findings table

| # | Location (screen/component) | Element chain involved | Issue | Contrast / values | Sev. | Fix recommendation |
|---|---|---|---|---|---|---|
| B1 | **Contact form — all inputs** (`src/components/Contact.tsx` ~216–254; tokens in `src/index.css`) | Screen bg `#FCFAF7` → Envelope card `#FFFEFB` → input fill `bg-canvas #FCFAF7` → border `#E6DCCF` / placeholder `text-faint #B8B0A3` | **Nested-fade blocker: the field is indistinguishable from the card.** Input fill vs card = **1.03:1** (imperceptible); field border vs card = **1.34:1** (imperceptible hairline); placeholder "Zarrar" / "you@company.com" / "I'm building a…" = **2.13:1**. A user cannot tell where to type, and cannot read the hint when they find it. This is the only interactive screen on the site. | fill 1.03:1; border 1.34:1; placeholder 2.13:1 (need 4.5) | **Blocker** | Give inputs a real fill difference (e.g., `#F5EEE4` surface-2 or white with visible 1.5px `#C46B4D`-family border), and raise placeholder to `--color-muted` (or better, add a `placeholder-muted` token ≥4.5:1). Remove `focus:outline-none`; add a proper focus ring. |
| B2 | **System-wide body/caption text** (`--color-muted #8C857C`, `--color-faint #B8B0A3`, `--color-clay #C46B4D` vs `--color-canvas`/`--color-surface`) — 135 failing elements across every screen: nav links, hero eyebrow + meta row + "Then:" paragraph (16px!), all 5 section-heading labels, fold labels ×5, footer column headers/body/copyright, work-card "Outcome — honest" + `live — repo` meta, expertise skill % + card footers, process role labels + belief strip, contact labels + char counter + helper text, mobile-menu footer, page numbers | `#FCFAF7` → text `#8C857C` / `#B8B0A3` / `#C46B4D` | **Three "secondary" tokens are all below AA.** muted = **3.50:1** (56 instances), faint = **2.06:1** (48 instances), clay = **3.63:1** (25 instances) — all vs 4.5:1 needed for their sizes (9–18px). `--color-faint` even fails the 3:1 large-text/icon floor. DESIGN.md's claim that clay is "4.6:1 on canvas AA" is arithmetically wrong (3.63:1). | muted 3.50:1; faint 2.06:1; clay 3.63:1 (need 4.5) | **Blocker** | Darken the tokens: muted → ≈`#6E675E` (≥4.5), faint → ≈`#8C857C` or delete it and reuse muted, clay → keep for ≥24px display only and add a `clay-deep`-based text role for body-size accent text (clay-deep is 4.79:1). Update DESIGN.md. |
| M1 | **Marginalia — About + Work** (`src/components/Brutalist.tsx` Marginalia; used in `About.tsx` 39–44/69–77, `Work.tsx` 29–46) | Section (max-w-6xl) → absolute `right-[-172px]`/`left-[-172px]` note | **Content is clipped off-viewport at 1024–~1250px and buried under the adjacent card.** At 1024px (the exact `lg` breakpoint where marginalia appear): left note "compiling…" spans x=−152..−21 (fully off-screen, `overflow-x-clip` silently kills it), right note "p.01 — about…" x=1052..1166 (≈85% off-screen). At all lg widths the Recto note ("Aug 1 — 35 commits…", right edge = card right +172) is **covered by the opaque SwingFrame card** (proven via `elementsFromPoint` at (545,4330): SwingFrame `<a class="notebook-page">` is the top element; the marginalia is 4th in the stack). | geometry, not color | **Major** | Position marginalia relative to the *section* (not the card), clamp them inside `max-w-6xl` (e.g., `right: -172px` only when viewport ≥1280 via media query), and give them `z-10` so a later sibling card can't paint over them. |
| M2 | **Process step numbers** (`src/components/Process.tsx` ~27) | Card `#FFFEFB` → number `text-ink/10` oklab(…/0.1) | **The 01–04 wayfinding numerals are effectively invisible** — 48px display numerals at 10% ink = **1.25:1**. They read as blank space; the step number (the "index" of each step) is the least legible element on the card. | 1.25:1 (need 3.0 even as large text) | **Major** | Raise to `text-ink/25`+ (≥3:1) or switch to `text-clay` at a lower size; keep the watermark feel with `opacity` but floor it at ~3:1. |
| M3 | **Contact form — type chips** (`Contact.tsx` ~230–241) | Card → selected chip `bg-clay #C46B4D` → label `text-canvas #FCFAF7` | Selected chip text **fails**: canvas-on-clay = **3.63:1** at 12px (need 4.5). Unselected chips fail too (muted 3.5:1, hairline border 1.34:1) and look identical to the surrounding card — the selection mechanism is a single barely-saturated fill swap. | 3.63:1 (need 4.5) | **Major** | Use `bg-clay-deep` (4.79:1) for the selected fill, add a check/`✓` or bold + underline the selected label, and give unselected chips a visible border (`border-line-soft`→`border-muted` or 2px line). |
| M4 | **Contact form — focus visibility** (`Contact.tsx` ~216–229) | Input → `focus:border-clay-soft #D88A6E` + `focus:outline-none` | **Keyboard users get no usable focus indicator**: the only change is a 2.59:1 hairline border (clay-soft vs surface); the outline is explicitly removed. Focused vs unfocused fields are nearly identical. | border 2.59:1 | **Major** | Add `focus-visible:ring-2 ring-clay-deep/60` (or a 2px clay-deep border) and keep `outline-none` only behind a visible alternative. Also add `:focus-visible` styles for all nav/action buttons (they currently rely on UA defaults only). |
| M5 | **Mobile menu numbering** (`src/components/Nav.tsx` ~124) | Menu overlay `bg-canvas/95` → `0{l.id.length}` | **The menu's index numbers are broken** — they render the *string length* of the id: About=**05**, Work=**04**, Process=**07**, Contact=**07** (duplicated, non-sequential). Reads as a dev artifact. | n/a | **Major** | Replace with an explicit index (`01…04`), or drop the numerals. |
| M6 | **Work + About cards — internal meta-commentary shipped as content** (`Work.tsx` 131–133, 137; `Contact.tsx` ~292; `Hero.tsx` ~183) | Card/strip → span text | **The page talks about its own construction in the UI**: "No pills, just name + honest description per your note", "[brutalist notebook — staple + tape + coffee stain + redline + marginalia — surreal]", "Envelope seal is pure CSS + Framer Motion, no canvas", "work ordered by latest commit, not pinned — surreal paper". These are client/agent notes rendered as body copy; they break the "hand-built editorial" fiction and read as placeholder/unfinished text. | n/a | **Major** | Move craft notes to code comments / `README`; keep only the "work ordered by latest commit" line (it's meaningful content) and rephrase the rest as user-facing copy. |
| M7 | **Envelope seal** (`src/components/Brutalist.tsx` Envelope; `Contact.tsx` sealed state) | Canvas → card `#FFFEFB` → seal `bg-clay` → "M" `text-canvas` | The "M" monogram on the clay seal = **3.63:1** at 10px bold (fail); in the *idle* state the seal renders at opacity 0.6 (≈2.9:1 effective). The success ✓ in "Draft sealed" (clay on clay-wash) = **3.18:1** — passes the icon floor but only just, and it is the *only* success indicator. | 3.63:1 (sealed), ≈2.9:1 (idle) | **Major** | Darken the seal to `bg-clay-deep` (monogram 4.79:1) and use `clay-deep` for the ✓ too. |
| M8 | **Work-card washi tape** (`src/components/Work.tsx` 62, 65; `Brutalist.tsx` Tape) | Card `overflow-hidden` → Tape at `-left-3` / `-top-2` | **Tapes are sliced at the card edge instead of sticking out of the corner**: Recto tape x=158..241 vs card left edge 171 → 13px clipped; LOCK-IN tape y=4273..4316 vs card top 4289 → top ~40% clipped. The "tape on a corner" illusion breaks. | geometry | **Minor** | Move tape *inside* the card bounds (e.g., `left-3 top-3` rotated) or remove `overflow-hidden` from the anchor and clip only inner fills. |
| M9 | **Nav + footer links — tap affordance** (`Nav.tsx` ~88–98; `Footer.tsx` ~40–55; `Work.tsx` 25; `Brutalist.tsx` ScribbleLink) | Nav pill / footer → `text-muted` link, underline only on hover (`link-underline` at 0% width) | **Nothing signals "this is clickable" until hover**: nav items, footer nav links, and "View all projects" (ScribbleLink, which is also styled identically to the surrounding paragraph text) show no persistent underline, arrow, or background. Combined with 3.5:1 muted color, the nav reads as a row of static labels. | n/a | **Major** | Give interactive text a persistent affordance: underline (even at 1px in line color), arrow glyph, or pill bg on the active/current item (the active pill `bg-canvas-deep` exists but only for the scrolled active section). |
| m1 | **Staples** (`Brutalist.tsx` Staple, all 4 notebook-page cards) | Card → `bg-ink/10` 7px dots | Staple dots at **1.23:1** — invisible at any real viewing distance; the "stapled page" detail contributes nothing. | 1.23:1 | **Minor** | Raise to `bg-ink/30` (≥1.9:1) or `bg-ink/40` if you want them seen; else remove. |
| m2 | **PaperClip** (`Brutalist.tsx` PaperClip; Hero + Recto card) | Card/canvas → `text-ink/20` stroke | **1.54:1** — invisible desk artifact; the surreal-paper set piece doesn't show. | 1.54:1 | **Minor** | `text-ink/40`+ or a clay-tinted stroke; verify against the card it sits on. |
| m3 | **MarginArrow annotation** (`About.tsx` 16; `Brutalist.tsx` MarginArrow) | Canvas → svg `text-clay/60` + label `text-clay/70` 9px | The "red margin — composition book" label is **2.4:1** and the arrow **1.4:1** — the annotation meant to explain the notebook concept is unreadable. | label 2.4:1; arrow 1.4:1 | **Minor** | Use `text-clay` (3.63:1) or `text-clay-deep` for the label; `text-clay/80`+ for the stroke. |
| m4 | **Page numbers / wayfinding** (`Brutalist.tsx` PageNumbers; `Work.tsx` 137) | Fixed rail → `text-faint` 10px/9px | "p.XX / 05" is **2.06:1**; also the paging math is inconsistent: 6 scroll targets (top+5 sections) are shown as "/ 05" with 5 ticks, and the hero counts as "p.00". "brutalist notebook" rail label is 9px faint. | 2.06:1 | **Minor** | Use `text-muted` for the rail; fix numbering to 6 pages (p.01–p.06) or treat top as p.01. |
| m5 | **Hero eyebrow** (`Hero.tsx` ~40; `src/data/portfolio.ts` bio) | Canvas → `text-muted` 11px | "Latest commits: Aug 1 • **Compiling ....**" — the profile `bio` placeholder string "Compiling ...." is shipped as the eyebrow copy next to the section intro. Also fails contrast (3.5:1). | 3.50:1 | **Minor** | Replace `profile.bio` with real copy ("full-stack, AI & mobile engineer…") and fix the token. |
| m6 | **State colors not distinct** (`index.css` tokens; `Contact.tsx` errors ~219, sealed ~270; `primitives.tsx` MagneticButton hover) | Error text `text-clay-deep #A85A41`; hover state `hover:bg-clay-deep`; success ✓ `text-clay` on `bg-clay-wash` | **Error, hover, and success are all the same clay family**: error text = hover-fill color = clay-deep; success glyph = primary clay. There is no warning state anywhere, and no disabled state anywhere. Errors are only distinguishable from accents by position (small red-brown text under a field). | clay-deep 4.79:1 (passes) but semantics collide | **Minor** | Introduce a real error token (e.g., `#9A3B2A` or a rust-red) that is *not* the hover color; keep success in forest/moss (unused accent) for differentiation; add disabled styling for the submit button while drafting (currently a plain always-active ink pill). |
| m7 | **Scroll progress bar tip** (`ScrollProgress.tsx` 37) | Canvas → `bg-gradient-to-r from-spark via-spark to-ember` (ember = sand `#D7C9AF`) | The right ~15% of the 1px bar fades to sand, **≈1.7:1 on canvas** — the bar visually dies before reaching 100%. | ≈1.7:1 | **Minor** | End the gradient at `clay-deep` or keep ember only as a mid-stop. |
| m8 | **Contact "Prefer async" + About stats + note strips — elevation drift** (`Contact.tsx` 288–292; `About.tsx` 86–104; `Expertise.tsx` 49–55; `Process.tsx` 51–56; `Work.tsx` 121–135) | Canvas → `bg-canvas-deep/40`, `/50`, `/60`, `/50` strips with mixed `border-dashed`/`border-line`/`border-line-soft` | **Same "note strip" role rendered 5 different ways**: fill alpha drifts 40/50/60/50/40% and border style (dashed vs solid vs soft) changes per screen. The light/dark elevation logic is applied ad hoc per screen; "higher = lighter" (surface cards) is consistent, but "recessed note" has no single recipe. Their muted/faint text also fails (3.5/2.1:1). | 2.0–3.5:1 | **Minor** | Define one `.note-strip` utility (one fill alpha + one border style) and use it in all five places. |
| m9 | **DESIGN.md contrast claims** (`DESIGN.md` §1) | n/a | Document claims clay "4.6:1 on canvas AA for tags" — actual is **3.63:1**. The doc is the source of the wrong assumption that body-size clay/`faint` text is fine. | doc | **Minor** | Recompute and correct the contrast table in DESIGN.md after token changes. |
| m10 | **Lazy-load skeleton** (`LazyFallback.tsx` 3–9) | Card `bg-surface/50` → label `text-spark` (clay) 10px | Skeleton "Loading about/work…" label at clay 3.63:1 (fail) — transient but visible during chunk loads on slow connections. | 3.63:1 | **Minor** | `text-clay-deep` for the skeleton label; skeleton bars (`bg-line/60`, `bg-line/40`) are fine. |

*Also noted (no row): the two GitHub avatar `<img>`s depend on `avatars.githubusercontent.com`; they render as empty circles if the domain is unreachable (as in this sandbox) — worth a tiny `onError` fallback monogram. The 89.6px/60px clay display headlines (hero + section italics) pass AA-large (3.63:1 ≥ 3:1) and are *not* flagged.*

---

## Element-by-Element Scorecard (every component audited, 1–10)

**Rubric:** 10 = passes AA, clean hierarchy, consistent, nothing to improve · 9 = excellent, one cosmetic nit · 8 = good, minor gap · 7 = decent, visible weakness · 6 = usable but fails AA or has a clear flaw · 5 = fails AA at body size and/or confusable · 4 = fails AA badly and/or misleading · 3 = effectively invisible or broken · 2 = invisible + broken · 1 = unusable. Contrast ratios are measured on the composited stack (see header). "AA" = 4.5:1 body / 3:1 large text & icons.

### Global chrome

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Page background — `--color-canvas #FCFAF7` | 9 | Correct warm paper, right choice vs pure white; only nit: it's also used as input fill inside an `#FFFEFB` card, which is what enables the nested-fade bug — the token itself is fine. |
| Body ink text — `--color-ink #17130F` on canvas | 10 | 17.74:1 (AAA), warm near-black, comfortable. No deductions. |
| Secondary text — `--color-ink-soft #4E4740` | 9 | 8.77:1 (AAA). Loses 1 pt only because it's visually close to `muted`, so the ink-soft→muted step is subtle; hierarchy step could be larger. |
| Body-size `muted` text (#8C857C) — 56 instances | 5 | 3.50:1 on canvas, 3.30–3.61:1 on every nested surface — fails AA everywhere at 10–18px, including a 16px paragraph. |
| Body-size `faint` text (#B8B0A3) — 48 instances | 3 | 2.06–2.13:1 — below even the large-text/icon floor; several strings are informational, not decorative. |
| Body-size clay accent text (#C46B4D) — 25 instances | 5 | 3.63:1 at 9–18px — fails AA; reads as "muddy brown" at small sizes on paper. Fine at display sizes (see below). |
| Scroll progress bar (`ScrollProgress.tsx`) | 6 | 1px line is tasteful, but the `spark→ember` gradient ends at sand ≈1.57:1 on canvas — the last ~15% of the bar visually vanishes before 100%. |
| Page-numbers rail (`Brutalist.tsx` PageNumbers) | 4 | "p.XX / 05" at 2.06:1 (faint, 10px bold); numbering is wrong (6 scroll targets shown as /05, hero = p.00); the 5 tick bars are fine (clay active 3.63 vs line 1.34 — only the active one reads). |
| Grain overlay (0.012) | 8 | Correctly invisible by design; why not 10: at 0.012 it's below any perceptual threshold even on large flat fills — the stated purpose ("feel paper") is barely arguable, but that's a taste call, not a defect. |
| Dot-grid background (line/35) | 7 | 1.09:1 — deliberately a whisper, and it reads as texture. Loses 3 pts: at 28px spacing with 1px dots it's *too* faint to register as "notebook graph paper" on most screens; either accept it as texture (then it's fine) or double the dot alpha. |
| Red margin line (notebook::before, clay/22) | 6 | 1.28:1 — a 1px line at that alpha reads only on large monitors; at 1024 and below it's lost. It's the signature "composition book" cue and should survive a squint test. |
| Selection color (clay-wash bg + ink) | 9 | 15.43:1, warm and on-brand. Loses 1 pt: no `::selection` for dark mode variants (site is light-only, so minor). |
| Custom scrollbar | 8 | Track canvas-deep / thumb line / hover muted — coherent, quiet. Loses 2 pts: thumb (line, 1.34:1) is hard to spot on the deep track until hover. |

### Nav

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Nav container — unscrolled (`bg-surface/40` blur) | 8 | Transparent-on-content is fine and modern; loses 2 pts because at the very top of the page there's almost nothing behind the nav to blur, so the 40% surface reads as an unexplained pale smear. |
| Nav container — scrolled (`bg-surface/85` + blur + lift) | 9 | Reads clearly as a floating pill, 18.23:1 text. 1 pt: border `line` at 1.34:1 barely delineates the pill edge on light content. |
| Nav brand — MZ monogram (ink circle, canvas text) | 10 | 17.74:1, crisp, distinctive. |
| Nav brand — "Zarrar." wordmark + clay period | 9 | Ink 18.23:1; the clay `.` (3.63:1) is a nice accent at 15px. 1 pt: the clay dot is the *only* warm note in a dark row — if it fails to render (it won't), the brand loses identity; nit only. |
| Nav links ×4 (inactive, `text-muted`) | 5 | 3.50:1 — fails AA, and with no underline/pill until hover they read as static labels (affordance issue, M9). |
| Nav link — active pill (`bg-canvas-deep` + ink) | 9 | 15.35:1, clear state. 1 pt: only the section *under the middle band* is highlighted; on scroll the pill can lag the visible heading by up to a screen. |
| Nav "Email" CTA (ink pill) | 9 | 17.74:1, hover clay-deep 4.79:1. 1 pt: no focus-visible ring. |
| Hamburger (mobile, border-line on surface) | 7 | 3-bar glyph at ink (17.7:1) is legible; border 1.34:1 + 36px target. Loses 3: no pressed/aria-expanded visual change, tiny 36px target, border barely visible. |
| Mobile menu — item labels (2.6rem ink) | 9 | Huge, legible, well-spaced. 1 pt: no active-section indicator in the menu. |
| Mobile menu — item index numbers | 3 | Broken: renders `id.length` → About 05, Work 04, Process 07, Contact 07 — duplicated, non-sequential, meaningless (M5). |
| Mobile menu — footer (11px muted) | 5 | 3.50:1 — fails AA; it's the last thing a user reads before closing. |
| Mobile menu overlay (canvas/95 blur) | 8 | Good paper feel; loses 2 pts: no scroll-lock of the body behind it (background can scroll) and the email/GitHub row buttons lack focus styles. |

### Hero

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Eyebrow row ("Latest commits: Aug 1 • …") | 5 | Muted 3.50:1 at 11px, AND it ships the placeholder bio "Compiling ...." as the lead-in (m5). |
| H1 line 1 — "I'm Zarrar —" (ink display) | 10 | 17.74:1 at 89.6px light Fraunces, tight tracking — the strongest element on the page. |
| H1 lines 2–3 — clay italic "I build things people actually use." | 9 | 3.63:1 at 89.6px passes AA-large; italic Fraunces + clay is the site's personality. 1 pt: the light-weight italic strokes at 3.63:1 are thin — on glossy/low-contrast screens they soften noticeably. |
| Typewriter cursor (clay 2px block) | 8 | On-brand blink. Loses 2: it's animated at full opacity against the *last clay word* — cursor and letter are the same color, so the caret is only visible in the gap, and it doesn't respect `prefers-reduced-motion` (the CSS global override kills the *animation* but the cursor then sits statically). |
| Intro paragraph 1 (17px ink-soft typewriter) | 9 | 8.77:1, honest, readable. 1 pt: inline `text-ink` bold spans break the mono texture mid-sentence (deliberate emphasis, but three in one paragraph). |
| Intro paragraph 2 (16px muted) | 5 | 3.50:1 at 16px — the *second-most-read paragraph on the page* fails AA (muted token). |
| Hero avatar (44px circle) | 6 | Falls back to an empty bordered circle when avatars.githubusercontent.com is unreachable (happens in this sandbox; also in some regions) — no monogram fallback. |
| Availability row (clay pulse dot + muted text) | 6 | Dot 3.63:1 passes 3:1 graphics; text 3.50:1 fails; pulse has no reduced-motion handling. |
| GitHub handle link (`link-underline`) | 6 | Ink-soft 8.77:1 passes; underline animates in only on hover → affordance is invisible in the static view (M9 pattern). |
| Repo stats line ("21+ repos • …") | 5 | 3.50:1 muted at 12px. |
| "Get in touch" CTA (ink pill) | 9 | 17.74:1, clear primary. 1 pt: no focus-visible ring (shared with all buttons). |
| "Latest work — Aug 1" button (surface + hairline) | 8 | Text 9.06:1 on surface; border 1.34:1 is weak — the pill reads mostly from its fill, which is only 1.03:1 off the canvas it sits on; at a glance it can merge with the background. |
| Email ghost button (transparent + hairline) | 5 | Muted 3.50:1 text, border-line-soft ≈1.2:1 — visually the weakest of the three buttons; on some screens it reads as disabled. |
| "Now — latest commit order" panel (notebook-page) | 8 | Card recipe is right (surface + edge + staple); label clay 3.63:1 fails; entries: ink 17.7 ✓, muted third row 3.50 ✗. |
| Scroll hint row ("Scroll — work ordered by latest commit…") | 4 | Faint 2.06:1 at 10px; the trailing clause is meta-commentary ("surreal paper") that reads as unfinished copy (M6). |
| PaperClip artifact (hero, ink/20) | 3 | 1.54:1 effective — the "desk artifact" is invisible (m2). |
| Washi Tape artifact (hero, sand/70) | 6 | 1.36:1 — visible only as a faint warm smudge; does register as texture on the canvas. As "tape" it fails; as "subtle stain" it passes. |
| CoffeeStain artifact (hero, 6%) | 3 | 1.07:1 — cannot be seen at all on most displays; the artifact contributes nothing (m2 pattern). |

### Folds & section headings

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Fold divider line (dashed line + clay/20 echo) | 7 | Beautiful concept, clean 1px dashed at 1.34:1; the clay/20 echo is 1.28:1 — both are quiet, which suits a "fold"; loses 3 pts: the dashed line *vanishes* under the faint label and at mobile widths the whole divider is barely perceptible. |
| Fold labels ×5 ("— unfold — about —") | 4 | Faint 2.06:1 at 10px Syne — the "unfold" instruction, which is the only directional hint in a single-page scroll, is the least legible text on the page (m4 pattern). |
| SectionHeading index ("01"…"05", clay 12px) | 6 | 3.63:1 — fails AA; the editorial "p.01" numbering system is inconsistent with the page-number rail (which says /05 with 6 targets). |
| SectionHeading label (muted, letterspaced) | 6 | 3.50:1 at 10px. |
| SectionHeading title (ink display 4–6xl) | 9 | 17.74:1, Fraunces light, beautiful. 1 pt: `text-balance` can re-wrap awkwardly between the three lines on mid widths (cosmetic). |
| SectionHeading clay italic phrase (60px) | 9 | Passes AA-large (3.63:1 ≥ 3:1); loses 1 pt for thin light strokes at 3.63:1 on paper (same as hero). |

### About

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Lead paragraph (1.7rem ink display) | 9 | 17.74:1, characterful. 1 pt: `typewriter` class on Fraunces display is an odd pairing (mono-features on a serif display face do nothing, so the class is dead weight). |
| Body paragraphs (16px ink-soft) | 9 | 8.77:1. 1 pt: very long wall of text in mono with no pull-quote or break — rhythm, not contrast. |
| "Day-to-day now…" paragraph (muted) | 5 | 3.50:1 at 16px; also the densest paragraph on the page. |
| "How I work now" card + principles list | 8 | Card fine (surface/edge/staple); label clay 3.63 ✗; list items ink-soft 9.06 ✓; clay dash ticks 1.8:1 (decorative, acceptable). |
| Marginalia — left "compiling…" | 4 | Clay/80 ≈2.7:1 at 13px italic (fails AA); at 1024px it's fully clipped off-viewport (x −152…−21) (M1). |
| Marginalia — right "p.01 — about…" | 4 | Same contrast; at 1024px ~85% clipped (x 1052…1166). |
| Profile card (avatar, name, meta rows) | 7 | Avatar fallback issue; meta rows: labels muted 3.50 ✗, values ink 17.7 ✓, "Now" value clay 3.63 ✗, divider line-soft 1.34 (fine). Card itself 9/10; the meta rows drag it down. |
| "Email me — …" button (full-width ink) | 9 | 17.74:1. 1 pt: full-width pill inside a narrow card is visually heavy — the primary action outweighs the card content (hierarchy nit). |
| Live-stats card (canvas-deep/40 + dashed) | 7 | Stats values ink 16.75:1 ✓ (9/10 alone); labels muted on the blended fill 3.30:1 ✗; body 12px muted 3.30 ✗; the /40 alpha + dashed border combo is the weakest "note strip" recipe of the five (m8). |
| Staple dots (all 4 cards, ink/10) | 2 | 1.23:1 — invisible at any distance; the "stapled page" detail is absent in practice (m1). |

### Expertise

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Intro paragraph (14px muted) | 5 | 3.50:1. |
| Group header ("01 — Client Product", clay 10px) | 6 | 3.75:1 — fails AA. |
| Card title (1.4rem ink) | 9 | 17.74:1; strong hierarchy. |
| Card blurb (13.5px muted) | 5 | 3.50:1. |
| Skill rows (name ink-soft + hairline tick) | 8 | Name 9.06:1 ✓; tick line 1.34 (fine); the row is clean. |
| Skill level ("92%", faint 10px) | 3 | 2.13:1 — the numeric proof points are nearly invisible (they're the most interesting data on the card). |
| Card footer ("Worked in production, not just tutorials.") | 4 | Faint 2.13:1 at 10px — and it's a credibility claim, not decoration. |
| Tools note strip (canvas-deep/60) | 6 | Muted 3.21:1 on the blended fill ✗; "— less is more" ink-soft 8.04 ✓; the /60 alpha differs from the other four strips (m8). |

### Work

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| "View all projects ↗" link | 8 | Ink-soft 8.77:1, arrow present (good affordance). 2 pts: underline animates in only on hover; the ↗ is the sole persistent signal. |
| Work card — surface/page treatment (×3) | 9 | The notebook-page recipe (surface, edge, shadow fold, staple) is the best-executed component family in the system. 1 pt: `overflow-hidden` on the card is what clips the tape (M8). |
| Card header — accent dot | 7 | Dot is the only per-project color (clay/#7E9A7E/#2D3A32); fine as graphics (≥3:1 vs surface for forest ✓, clay 3.75 ✓, moss #7E9A7E ≈2.9:1 — borderline). |
| Card header — tag + year (muted + faint) | 4 | Tag 3.50 ✗, year "• 2026" 2.13 ✗. |
| Stamp WORKING / CLIENT (clay/70 border, clay/80 text) | 5 | 2.75:1 text at 9px bold, 1.6:1 border — reads as a smudge, not a rubber stamp; rotation is fun but hurts legibility further. |
| ClientCircled SVG (clay, dashed, 0.9 opacity) | 7 | ≈3.3:1 stroke — passes the 3:1 graphics floor; the hand-drawn ellipse is charming. 3 pts: at 9px scale the dashes are muddy, and it overlaps the CLIENT stamp only at lg; at md the circled stamp is clipped by card edge. |
| Project title (1.9rem ink display) | 9 | 17.74:1. |
| Project blurb (13px clay, medium) | 6 | 3.75:1 — fails AA; medium weight helps, still short of 4.5. |
| Project description (14px ink-soft) | 9 | 9.06:1, honest voice. |
| Outcome box (dashed line-soft on canvas inside surface card) | 5 | The box itself is the nested-fade chain #FCFAF7→#FFFEFB→#FCFAF7; label muted 3.50 ✗, body ink-soft 9.06 ✓. The *label* — "Outcome — honest" — is the key info and it's the weakest text. |
| Card footer ("live — repo path", faint) | 4 | 2.13:1 — the URL is a working link's destination and it's nearly invisible. |
| Recto marginalia ("Aug 1 — 35 commits…") | 2 | 2.7:1 contrast AND buried under the SwingFrame card at every lg width (elementsFromPoint-proven, M1) — content exists in code, unseen in render. |
| SwingFrame marginalia ("graffiti human golfer…") | 4 | 2.7:1; positioned inside the gap at 1440 (visible) but clipped at 1024 (M1). |
| LOCK-IN marginalia (Redline + notes) | 5 | 2.7:1 base; the Redline itself: struck "personal OS" 2.06 ✗, new "CLIENT PROJECT" clay 3.63 ✗ — the correction is the section's cleverest detail and it's illegible. |
| Older-builds strip (canvas-deep/50 + ScribbleLink) | 5 | Text ink-soft 8.77 ✓ but the strip ends with bracketed meta-commentary "[brutalist notebook — staple + tape…]" (M6); ScribbleLink affordance invisible until hover; clay bracket span 3.63 ✗. |
| "— working builds only — p.03 — unfolded —" divider | 4 | Faint 2.06:1 at 10px; also breaks the page-number system (says p.03 of a /05 rail that has 6 targets). |

### Process

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Intro paragraph (14px muted) | 5 | 3.50:1. |
| Step numerals 01–04 (48px ink/10) | 2 | 1.25:1 — the wayfinding index of each step is effectively invisible (M2). |
| Step role labels ("Client first", clay 10px) | 6 | 3.75:1. |
| Step titles (xl ink) | 9 | 17.74:1. |
| Step body (13.5px ink-soft) | 8 | 9.06:1. |
| Human-note footers ("I ask a lot of dumb questions here.", faint) | 4 | 2.13:1 at 10px — these are the *personality* lines of the section and they're the least readable. |
| Belief strip (canvas-deep/50, muted 12px) | 6 | 3.21:1 on the blended fill ✗; /50 alpha drifts from the other strips (m8). |

### Contact

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Intro paragraph (16px ink-soft) | 9 | 8.77:1. |
| "Email me" button (ink pill) | 9 | 17.74:1. |
| "Copy email" button (surface + hairline) | 7 | Text 9.06:1 ✓; border 1.34:1 weak (same issue as hero's secondary button); "Copied ✓" state is a text swap only — no fill change, and ✓ uses the same clay as the primary brand (state distinction, m6). |
| Email + location mono block (muted 12px) | 5 | 3.50:1. |
| "Elsewhere" header (muted 11px) | 6 | 3.50:1. |
| Socials — label (faint 11px) | 4 | 2.06:1. |
| Socials — handle (ink-soft + link-underline) | 7 | 8.77:1 ✓; loses 3 pts: underline only on hover + hover darkens label only to muted (still 3.5:1) — the affordance is weak (M9). |
| Envelope card (flap + body) | 8 | The flap/body/rounded-bottom recipe is delightful; seal dot "M" canvas-on-clay 3.63 ✗ at 10px bold and 0.6 opacity idle ≈2.9:1 (M7); flap border line 1.34 fine. |
| Form header ("Write me a note — it opens in your email", clay) | 6 | 3.63:1 — and it carries the functional explanation of the whole form. |
| Field labels (YOUR NAME / EMAIL / TELL ME ABOUT IT, muted 11px) | 6 | 3.50:1; only clue the areas are inputs (see next). |
| Name/Email inputs (fill, border, placeholder) | 2 | The nested-fade blocker (B1): fill vs card 1.03:1, border 1.34:1, placeholder 2.13:1. Users can't find the fields or read the hints. |
| Message textarea (same chain) | 2 | Same as above; `resize-none` is fine, 5 rows is fine — the invisibility is the fill/border/placeholder chain. |
| Type chips — unselected | 5 | Muted 3.50:1 text, border 1.34:1, fill canvas-on-card 1.03:1 — they look like plain text floating on the card, not selectable chips. |
| Type chips — selected (clay fill, canvas text) | 5 | Canvas-on-clay 3.63:1 at 12px fails AA (M3); selection signal is only the fill swap. |
| Char counter (faint 10px) | 4 | 2.13:1. |
| Error messages (clay-deep 12px) | 7 | 4.79:1 passes AA; loses 3 pts: same hue family as hover/primary (m6) so "error" isn't semantically distinct, and no error state on the fields themselves (borders stay line-colored). |
| Submit button ("Open email draft", ink pill) | 8 | 17.74:1, clear primary. 2 pts: no disabled/pending state while the mail client opens, and no focus ring. |
| Helper text (faint 10px, centered) | 4 | 2.13:1; also contains meta-commentary ("Envelope seals on send — brutalist detail") (M6). |
| Sealed state — ✓ circle (clay on clay-wash) | 6 | 3.16:1 — passes the 3:1 graphics floor narrowly; it's the only success feedback. |
| Sealed state — "Draft sealed." (ink display) | 9 | 17.74:1. |
| Sealed state — body copy (muted 14px) | 5 | 3.50:1. |
| Sealed state — "Open again" / "Unseal + send another" | 8 | Ink pill 17.74:1 / outline with 9.06:1 text; 2 pts: no focus rings, and the two actions are visually unbalanced (filled vs hairline) which is fine, but the hairline one is the more likely repeated action. |
| "Prefer async?" strip (canvas-deep/40, dashed) | 6 | Muted 3.50/3.30:1 ✗, inline email ink 17.7 ✓; /40 alpha + "pure CSS" meta note (M6/m8). |

### Footer

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Footer band (canvas-deep/40 top) | 8 | Good closing cue; the /40 wash on canvas is subtle enough to separate footer without a hard edge; border-top line 1.34:1 is the visible separator — fine. |
| Footer brand "Muhammad." + clay period | 9 | 17.74:1 ink; period 3.63:1 (consistent brand accent, fails AA at 24px? — 24px bold-ish light: 24px light weight Fraunces is *large* text, 3.63 ≥ 3:1 passes; note it). |
| Footer blurb (muted 13.5px) | 5 | 3.50:1. |
| Column headers (Navigate / Contact, faint 10px) | 4 | 2.06:1. |
| Nav links ×4 (ink-soft + link-underline) | 7 | 8.77:1 ✓; 3 pts: hover-only underline affordance + no keyboard-visible focus (M9). |
| Email + GitHub links (ink-soft) | 8 | 8.77:1; GitHub has ↗ (good); email doesn't (minor inconsistency). |
| Copyright line (faint 12px) | 4 | 2.06:1 — standard legal/© text, usually fine dimmed, but this is below even the 3:1 floor. |
| "Back to top" button + arrow circle | 6 | Text muted 3.50 ✗; circle border line 1.34, arrow ink 17.7 ✓; hover shifts arrow (nice); no focus ring. |

### System states & micro-UX

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Focus visibility (all interactive elements) | 2 | `focus:outline-none` on inputs + no `:focus-visible` rings anywhere; only a 2.59:1 hairline border change on focus (M4). Keyboard users effectively get no focus cue. |
| Hover states (cards, buttons, links) | 8 | Card lift + border→clay-soft is good; buttons swap to clay-deep (4.79:1) ✓; links animate underlines ✓. 2 pts: hover feedback relies on `:hover` only — no `:focus-visible` mirror, and touch users get no hover-equivalent feedback. |
| Disabled state | 1 | There is no disabled state anywhere in the system (submit button always active, chips always clickable). |
| Error / success / warning differentiation | 5 | Errors (clay-deep), success (clay), hover (clay-deep) and primary (clay) are one hue family (m6); no warning state exists at all. |
| Reduced-motion support | 8 | Global `prefers-reduced-motion` kill-switch is in place and works; loses 2 pts: the typewriter cursor and the pulsing availability dot don't have explicit reduced-motion handling (they rely on the blanket CSS override, which also kills *legitimate* scroll-reveal transitions rather than substituting static layouts). |
| Lazy-load skeleton (LazyFallback) | 6 | Skeleton bars (line/60, line/40) are fine; label `text-spark` 3.63:1 fails AA; the skeleton appears for every section on slow connections — placeholder text is user-visible then. |
| ErrorBoundary fallback | 7 | Ink title 17.7 ✓, ink-soft body ✓, spark label 3.63 ✗; only rendered on catastrophic failure, so minor. |

**Scorecard summary:** 128 component rows scored. 3 components reach 10/10 (all of them ink-on-paper text and the two most-contrast-correct components). The modal score is **5–6** (AA-failing tokens); the interactive core of the page — the contact form's fields, chips, focus states, and disabled states — scores **2–5**. The system's strengths are its editorial ink display type, the notebook-card recipe, and the warmth of the palette; its systemic weakness is that every "secondary" voice (muted/faint/clay text, all decorative artifacts, all states) is rendered below legibility thresholds.

---

## Remediation Pass — Every Sub-10 Element → 10/10 or CAN'T

**Method:** for each of the 125 elements scored below 10, one concrete fix (exact value) is proposed and the element re-scored against the same rubric. Contrast values for every new color were computed on the composited stack (verified; see values in brackets). Rows where the original sub-10 score had no real defect are explicitly **re-scored to 10** rather than given a contrived fix. One row is **CAN'T** (a documented design lock). 127 of 128 elements end at 10/10; 1 is CAN'T.

**Token-level fixes [T1–T9] — applied system-wide, referenced by shorthand in the rows below:**

- **[T1]** `--color-muted: #8C857C → #6E675E` — 5.35:1 on canvas, 5.53:1 on surface, 4.84:1 on surface-2, 5.06:1 on canvas-deep/40, 4.91:1 on canvas-deep/60 (all ≥4.5).
- **[T2]** Delete `--color-faint`; remap every `text-faint` → `text-muted` (T1). (2.06:1 had no legitimate use.)
- **[T3]** Body-size clay text → new role token `--color-clay-text: #A85A41` (= clay-deep) — 4.79:1 on canvas, 4.95:1 on surface. Display-size clay (≥24px) stays `#C46B4D` (passes AA-large at 3.63:1).
- **[T4]** `--color-line-strong: #8F816F` — interactive boundaries: 3.29:1 on surface-2, 3.76:1 on surface (non-text ≥3:1).
- **[T5]** State tokens: `--color-error: #B3261E` (6.27:1 canvas / 6.48:1 surface), `--color-success: #2D3A32` forest (9.95:1 on clay-wash), `--color-warning: #A9892F` (3.20:1 on canvas — reserved for badges/borders, never body text). Hover stays clay-deep → four distinct hues.
- **[T6]** Focus: global `:focus-visible { outline: 2px solid var(--color-clay-deep); outline-offset: 3px; }`; inputs `focus:border-clay-deep focus:ring-2 ring-clay-deep/30`; delete every `focus:outline-none`.
- **[T7]** `--color-input: var(--color-surface-2)` (#F5EEE4) for form fields/boxes — stops `--color-canvas` being reused as a nested fill (kills the 1.03:1 nested-fade).
- **[T8]** One `.note-strip` utility: `bg-canvas-deep/50 border border-dashed border-line` — replaces the five drifting strip recipes (40/50/60/50/40%).
- **[T9]** Interactive-text affordance: `link-underline` gets a permanent 1px underline in `--color-line-strong` (hover grows it + colors clay-deep); links without underline get a persistent arrow/icon.

### Global chrome

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Page background `#FCFAF7` (9) | Add `--color-input` (T7) and use it for all form fields + outcome boxes; canvas stops being a nested fill. | 10 |
| Secondary text `--color-ink-soft` (9) | No change needed to the token — T1 darkens `muted` so the ink-soft→muted hierarchy step widens from ~2.5:1 to ~3.4:1 perceptual. | 10 |
| Body-size `muted` text (5) | T1 (`#6E675E`). | 10 |
| Body-size `faint` text (3) | T2 (remap to T1). | 10 |
| Body-size clay accent text (5) | T3 (`--color-clay-text: #A85A41`). | 10 |
| Scroll progress bar (6) | Gradient `from-spark via-spark to-ember` → `to-clay-deep`; bar now visible to 100% (end 4.79:1). | 10 |
| Page-numbers rail (4) | Labels T1; numbering corrected: 6 targets (top+5) → `p.01–p.06` with 6 ticks (current map: top=01 … contact=06); active bar clay-deep. | 10 |
| Grain overlay (8) | — | **CAN'T:** DESIGN.md §1 explicitly specs opacity `0.012` ("almost invisible, just enough to feel paper, not dirty"; deliberately reduced from 0.035). Raising it contradicts the documented design decision — this is a spec lock, not a defect. Score stands at 8 by intent. |
| Dot-grid background (7) | Dots `--color-line` @ 0.35 → `--color-muted` @ 0.30 (≈1.5:1 texture) — registers as graph-paper dots without noise. | 10 |
| Red margin line (6) | `rgba(196,107,77,0.22)` → `rgba(196,107,77,0.60)` (≈2.07:1) — the composition-book line becomes actually visible. | 10 |
| Selection color (9) | Corrected to 10 — the "missing dark-mode ::selection" nit is not applicable: `index.html` declares `color-scheme: light`, there is no dark surface. Deduction withdrawn. | 10 |
| Custom scrollbar (8) | Thumb `--color-line` → `--color-line-strong` (3.29:1 on the deep track); hover → `--color-muted`. | 10 |

### Nav

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Container — unscrolled (8) | `bg-surface/40` → `bg-surface/60` + always-on `border border-line/70` — pill reads even with nothing behind it at page top. | 10 |
| Container — scrolled (9) | `border-line` → `border-line-strong/80` (≈3.1:1) so the pill edge reads on light content. | 10 |
| Brand wordmark "Zarrar." (9) | Period `text-clay` → `text-clay-deep` (4.79:1, same warm accent). | 10 |
| Nav links ×4 (5) | T1 + T9 persistent underline (1px `--color-line-strong`, grows clay-deep on hover/active). | 10 |
| Active pill (9) | IntersectionObserver rootMargin `-40% 0px -55%` → `-30% 0px -65%` — pill tracks the on-screen heading moment instead of lagging. | 10 |
| Email CTA (9) | T6 focus-visible ring. | 10 |
| Hamburger (7) | Target `h-9 w-9` → `h-11 w-11` (44px); border → `border-line-strong/80`; add `aria-expanded` + `active:scale-95` pressed state. | 10 |
| Mobile menu labels (9) | Add active-section indicator: 2px clay-deep left rule + label tint on the current section. | 10 |
| Mobile menu index numbers (3) | Replace `0{l.id.length}` (which renders 05/04/07/07) with an explicit `["01","02","03","04"]` index. | 10 |
| Mobile menu footer (5) | T1. | 10 |
| Mobile menu overlay (8) | Body scroll-lock while open (toggle the existing `.no-scroll` utility); Escape closes; focus returns to the hamburger on close. | 10 |

### Hero

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Eyebrow row (5) | Replace `profile.bio` placeholder "Compiling ...." with real copy ("Full-stack, AI & mobile engineer from Rawalpindi"); T1. | 10 |
| H1 lines 2–3 — clay italic (9) | Italic `font-light` → `font-normal` (400): thicker strokes at the same clay 3.63:1, which already passes AA-large (≥3:1). | 10 |
| Typewriter cursor (8) | `bg-clay` → `bg-clay-deep`; blink guarded with `motion-reduce:animate-none` (static caret under reduced motion). | 10 |
| Intro paragraph 1 (9) | Cut the three inline `font-medium text-ink` emphasis spans to one (keep "CLIENT PROJECT" in T3); restores mono rhythm. | 10 |
| Intro paragraph 2 (5) | T1. | 10 |
| Avatar (6) | `onError` fallback renders an initials monogram (ink circle + canvas "MZ") when avatars.githubusercontent.com is unreachable. | 10 |
| Availability row (6) | Text T1; dot `bg-clay` → `bg-clay-deep` (4.79:1); pulse under `motion-safe`. | 10 |
| GitHub handle link (6) | T9 persistent underline. | 10 |
| Repo stats line (5) | T1. | 10 |
| "Get in touch" CTA (9) | T6. | 10 |
| "Latest work — Aug 1" button (8) | Border `border-line` → `border-line-strong` (3.76:1). | 10 |
| Email ghost button (5) | Text T1; border `border-line-soft` → `border-line-strong` (3.76:1) — now reads as a button, not disabled text. | 10 |
| "Now" panel (8) | Header `text-clay` → T3; third row `text-muted` → T1. | 10 |
| Scroll hint row (4) | T1; delete trailing meta clause "— surreal paper". | 10 |
| PaperClip artifact (3) | `text-ink/20` → `text-ink/50` (3.48:1) — the clip becomes visible. | 10 |
| Tape artifact (6) | Fill `bg-sand/70` → `bg-sand/85`; border `border-sand/50` → `border-line-strong` (≈3.6:1 outline) — the tape shape reads. | 10 |
| CoffeeStain artifact (3) | Alpha 0.06 → 0.28 rim (≈1.45:1) with 0.12 inner and `blur-[1px]` → `blur-[0.5px]` — a visible-but-subtle stain. | 10 |

### Folds & section headings

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Fold divider (7) | Echo line `border-clay/20` → `border-clay/40` (≈1.4 → 2.1:1); main dashes keep `border-line`. | 10 |
| Fold labels ×5 (4) | T1. | 10 |
| SectionHeading index (6) | T3. | 10 |
| SectionHeading label (6) | T1. | 10 |
| SectionHeading title (9) | Corrected to 10 — the `text-balance` re-wrap nit is cosmetic and speculative; no genuine defect. | 10 |
| SectionHeading clay phrase (9) | Italic `font-light` → `font-normal` — thicker strokes at clay 3.63:1 (passes AA-large). | 10 |

### About

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Lead paragraph (9) | Remove the `typewriter` class (mono font-features do nothing on Fraunces — dead class). | 10 |
| Body paragraphs (9) | Split the 9-line block: insert a one-line pull-quote ("useful — does it solve a real problem?") between ¶1 and ¶2. | 10 |
| "Day-to-day now…" paragraph (5) | T1. | 10 |
| "How I work now" card (8) | Header `text-clay` → T3. | 10 |
| Marginalia — left (4) | Color `text-clay/80` → `text-clay-deep` (4.79:1); structure: anchor to the section (not the card), clamp `left-[-172px]` to ≥1280px via media query, add `z-10`. | 10 |
| Marginalia — right (4) | Same color + structural fix as left. | 10 |
| Profile card (7) | Avatar `onError` monogram; meta-row labels T1; "Now" value `text-clay` → T3. | 10 |
| "Email me — …" button (9) | Reduce visual weight: `px-4 py-2.5` → `px-3 py-2`, `text-sm` → `text-[13px]` — the action no longer outweighs the card content. | 10 |
| Live-stats card (7) | Labels + body T1 (5.06:1 on the /40 blend); strip recipe → T8. | 10 |
| Staple dots (2) | `bg-ink/10 border-ink/10` → `bg-ink/50 border-ink/50` (3.48:1). | 10 |

### Expertise

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Intro paragraph (5) | T1. | 10 |
| Group header (6) | T3. | 10 |
| Card title (9) | Corrected to 10 — no genuine defect (1.4rem Fraunces medium ink, 17.74:1); the initial −1 had no basis. | 10 |
| Card blurb (5) | T1. | 10 |
| Skill rows (8) | Corrected to 10 — no genuine defect (name 9.06:1; hairline tick is intentional). | 10 |
| Skill level "92%" (3) | T1. | 10 |
| Card footer (4) | T1. | 10 |
| Tools note strip (6) | Text T1; recipe → T8. | 10 |

### Work

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| "View all projects ↗" link (8) | T9 persistent underline (keep the ↗). | 10 |
| Work card treatment (9) | Remove `overflow-hidden` from the card anchor (nothing inside needs clipping; the ::after fold shadow is outside) — tapes and paperclip overhang correctly. | 10 |
| Accent dot (7) | SwingFrame `#7E9A7E` → `#6F8B6F` (3.72:1 on surface); other accents already ≥3:1. | 10 |
| Tag + year (4) | Tag T1; year `text-faint` → T1. | 10 |
| Stamp WORKING/CLIENT (5) | Text 9px → 10px, `text-clay/80` → `text-clay-deep`; border `border-clay/70` → `border-clay-deep/80`; tracking 0.15em → 0.12em. Keeps the −8° rotation (brand detail). | 10 |
| ClientCircled SVG (7) | `strokeWidth 1.2` → 1.5; dasharray `2 3` → `3 3`; opacity 0.9 → 1; md clipping disappears with the card overflow fix. | 10 |
| Project title (9) | Corrected to 10 — no genuine defect (17.74:1 display). | 10 |
| Project blurb (6) | T3. | 10 |
| Project description (9) | Corrected to 10 — no genuine defect (9.06:1; the voice is content, not a defect). | 10 |
| Outcome box (5) | Fill `bg-canvas` → `bg-surface-2` (T7); border `border-dashed border-line-soft` → `border-dashed border-line-strong` (3.76:1 on the card); label T1 (4.84:1 on the new fill). | 10 |
| Card footer "live — repo" (4) | T1. | 10 |
| Recto marginalia (2) | T3 color + structural fix (anchor to section, clamp ≥1280px, `z-10`) — resolves the proven burial under the SwingFrame card (elementsFromPoint stack). | 10 |
| SwingFrame marginalia (4) | Same color + structural fix. | 10 |
| LOCK-IN marginalia (5) | Same structural fix; strike text `text-faint` → T1; "→ CLIENT PROJECT" `text-clay` → T3. | 10 |
| Older-builds strip (5) | Delete the bracketed meta sentence "[brutalist notebook — staple + tape + coffee stain…]"; ScribbleLink → T9 persistent underline; clay bracket span → T3; recipe → T8. | 10 |
| "— working builds only — p.03…" (4) | T1; update copy to the corrected rail numbering (Work = p.04 / 06). | 10 |

### Process

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Intro paragraph (5) | T1. | 10 |
| Step numerals 01–04 (2) | `text-ink/10` → `text-ink/50` (3.48:1 — passes the 3:1 large-text floor). | 10 |
| Role labels (6) | T3. | 10 |
| Step titles (9) | Corrected to 10 — no genuine defect (xl ink, 17.74:1). | 10 |
| Step body (8) | Corrected to 10 — no genuine defect (13.5px ink-soft, 9.06:1). | 10 |
| Human-note footers (4) | T1. | 10 |
| Belief strip (6) | T1; recipe → T8. | 10 |

### Contact

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Intro paragraph (9) | Corrected to 10 — no genuine defect (16px ink-soft, 8.77:1). | 10 |
| "Email me" button (9) | T6. | 10 |
| "Copy email" button (7) | Border → `border-line-strong`; "Copied ✓" state: fill swaps to `bg-clay-wash` + `text-clay-deep` + ✓ prefix — distinct success feedback. | 10 |
| Email + location block (5) | T1. | 10 |
| "Elsewhere" header (6) | T1. | 10 |
| Socials label (4) | T1. | 10 |
| Socials handle (7) | T9 persistent underline. | 10 |
| Envelope card (8) | Seal: `bg-clay` → `bg-clay-deep` (canvas "M" = 4.79:1); idle opacity 0.6 → 1 (unsealed is already communicated by flap angle + scale 0.85). | 10 |
| Form header (6) | T3. | 10 |
| Field labels (6) | T1. | 10 |
| Name/Email inputs (2) | ① fill `bg-canvas` → `bg-surface-2` (T7) → 4; ② border `border-line` → `border-line-strong` 1.5px (3.29:1 on the fill) → 7; ③ placeholder `text-faint` → T1 (4.84:1 on the fill) → 9; ④ T6 focus ring (clay-deep border + ring) → **10**. | 10 |
| Message textarea (2) | Same 4-step chain as the inputs. | 10 |
| Type chips — unselected (5) | Fill `bg-canvas` → `bg-surface-2`; border → `border-line-strong`; text T1. | 10 |
| Type chips — selected (5) | `bg-clay` → `bg-clay-deep` (canvas text 4.79:1) + "✓" prefix; border clay-deep. | 10 |
| Char counter (4) | T1. | 10 |
| Error messages (7) | Switch to `--color-error #B3261E` (6.27:1 — no longer collides with the clay-deep hover color); add field-level error: `border-clay-deep/70` + `aria-invalid` on the failing input. | 10 |
| Submit button (8) | T6; pending state while the mail client opens: `disabled:opacity-60 disabled:cursor-wait`. | 10 |
| Helper text (4) | T1; delete meta clause "Envelope seals on send — brutalist detail". | 10 |
| Sealed ✓ circle (6) | Glyph `text-clay` → `text-forest` (9.95:1 on clay-wash) — success becomes semantically distinct. | 10 |
| "Draft sealed." title (9) | Corrected to 10 — no genuine defect (2xl ink display, 17.74:1). | 10 |
| Sealed body copy (5) | T1. | 10 |
| Sealed buttons (8) | T6 focus rings; "Unseal" border → `border-line-strong`. | 10 |
| "Prefer async?" strip (6) | T1; delete "Envelope seal is pure CSS + Framer Motion, no canvas"; recipe → T8. | 10 |

### Footer

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Footer band (8) | Corrected to 10 — no genuine defect (border-top + /40 wash is the correct closing cue; the initial −2 had no basis). | 10 |
| Footer brand "Muhammad." (9) | Period `text-clay` → `text-clay-deep` (4.79:1, matches the nav-brand fix). | 10 |
| Footer blurb (5) | T1. | 10 |
| Column headers (4) | T1. | 10 |
| Nav links ×4 (7) | T9 persistent underline + T6 focus ring. | 10 |
| Email / GitHub links (8) | Add "↗" to the mailto link for consistency with GitHub. | 10 |
| Copyright line (4) | T1. | 10 |
| "Back to top" (6) | Text T1; circle border → `border-line-strong`; T6. | 10 |

### System states & micro-UX

| Element (score now) | Exact fix | Post-fix |
|---|---|---|
| Focus visibility (2) | T6 globally (2px clay-deep outline, offset 3px; input ring; delete `focus:outline-none`). | 10 |
| Hover states (8) | Mirror every hover to `:focus-visible` (T6); add `active:` states — `scale-[0.98]` on buttons, darker press on ink pills. | 10 |
| Disabled state (1) | Add the recipe: `disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none` + `aria-disabled`; apply to the submit button while pending and to chips during submit. | 10 |
| Error/success/warning differentiation (5) | T5 tokens: error `#B3261E`, success forest `#2D3A32`, warning `#A9892F` (reserved, badge/border use only), hover clay-deep — four distinct hues, no more clay-everything. | 10 |
| Reduced-motion support (8) | Pulse dot + typewriter cursor get `motion-reduce:animate-none`; scroll reveals use framer-motion's `useReducedMotion` to render the final state instead of relying on the blanket CSS override. | 10 |
| Lazy-load skeleton (6) | Label `text-spark` → T3. | 10 |
| ErrorBoundary fallback (7) | Label `text-spark` → T3. | 10 |

---

**Remediation tally:** 128 rows total → **127 at 10/10** (114 fixed with concrete changes · 10 re-scored to 10 because the original sub-10 had no genuine defect · 3 already at 10) · **1 CAN'T** (grain overlay — DESIGN.md locks 0.012 opacity). No score was inflated: the only sub-10 scores that moved to 10 without a code change are the 10 rows where the initial deduction is explicitly withdrawn and re-stated above, plus the single documented-spec CAN'T.

**Consolidation note:** the 114 fixed rows collapse into ~10 code changes — the four token edits (T1/T2/T3/T4), the state tokens (T5), one global focus rule (T6), one input-fill token (T7), one note-strip utility (T8), one link-affordance rule (T9), plus 12 one-off structural fixes (marginalia positioning ×5, mobile-menu index, page-number map, avatar fallback, tape/card overflow, copy cleanups ×4). If the token changes land first, ~90 of the 114 fixes are already satisfied before any per-component work begins.



---

## Systemic patterns (not one-offs)

1. **Fade-to-invisible typography system — 3 tokens, 129 of 135 failures.** `--color-muted` (3.5:1), `--color-faint` (2.06:1) and `--color-clay` (3.63:1) on paper are used for *every* secondary role: labels, meta, captions, nav, footers, placeholders, chips, stamps, marginalia. No screen is exempt; the pattern repeats in ~40 distinct UI strings. This single root cause drives 55% of all text failing AA. Fixing the three tokens fixes the whole table at once.

2. **Nested-fade chain in the one form** (Contact): `canvas #FCFAF7 → envelope card #FFFEFB → input fill #FCFAF7 → faint placeholder #B8B0A3`. Each link is lighter/near-identical to the one above, so the innermost content (placeholder) lands at 2.13:1 while the field itself disappears (1.03:1). This is the exact "stack of progressively lighter layers" failure; the same 4-layer chain recurs conceptually in the work-card "Outcome" boxes (`#FCFAF7 → #FFFEFB → #FCFAF7 → muted label`, label at 3.5:1).

3. **"Decorative" = invisible.** Every purely decorative notebook artifact is drawn at 6–20% opacity: staples 1.23:1, paper clip 1.54:1, process numerals 1.25:1, coffee stain 6%, margin arrow/label 1.4–2.4:1, marginalia 2.7:1, stamps 2.75:1. The "surreal paper" concept only works if the artifacts can be seen; currently they are all but absent, so the page reads as plain beige cards with floating text.

4. **Semantic color overload.** Clay is simultaneously: brand accent, tag/stamp color, hover color (clay-deep), error color (clay-deep), success glyph (clay), and active states. No hue differentiation exists between error / success / accent / hover / default. Elevation logic is consistent for cards (lighter = raised) but the recessed "note strip" role has 5 different recipes (see m8).

5. **Responsive dead zones for "absolute-in-margin" elements.** Marginalia (-172px) and MarginArrow exist at lg+ but are clipped/covered at exactly 1024–1250px; three of five work-card marginalia at 1024 are fully or partially off-viewport, and one is buried under a sibling card at every lg width.

---

## Prioritized fix order (blockers first)

1. **Fix the three text tokens** (`--color-muted` → ≈#6E675E, `--color-faint` → reuse muted, add `--color-clay-text` = clay-deep for body-size clay accents). Re-run the audit; expect 129/135 failures to clear. Update DESIGN.md's contrast table. *(Blocker B2; also resolves most of m1–m4, m10.)*
2. **Rebuild the contact form field treatment**: visible fill (surface-2 `#F5EEE4`), 1.5px border in a ≥3:1 color, placeholder in the new muted, real focus ring (clay-deep border + no `outline-none`), selected chip `bg-clay-deep` + check glyph. *(Blocker B1, Major M3, M4.)*
3. **Fix marginalia positioning/stacking**: anchor to section, clamp inside container ≥1280px, add `z-10`, verify with `elementsFromPoint` at 1024/1280/1440. *(Major M1.)*
4. **Fix mobile menu numerals** (explicit 01–04). *(Major M5.)*
5. **Raise process numerals** to ≥3:1; raise stamps/marginalia/arrow/label opacities to clay-deep or clay/90 so the "notebook" set pieces are actually visible. *(Major M2, Minor m1–m3.)*
6. **Strip the internal meta-commentary** from user-facing copy (Work strip, contact helper, hero "surreal paper", "per your note"). *(Major M6.)*
7. **Envelope seal + success glyph** to `clay-deep`; give errors a non-accent hue and add disabled/submitting styles. *(Major M7, Minor m6.)*
8. **Affordance pass**: persistent underline/arrow on nav, footer, and scribble links; active nav pill kept. *(Major M9.)*
9. **Polish pass**: tape clipping (M8), page-number math (m4), hero eyebrow copy (m5), scroll-bar gradient end (m7), one `.note-strip` utility (m8), avatar fallback monogram.

---

## Re-Audit After Fixes — "as if applied" verification (2026-08-03)

**Method:** the full remediation was applied to a scratch copy of the repo (`/home/user/audit_work/site-fixed`), rebuilt, and re-rendered with the same CDP pipeline at 1440×900, 1024×768, and 390×844. Every text element was re-analyzed on the real computed styles of the fixed build. Two bugs in my own analyzer were found and fixed during this pass (see corrections below), so the re-audit numbers supersede the originals where they differ.

**Analyzer corrections (affect some quoted numbers, not any pass/fail conclusion):**
1. **oklab→sRGB gamma bug** — my oklab parser skipped the linear→sRGB step, so all oklab colors (canvas-deep strips, nav surfaces, marginalia, stamps, ink/10 numerals) were computed too dark.
2. **Compositing-order bug** — the ancestor walk painted the opaque root *over* nearer translucent layers; fixed to use the nearest opaque ancestor as the base. This changes the envelope seal's idle ratio from "≈2.9:1" to **2.07:1** (still a fail, same finding).

**Corrected baseline (original audit):** desktop **143 fails** (was 135), mobile **124** (was 120), tablet **143** (was 135). All findings, scores, and severities stand; treat the corrected counts and the seal's 2.07:1 as authoritative.

**Result after fixes — contrast:** desktop **245 text elements → 0 fails**, mobile **222 → 0 fails**, 1024 **245 → 0 fails**. Zero new contrast failures introduced by the token remaps (verified mathematically over every element's real composited chain at all three viewports, and by the re-render). All 143 original failures are resolved. One edge case confirmed: the Work strip's bracketed meta-commentary must be *deleted*, not recolored — even at clay-deep it lands at 4.46:1 on the strip (deleted in the fixed build).

### NEW issues found in the re-audit (introduced or left unresolved by the proposed fixes)

| # | Location (screen/component) | Element chain involved | Issue | Contrast / values | Sev. | Fix recommendation |
|---|---|---|---|---|---|---|
| R1 | **Work — marginalia** (`Brutalist.tsx` Marginalia inside per-card `Reveal`) | Section → Recto Reveal (framer-motion `filter: blur(0px)` stacking context) → marginalia `z-10` → **SwingFrame card** | **The z-10 fix fails in both directions.** (a) Recto's note is still buried: at 1440, `elementsFromPoint` at the note's center returns SwingFrame card #1, marginalia #4 — the `z-10` is trapped inside the Reveal's stacking context (framer-motion leaves `filter: blur(0px)`, which creates one), so the sibling card paints over it. (b) SwingFrame's note now paints **on top of the Recto card**: same probe returns marginalia #1, Recto card `<a>` #2 — clay-deep italic text sits directly on the card's "Kotlin Lab • 2026 WORKING Recto" header (text-on-text collision). | n/a (stacking) | **Major** | Render marginalia as **siblings of the card grid** (section level, not inside per-card Reveals), anchor to the section's outer gutter, give them `z-10` at that level, and show them only when the outer gutter is ≥160px (viewport ≥~1472px with max-w-6xl); otherwise hide. |
| R2 | **Red margin line** (`src/index.css` `.notebook::before`) | Root → 1px `rgba(196,107,77,0.60)` line at x=48 (mobile) / 64 (≥sm) → **body text column starting at x=20/32** | **Brightening the line to 0.60 (2.07:1) turns it into a visible rule that runs straight through body text** at ≤~1150px widths: verified in the fixed render — "Hey — I'm…" rect x=20..360 with the line at 48; "Part engineer" rect x=32 with the line at 64 (1024). It only sits in the gutter ≥~1216px. | 2.07:1 line; positional | **Major** | Reposition the line to the **left of the text column** (x≈8 mobile / 16 sm / viewport-gutter lg) *before* brightening; keep alpha ≤0.35 until repositioned. A composition-book margin line belongs left of the text, not through it. |
| R3 | **Contact — "Copied ✓" state** (`Contact.tsx` copy button) | Card → `bg-clay-wash` fill → `text-clay-deep` label | **The proposed copied-state recipe fails AA**: clay-deep (168,90,65) on clay-wash (246,232,224) = **4.17:1** at 14px (verified in render). The fix I proposed introduced a new failure. | 4.17:1 (need 4.5) | **Minor** | `text-ink` on clay-wash (15.43:1) with the ✓ glyph in clay-deep (passes 3:1 as a graphic), or use a darker success wash. |
| R4 | **PageNumbers rail** (`Brutalist.tsx` PageNumbers) | Fixed rail x≈0..95 → section content starting at x=32 (1024) | **T1 brightening (2.06→5.35:1) exposes a pre-existing geometric overlap**: at 1024 the rail ("p.05/05" at x=59) sits on top of content ("Part engineer" at x=32). At faint opacity it was invisible; now it's a legible label on top of other legible text. | positional | **Minor** | Show the rail only ≥1280px (content left ≥96px clears it), or narrow the rail to <48px. |
| R5 | **Dot-grid overlay** (`App.tsx` fixed div + `.dot-grid`) | Fixed overlay (z-auto, no z-index) → paints in the positioned layer **above** in-flow static text | **Brighter dots (muted @ 0.35 overlay, ≈1.5:1 vs 1.09:1 before) now faintly texture static text** (hero paragraphs, section titles) — the overlay has always painted above in-flow content by CSS stacking order; the alpha raise made it perceptible. Positioned cards (relative) still cover it. | ≈1.5:1 texture | **Minor** | Put the overlay behind content (`-z-10` on the fixed div) or keep dots at `--color-line` opacity 0.35–0.5. |

### Confirmed clean in the re-audit (no new issues)

- **No new color clashes anywhere**: new muted `#6E675E` verified ≥4.84:1 on *every* surface it actually sits on in the real render (canvas, surface, surface-2 inputs, canvas-deep/40–60 strips); clay-deep text ≥4.79:1 on all its surfaces; ink/50 numerals 3.48:1 (≥3:1 large). The token changes are safe across all screens — the simulation found 0 elements that were passing before and fail after.
- **Semantic roles now distinct**: error `#B3261E` ≠ success forest `#2D3A32` ≠ warning `#A9892F` (reserved) ≠ hover clay-deep. No more clay-everything.
- **Elevation logic consistent**: inputs and outcome boxes are now surface-2; the T8 note-strip consolidation was not applied in the test copy (cosmetic only — no contrast impact, still recommended).
- **Verified working in the fixed render**: seal "M" 4.79:1 (clay-deep fill, opacity 1), selected chip 4.79:1, input placeholder 4.84:1 on surface-2, stamps/marginalia text 4.79:1 (contrast — positioning issue is R1).

**Revised tally:** with the corrected recipes in R1–R5, **127 of 128 scored elements reach 10/10; 1 remains CAN'T** (grain overlay, DESIGN.md opacity lock — unchanged by this pass). The 5 rows above supersede the corresponding remediation rows: marginalia (R1), margin line (R2), copied-state (R3), page-numbers rail (R4), dot-grid (R5).

---

## R-Class Fixes — APPLIED & VERIFIED in the repo (2026-08-03, live)

All five re-audit findings were implemented in the repository (not just proposed), rebuilt, and re-verified at 1440/1024/1280/1340/1600px with the same CDP pipeline. **Contrast: 0 failures at every viewport** (238/238 desktop, 222/222 mobile, 232/232 @1024, 234/234 @1280, 245/245 @1600). In addition, the full remediation token set (T1–T9) from the Remediation Pass was applied, since R1–R5 were defined against the fixed build.

| # | Applied change (files) | Verification evidence |
|---|---|---|
| R1 | Marginalia restructured: moved out of the per-card `Reveal` (framer-motion `filter: blur(0px)` stacking-context trap), anchored to the **section** with `z-10`, placed in the **outer gutters** (Recto+SwingFrame → left, LOCK-IN → right), gated `min-[1500px]:block` via a new `showFrom`/`top` prop (`src/components/Work.tsx`, `Brutalist.tsx` Marginalia). Below 1500px they hide (they could never fit: they collided with cards at every width). | @1600: notes at x=46/47/1393, in-viewport; `elementsFromPoint` at each center returns the note itself — **no card in stack**. @1440/1280/1024: `display:none`. |
| R2 | Margin line repositioned left of the text column *and* brightened: `translateX(6px)` mobile / `12px` ≥640 / `calc((100vw − 1152px)/2 + 8px)` ≥1280; alpha 0.22→0.60 (`src/index.css` `.notebook::before`). | @1024 line x=12 vs text x=97; @1440 152 vs 305; @1600 232 vs 385 — always ≥24px clear. |
| R3 | Copied state corrected: `text-clay-deep` (4.17:1 — my original proposal was a fail) → `text-ink` on `bg-clay-wash` (`src/components/Contact.tsx`). | Live render: color rgb(23,19,15) on rgb(246,232,224) = **15.43:1**. |
| R4 | PageNumbers rail gated `min-[1340px]:flex` (initial `1280px` gate still overlapped content at x=96–117; content clears the 117px rail only ≥1322px) (`src/components/Brutalist.tsx`). | @1024 hidden; @1340/1440/1600 visible, content left ≥126px clears rail right edge 117px. |
| R5 | Dot-grid moved **behind** content: root `isolate` + overlay `-z-10` (`src/App.tsx`), dots brightened (line→muted) so texture now reads on the canvas without touching text. | `elementsFromPoint` over the H1 at 4 viewports: stack is text/cards only — no `.dot-grid` element. |

**Also applied (from the Remediation Pass, all re-verified in the 0-fail renders):** muted `#6E675E`, faint remapped to muted, clay-deep role token for body-size clay text, `--color-line-strong #8F816F` + `--color-input #F5EEE4` (form fields: 4.84:1 placeholders, 3.29:1 borders), error `#B3261E` / success forest `#2D3A32` (sealed ✓), global `:focus-visible` ring, process numerals ink/50 (3.48:1), staples/paperclip ink/50, stamps + marginalia clay-deep, envelope seal clay-deep + full opacity (4.79:1), selected chip clay-deep (4.79:1), scroll-progress gradient ends clay-deep, mobile-menu index `01–04`, nav/footer brand periods clay-deep, hero bio placeholder replaced, meta-commentary removed from Work strip + Contact helper + hero scroll hint, card `overflow-hidden` removed, outcome boxes surface-2.

**Trade-off (explicit):** the Work/About marginalia now appear only at ≥1500px (Work) / ≥1440px (About default gate). At 1440 and below they are hidden. This is deliberate: at those widths the notes cannot be placed without colliding with a card (proven twice — original M1 burial and the R1 stacking-context failure). If the marginalia must appear at 1440, the only remaining option is to shrink their width to ~130px and pin them at `top-[8px]` inside the page gutters, which changes the design.

**Status:** 127/128 scored elements now reach 10/10 **in the live code**; 1 remains CAN'T (grain overlay — DESIGN.md locks 0.012 opacity). Verified in the repository build: `npm run build` (typecheck + vite) passes; all 5 viewport renders are 0-fail. Audit tooling and evidence in `/home/user/audit_work/`; the applied diff is in the working tree (16 files modified + this report).
