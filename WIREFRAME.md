# WIREFRAME.md — Figma Spec for Brutalist Notebook Portfolio

> Purpose: So animations, timelines, folds, staples, arrows, envelope seal are all spec'd for Figma / Framer Motion handoff. Fast Awwwards build (<100kB JS over motion).

## Figma File Structure (Suggested)

**Page: Portfolio — Brutalist Notebook**
- Frame 01: Cover / Hero — 1440px wide, auto layout vertical, 128px padding top
- Frame 02: About — 1440px, contains notebook-page cards
- Frame 03: Expertise — 3-col grid
- Frame 04: Work — 3-col grid (Recto, SwingFrame, LOCK-IN client)
- Frame 05: Process — 4-col
- Frame 06: Contact — Envelope + form
- Components Page: Staple, Stamp, Fold line, Marginalia, Redline, ClientCircled, PageNumbers, Envelope, MarginArrow

## Grid & Layout

- Max width: 1152px (max-w-6xl), centered, 20px mobile / 32px desktop padding
- Red margin line: vertical 1px `rgba(196,107,77,0.22)` at x=48 mobile / 64 desktop from left edge of .notebook container. Via `::before`.
- Dot-grid: 28px radial `var(--color-line)` 1px, opacity 0.35 fixed background.
- PageNumbers: fixed left 0, top 50%, z-30, hidden <1024px, vertical flex, `p.XX / 05` Syne 700 10px tracking 0.2em rotate -90deg, bars 18px line, active clay 28px.
- Grain: fixed inset 0, opacity 0.012, fractalNoise 0.95.

## Components

### 1. Fold Line
- Height: 1px dashed, border `line` + second dashed `clay/20` offset 2px Y.
- Animation: `scaleX 0→1`, duration 0.9s, ease `[0.25,1,0.5,1]`, delay 0 / 0.1s, trigger `useInView once margin -20%`.
- Label: Syne 10px uppercase tracking 0.2em faint `— unfold — about —`.

### 2. Notebook Page (Work cards, About cards)
- Background: `--surface #FFFEFB`, border 1px `--line #E6DCCF`, radius 16px (0.6rem → 1.6rem for featured), shadow inset 0 1px 0 rgba(255,255,255,0.8) + 0 1px 2px rgba(23,19,15,0.04)
- After: bottom -6px height 12px radial gradient 0.06 for paper lift.
- Staple: absolute top 0 left 50% -translate-x-1/2 flex gap-28px pt-9px, dots 7px bg ink/10 border ink/10.
- Hover: `translateY -2px`, shadow `0 12px 24px -16px rgba(23,19,15,0.18)`, border `clay-soft`.

### 3. Stamp
- Border 1.5px clay/70, radius 3px, rotate -8deg, Syne 9px bold uppercase tracking 0.15em clay/80.
- Variants: WORKING, CLIENT (circled), BRUTALIST.

### 4. ClientCircled — Hand-drawn circle arrow around CLIENT
- SVG 78x36 viewBox 0 0 78 36, text clay.
- Path: `M 6 18 C 6 6, 22 2, 39 3 C 56 4, 72 7, 72 18 C 72 29, 55 33, 39 33 C 23 33, 6 30, 6 18 Z M 68 12 L 73 18 L 67 24`
- Style: fill none, stroke 1.2, linecap round, dash 2 3, pathLength 0→1 1.1s delay 0.3s, opacity 0.9.

### 5. Marginalia
- Absolute lg:block, top-8, max-w 150px, font-display italic 13px clay/80, rotate 1deg / -0.8deg, x 12→0.
- Contains h-px w-8 clay/30.
- Positions: right -172px or left -172px.
- Content: handwritten notes like "Aug 1 — 35 commits" etc.

### 6. MarginArrow — points to red margin line
- Absolute left 52px mobile / 68px desktop top 0, flex gap 2, z-20 hidden sm:flex.
- SVG 40x20, path `M 0 10 Q 12 2, 22 10 T 38 10 M 32 6 L 38 10 L 32 14` dashed 2 2, pathLength draw 0.8s.
- Label Syne 9px uppercase tracking 0.15em clay/70.

### 7. Envelope (Contact)
- Wrapper relative.
- Flap: absolute -top 28px left0 right0 h30 origin-bottom, bg surface border line border-b-0, clipPath polygon(0 0, 50% 100%, 100% 0), rotateX -35deg open / 0deg sealed (y -8 → 0), duration 0.6s ease [0.25,1,0.5,1].
- Seal dot: absolute -top-2 left 1/2 -translate-x-1/2 h-6 w-6 rounded-full bg clay grid place center text canvas 10px bold "M", scale 0.85→1, opacity 0.6→1 when sealed.
- Body: rounded-b-[1.8rem] border line bg surface p-6 sm:p-8 pt-8.
- States: idle (flap open -35deg), sent (flap closed 0deg, seal scale 1). Toggle via form status.

### 8. Redline
- Inline flex gap 2 mono 11px, old line-through decoration clay/60 faint, new → CLIENT PROJECT clay medium.

## Typography (Final per DESIGN.md)

- Display: Fraunces 300 light, 400 regular, italic 400-600, tracking-tightest -0.04em, tracking-human -0.02em.
- Mono (main body): JetBrains Mono 400,500,600, no ligatures, typewriter class, 13-16px leading 1.8 text-pretty.
- Caption Bold: Syne 400,600,700,800 ExtraBold — stamps, tags (Kotlin Lab, Video AI, Client Project), nav, page numbers, Fold labels, marginalia labels, footer mono. Feels BOLD editorial.

## Color Tokens (keep per user)

- Paper: #FCFAF7 canvas, #F1E9DD deep, #FFFEFB surface, #F5EEE4 surface-2
- Ink: #17130F, soft #4E4740, muted #8C857C, faint #B8B0A3
- Clay: #C46B4D primary, soft #D88A6E, deep #A85A41, wash #F6E8E0 selection
- Forest: #2D3A32 deep, soft #3E5248, moss #7A8E7E, sand #D7C9AF
- Line: #E6DCCF, soft #EEE6DB

## Animations Timeline (Figma Prototype)

**Page Load (0-1.2s):**
- 0.1s: eyebrow mono `opacity 0→1 y 10→0` 0.7s ease-human
- 0.18s: H1 `y 16→0` 0.8s
- 0.32s: body paras `y 14→0` 0.8s
- 0.45s: avatar meta `y 12→0`
- 0.58s: CTAs
- 0.85s: Now block
- 1.2s: scroll cue

**Scroll (each section):**
- Fold enters -20% margin: scaleX 0→1 0.9s
- Reveal (card): initial opacity 0 y 28 blur 8 → opacity1 y0 blur0 1s ease [0.22,1,0.36,1]
- Marginalia: x 12→0 rotate 1.2→1 opacity 0→1 0.7s
- ClientCircled: pathLength 0→1 1.1s delay 0.3s
- MarginArrow: pathLength 0→1 0.8s

**Contact Envelope:**
- Idle: flap rotateX -35deg y -8
- On submit: flap rotateX 0 y0 0.6s, seal scale 0.85→1

**PageNumbers:**
- p.00 top, p.01 about, p.02 expertise, p.03 work, p.04 process, p.05 contact
- Bar: h 18px w-1px line, active h 28px bg clay transition 0.5s

## Figma Auto-Layout

- All sections auto-layout vertical gap 0 (Fold provides 16px py 8 = 32px total)
- Cards: auto-layout vertical gap 0, padding 28px / 32px, hug content, fill container.

## Assets

- Wireframe image: `public/wireframe-brutalist.png` generated.
- Avatar: GitHub avatar URL.

## Handoff Notes

- No Lenis, no gsap, no three, no canvas — only framer-motion + CSS. Keep fast.
- All measurements in 4px grid, but borders 1px hairline.
- Red margin line is pure CSS ::before, not component.
- Envelope seal uses Framer Motion rotateX, needs preserve-3d? We use simple rotateX.
- Hand-drawn arrows use dashed stroke to feel imperfect.

This wireframe is ready to be recreated in Figma as components with variants: Fold/default, Stamp/WORKING/CLIENT/BRUTALIST, NotebookPage/default/hover, Envelope/open/closed, PageNumbers/active states.
