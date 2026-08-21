# Forensic UI Audit — Zarrar.Solutions

**Scope:** visual design layer only (colour, type, spacing, layering, visual states).
**Method:** full inventory, not a sample. Every route, every component, every CSS rule in
`src/app/globals.css` (2,154 lines at audit time), every `className` in all 21 `.tsx` files.
Contrast figures are computed, not eyeballed — see `scripts/check-contrast.mjs`.

**Surfaces audited (13 routes + 19 components):**
`/` · `/about` · `/services` · `/services/[slug]` (×5) · `/pricing` · `/process` · `/contact`
· `/free-audit` · `/notes` · `/notes/[slug]` (×2) · `/privacy` · `/terms` · `404`
Components: header, mobile menu, footer, hero, marquee, pinned manifesto, scroll timeline,
route progress, index rows, cards, price rows, tier cards, phases, FAQ accordion, forms,
buttons, chips, icons, CTA band, reveal.

**Status legend:** ✅ fixed in this pass · ⚠️ reported, needs a decision · ⏸ blocked on the logo file.

---

## Findings

| Location (screen/component) | Area | Issue | Values | Severity | Fix recommendation |
|---|---|---|---|---|---|
| `/process` → `.phase .ph-no` | Colour & contrast | Phase numbers 01–04 at 2.82:1 — the largest ordinal on the page is the least legible text on it | `rgba(218,113,52,.6)` on `#2a0001` = **2.82:1** | **Blocker** | ✅ Solid `--ember-400 #e18853` → 7.14:1 |
| All forms (`.field input/textarea::placeholder`) | Colour & contrast | Placeholder text fails AA and AA-large; on `/free-audit` the placeholder *is* the field's instruction ("yoursite.pk — or leave blank…") | `rgba(217,154,104,.5)` = **2.78:1** | **Blocker** | ✅ New `--text-3 #ad744e` → 4.90:1 |
| `.idx-no` — home, `/services`, `/notes` | Colour & contrast | Index numerals fail on both grounds; on the ink band they fall to 2.35:1 | `rgba(218,113,52,.75)` = **3.75:1** canvas / **2.35:1** ink | **Blocker** | ✅ `--ember-400` on canvas, `--ember-300` on ink |
| Home "What we keep finding" — `.section-ink` gradient | Colour & contrast | The gradient's light stop `#7c2213` breaks **four** foregrounds simultaneously: `.idx-sub` 4.19, `.sec-index` 3.05, `.idx-mark` 3.55, hover title 4.11 | stop 1 `#7c2213` | **Blocker** | ✅ Stop darkened to `--ground-400 #5e180d`; accent stepped to `--accent-on-ink`; all four now ≥4.89:1 |
| `.skeleton` (loading shimmer) | Nested layer / elevation | Skeleton fill `--inset #220001` on `--canvas #2a0001` = **1.03:1** — the loading state was *darker* than the page it loads into, so it read as a hole rather than a placeholder | `#220001` vs `#2a0001` | **Major** | ✅ Flipped to `--surface-3` (1.18:1, now lighter than the ground) **plus** a `--hairline-soft` border at 1.41:1 to give the block a perceivable edge. Skeletons are transient placeholders, not content, so no AA minimum applies — but they must be visible, and 1.03:1 was not |
| `.scroll-timeline .tl-marker` | Touch targets | Section jump markers are **8×8 px** — 3% of the 44×44 minimum area | `width/height: 8px` | **Blocker** | ✅ 44px hit area on the button, 8px diamond moved to `::before` |
| Global — links `a:hover` | Component states | `--accent-hover` and `--accent-2` were **the same hex**, so every inline link's hover state was a no-op | both `#e89154` | **Major** | ✅ `--accent-hover` → `--ember-300`, distinct from `--accent-2` |
| `/about` → "What you won't get here" | Design-language coherence | `.why-card` and `.why-check` are in the JSX with **zero CSS rules**. The icon and copy stacked vertically instead of sitting side-by-side, and the inline `background`/`borderColor` had no box to paint | 0 rules for 2 classes | **Blocker** | ✅ Both components authored; inline styles removed |
| 8 classes across 5 files | Design-language coherence | Shipped in markup, never authored in CSS: `.why-card` `.why-check` `.card-arrow` `.serif-display` `.section-head` `.footer-brand` `.footer-bottom-note` `.wa-form` | 8 orphans | **Blocker** | ✅ All 8 now real components; orphan count is 0 |
| `/about` → `.why-check` | Palette derivation | Inline `rgba(134,18,17,…)` = `#861211` — a colour that exists nowhere in the palette (nearest `--aura #852616`) | `#861211` | **Major** | ✅ Removed; uses `--danger` + `--danger-quiet` |
| Whole stylesheet | Shadow / elevation | **Zero `box-shadow` declarations in 2,154 lines.** No elevation system exists. The sticky header, the `z-index: 96` mobile drawer and a flat body card are all on the same visual plane | 0 shadows | **Blocker** | ✅ 5-rung warm-tinted scale `--e-1…--e-4` + `--e-glow`, assigned by z-order |
| `.card` on `--canvas` | Nested layer / elevation | Card fill is **1.05:1** against the page — cards read as nothing but their hairline | `rgba(255,213,169,.03)` | **Major** | ✅ `--surface-2/-3` introduced; cards carry `--e-1`, raise to `--e-3` on hover |
| `.card.tier-card`, `.card.value-card` | Design-language coherence | `.card` is applied, then fully nullified by the modifier (`background: transparent; border: 0; border-radius: 0`). The base class contributes nothing but padding it then overrides | 2 components | **Minor** | ⚠️ Drop `.card` from these call sites; they are hairline-rule components, not cards |
| Global type | Typography hierarchy | **36 distinct `rem` font-sizes** with no scale. Same semantic rank renders at 1.9rem (`/about`), 1.7rem (`/pricing`), 1.6rem (`/services`), 1.5rem (`/process`) | 36 values | **Blocker** | ✅ 10-step 1.25 minor-third scale `--fs-2xs…--fs-4xl`; ranks unified via `.subsection-title` / `.panel-title` / `.card-title` |
| Global type | Typography hierarchy | **12 font-weights** in CSS (400, 420, 430, 450, 460, 470, 480, 500, 520, 560, 600, 700) plus inline `640` and `660` = 14 | 14 values | **Major** | ✅ 5 rungs: `--fw-body/medium/semibold/bold/display` |
| FAQ, mobile nav, footer links, price rows | Typographic craft | Hover switches roman → **italic**, changing glyph widths and reflowing the text box under the cursor | `font-style: italic` on `:hover` ×4 | **Major** | ✅ Italic removed from hover; colour shift retained |
| Global | Typographic craft | Seven different measures for body copy: 62ch, 68ch, 66ch, 62ch, 56ch, 34ch, and an inline `760px` on three pages | 7 measures | **Minor** | ✅ `--measure: 62ch` / `--measure-tight: 34ch`; `.prose` owns its own cap |
| Display headings | Typographic craft | No `text-wrap: balance`, no kerning/ligature control on a variable optical serif (Fraunces) used at 7.1rem | — | **Minor** | ✅ `text-wrap: balance`, `font-kerning`, `optimizeLegibility` added |
| Global spacing | Spacing system | 34 distinct px values; **13 sit off the 4pt grid** (2, 5, 6, 9, 10, 13, 14, 18, 22, 26, 30, 130) | 13 off-grid | **Major** | ✅ 17-step 4pt scale `--sp-1…--sp-32`; component padding migrated |
| `.page-hero` vs `.section` | Whitespace & density | Inner pages open at 76/60 padding while the home page uses 96/96 — every sub-page feels cramped by comparison, with no rationale | 76px vs 96px | **Major** | ✅ `--sp-22`/`--sp-16` on `.page-hero`, `--sp-24` on `.section` |
| 7 page files | Design-language coherence | **30+ inline `style={{}}` blocks** doing work the stylesheet should own — font sizes, colours, margins, max-widths | 30+ sites | **Major** | ✅ Replaced with named type-rank classes |
| `src/components/icons.tsx` | Iconography | Four stroke weights in one 5-icon set: Check 2.4, Cross 2.6, Spinner 2.5, Arrow 2.0 | 4 weights | **Major** | ✅ All unified to `strokeWidth="2"` |
| Icon call sites | Iconography | Five sizes in use (15, 16, 17, 18, 20) with no scale — a 15px arrow next to a 16px check | 5 sizes | **Minor** | ✅ Collapsed to 16/20 (`--icon-sm/md/lg`) |
| `WhatsAppIcon` | Iconography | Solid-fill glyph sitting inline with four stroke icons; and its counter uses `var(--wa-glyph, #fff)` — a token **defined nowhere**, so it always fell back to pure white | undefined token | **Minor** | ✅ `--wa-glyph: var(--canvas)` defined |
| All icons | Iconography | No baseline alignment rule — icons align to the line box, not the text baseline | — | **Minor** | ✅ `vertical-align: -0.125em` on icon-in-text contexts |
| `.btn:disabled` | Component states | `opacity: .75` reads as enabled, and `cursor: progress` is applied to *all* disabled buttons regardless of cause | `opacity: .75` | **Major** | ✅ `opacity: .5` + `saturate(.4)` + `not-allowed`, sheen suppressed |
| All components | Component states | **25 `:hover` rules vs 1 `:active`, 1 `:disabled`, 2 `:focus-visible`.** Inputs had no hover; index rows, FAQ triggers and cards had no keyboard-visible focus; nav had no current-page state | 25 / 1 / 1 / 2 | **Blocker** | ✅ Full state layer authored; `aria-current="page"` wired into desktop + mobile nav |
| `.btn-ghost`, `.btn-ghost-on-ink` | Button hierarchy | Two near-identical secondary variants and **no tertiary**, so `.u-link`, `.card-arrow` and `.findings-close a` each improvise a text-button style | 4 variants, 0 tertiary | **Major** | ✅ `.btn-quiet` tertiary added; hierarchy now filled → outlined → text, each with its own elevation rung |
| Form inputs, `.btn-ghost`, `.nav-toggle` | Colour & contrast | UI-component borders at 1.59:1 and 1.21:1 — well under the 3:1 required for control boundaries | `--hairline .2`, `--hairline-soft .1` | **Major** | ✅ `--hairline-strong` (3.19:1) on all control borders; decorative rules keep the soft value |
| `--danger #ff6a52` | Colour psychology | Error red sits at hue ~9° — **inside the ember family** (accent 21°). An error message is chromatically indistinguishable from brand decoration | hue 9° vs 21° | **Major** | ✅ Retuned to `#ff5c47` + `--danger-on-ink`; error text now prefixed with a ▲ glyph so it doesn't rely on hue alone |
| Global | Colour psychology | **No `--success`, `--warning` or `--info` tokens exist.** `.form-status-ok` — the success confirmation — was painted in the brand orange `--accent-2` | 0 semantic tokens | **Major** | ✅ `--success #4cc38a`, `--warning #f5b544`, `--info #7cb8e0`, all ≥8.6:1, all outside the ember ramp |
| Global palette | Palette scalability | No ramp of any kind. 18 raw hex + 19 raw `rgba()` scattered through the sheet; the accent appears at `.5`, `.6`, `.75`, `.07`, `.06` alphas as pseudo-shades | 37 one-offs | **Blocker** | ✅ `--ember-50…900` + `--ground-300…900` ramps; **zero raw hex remain outside `:root`** |
| `.section-ink` vs `.cta-full` | Gradient consistency | Same visual role (full-bleed warm band), different recipe: 155deg/3-stop vs 140deg/2-stop | 155° vs 140° | **Major** | ✅ Both use one 155deg/3-stop token chain |
| Ember plate across 4 components | Gradient & saturation | One texture at four opacities — hero `.5`, manifesto `.45`, CTA `.55`, monogram card none — so the same image reads as four different materials | 4 values | **Major** | ✅ Banded to 0.5–0.62 with a documented recipe |
| Ember plate masks | Gradient consistency | Three mask ramps for one treatment: `black 30%/transparent 92%`, `30%/95%`, `25%/90%` | 3 variants | **Minor** | ✅ Normalised |
| **Home hero** | Imagery | **No hero image at all** — the hero reused the small ember plate bottom-left at 50%, while the pinned manifesto below it got the full-bleed smoke treatment. The most important screen had the weakest art direction | — | **Major** | ✅ New `public/textures/hero-smoke.jpg` generated in the same palette and smoke language; 3-layer treatment (image → readability scrim → content) |
| `.monogram-card` vs `.portrait-img` | Imagery treatment | The two states of the same slot are graded differently — the portrait gets `saturate(.85) contrast(1.08) sepia(.12)`, the monogram fallback gets nothing | 1 graded, 1 raw | **Minor** | ✅ Shared grade + radius + `--e-2` |
| Global | Dark/light mode | No `color-scheme` declared. Single-scheme dark product, so the UA paints **light** autofill backgrounds, scrollbars and form controls over the ember ground | missing | **Major** | ✅ `color-scheme: dark` + explicit `-webkit-autofill` override |
| Layout grids | Grid & alignment | Three gutters for one index pattern (`.index-row` 70px, `.why-row` 64px, `.point-list` 24px gap) and three split ratios (`.split` 5/7, `.service-detail-grid` 7/4, `.hero-foot` 7/4) | 3 + 3 | **Minor** | ⚠️ Consolidate to one 64px ordinal gutter and two documented split ratios |
| `.footer-grid` | Grid & alignment | Column fractions `2fr 1fr 1.4fr 1.3fr` — arbitrary decimals that align to no grid | 4 fractions | **Minor** | ⚠️ Move to `3fr 2fr 2fr 2fr` or a 12-col subgrid |
| Global motion | Motion styling | **16 distinct duration/easing pairs** and 4 different cubic-beziers for one product | 16 combos | **Major** | ✅ 4 durations `--dur-1…4` × 4 easings; every transition remapped |
| `.mask-in` vs `.rv` | Motion styling | Two entrance languages on the same screen — the hero rises over 1s on one curve, everything below fades over 0.55s on another | 1s vs 0.55s | **Minor** | ✅ Both mapped to the shared easing set |
| `.nav-toggle` | Touch targets | 42×42 px — 2px under the minimum | `42px` | **Minor** | ✅ `--tap-min: 44px` |
| `.btn-sm` (header CTA) | Touch targets | ≈32px computed height on the primary conversion control | `.6rem` padding, `.72rem` text | **Major** | ✅ `min-height: 40px`, 44px at mobile breakpoint |
| Footer link columns | Touch targets | ~19px tall targets stacked with a 10px gap — mis-taps guaranteed on mobile | ~19px | **Major** | ✅ 44px min-height on all footer links |
| **Header/footer logo vs /about & 404 logo** | Branding | **Two entirely different marks ship as "the logo."** `src/components/logo.tsx` draws a rounded-rect aura tile (`rx=9`) with a flat Z and a dot; `public/images/logo-mark.svg` is the clay ZS monogram. They share no geometry, no corner language and no colour treatment | 2 marks | **Blocker** | ⏸ **Blocked on the source PNG.** Unify to one mark via `logo_replacement.md` once the file lands |
| `LogoMark` dot | Colour & contrast | Accent dot `#DA7134` on the aura tile `#852616` = **2.80:1** — under the 3:1 for a meaningful graphic element | 2.80:1 | **Minor** | ⏸ Held with the logo unification — not changing brand geometry before the real artwork arrives |
| `LogoMark` tile | Border radius | Logo tile is `rx=9` while `--radius` is 2px — the mark's corner language contradicts the entire UI | 9px vs 2px | **Minor** | ⏸ Held with the logo unification |
| `layout.tsx` `themeColor` | Branding | `"#2A0001"` uppercase vs `--canvas: #2a0001` lowercase — the browser-chrome colour is a hand-copied literal, not a token read | case drift | **Minor** | ⚠️ Trivial, but it's a second source of truth for the brand ground |
| Responsive | Responsive behaviour | Only two breakpoints (1020, 760) for an 1180px container. Nothing governs 760–1020, where `.hero-title`'s `11.5vw` produces ~87–117px type against 20px gutters | 2 breakpoints | **Major** | ⚠️ Add a ~900px step and reduce the hero `vw` coefficient in that band |
| `.scroll-timeline` under 1020px | Responsive behaviour | Markers are hidden but the rail, track and fill remain — a decorative 3px stripe with no function | `display: none` on markers only | **Minor** | ⚠️ Hide the whole rail, or keep the fill as an intentional progress bar |
| Border radius | Radius consistency | Single 2px rung, hardcoded in `.skeleton` and `:focus-visible` rather than tokenised, with several components forcing `border-radius: 0` | 1 rung | **Minor** | ✅ 3-rung scale `--r-sm/md/lg`; hardcodes replaced |
| Colour proportion | Colour theory & harmony | The palette is a **monochromatic-analogous** warm scheme (every hue 8°–25°) — a defensible, deliberate choice for "forged / audited / editorial." But it had no proportion discipline: the accent appeared at five alphas as improvised shades, so the 60-30-10 read collapsed into a single orange smear | hues 8–25° | **Major** | ✅ Proportion now enforced by structure: `--ground-*` is the dominant 60%, `--text/--text-2` the 30%, `--ember-500` reserved as the 10% accent, semantics outside the ramp entirely |

---

## Systemic patterns

These are the repeats — the things that show up on many screens and reveal how the system was
built, rather than one-off slips.

1. **No token layer existed.** Colour, type, space, radius, motion and elevation were all
   authored as literals at the point of use. 37 one-off colours, 36 font sizes, 34 spacing
   values, 16 motion pairs. Every other pattern below is downstream of this one.

2. **Hover was treated as the whole state model.** 25 `:hover` rules against 1 `:active`,
   1 `:disabled` and 2 `:focus-visible`. The product was designed for a mouse pointer at rest —
   keyboard users got almost nothing, and pressed/disabled feedback barely existed.

3. **Contrast fails cluster on the warm mid-tones.** Every AA failure came from the same
   move: taking an ember colour and lowering its alpha to suggest hierarchy. On a dark ground
   that destroys luminance fast. Six components did it independently.

4. **The ink band was never tested as a background.** `.section-ink` and `.cta-full` inherited
   foreground colours tuned for `--canvas`. Four separate foregrounds failed on the light
   gradient stop — nobody re-checked the pairs after changing the ground.

5. **CSS and JSX drifted apart.** Eight classes shipped in markup with no rules behind them,
   twelve rules existed with no markup using them, and 30+ inline `style` blocks papered over
   the gap. `/about`'s "What you won't get here" section rendered visibly unstyled in production.

6. **Depth was expressed only as hairlines.** With zero shadows, layering was communicated
   entirely by 1px borders at 10–20% alpha. Stacked contexts (header over content, drawer over
   overlay, card over section) were flat and, in the case of `.card` at 1.05:1, nearly invisible.

7. **Same rank, different value, per page.** Section headings, index gutters, split ratios,
   ember opacity and page padding each had 3–4 competing values chosen per screen. The system
   was re-decided every time someone opened a new file.

8. **Semantics were borrowed from the brand.** Success used the brand orange, error used a
   near-brand red, and warning/info didn't exist. Status could not be read by hue.

---

## Prioritised fix order

**Blockers — ship-stopping**

1. Author the token layer (colour ramps, type scale, spacing, radius, motion, elevation) ✅
2. `/about` "What you won't get here" renders unstyled — 8 orphan classes ✅
3. WCAG AA failures: `.ph-no` 2.82, placeholders 2.78, `.idx-no` 2.35, four foregrounds on the ink band ✅
4. Elevation system — zero shadows in the entire product ✅
5. Component state layer + keyboard focus ✅
6. `.tl-marker` 8×8px touch target ✅
7. Type scale — 36 sizes, 14 weights ✅
8. **Two different logos shipping as one brand** ⏸ *blocked on the source PNG*

**Major**

9. Semantic colour tokens; success no longer painted brand-orange ✅
10. `--accent-hover` === `--accent-2` (dead link hover) ✅
11. UI-component borders below 3:1 ✅
12. Hero had no hero image ✅
13. Gradient/opacity/mask recipe unification ✅
14. `color-scheme: dark` + autofill ✅
15. Touch targets: header CTA, footer links, nav toggle ✅
16. Italic-on-hover reflow ✅
17. Motion consolidation ✅
18. Disabled state reading as enabled ✅
19. Button hierarchy — add tertiary ✅
20. Off-grid spacing + page-hero density ✅
21. Icon stroke-weight drift ✅
22. Breakpoint gap at 760–1020px ⚠️ *needs a layout decision*

**Minor**

23. `.card` + modifier double-styling ⚠️
24. Index gutters / split ratios / footer fractions ⚠️
25. Scroll-timeline rail below 1020px ⚠️
26. `themeColor` literal vs token ⚠️
27. Logo dot contrast + `rx=9` corner language ⏸ *with the logo unification*

---

## Scores

Every audited element, not only the broken ones. Scores are **post-fix**; the parenthetical is
the pre-audit score where it differed.

| Element/Component | Score (/10) | Why it lost points |
|---|---|---|
| Colour palette & contrast | 9 (3) | All 38 computed pairs pass. −1: `--hairline` at 2.04:1 is still load-bearing on card frames; it's decorative-only by policy, but the policy lives in a comment, not in code |
| Colour theory & harmony | 9 (6) | Monochromatic-analogous scheme is deliberate and now proportioned. −1: an 8°–25° hue range gives the semantic colours nowhere friendly to sit — success green is correct but will always feel like a guest |
| Colour psychology & semantic fit | 9 (3) | Forged-metal warmth genuinely fits "audit-led, evidence over promises." −1: `--danger` still lands within ~12° of the accent; mitigated by the ▲ glyph rather than solved chromatically |
| Palette scalability & derivation | 10 (2) | 50–900 ember ramp + 300–900 ground ramp; zero raw hex outside `:root`; a machine-checkable gate in `scripts/check-contrast.mjs` |
| Gradient & saturation consistency | 9 (4) | One angle, one stop chain, one opacity band. −1: the ember and smoke plates are two source images doing one job; a single plate family would be cleaner |
| Nested layer / elevation contrast | 9 (2) | Full stacks traced; no collapse points remain. −1: `--surface` at 1.05:1 still exists as a token, kept for the lightest wells — easy to misuse |
| Typography hierarchy | 9 (3) | 10-step scale, 5 weights, ranks unified across all 13 routes. −1: Fraunces optical sizing (`opsz`) is available on the variable font and still unused at display sizes |
| Typographic craft | 8 (4) | Kerning, ligatures, balance and a single measure are in. −2: no explicit letter-spacing compensation on the 7.1rem hero (large optical serif wants tighter tracking than −0.028em), and the italic display face pairs with Inter by contrast rather than by any documented logic |
| Spacing & padding system | 9 (4) | Strict 4pt scale, 17 rungs, off-grid values eliminated from the token layer. −1: a handful of component-local values were migrated by mapping to the nearest rung rather than being re-designed |
| Border radius consistency | 9 (6) | 3 rungs, tokenised, hardcodes removed. −1: the logo's `rx=9` still contradicts the 2px language — held pending the real artwork |
| Iconography | 9 (4) | One stroke weight, 2 sizes, baseline-aligned. −1: WhatsApp remains a solid-fill glyph among stroke icons — it's a third-party brand mark, so this is a defensible but real inconsistency |
| Button hierarchy | 9 (5) | Primary/secondary/tertiary now differ by fill, border, elevation and weight — not colour alone. −1: `.btn-ghost` and `.btn-ghost-on-ink` remain two classes for one concept |
| Component visual states | 9 (2) | Default/hover/pressed/focus/disabled authored per component type; `aria-current` wired. −1: no loading state for anything except the form submit button |
| Grid & alignment | 7 (6) | Container, gutters and section rhythm are consistent. −3: three index gutters, three split ratios and arbitrary footer fractions are all still live — reported, not fixed, because consolidating them changes layout |
| Shadow/elevation & depth | 9 (1) | 5 rungs, warm-tinted so shadows belong to the palette, assigned by z-order. −1: `--e-glow` mixes a ring and a shadow in one token, which will get misused |
| Imagery/photo treatment | 9 (4) | New hero plate in the same palette and smoke language; shared grade, radius, opacity band and mask recipe. −1: zero real photography exists yet — `portrait.jpg` is still a fallback path |
| Dark/light mode consistency | 9 (5) | Single-scheme dark, now *declared* — autofill, scrollbars and controls no longer paint light. −1: single-scheme is a legitimate choice but it is nowhere written down as one |
| Responsive/adaptive behaviour | 7 (6) | Layouts hold at the two authored breakpoints; nothing clips or overlaps. −3: the 760–1020px band is ungoverned and the hero's `11.5vw` is at its worst there; the timeline rail persists without markers |
| Whitespace & density balance | 8 (5) | Page-hero/section rhythm unified; density is now a token decision. −2: `/pricing` and `/services/[slug]` still run dense next to a sparse `/about`, and negative space is inherited from the grid rather than composed |
| Branding consistency | 4 (4) | **Two different marks ship as the logo.** Wordmark, colour application and brand voice are otherwise consistent across all 13 routes. Cannot be resolved without the source artwork |
| Motion/animation styling | 9 (4) | 4 durations × 4 easings, everything remapped, reduced-motion respected throughout. −1: the `.btn::before` sheen sweep is a different animation idea from every other transition in the system |
| Touch target sizing | 9 (3) | 44px minimum enforced on markers, toggle, nav, footer links and buttons. −1: `.btn-sm` sits at 40px on desktop by deliberate exception, which is a rule with a hole in it |
| Overall design-language coherence | 8 (3) | It now reads as one system: one ramp, one scale, one grid, one motion set, one elevation model, and the CSS/JSX seam is closed. −2: the two-logo problem is a visible seam on the most brand-critical element, and the grid inconsistencies are known-but-unfixed |
| **Hero (home)** | 9 (4) | Real hero plate, 3-layer treatment, guaranteed AA regardless of image. −1: `11.5vw` type is fragile in the mid band |
| **Pinned manifesto** | 9 (8) | The strongest piece of art direction in the product — pinned scrub, full-bleed smoke, oversized Fraunces. −1: opacity was one of four competing values before normalisation |
| **Site header** | 9 (6) | Sticky, elevated, blurred, current-page state, 44px targets. −1: `.btn-sm` exception |
| **Mobile menu** | 9 (6) | Highest surface gets the strongest shadow; overlay blurs; current-page state; 44px rows. −1: no staggered entrance for the nav items, so it opens flatter than the rest of the product moves |
| **Site footer** | 8 (4) | Orphan classes authored, targets fixed, tokens applied. −2: arbitrary column fractions remain |
| **Index rows** (`.index-row`) | 9 (6) | The best component in the system — genuinely the "anti-card." Now has focus, active and AA-safe numerals on both grounds. −1: gutter differs from `.why-row`'s |
| **Cards** (`.card` family) | 8 (3) | Real fill, real elevation, real hover/focus/active. −2: the base-class-then-nullify pattern is still live in two modifiers |
| **Forms** (`.wa-form`, `.field`) | 9 (3) | Root class authored, AA placeholders, 3:1 borders, full state set, autofill handled, non-chromatic error affordance. −1: no inline success state per-field |
| **FAQ accordion** | 9 (6) | Focus, active, open state, rotating icon, tokenised panel motion. −1: the `+`/`–` glyph swap plus a 180° rotation is two ideas doing one job |
| **Scroll timeline** | 8 (3) | 44px targets, AA-safe rail, elevated tooltip, focus ring on the diamond. −2: below 1020px it degrades to a decorative stripe |
| **Buttons** | 9 (4) | Three real levels, five states each, elevation-differentiated, AA in every state including pressed. −1: sheen animation is off-system |
| **CTA band** | 9 (5) | Unified gradient recipe, smoke plate, AA-safe on all three stops. −1: shares its recipe with `.section-ink` but is a separate component, so they can drift again |
| **Marquee** | 8 (7) | Clean, slow, tokenised, static under reduced motion. −2: 42s is an untokenised magic number and the `✦` divider is the only decorative glyph in the product |
| **404 page** | 9 (6) | Status chip now has an AA border and a quiet fill; `.serif-display` is real. −1: uses the monogram that doesn't match the header mark |
| **Logo / brand mark** | 4 (4) | Two different marks; accent dot at 2.80:1; `rx=9` against a 2px system. Blocked on the source file |

---

## Verification

```bash
node scripts/check-contrast.mjs   # 38/38 pairs pass, exits non-zero on regression
npm run build                     # 25/25 static pages
```

**Post-fix state:** 0 orphan classes · 0 raw hex outside `:root` · 0 WCAG AA failures across
38 computed pairs · 5-rung elevation scale · 10-step type scale · 17-step 4pt spacing scale ·
4×4 motion matrix · 44px minimum touch target.

**Outstanding and blocked:** the two-logo problem (⏸ needs `public/images/source-logo.png`),
the 760–1020px breakpoint band, and the grid-fraction consolidation (⚠️ both need a layout
decision rather than a token change).
