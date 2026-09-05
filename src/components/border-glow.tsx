"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * BorderGlow — React Bits' pointer-reactive card border, tailored to the
 * Putty Gallery system (compliance ledger: docs/MOTION-RULES.md).
 *
 * What changed from upstream (reactbits.dev):
 * - CLAY PALETTE: copper glow ("22 66 58") and a copper→rust→clay mesh ramp
 *   replace the neon purple/pink/sky trio. The brand keeps its voice.
 * - `tone` ("glass" | "ink") replaces background-color sniffing — we know
 *   our surfaces. Radius defaults to the house token (--radius, 9px), not
 *   a hardcoded 28px.
 * - HOUSE MOTION TOKENS: reveal/collapse use --dur-2/--dur-4 + --ease-standard.
 * - The `animated` intro sweep is compressed (~1.5s vs ~4s), cancellable on
 *   unmount, and skipped under prefers-reduced-motion (WCAG 2.3.3).
 * - Pointer work is rAF-throttled, rect-cached (re-read after scroll), and
 *   never attached on coarse/touch pointers.
 * - KEYBOARD PARITY: :focus-within reveals the glow (upstream has none) —
 *   see the CSS block in globals.css.
 * - Styles live in globals.css ("BORDER GLOW" section): globals stays the
 *   single source of truth for CSS in this repo.
 */

type Tone = "glass" | "ink";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  /** 0–100 — how close the pointer must be to the edge for the glow to appear. */
  edgeSensitivity?: number;
  /** HSL triplet, "H S L" — the edge light colour. Default: brand copper. */
  glowColor?: string;
  /** Overrides the tone's surface colour (rarely needed). */
  backgroundColor?: string;
  /** Corner radius in px. Default: the house radius token (--radius). */
  borderRadius?: number;
  /** How far the outer glow reaches beyond the card, in px. */
  glowRadius?: number;
  /** Opacity multiplier for the edge light (0.1–3). */
  glowIntensity?: number;
  /** Width of the directional cone mask, as a percentage (5–45). */
  coneSpread?: number;
  /** One-shot intro sweep. Compressed + reduced-motion safe (see header). */
  animated?: boolean;
  /** Mesh-gradient border ramp, 3 hex colours: [bright, mid, deep]. */
  colors?: [string, string, string] | string[];
  /** Strength of the soft-light interior fill near the edges. */
  fillOpacity?: number;
  /** "glass" = putty glass cards (light). "ink" = dark rooms. */
  tone?: Tone;
};

/* Brand defaults — the clay ramp from the ZS mark: copper, rust, clay-deep. */
const DEFAULT_COLORS = ["#da7134", "#a84424", "#7a2e18"];
const DEFAULT_GLOW = "22 66 58"; // copper

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 22, s: 66, l: 58 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(
      opacities[i] * intensity,
      100
    )}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

/* ——— Intro sweep (compressed from upstream's ~4s to ~1.5s) ——— */

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = DEFAULT_GLOW,
  backgroundColor,
  borderRadius,
  glowRadius = 28,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = DEFAULT_COLORS,
  fillOpacity,
  tone = "glass",
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pending = useRef<{ x: number; y: number } | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const fine = useRef(false);

  /* Coarse/touch pointers never get listeners; scroll invalidates the
     cached rect so the glow stays honest while the page moves. */
  useEffect(() => {
    fine.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!fine.current) return;
    const invalidate = () => {
      rectRef.current = null;
    };
    window.addEventListener("scroll", invalidate, { passive: true });
    return () => {
      window.removeEventListener("scroll", invalidate);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const paint = useCallback(() => {
    frame.current = 0;
    const card = cardRef.current;
    const point = pending.current;
    if (!card || !point) return;

    const rect = rectRef.current ?? card.getBoundingClientRect();
    rectRef.current = rect;
    const x = point.x - rect.left;
    const y = point.y - rect.top;

    /* Edge proximity — 0 at centre, 1 at the border (upstream math). */
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
    const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

    /* Cursor angle around the centre, 0° at top, clockwise. */
    let angle = 0;
    if (!(dx === 0 && dy === 0)) {
      angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
    }

    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!fine.current) return;
      const rect = rectRef.current ?? cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      pending.current = { x: event.clientX, y: event.clientY };
      if (!frame.current) frame.current = requestAnimationFrame(paint);
    },
    [paint]
  );

  const onPointerEnter = useCallback(() => {
    if (!fine.current) return;
    rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const onPointerLeave = useCallback(() => {
    rectRef.current = null;
    pending.current = null;
  }, []);

  /* One-shot intro sweep — compressed, cancellable, reduced-motion safe. */
  useEffect(() => {
    const card = cardRef.current;
    if (!animated || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const animateValue = ({
      start = 0,
      end = 100,
      duration = 500,
      delay = 0,
      ease = easeOutCubic,
      onUpdate,
    }: {
      start?: number;
      end?: number;
      duration?: number;
      delay?: number;
      ease?: (x: number) => number;
      onUpdate: (v: number) => void;
    }) => {
      timers.push(
        setTimeout(() => {
          const t0 = performance.now();
          const tick = () => {
            if (cancelled) return;
            const t = Math.min((performance.now() - t0) / duration, 1);
            onUpdate(start + (end - start) * ease(t));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay)
      );
    };

    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    animateValue({ duration: 400, onUpdate: (v) =>
      card.style.setProperty("--edge-proximity", `${v}`)
    });
    animateValue({
      ease: easeInOutCubic,
      duration: 900,
      delay: 150,
      onUpdate: (v) =>
        card.style.setProperty(
          "--cursor-angle",
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`
        ),
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1000,
      duration: 500,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`),
    });
    timers.push(
      setTimeout(() => card.classList.remove("sweep-active"), 1500)
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      card.classList.remove("sweep-active");
    };
  }, [animated]);

  const resolvedFill =
    fillOpacity ?? (tone === "glass" ? 0.22 : 0.5);
  const resolvedBg =
    backgroundColor ?? (tone === "ink" ? "#111110" : undefined);

  const style = {
    "--edge-sensitivity": edgeSensitivity,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": resolvedFill,
    ...(borderRadius != null ? { "--border-radius": `${borderRadius}px` } : {}),
    ...(resolvedBg ? { "--card-bg": resolvedBg } : {}),
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors.length ? colors : DEFAULT_COLORS),
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`border-glow-card border-glow-card--${tone} ${className}`}
      style={style}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
