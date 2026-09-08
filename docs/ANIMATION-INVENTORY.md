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

6.8. **GradientWaves (React Bits, tailored) — "ember dunes" in the ink close** — Phase 1: the `.cta-full` room on all 7 page groups breathes clay-rust dunes (horizon `#7a2e18`, graphite bodies, copper `#da7134` crests) rising from the bottom edge under a fade mask. The site's **one sanctioned ambient room** (see the Ambient Quota in MOTION-RULES): speed 0.16, opacity 0.55, `detail: low`, DPR ≤1.5, ogl dynamically imported (never on the critical path), pauses off-screen + hidden tabs, reduced motion = a single still frame, parallax listeners on the section (fine pointers only), silent bail without WebGL2. Direction variants (top/side flips) live in CSS if ever needed.

6.5. **BorderGlow (React Bits, tailored)** — pointer-reactive clay border on the three fillable cards (contact form, free-audit form, the brief). Copper glow `"22 66 58"` + copper→rust→clay mesh ramp replace the neon defaults; radius from the house `--radius` token; reveal/collapse on `--dur-2/--dur-4`; rAF-throttled pointer work, never attached on touch; intro sweep compressed to ~1.5s and skipped under reduced motion; **`:focus-within` keyboard parity** added (upstream has none). Styles in `globals.css` ("BORDER GLOW" section).

1. **Cursor aura** — difference-blended dot + trailing ring (`motion/pointer.ts`). Native cursor never hidden; `(hover)+(fine)` + reduced-motion gated; grows on interactive elements, presses on click.
2. **Magnetic CTAs** — `[data-magnetic]` on the header CTA, hero CTA and CTA-band actions; ≤12px pull, `gsap.quickTo`, elastic release.
3. **Marquee velocity skew** — the proof band bends up to ±8° with Lenis scroll velocity and self-settles; **plus WCAG 2.2.2 hover/focus pause**.
4. **Plaque pan** — hanging artworks drift ±2.2% toward the cursor with pointer-following transform-origin; pure-CSS fallback.
5. **Page-hero entrance** — inner routes (services, about, pricing, process…) now get a staggered masked-rise on first paint; `from`-only keyframes + `backwards` fill so the `page-leave` scrub stays boss.
6. **Logo draw** — the S strokes draw once on load (pathLength-normalized), Z fades in; header only.

Rules ledger for all of the above: `docs/MOTION-RULES.md` (NN/g durations, Material 3 tokens/easing, WCAG 2.2.2/2.3.3, Apple HIG, Refactoring UI transform-only).

### Shipped (v3 — React Bits, this branch)

Zero new dependencies; zero new ambient loops. Every addition is input-driven (wheel/pointer/focus) or one-shot.

7. **ScrambleText (React Bits, tailored)** — eyebrows, home section labels and the CTA plate decode like a diagnostic readout: code-glyphs churn, the real text settles left-to-right, once per entry. SSR renders final text (SEO/no-JS safe); rAF loop with no dep (upstream uses gsap); skipped under reduced motion. Closes Tier 2 item 10 in adapted form — one-shot on entry rather than scrubbed, since churned text-content can't reversibly scrub.
8. **ShinyText (React Bits, tailored)** — the CTA-band headline carries a copper sheen sweep, one sweep per viewport entry (reversible, like Reveal). CSS-only (`background-clip: text`, no motion dep); `.is-live` is added client-side only, so no-JS and reduced-motion readers keep plain bone text.
9. **SpotlightCard (React Bits, tailored)** — a clay spotlight follows the cursor across `[data-spotlight]` rows and cards (service + note index rows, contrast rows, phases, pricing tiers, about cards). One delegated pointermove feeds element-relative % coords; the fade rides `--spot-o`, so `:hover`, `:focus-within` and `:focus-visible` share one path; no-JS still gets a centred hover wash.
10. **CircularText (React Bits, tailored)** — the hero floor becomes a museum seal (*"This way · Scroll ·"*) whose ring is **cranked by the wheel**: hero-converge scrubs it 0→300°, then it bows out before the handoff. A reel, not a spinner — costs nothing from the ambient quota.
11. **StarBorder (React Bits, tailored)** — a molten copper star orbits the primary CTA edge on hover/focus only (`@property --star-angle`, 2.6s orbit, masked 1.5px hairline). Rest state is the untouched house button; no idle loop; hidden under reduced motion.
12. **TiltedCard + GlareHover (React Bits, tailored)** — the about portrait/monogram eases ±5° toward the cursor (upstream tilts ±15°) with a warm travelling glare. JS writes custom properties only; the settle rides the token `--dur-2` transition.

Rules ledger for v3: `docs/MOTION-RULES.md` §2 (v3 rows) + §4 (rejected-bits rationale).

### Shipped (v4 — React Bits: the full menu, this branch)

Seventeen more bits, one commit each (see history `v4: *`). Same v3 contract: zero new dependencies, zero new ambient loops — input-driven or one-shot, every addition reduced-motion safe.

13. **BlurText (React Bits, tailored)** — every Reveal rise now lands focus with it (blur 6px→0 on `--dur-4`). The class is only added client-side, so no-JS/reduced readers never meet a blurred pixel.
14. **StarBorder on the header CTA** — the v3 molten orbit, extended to the one button that was missing it.
15. **AnimatedList (React Bits, tailored)** — `[data-stagger]` checklists/point-lists land in reading order, 70ms apart (process deliverables, service `included`, free-audit points). nth-child delays + the existing Reveal observer; no motion dep.
16. **ChromaGrid (React Bits, tailored)** — plaque artwork rests at saturate(.6) and wakes to full color on hover; reduced motion pins the classic grade.
17. **DirectionalHover (React Bits, tailored)** — plaque captions flinch away from the arriving cursor (±10px by entry vector) and ease home on `--dur-3`. No overlay redesign — the caption keeps its seat below the frame.
18. **ScrollReveal (React Bits, tailored)** — storytelling prose (service + note details, about) resolves word-by-word up the viewport, scrubbed per paragraph. Legal/pricing prose excluded by policy.
19. **Frozen DotGrid (React Bits, tailored)** — a static hairline graph behind the website-audit and free-audit heroes. Zero motion, zero quota: paper, like the grain.
20. **ScrollVelocity (React Bits, tailored)** — the marquee abandons CSS keyframes for a Lenis-fed ticker once the pointer layer boots: 42s base pace, up to ~4x with wheel velocity, decayed. Keyframes stay the no-JS/touch path; hover/focus parks it (2.2.2).
21. **ClickSpark, rehabilitated (React Bits, tailored)** — one clay tick (ten sparks, ~220ms, slight gravity) on CTA/chip/slider press. Canvas below the aura; the rAF loop parks when the last spark dies.
22. **TargetCursor (React Bits, tailored)** — clay corner-brackets snap around the control under the cursor (240ms chase), skipping full-width rows and regions. Parks on scroll, re-acquires on hover; native cursor untouched.
23. **Crosshair (scoped diagnostic)** — clay crosshair trails the cursor, armed ONLY over heroes (`.hero-minimal`, `.page-hero`), bowed out everywhere else. Lerped, transform-only, under the header.
24. **GradualBlur, stilled (React Bits, tailored)** — soft blur pooled at the viewport edges (13vh, 9px). No loop, no JS: desktop fine-pointer only, never under reduced motion, graceful where backdrop-filter no-ops.
25. **TextPressure (React Bits, tailored)** — home display headings swell toward the pointer on the Fraunces variable wght axis (400→720, 170px radius, 20-step quantization). Weight-only (kerning preserved), IO-gated, teardown unwraps the chars.
26. **RotatingText, landed (React Bits, tailored)** — the services hero corrects itself once per entry (*hunches. → vibes. → evidence.*) and rests on the final. SSR/SEO see `evidence.`; reduced motion sees it statically.
27. **Stepper (React Bits, tailored)** — the process page walks a sticky rail: fill + lit ticks derived from scroll progress (recognize-room pattern), past numbers clayed. Rail hides on mobile; steps never do.
28. **ScrollStack (React Bits, tailored)** — the eight website-audit checks fan into sticky cards (30px seats, pure CSS so no-JS/reduced get the deck); covered cards settle to 0.93, scrubbed, desktop only.
29. **ElasticSlider (React Bits, tailored)** — the brief's budget chips graduate to a five-stop PKR slider: spring fill (one overshoot), readout pop, tick scale. Native range (keyboard/touch/SR intact); `unsure` stays a chip because it is not a magnitude.

Rules ledger for v4: `docs/MOTION-RULES.md` §2 (v4 rows). Still waiting on content: case-study galleries, honest metrics, the portrait, client logos (#18–21 in the v4 proposal).

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
