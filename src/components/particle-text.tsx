"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ParticleText — React Bits' scatter-and-gather headline, PUTTY GALLERY
 * tailoring (ledger: docs/MOTION-RULES.md).
 *
 * Deviations from upstream (reactbits.dev) — all deliberate:
 * - PARK-AFTER-SETTLE: upstream runs requestAnimationFrame forever, even
 *   when the text is resting (their idleDrift). That's ambient timer
 *   motion — against the house walk. Here the loop parks itself once the
 *   gather is done and particles are calm (snap + final draw + cancel),
 *   and only wakes for real input (pointer move/enter) or resizes.
 * - NO IDLE DRIFT by default (idleDrift=0) — rest is crisp, not simmering.
 * - ONE-SHOT PACING: gather 800ms + stagger 240ms (upstream 1600/420) —
 *   NN/g window; the hero-moment tier, once per visit.
 * - GLOW OFF by default — canvas shadowBlur per particle per frame is
 *   expensive and bloom is foreign to the putty system.
 * - REDUCED MOTION: particles snap to targets and the loop NEVER starts —
   one static draw, fully formed. Upstream still ran its loop.
 * - NO-JS / CRAWLER FALLBACK: the caller renders real heading copy in
   `.particle-text__fallback`; it stays in the DOM for SEO/screen readers
   and is only visually swapped for the canvas once sampling succeeds.
 * - SCROLL-SAFE TOUCH: `touch-action: pan-y` (upstream's `none` would
   trap vertical scrolling on phones).
 * - HOUSE COLORS: ink #111110 particles, copper #da7134 highlight;
   Fraunces via CSS on the wrapper (fontFamily="inherit" resolves it).
 */

type Rgb = { r: number; g: number; b: number };

const hexToRgb = (hex: string): Rgb | null => {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb: Rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type ParticleTextProps = {
  text: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover" | "click";
  fontSize?: number | string;
  fontWeight?: number | string;
  glow?: boolean;
  className?: string;
  /**
   * When true the wrapper is aria-hidden and carries no label — the caller
   * owns semantics with real copy (e.g. a visually-hidden h1). Use this
   * whenever the particle text duplicates a real heading on the page.
   */
  decorative?: boolean;
};

export default function ParticleText({
  text,
  particleSize = 2,
  density = 3,
  color = "#111110",
  highlightColor = "#da7134",
  scatter = 150,
  gatherDuration = 800,
  stagger = 240,
  pointerRepel = 34,
  repelRadius = 110,
  idleDrift = 0,
  trigger = "mount",
  fontSize = "clamp(2.4rem, 8vw, 5.2rem)",
  fontWeight = 560,
  glow = false,
  className = "",
  decorative = false,
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      startX: number;
      startY: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      seed: number;
      depth: number;
      delay: number;
    }> = [];
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let buildId = 0;
    let gathering = false;
    let gatherStart = 0;
    let calmFrames = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    };

    const startGather = (fromScatter = true) => {
      if (!particles.length) return;
      const now = performance.now();
      const spread = reducedMotion ? 0 : scatter;

      particles.forEach((particle) => {
        if (fromScatter) {
          const angle = particle.seed * Math.PI * 2;
          const distance = spread * (0.35 + particle.depth * 0.75);
          particle.x =
            particle.targetX +
            Math.cos(angle) * distance +
            (particle.depth - 0.5) * spread * 0.55;
          particle.y =
            particle.targetY +
            Math.sin(angle) * distance +
            (particle.seed - 0.5) * spread * 0.55;
        }
        particle.startX = particle.x;
        particle.startY = particle.y;
        particle.delay = reducedMotion ? 0 : particle.seed * stagger;
      });

      gatherStart = now;
      gathering = true;
      calmFrames = 0;
    };

    const drawParticle = (particle: (typeof particles)[number]) => {
      const size = particle.size;
      ctx.fillStyle = particle.color;
      if (size <= 2.1) {
        ctx.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
        return;
      }
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    /** PARK CHECK — the house amendment. When nothing is gathering, drift
     * is off and the pointer is away, count calm frames; after a short
     * grace, snap every particle to its exact target, draw once, and stop
     * the loop. The canvas goes completely silent at rest. */
    const parkIfCalm = (moved: number): boolean => {
      if (gathering || pointer.active || idleDrift > 0) {
        calmFrames = 0;
        return false;
      }
      calmFrames = moved < 0.05 ? calmFrames + 1 : 0;
      if (calmFrames < 10) return false;
      for (const particle of particles) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        drawParticle(particle);
      }
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      return true;
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (glow && !reducedMotion) {
        ctx.shadowBlur = particleSize * 3;
        ctx.shadowColor = highlightColor;
      } else {
        ctx.shadowBlur = 0;
      }

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.18;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.18;

      let complete = true;
      let moved = 0;

      for (const particle of particles) {
        let baseX = particle.targetX;
        let baseY = particle.targetY;
        let progress = 1;

        if (gathering) {
          const local =
            (now - gatherStart - particle.delay) /
            Math.max(1, reducedMotion ? 1 : gatherDuration);
          progress = clamp(local, 0, 1);
          const eased = easeOutCubic(progress);
          baseX = particle.startX + (particle.targetX - particle.startX) * eased;
          baseY = particle.startY + (particle.targetY - particle.startY) * eased;
          if (progress < 1) complete = false;
        } else if (!reducedMotion && idleDrift > 0) {
          const driftTime = now * 0.001;
          baseX +=
            Math.sin(driftTime * 0.9 + particle.seed * 10) *
            idleDrift *
            particle.depth;
          baseY +=
            Math.cos(driftTime * 0.75 + particle.depth * 10) *
            idleDrift *
            particle.depth;
        }

        if (
          pointer.active &&
          !reducedMotion &&
          pointerRepel > 0 &&
          repelRadius > 0
        ) {
          const dx = baseX - pointer.smoothX;
          const dy = baseY - pointer.smoothY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < repelRadius) {
            const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const follow = reducedMotion ? 1 : 0.22;
        const stepX = (baseX - particle.x) * follow;
        const stepY = (baseY - particle.y) * follow;
        particle.x += stepX;
        particle.y += stepY;
        moved = Math.max(moved, Math.abs(stepX), Math.abs(stepY));

        ctx.globalAlpha = clamp(0.35 + progress * 0.65, 0, 1);
        drawParticle(particle);
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (gathering && complete) gathering = false;

      /* Park the moment rest is reached — the loop is never idle here. */
      if (parkIfCalm(moved)) return;

      animationFrame = requestAnimationFrame(render);
    };

    const ensureRenderLoop = () => {
      if (animationFrame === null) {
        calmFrames = 0;
        animationFrame = requestAnimationFrame(render);
      }
    };

    const resolveFontSize = (
      value: number | string,
      weight: number | string,
      family: string
    ) => {
      if (typeof value === "number") return value;
      const probe = document.createElement("span");
      probe.textContent = "M";
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.pointerEvents = "none";
      probe.style.fontSize = value;
      probe.style.fontWeight = String(weight);
      probe.style.fontFamily = family;
      container.appendChild(probe);
      const size = parseFloat(window.getComputedStyle(probe).fontSize) || 96;
      probe.remove();
      return size;
    };

    const waitForFonts = async (font: string) => {
      if (!("fonts" in document)) return;
      try {
        await document.fonts.load(font);
      } catch {}
      await document.fonts.ready;
    };

    const sampleText = async () => {
      const currentBuild = ++buildId;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const computed = window.getComputedStyle(container);
      const resolvedFamily = computed.fontFamily || "sans-serif";
      const resolvedSize = resolveFontSize(
        fontSize,
        fontWeight,
        resolvedFamily
      );
      let font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;

      await waitForFonts(font);
      if (currentBuild !== buildId) return;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const content = String(text || " ");
      const maxTextWidth = width * 0.92;
      offCtx.font = font;
      let metrics = offCtx.measureText(content);
      const measuredWidth = Math.max(1, metrics.width);
      const finalSize =
        measuredWidth > maxTextWidth
          ? Math.max(18, resolvedSize * (maxTextWidth / measuredWidth))
          : resolvedSize;
      if (finalSize !== resolvedSize) {
        font = `${fontWeight} ${finalSize}px ${resolvedFamily}`;
        await waitForFonts(font);
        if (currentBuild !== buildId) return;
        offCtx.font = font;
        metrics = offCtx.measureText(content);
      }

      const left = Math.ceil(metrics.actualBoundingBoxLeft || 0);
      const right = Math.ceil(metrics.actualBoundingBoxRight || metrics.width);
      const ascent = Math.ceil(
        metrics.actualBoundingBoxAscent || finalSize * 0.78
      );
      const descent = Math.ceil(
        metrics.actualBoundingBoxDescent || finalSize * 0.22
      );
      const padding = Math.max(12, Math.ceil(finalSize * 0.08));
      const textWidth = Math.max(1, left + right);
      const textHeight = Math.max(1, ascent + descent);

      offscreen.width = textWidth + padding * 2;
      offscreen.height = textHeight + padding * 2;
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.font = font;
      offCtx.textAlign = "left";
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(content, padding - left, padding + ascent);

      const imageData = offCtx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height
      );
      const targets: Array<{ x: number; y: number; alpha: number }> = [];
      const step = Math.max(2, Math.floor(density));

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
          if (alpha > 40) {
            targets.push({
              x: width / 2 - offscreen.width / 2 + x,
              y: height / 2 - offscreen.height / 2 + y,
              alpha: alpha / 255,
            });
          }
        }
      }

      const maxParticles = Math.max(
        900,
        Math.min(5200, Math.floor((width * height) / 90))
      );
      const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
      const baseRgb = hexToRgb(color);
      const highlightRgb = hexToRgb(highlightColor);
      const selected = targets.filter((_, index) => index % stride === 0);

      particles = selected.map((target, index) => {
        const seed = ((index * 9301 + 49297) % 233280) / 233280;
        const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;
        const blend =
          baseRgb && highlightRgb
            ? clamp(
                target.x / Math.max(1, width) + (seed - 0.5) * 0.35,
                0,
                1
              )
            : 0;
        const particleColor =
          baseRgb && highlightRgb
            ? rgbToCss(mixRgb(baseRgb, highlightRgb, blend))
            : color;
        const angle = seed * Math.PI * 2;
        const distance = (reducedMotion ? 0 : scatter) * (0.35 + depth * 0.75);
        const startX =
          target.x +
          Math.cos(angle) * distance +
          (seed - 0.5) * scatter * 0.45;
        const startY =
          target.y +
          Math.sin(angle) * distance +
          (depth - 0.9) * scatter * 0.45;

        return {
          x: reducedMotion ? target.x : startX,
          y: reducedMotion ? target.y : startY,
          startX,
          startY,
          targetX: target.x,
          targetY: target.y,
          size: Math.max(0.6, particleSize * (0.75 + target.alpha * 0.45)),
          color: particleColor,
          seed,
          depth,
          delay: seed * stagger,
        };
      });

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;

      if (reducedMotion) {
        /* One static, fully-formed draw — the loop never starts. */
        for (const particle of particles) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
        }
        gathering = false;
        ctx.clearRect(0, 0, width, height);
        for (const particle of particles) drawParticle(particle);
        setLive(true);
        return;
      }

      startGather(false);
      setLive(true);
      ensureRenderLoop();
    };

    const queueSample = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        sampleText();
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      ensureRenderLoop();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      if (!reducedMotion) ensureRenderLoop(); // settle, then park
    };

    const handlePointerEnter = (event: PointerEvent) => {
      handlePointerMove(event);
      if (trigger === "hover" && !reducedMotion) {
        startGather(true);
        ensureRenderLoop();
      }
    };

    const handleClick = () => {
      if (trigger === "click" && !reducedMotion) {
        startGather(true);
        ensureRenderLoop();
      }
    };

    const reduceQuery = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    );
    const handleReduceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      sampleText();
    };

    reduceQuery?.addEventListener("change", handleReduceChange);
    canvas.addEventListener("pointerenter", handlePointerEnter);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    const resizeObserver = new ResizeObserver(queueSample);
    resizeObserver.observe(container);
    sampleText();

    return () => {
      buildId += 1;
      resizeObserver.disconnect();
      reduceQuery?.removeEventListener("change", handleReduceChange);
      canvas.removeEventListener("pointerenter", handlePointerEnter);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      animationFrame = null;
    };
  }, [
    text,
    particleSize,
    density,
    color,
    highlightColor,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    fontSize,
    fontWeight,
    glow,
  ]);

  return (
    <div
      ref={containerRef}
      className={`particle-text${live ? " is-live" : ""} ${className}`.trim()}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : text}
      aria-hidden={decorative || undefined}
    >
      <canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" />
      {/* Real copy for crawlers, screen readers and no-JS visitors.
          Visually swapped for the canvas once sampling succeeds. */}
      <span className="particle-text__fallback" aria-hidden={live || undefined}>
        {text}
      </span>
    </div>
  );
}
