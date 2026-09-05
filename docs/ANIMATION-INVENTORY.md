# Animation Inventory — Zarrar.Solutions

Audited: `src/motion/*`, `src/components/*`, `src/app/globals.css`.

**Motion philosophy in one line:** the homepage is a gallery *walk* — almost nothing plays on a timer; scenes scrub with the wheel, stop when you stop, and unwrite when you scroll back.

**Stack:** GSAP + ScrollTrigger + MotionPathPlugin, Lenis smooth scroll, IntersectionObserver, native CSS (incl. `animation-timeline: view()` progressive enhancement). Zero UI libraries. Dynamically imported so no-JS crawlers get static HTML.

---

## 1 · Core motion infrastructure

| Piece | File | What it does |
| --- | --- | --- |
| Lenis smooth scroll | `motion/engine.ts` | 1.32s settle, quartic ease-out, wheel ×0.88, anchor-scroll integration, ScrollTrigger tied to Lenis's rAF |
| Motion boot | `components/motion-root.tsx` | Dynamic `import()` of the engine — motion JS never blocks first paint |
| Scene storyboard | `motion/wireframes.ts` + `play.ts` | Declarative scene list → GSAP timelines; mobile shortens pins (×0.65) and scrubs |
| Reduced motion | `engine.ts` + 6 CSS blocks | Skips Lenis + every scene; CSS zeroes all keyframes/transitions |
| Navigate-safe cleanup | `engine.ts` | Capture-phase click listener kills pins *before* React swaps the page subtree |

---

## 2 · Home page scenes (all scroll-scrubbed, all reversible)

### `hero-converge` — the opening (`motion/hero.ts`)
- Pinned ~220% (150% mobile), scrub 0.9 (0.5 mobile), MotionPathPlugin.
- 1. Hero type cluster dissolves: `y -64, scale .72, blur 12px`; toolbar + floor fade.
- 2. Isolated `<` and `>` rise along **mirrored arcs** from the lower screen edges (`curviness 1.35`), rotating to upright.
- 3. The slash resolves them into `</>` (`scaleY .2→1, rotate 14→0`).
- 4. Loading line fills (`scaleX 0→1`) with a live 0→100 counter, then hands off to Lenis (`motion:scrollTo`).

### `walk-*` — the room-to-room ground shift (`motion/walk.ts`)
- Page background color morphs between rooms (putty → bone → ink), one scrubbed tween per section. Rooms never fade as layers — only the canvas changes.

### `proof-rail` — the four promises (`motion/wireframes.ts`)
- Rail rules draw (`scaleX`), dividers grow (`scaleY`), logo mark flies in from `x22 y-12 scale1.55`, kicker rises, `h2` clip-path wipe `inset(100%→0)`, index + headings + copy staggered in.

### `recognize-room` — the diagnostic scan (`motion/recognize.ts`)
- 320vh section, CSS-sticky stage (no GSAP pin). Master scrubbed timeline:
- **Phase 1 (0–10%):** room assembles — heading rises, rule draws, `em` clip-path wipe, clay underline `scaleX`, lede rises.
- **Phase 2 (10–96%):** six findings cycle — each card crossfades in/out with `y ±20`, a **clay beam sweeps across** (`x: 0 → row width`) while the card's title/body wipe in behind it via `clip-path`.
- **Phase 3:** the scan rail is *derived state, not tweens* — progress fill `scaleY`, traveling dot, ticks lighting up, 01→06 counter, `is-complete` — recomputed from scroll progress in `onUpdate` so it's exact in both directions.

### `exhibit-pin` + `exhibit-breathe` — the pause room (`motion/exhibit.ts`)
- Painting **breathes**: scale 1.08 → 1.18 → 1.06 across the pin (wheel-tied — stop and it rests).
- Notch card lands (`y48, scale .95`), then drifts up `y -14` as counter-motion.
- **Typewriter** writes the title, then the body, with a blinking caret (`.is-typing`); scroll link fades in late.

### `plaque-room` — three hanging plaques (`motion/plaques.ts`)
- Label + title lead by one beat; each circular plaque **drops from a nail** (`y −56`, hang angles −5°/4°/−4°), settles with a tiny opposite tilt, then straightens. Rewinds with the wheel.

### `contrast` — usual vs here
- Section title rises; each contrast row dissolves in (`y28, opacity .16→1`), staggered ×0.07.

### `next-steps` — three columns
- Title rise + three `.phase` columns rise staggered ×0.08.

### `manifesto-write` — the note (`motion/manifesto.ts`)
- CSS sticky holds the folio; each line **typewrites sequentially** on the wheel (durations derived from text length), un-writes on scroll-back.
- The write **owns the hold**: starts as the room settles into the pin, ends with a clay **sign-off rule** drawing under *"We'll meet you there."* — the closing beat — with ~25vh of settled hold left as a breath before release (v2 retiming; previously ~150vh of the hold was dead air).

### `brief-last` — the last room
- Intro + qualify card rise in (`y 32/40`, opacity fade).

---

## 3 · Every route

| Scene | What it does |
| --- | --- |
| `page-leave` | Inner-page hero `h1` thins (`y −24, opacity → .28`), lede fades to 0.2 as the walk starts |

---

## 4 · CSS keyframe animations (`globals.css`)

| Keyframes | Used by | Detail |
| --- | --- | --- |
| `rise` | Home hero title | Masked line reveal — `translateY(112%) → 0`, 4 lines staggered 80ms, emphatic ease |
| `marquee` | Proof marquee band | 42s linear infinite, `translateX(-50%)` loop, static under reduced motion |
| `livePulse` | Availability dots | `scale 1→1.15` + opacity breath, 2.2s infinite |
| `shimmer` | Hairline dividers | Gradient sweep `translateX(-100%→100%)`, 1.4s |
| `manifestoIn` | Manifesto lines | **Scroll-driven native CSS** — `animation-timeline: view()`, staggered `animation-range`s. Zero-JS progressive enhancement; JS fallback below |
| `spin` | Form submit buttons | 0.8s loading spinner |
| `type-caret` | Typewriter carets | `step-end` blink 0.72s (▍) |

---

## 5 · Micro-interactions (CSS transitions — 41 declarations, 47 `:hover` rules)

- **Buttons:** `translateY(-1px)` hover lift, press-back, color/background shifts; ghost/primary/light variants.
- **Cards:** `.card-hover` lift + shadow; service/index rows.
- **Links:** `.u-link` underline draw via `::after` scaleX; color transitions.
- **FAQ accordion:** `grid-template-rows` 0.26s expand/collapse, one open at a time.
- **Mobile menu:** transform/opacity transitions.
- **Teardown bars:** `width` 0.7s cubic-bezier morph when switching metrics.
- **Reveal (`components/reveal.tsx`):** IntersectionObserver fade/slide-up (`y16`), **reversible** — toggles out when you scroll past, so re-entering re-plays.

---

## 6 · Component-level JS motion

| Component | Motion |
| --- | --- |
| `route-progress.tsx` | 2px teal bar sweeps on route change; completes when new route renders |
| `scroll-timeline.tsx` | Right-edge rail **replacing the native scrollbar**: progress fill + diamond section markers, rAF-throttled, click-to-jump through Lenis |
| `teardown.tsx` | Metric-switch bar morphs (CSS transition driven by state) |
| `faq.tsx` | Accordion with `aria-expanded` + grid-rows animation |
| `mobile-menu.tsx` | Transform/opacity panel transitions |

---

## 7 · Level-up recommendations

### Shipped (v2 — this branch)

6.75. **ParticleText (React Bits, tailored) — the 404 room** — the page that "failed its audit" literally fails to resolve: ink particles scatter, gather into *"This page failed its audit."* over ~800ms once per visit, then the rAF loop **parks itself** (the house amendment — upstream ran forever). Cursor repel is input-driven; reduced motion draws one static frame; no-JS/crawlers get the real `<h1>`; `touch-action: pan-y` keeps phone scroll native. Canvas is `aria-hidden` decorative — semantics stay in the page.

6.5. **BorderGlow (React Bits, tailored)** — pointer-reactive clay border on the three fillable cards (contact form, free-audit form, the brief). Copper glow `"22 66 58"` + copper→rust→clay mesh ramp replace the neon defaults; radius from the house `--radius` token; reveal/collapse on `--dur-2/--dur-4`; rAF-throttled pointer work, never attached on touch; intro sweep compressed to ~1.5s and skipped under reduced motion; **`:focus-within` keyboard parity** added (upstream has none). Styles in `globals.css` ("BORDER GLOW" section).

1. **Cursor aura** — difference-blended dot + trailing ring (`motion/pointer.ts`). Native cursor never hidden; `(hover)+(fine)` + reduced-motion gated; grows on interactive elements, presses on click.
2. **Magnetic CTAs** — `[data-magnetic]` on the header CTA, hero CTA and CTA-band actions; ≤12px pull, `gsap.quickTo`, elastic release.
3. **Marquee velocity skew** — the proof band bends up to ±8° with Lenis scroll velocity and self-settles; **plus WCAG 2.2.2 hover/focus pause**.
4. **Plaque pan** — hanging artworks drift ±2.2% toward the cursor with pointer-following transform-origin; pure-CSS fallback.
5. **Page-hero entrance** — inner routes (services, about, pricing, process…) now get a staggered masked-rise on first paint; `from`-only keyframes + `backwards` fill so the `page-leave` scrub stays boss.
6. **Logo draw** — the S strokes draw once on load (pathLength-normalized), Z fades in; header only.

Rules ledger for all of the above: `docs/MOTION-RULES.md` (NN/g durations, Material 3 tokens/easing, WCAG 2.2.2/2.3.3, Apple HIG, Refactoring UI transform-only).

### ⏳ Waiting on case studies (deliberately not built yet)

- **Case-study deck** — pinned horizontal gallery room (the fake-pin pattern is ready for it the moment the first study lands).
- **Odometer number counters** — will pair with real audit metrics. (`Teardown` exists but is currently unreferenced; wire it into a page when the numbers are real.)

### Tier 2 — next candidates

7. **Footer curtain reveal** — `position: fixed` footer under the last room. Deferred: needs a layout audit across all 10+ routes first.
8. **Extend `animation-timeline: view()`** — replace several `Reveal` IO observations with zero-JS view timelines (the manifesto already ships the pattern + fallback).
9. **Parallax depth in the plaque/exhibit rooms** — ±10–20px differential `y` inside existing scrubbed timelines.
10. **Text decode/scramble on mono kickers** — glyph noise → text, scrubbed.
11. **Directional hover for gallery/plaque captions** — cursor-following caption offsets.

### What *not* to add
- Timer-based entrance animation libraries (AOS-style) — they'd fight the wheel-tied identity.
- Scroll-hijack beyond the existing pins — the walk is already assertive.
- Parallax on text — the typography is the product; keep it on the baseline.
- More ambient loops — `livePulse`, marquee and shimmer are the right amount of idle life.

---

*Reduced-motion contract to keep: every addition above must either be scrubbed (auto-off via the engine's reduced boot) or gated behind a `prefers-reduced-motion` media query — same as the existing seven layers.*
