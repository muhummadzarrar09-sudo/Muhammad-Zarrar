# The palette — exact values

The single source of truth is `src/app/globals.css` (`:root`). This file
records what those tokens actually are, plus the contrast maths, so anything
made outside the codebase — Instagram carousels, decks, print — stays on
brand.

> **Correction on an older note in `README.md`.** It described the canvas as
> putty `#C4C3B6` with ink `#111110`. That was the previous art direction. The
> site now ships the warm paper scheme below; `scripts/check-contrast.mjs` and
> `src/motion/walk.ts` were both still carrying the old values and have been
> updated.

One scheme only. There is no dark mode in the shipped code, despite what
older docs claim.

---

## Papers (the ground — 60% of any layout)

| Token | Hex | Role |
|---|---|---|
| `--ground-400` | `#FFF7EE` | Bleached paper. The brightest lift — use sparingly |
| `--ground-700` / `--canvas` | `#F3E4C7` | **Putty / canvas. The default background** |
| `--ground-750` | `#F7E7D3` | Cream wash. Raised cards |
| `--ground-800` / `--inset` | `#F0CCB7` | Warm sand. Inset wells, aura |
| `--ground-850` | `#E8B49D` | Blush panel. Mobile sheet |
| `--ground-900` | `#D8B89A` | Parchment. Footer, deepest edge |

## Inks (type)

| Token | Hex | Role |
|---|---|---|
| `--text` | `#1A1412` | **Soft ink. All body copy and headlines** |
| `--text-2` | `#5A3328` | Walnut. Secondary copy, ledes |
| `--text-3` | `#8A4733` | Old brown. Micro-labels, placeholders |
| `--white` | `#FFFFFF` | Labels on solid clay only |

## Clay (the only colour — 10% of any layout, never more)

| Token | Hex | Role |
|---|---|---|
| `--gold` / `--accent` | `#A3492F` | **Terracotta. Rules, display accents, one mark** |
| `--gold-deep` | `#723021` | Deep clay. Small caps, pressed states, hover |
| `--copper` | `#E7925E` | Copper glow. **Decoration only — 1.93:1 on paper, never text** |

## Semantic (UI state, used tiny)

| Token | Hex |
|---|---|
| `--danger` | `#8B1E1E` |
| `--success` | `#14532D` |
| `--warning` | `#713F12` |
| `--info` | `#1E3A8A` |

## Lines & glass

| Token | Value |
|---|---|
| `--hairline` | `rgba(36, 20, 15, 0.14)` |
| `--hairline-soft` | `rgba(36, 20, 15, 0.10)` |
| `--hairline-strong` | `rgba(36, 20, 15, 0.48)` |
| `--surface` | `rgba(247, 231, 211, 0.42)` |
| `--glass` | `rgba(247, 231, 211, 0.38)` |

---

## Contrast — measured, not guessed

Run `npm run check:contrast`. Thirty pairs, all passing. The numbers that
matter when you build a slide:

| Pair | Ratio | Verdict |
|---|---|---|
| Ink `#1A1412` on canvas `#F3E4C7` | 14.52 | AAA — headline + body |
| Walnut `#5A3328` on canvas | 8.63 | AAA — body |
| Old brown `#8A4733` on canvas | 5.52 | AA — micro-labels only |
| Terracotta `#A3492F` on canvas | 4.71 | AA — large text, rules, marks |
| Deep clay `#723021` on canvas | 7.75 | AAA — small caps |
| Copper `#E7925E` on canvas | **1.93** | **Decoration only** |
| White on terracotta | 5.91 | AA — button labels |

## Instagram carousel recipe

Carousels are 1080 × 1350 (4:5). Everything below is already in the palette.

1. **Ground:** `#F3E4C7` for every slide. Do not alternate dark and light
   slides mid-carousel — the scroll reads as one object.
2. **Headline:** `#1A1412`, Fraunces, 5 words maximum. Two lines, never three.
3. **Kicker above it:** `#5A3328`, Inter, uppercase, letter-spacing `0.24em`,
   14–16px. That's the "FIELD NOTE 01 · CONVERSION" line.
4. **Body:** `#5A3328`, Inter, 28–32px, line-height 1.5, measure ≤ 34
   characters.
5. **One accent per slide:** a terracotta rule, a number, or one underlined
   word. If it's on every slide, it stops being an accent.
6. **Frames:** hairline `rgba(36,20,15,0.14)`, 1–2px, inset ~40px. No drop
   shadows — elevation here is warm-tinted or absent.
7. **Slide number:** bottom-right, `#8A4733`, Inter 600, `0.2em` tracking,
   zero-padded (`01 / 07`).
8. **Do not:** put copper text on paper, use pure black, use pure white as a
   background, add a second accent colour, or round corners past 2px.

`palette/zarrar-palette-2026.png` is the reference card at 1080 × 1350 —
regenerate with `npm run assets:palette`.
