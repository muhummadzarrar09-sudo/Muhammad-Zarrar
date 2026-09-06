# Motion Rules — the compliance sheet

Every motion decision in this repo is checked against published rules from
the major design systems and the researchers the design community (GitHub
guideline repos, design newsletters) keeps citing. This file maps each
effect → rule → source, so future additions inherit the discipline instead
of reinventing it.

The one-line version: **transform/opacity only, 100–500ms for feedback,
input-driven for flourish, nothing without a reduced-motion path, native
cursor always wins.**

---

## 1 · The rulebook (and who publishes it)

| Rule | Source | How this repo honors it |
| --- | --- | --- |
| Most UI animation: **100–500ms**; feedback ~100ms; big moves up to 400ms; past 500ms feels like delay | NN/g, *"Executing UX Animations: Duration and Motion Characteristics"* (nngroup.com/articles/animation-duration) | State tints `--dur-1` 120ms, controls `--dur-2` 200ms, panels `--dur-3` 320ms, entrances `--dur-4` 560ms. The scrubbed homepage walk is exempt by design: it is input-driven (wheel), not timed — the same exemption NN/g gives pointer-dragged motion |
| **Motion tokens** (named durations + easings), not one-off values — the pattern Material 3, IBM Carbon, Microsoft Fluent and Shopify Polaris all publish | Material 3 motion tokens (m3.material.io/styles/motion); Fluent/Carbon/Polaris token sets | `:root` holds `--dur-1..4` + `--ease-standard/entrance/exit/emphatic`. Nothing below the token block may invent a raw duration or bezier (enforced by the CSS header comment contract) |
| **Easing = physics intent**: decelerate for entrances, standard for moves, no bounce on functional UI | Material 3 easing & duration | Entrances use `--ease-entrance`/`--ease-emphatic` (decelerate family); exits use `--ease-exit`; elastic settle allowed only on the magnetic hover release (a flourish, not a functional state change) |
| **Transform & opacity only** — never animate layout properties (top/left/width/margin) | Refactoring UI (Wathan & Schoger); Material 3 "state layers" perf guidance; web.dev rendering perf | Audit: every keyframe/transition animates transform, opacity, clip-path, background-color or stroke-dashoffset. The FAQ accordion animates `grid-template-rows` — the one sanctioned exception (kept, it's the modern replacement for height hacks and doesn't trigger per-frame layout of the page) |
| **Respect `prefers-reduced-motion`** — collapse or remove non-essential motion | WCAG 2.3.3 (Animation from Interactions); Apple HIG "Reduce Motion"; MDN | Seven enforcement points: engine boots a reduced mode (no Lenis, no scenes), plus CSS blocks that zero keyframes/transitions. Every v2 addition (aura, magnetic, skew, pan, hero entrance, logo draw) has its own gate |
| **Auto-moving content must be pausable** (>5s, moving, parallel content) | WCAG 2.2.2 *Pause, Stop, Hide* | The marquee: pauses on hover and on focus-within; `aria-hidden` + duplicated-row pattern; static under reduced motion |
| **Never hide the native cursor** | Apple HIG (pointer affordance); NN/g usability of custom cursors | The aura is a *follower* (difference-blended dot + ring). `cursor: none` appears nowhere in the codebase |
| **Animation must never block input** | NN/g (animation don'ts); Material 3 | All v2 effects are `pointer-events: none` listeners or passive; no effect delays a click, submit or navigation |
| **Consistency: document the motion system** | designsystems.com "5 steps for including motion design in your system"; Google's material GitHub practice | This file + `docs/motion-wireframes.md` + `docs/ANIMATION-INVENTORY.md` + the storyboard-as-code (`src/motion/wireframes.ts`) |

## 2 · v2 effect-by-effect compliance

| Effect | File | Timings | Guards |
| --- | --- | --- | --- |
| Cursor aura (dot 0.55 lerp, ring 0.16 lerp) | `motion/pointer.ts` | Input-driven — no duration; opacity fade 320ms (`--dur-3`) | `(hover) + (pointer: fine)`; reduced motion; native cursor untouched; `pointer-events: none` |
| Magnetic CTAs (`[data-magnetic]` ≤12px) | `motion/pointer.ts` | Follow 360ms `power3.out` (inside NN/g window); release 500ms elastic (flourish tier) | Fine pointer only; skipped on touch; transforms only via `gsap.quickTo` |
| Marquee velocity skew (±8° max) | `motion/pointer.ts` | Lerp 0.12, decay ×0.9 — tracks scroll velocity, self-settles | Fine pointer; band pauses on hover/focus (2.2.2); transform on the band, keyframes untouched |
| Plaque pan (±2.2% drift, scale 1.045) | `motion/pointer.ts` + CSS | 500ms `--ease-entrance` transition | `(hover) + (pointer: fine)`; CSS-only fallback (plain hover scale) if JS dies |
| Page-hero entrance (staggered rise, 640ms) | `globals.css` | 500–640ms, 60–200ms staggers — Material "expressive" tier reserved for hero moments | `html.has-motion` (no-JS safe) + `no-preference`; `from`-only keyframes + `backwards` fill so the GSAP `page-leave` scrub is never blocked by a forwards fill |
| Logo S draw (0.8s) + Z fade (0.5s) | `globals.css` + `logo.tsx` | Hero/brand moment tier (≤1s, once per load); copper trails putty by 170ms for legibility | `html.has-motion` + `no-preference`; header only; `pathLength=1` keeps math fixed |
| BorderGlow cards (React Bits, tailored) | `components/border-glow.tsx` + globals | Pointer-driven only — no timers except the optional ~1.5s intro sweep (vs 4s upstream); fades on `--dur-2`/`--dur-4` tokens | Coarse pointers: never attached; `prefers-reduced-motion`: sweep skipped, fades collapsed; `:focus-within` keyboard parity; transform/opacity/mask only |
| ParticleText 404 headline (React Bits, tailored) | `components/particle-text.tsx` | One-shot gather 800ms + 260ms stagger (hero-moment tier, once per visit); loop **parks at rest** — restarts only on pointer/resize input | `prefers-reduced-motion`: static single draw, loop never starts; decorative canvas, real h1 stays; no-JS fallback copy; touch scroll preserved (`pan-y`) |

## 3 · The ambient quota (v2 amendment)

The walk is wheel-tied, with **one sanctioned exception per viewport**: a
single ambient room, allowed to move on a clock, because a gallery needs
exactly one breathing wall. Current holder: **the ink close** (`.cta-full`,
7 page groups) — "ember dunes" via `GradientWaves` (React Bits, tailored:
ogl dynamic-imported, detail low, DPR ≤1.5, pauses off-screen/hidden tab,
reduced motion = one still frame, bottom-masked so text never sits on
moving luminance). Rules for the quota:

- **One** ambient element per viewport, site-wide — the quota is spent.
- Whisper, not ocean — measured, not guessed: average luminance of the
  layer over the room color stays ≈ 0.15–0.25 (verified numerically
  against the shader math before shipping; a first pass at opacity 0.55
  produced 0.018 — literally invisible — and was retuned).
- Never behind body/display text without a mask; never on reading rooms,
  the hero, or form cards.
- Reduced-motion renders a still frame, never a loop; no WebGL2 gets a
  static CSS dune silhouette (`.is-fallback`), never an empty room.

## 4 · Deliberate omissions (the rules *against* them)

- **Hiding the native cursor** — HIG/NN/g: pointer affordance is not decoration.
- **Cursor label bubbles / "view" pills** — redundant with our museum-label captions; adds reading load (NN/g).
- **Timer-based entrances sitewide (AOS-style)** — fights the wheel-tied identity; timed motion is reserved for one-shot hero moments only.
- **Animating layout props / large blur radii on scroll** — jank budget; blur is used exactly twice (hero dissolve) and never in a hover path.
- **Sound** — HIG: unsolicited audio; also off-brand for a "quiet gallery."

## 4 · Sources

- NN/g — Animation Duration & Motion Characteristics: https://www.nngroup.com/articles/animation-duration/
- Material 3 — Motion (easing & duration tokens): https://m3.material.io/styles/motion
- WCAG 2.2.2 — Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- WCAG 2.3.3 — Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- Apple — Human Interface Guidelines, Motion & Reduce Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- IBM Carbon motion tokens: https://carbondesignsystem.com/motion/overview/
- Microsoft Fluent motion: https://fluent2.microsoft.design/
- Refactoring UI — animation & performance chapters
- designsystems.com — motion in design systems: https://www.designsystems.com/5-steps-for-including-motion-design-in-your-system/
