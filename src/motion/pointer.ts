import gsap from "gsap";
import type Lenis from "lenis";

/**
 * POINTER REACTIVE LAYER — mouse-only flourishes that sit on top of the
 * wheel-tied walk. Six effects, one shared gsap.ticker loop:
 *
 *   1. cursor aura      — a bone dot + trailing ring that track the pointer
 *   2. magnetic CTAs    — [data-magnetic] links lean toward the cursor
 *   3. marquee skew     — the proof band bends with Lenis scroll velocity
 *   4. plaque pan       — plaque artworks drift a few px under the cursor
 *   5. spotlight        — React Bits SpotlightCard, tailored: a clay wash
 *                         follows the cursor across [data-spotlight] rows
 *   6. tilt             — React Bits TiltedCard + GlareHover, tailored: the
 *                         about portrait eases ±5° with a travelling glare
 *   7. enter nudge        — React Bits DirectionalHover, tailored: plaque
 *                         captions flinch away from the arriving cursor
 *   8. marquee pace       — React Bits ScrollVelocity, tailored: the band
 *                         sprints with wheel velocity (Lenis-fed, not motion)
 *   9. clay tick          — React Bits ClickSpark, rehabilitated: one clay
 *                         tick bursts on CTA press (220ms, then parked)
 *  10. target brackets    — React Bits TargetCursor, tailored: clay corner
 *                         brackets snap around controls (never huge rows)
 *  11. crosshair           — diagnostic crosshair, armed only over heroes
 *  12. pressure            — React Bits TextPressure, tailored: display
 *                         weight swells near the pointer (variable wght)
 *
 * RULES THIS FILE IS BOUND TO (see docs/MOTION-RULES.md):
 * - WCAG 2.2.2 / 2.3.3 + Apple HIG — the native cursor is NEVER hidden
 *   (the aura is a follower, not a replacement), everything here is
 *   skipped under prefers-reduced-motion, and nothing traps input.
 * - NN/g duration research — release/settle motions land inside the
 *   100–500ms window; tracking motions are input-driven, not timed.
 * - Material 3 motion — transform/opacity only, no layout properties,
 *   emphasized-style easing on every settle.
 * - Pointer scope — effects boot only on (hover: hover) AND (pointer: fine);
 *   touch and coarse pointers never download a single line of their work.
 *
 * The engine only calls initPointer() on the full-motion boot, so reduced
 * motion, no-JS and crawlers are already filtered out before we run.
 */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const MAX_SKEW = 8; // deg — full-bleed band must never fold past this
const SKEW_PER_VELOCITY = 0.6;

type MagneticBinding = {
  el: HTMLElement;
  onMove: (event: PointerEvent) => void;
  onLeave: () => void;
};

type PanBinding = {
  el: HTMLElement;
  onMove: (event: PointerEvent) => void;
  onLeave: () => void;
};

let dispose: (() => void) | null = null;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/* ------------------------------------------------------------------ */
/* 2 · Magnetic CTAs                                                   */
/* ------------------------------------------------------------------ */

/**
 * [data-magnetic] links lean toward the cursor while hovered (≤12px),
 * then settle back on an elastic — the clay/putty metaphor in miniature.
 * quickTo keeps each axis on one reusable tween; transforms only.
 */
function buildMagnetics(): { teardown: () => void } {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-magnetic]")
  );
  const bindings: MagneticBinding[] = [];

  for (const el of els) {
    const xTo = gsap.quickTo(el, "x", { duration: 0.36, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.36, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      /* Rect includes the current magnetic offset — subtract it so the
         attractor point never chases its own tail. */
      const offX = Number(gsap.getProperty(el, "x")) || 0;
      const offY = Number(gsap.getProperty(el, "y")) || 0;
      const dx = event.clientX - (rect.left + rect.width / 2 - offX);
      const dy = event.clientY - (rect.top + rect.height / 2 - offY);
      xTo(clamp(dx * 0.3, -12, 12));
      yTo(clamp(dy * 0.3, -8, 8));
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.55)",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    bindings.push({ el, onMove, onLeave });
  }

  return {
    teardown: () => {
      for (const { el, onMove, onLeave } of bindings) {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
        gsap.set(el, { x: 0, y: 0 });
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* 3 · Marquee velocity skew                                           */
/* ------------------------------------------------------------------ */

/**
 * Lenis hands us velocity on every scroll tick; the proof band skews a
 * few degrees with it and lerps back to rest. Skew lives on the BAND,
 * never the track, so the CSS marquee keyframes stay untouched.
 */
function buildSkew(lenis: Lenis): { teardown: () => void } {
  const bands = Array.from(document.querySelectorAll<HTMLElement>(".marquee"));
  if (!bands.length) return { teardown: () => {} };

  let skew = 0;
  let skewTarget = 0;
  let written = 0;

  const onScroll = (instance: Lenis) => {
    skewTarget = clamp(
      (instance.velocity ?? 0) * SKEW_PER_VELOCITY,
      -MAX_SKEW,
      MAX_SKEW
    );
  };

  const tick = () => {
    skewTarget *= 0.9; // velocity decays even if Lenis stops emitting
    skew += (skewTarget - skew) * 0.12;
    if (Math.abs(skew) < 0.02 && Math.abs(skewTarget) < 0.02) {
      if (written !== 0) {
        written = 0;
        for (const band of bands) band.style.transform = "";
      }
      return;
    }
    written = skew;
    const value = `skewX(${skew.toFixed(3)}deg)`;
    for (const band of bands) band.style.transform = value;
  };

  lenis.on("scroll", onScroll);
  gsap.ticker.add(tick);

  return {
    teardown: () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      for (const band of bands) band.style.transform = "";
    },
  };
}

/* ------------------------------------------------------------------ */
/* 4 · Plaque pan                                                      */
/* ------------------------------------------------------------------ */

/**
 * Hanging artworks drift a few pixels toward the cursor (transform-origin
 * follows pointer position). The hover scale itself is pure CSS; JS only
 * feeds --pan-x/--pan-y, so the effect degrades to a plain hover scale.
 */
function buildPan(): { teardown: () => void } {
  const plaques = Array.from(
    document.querySelectorAll<HTMLElement>(".vignette-plaque")
  );
  const bindings: PanBinding[] = [];

  for (const el of plaques) {
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const py = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      el.style.setProperty("--pan-x", px.toFixed(3));
      el.style.setProperty("--pan-y", py.toFixed(3));
    };

    const onLeave = () => {
      el.style.setProperty("--pan-x", "0");
      el.style.setProperty("--pan-y", "0");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    bindings.push({ el, onMove, onLeave });
  }

  return {
    teardown: () => {
      for (const { el, onMove, onLeave } of bindings) {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.style.removeProperty("--pan-x");
        el.style.removeProperty("--pan-y");
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* 5 · Spotlight — one confined canvas, zero boxes                    */
/* ------------------------------------------------------------------ */

/**
 * A single fixed canvas paints one continuous clay glow for every
 * [data-spotlight] row and card. The old build washed each card through its
 * own pseudo-element, so the light hard-clipped at every box edge; here the
 * falloff runs past the borders and dies in open space, the way light does.
 * The glow tracks the pointer when it is around and falls back to the
 * focused card's centre for keyboard users. Opacity eases toward its target
 * every frame, rects refresh on scroll and resize, and the loop only runs
 * while something is changing — zero idle cost. Gated with everything
 * else in initPointer (fine pointer, motion OK).
 */
function buildSpotlight(): { teardown: () => void } {
  const canvas = document.createElement("canvas");
  canvas.className = "spot-unified";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return { teardown: () => canvas.remove() };

  const RADIUS = 240;
  let targets: HTMLElement[] = [];
  let rects: DOMRect[] = [];
  let rgb = "122, 46, 24";

  const readColor = () => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--spot-rgb")
      .trim();
    if (v) rgb = v;
  };

  const refresh = () => {
    targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]")
    );
    rects = targets.map((t) => t.getBoundingClientRect());
    readColor();
  };
  refresh();

  let w = 0;
  let h = 0;
  let dpr = 1;
  let dirty = true;
  let raf = 0;

  const paint = () => {
    raf = 0;
    // Anchor: the live pointer wins; keyboard focus holds the light
    // while the pointer is away.
    const ax = pointerIn ? px : focusX;
    const ay = pointerIn ? py : focusY;
    let nearest = Infinity;
    if (ax > -9999) {
      for (const r of rects) {
        if (r.width === 0 || r.height === 0) continue;
        const cx = Math.min(Math.max(ax, r.left), r.right);
        const cy = Math.min(Math.max(ay, r.top), r.bottom);
        const d = Math.hypot(ax - cx, ay - cy);
        if (d < nearest) nearest = d;
      }
    }
    const target = nearest > RADIUS ? 0 : 1 - nearest / RADIUS;
    opacity += (target - opacity) * 0.18;
    if (Math.abs(target - opacity) < 0.01) opacity = target;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (opacity > 0.01 && ax > -9999) {
      const a = (0.16 * opacity).toFixed(3);
      const g = ctx.createRadialGradient(ax, ay, 0, ax, ay, RADIUS);
      g.addColorStop(0, `rgba(${rgb},${a})`);
      g.addColorStop(0.7, `rgba(${rgb},0)`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(ax - RADIUS, ay - RADIUS, RADIUS * 2, RADIUS * 2);
    }

    if (opacity !== target || dirty) {
      dirty = false;
      raf = requestAnimationFrame(paint);
    }
  };

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(paint);
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    refresh();
    dirty = true;
    kick();
  };

  let px = -9999;
  let py = -9999;
  let pointerIn = false;
  let focusX = -9999;
  let focusY = -9999;
  let opacity = 0;

  const onMove = (event: PointerEvent) => {
    px = event.clientX;
    py = event.clientY;
    pointerIn = true;
    kick();
  };
  const onLeave = () => {
    pointerIn = false;
    kick();
  };
  const onScroll = () => {
    refresh();
    dirty = true;
    kick();
  };
  const onFocus = () => {
    const el = (document.activeElement as HTMLElement | null)?.closest?.(
      "[data-spotlight]"
    ) as HTMLElement | null;
    if (el) {
      const r = el.getBoundingClientRect();
      focusX = r.left + r.width / 2;
      focusY = r.top + r.height / 2;
    } else {
      focusX = -9999;
      focusY = -9999;
    }
    kick();
  };
  const themeObserver = new MutationObserver(readColor);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", resize);
  document.addEventListener("focusin", onFocus);
  document.addEventListener("focusout", onFocus);
  resize();

  return {
    teardown: () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
      themeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
      canvas.remove();
    },
  };
}

/* ------------------------------------------------------------------ */
/* 6 · Tilt + glare (React Bits TiltedCard + GlareHover, tailored)     */
/* ------------------------------------------------------------------ */

/**
 * [data-tilt] eases toward the cursor (±5° — a jewel turning, not a card
 * trick) while --tilt-gx/--tilt-gy drag a warm glare across it. JS only
 * writes custom properties; the transition lives in CSS on the token
 * --dur-2, so the settle honours the same easing as every other control.
 * Upstream tilts to ±15° with a white glare; both are halved and warmed
 * here to stay inside the gallery's light.
 */
function buildTilt(): { teardown: () => void } {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
  const bindings: PanBinding[] = [];

  for (const el of els) {
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const px = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const py = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      el.style.setProperty("--tilt-ry", `${(px * 5).toFixed(2)}deg`);
      el.style.setProperty("--tilt-rx", `${(-py * 5).toFixed(2)}deg`);
      el.style.setProperty("--tilt-gx", `${(((px + 1) / 2) * 100).toFixed(1)}%`);
      el.style.setProperty("--tilt-gy", `${(((py + 1) / 2) * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
      el.style.setProperty("--tilt-gx", "50%");
      el.style.setProperty("--tilt-gy", "50%");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    bindings.push({ el, onMove, onLeave });
  }

  return {
    teardown: () => {
      for (const { el, onMove, onLeave } of bindings) {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.style.removeProperty("--tilt-rx");
        el.style.removeProperty("--tilt-ry");
        el.style.removeProperty("--tilt-gx");
        el.style.removeProperty("--tilt-gy");
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* 7 · DirectionalHover (React Bits DirectionalHover, tailored)        */
/* ------------------------------------------------------------------ */

/**
 * Plaque captions flinch away from the arriving cursor, then ease home.
 * Entry vector → --enter-x/--enter-y; a committed .is-pushed frame is
 * released on the next frame so the CSS transition only ever plays the
 * return journey. Upstream slides full overlays; the gallery keeps its
 * caption below the frame and just nudges the note. Fine-pointer only,
 * and the pointer layer never boots under reduced motion.
 */
function buildEnter(): { teardown: () => void } {
  const plaques = Array.from(
    document.querySelectorAll<HTMLElement>(".vignette-plaque")
  );
  const cleanups: Array<() => void> = [];

  for (const el of plaques) {
    const note = el
      .closest(".vignette")
      ?.querySelector<HTMLElement>(".vignette-note");
    if (!note) continue;

    const onEnter = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      note.style.setProperty("--enter-x", `${-Math.sign(px) * 10}px`);
      note.style.setProperty("--enter-y", `${-Math.sign(py) * 6}px`);
      note.classList.add("no-anim", "is-pushed");
      void note.offsetWidth; // commit the offset before releasing it
      note.classList.remove("no-anim", "is-pushed");
    };

    el.addEventListener("pointerenter", onEnter);
    cleanups.push(() => el.removeEventListener("pointerenter", onEnter));
  }

  return {
    teardown: () => {
      for (const fn of cleanups) fn();
    },
  };
}

/* ------------------------------------------------------------------ */
/* 8 · Marquee pace (React Bits ScrollVelocity, tailored)              */
/* ------------------------------------------------------------------ */

/**
 * The CSS keyframes stay the no-JS path; once this layer boots, each band
 * goes .is-driven and a ticker carries the loop instead — base pace matches
 * the 42s CSS loop, then Lenis velocity multiplies it up to ~4x and decays.
 * Pace lives on the TRACK, skew on the BAND: the two never fight. Hover or
 * keyboard focus inside the band parks the advance (WCAG 2.2.2), and the
 * whole thing never exists on touch, reduced motion or no-JS.
 */
function buildPace(lenis: Lenis): { teardown: () => void } {
  const bands = Array.from(document.querySelectorAll<HTMLElement>(".marquee"));
  if (!bands.length) return { teardown: () => {} };
  for (const band of bands) band.classList.add("is-driven");

  let half = 0; // half the track = one full loop (two identical spans)
  let frames = 0;
  const measure = () => {
    const track = bands[0].querySelector<HTMLElement>(".marquee-track");
    half = track ? track.offsetWidth / 2 : 0;
  };
  measure();

  let pos = 0;
  let boost = 0;
  let smooth = 0;
  let last = performance.now();

  const onScroll = (instance: Lenis) => {
    boost = clamp(Math.abs(instance.velocity ?? 0) * 0.35, 0, 3);
  };

  const tick = () => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    frames += 1;
    if (frames % 120 === 0 || !half) measure(); // fonts/resize drift
    if (!half) return;
    boost *= 0.92;
    smooth += (boost - smooth) * 0.08;
    const parked = bands.some((band) => band.matches(":hover, :focus-within"));
    if (!parked) {
      pos -= ((half / 42) * (1 + smooth)) * dt;
      pos = ((pos % half) + half) % half;
      const value = `translate3d(${pos.toFixed(1)}px, 0, 0)`;
      for (const band of bands) {
        const track = band.querySelector<HTMLElement>(".marquee-track");
        if (track) track.style.transform = value;
      }
    }
  };

  lenis.on("scroll", onScroll);
  gsap.ticker.add(tick);

  return {
    teardown: () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      for (const band of bands) {
        band.classList.remove("is-driven");
        const track = band.querySelector<HTMLElement>(".marquee-track");
        if (track) track.style.transform = "";
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* 9 · Clay tick (React Bits ClickSpark, rehabilitated)                */
/* ------------------------------------------------------------------ */

/**
 * A single clay tick — ten sparks, ~220ms of life, slight gravity — on
 * pointer press over buttons, budget chips and the budget slider. The rAF
 * loop parks itself the moment the last spark dies (the house pattern),
 * the canvas sits below the aura, and keyboard users lose nothing: focus
 * rings and press states already speak for them. The pointer layer's own
 * gates keep this off touch and reduced motion.
 */
function buildSparks(): { teardown: () => void } {
  const canvas = document.createElement("canvas");
  canvas.className = "click-sparks";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return { teardown: () => canvas.remove() };

  const SHADES = ["#7a2e18", "#da7134", "#e09a68", "#571f0c"];
  type Spark = {
    x: number; y: number; vx: number; vy: number;
    life: number; ttl: number; size: number; shade: string;
  };
  let parts: Spark[] = [];
  let raf = 0;
  let dpr = 1;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
  };
  resize();

  const step = () => {
    raf = 0;
    const dt = 1 / 60;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = parts.filter((p) => (p.life += dt) < p.ttl);
    for (const p of parts) {
      p.vy += 900 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const k = 1 - p.life / p.ttl;
      ctx.globalAlpha = Math.max(0, k);
      ctx.fillStyle = p.shade;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * k + 0.4, 0, 7);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (parts.length) raf = requestAnimationFrame(step);
  };

  const onDown = (event: PointerEvent) => {
    const hit = (event.target as HTMLElement | null)?.closest?.(
      ".btn, .q-chip, input[type=\"range\"]"
    );
    if (!hit) return;
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 90 + Math.random() * 160;
      parts.push({
        x: event.clientX,
        y: event.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        life: 0,
        ttl: 0.22 + Math.random() * 0.14,
        size: 1.6 + Math.random() * 2.2,
        shade: SHADES[(Math.random() * SHADES.length) | 0],
      });
    }
    if (parts.length > 120) parts.splice(0, parts.length - 120);
    if (!raf) raf = requestAnimationFrame(step);
  };

  document.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("resize", resize);

  return {
    teardown: () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
      canvas.remove();
    },
  };
}

/* ------------------------------------------------------------------ */
/* 10 · Target brackets (React Bits TargetCursor, tailored)            */
/* ------------------------------------------------------------------ */

/**
 * Clay corner-brackets snap around the control under the cursor — the
 * audit's measuring frame. Same delegated INTERACTIVE selector as the
 * aura, but full-width rows and regions are skipped (brackets suit
 * controls, not landscapes). Native cursor untouched; brackets park on
 * scroll and re-acquire on the next hover, so drifting rects never lie.
 */
function buildTarget(): { teardown: () => void } {
  const root = document.createElement("div");
  root.className = "target-cursor";
  root.setAttribute("aria-hidden", "true");
  for (const corner of ["tc-tl", "tc-tr", "tc-bl", "tc-br"]) {
    const span = document.createElement("span");
    span.className = corner;
    root.appendChild(span);
  }
  document.body.appendChild(root);

  const INTERACTIVE =
    'a, button, [role="button"], input, select, textarea, label, summary, [data-cursor]';
  let shown = false;

  const show = (rect: DOMRect) => {
    const pad = 7;
    gsap.to(root, {
      x: rect.left - pad,
      y: rect.top - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
      duration: 0.24,
      ease: "power3.out",
      overwrite: "auto",
    });
    if (!shown) {
      shown = true;
      root.classList.add("is-on");
    }
  };
  const hide = () => {
    if (!shown) return;
    shown = false;
    root.classList.remove("is-on");
  };

  const onOver = (event: PointerEvent) => {
    const hit = (event.target as HTMLElement | null)?.closest?.(
      INTERACTIVE
    ) as HTMLElement | null;
    if (!hit) {
      hide();
      return;
    }
    const rect = hit.getBoundingClientRect();
    if (rect.width > 560 || rect.height > 160 || rect.width < 8) {
      hide();
      return;
    }
    show(rect);
  };

  document.addEventListener("pointerover", onOver, { passive: true });
  window.addEventListener("scroll", hide, { passive: true, capture: true });
  document.documentElement.addEventListener("pointerleave", hide);

  return {
    teardown: () => {
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("scroll", hide, { capture: true } as never);
      document.documentElement.removeEventListener("pointerleave", hide);
      gsap.killTweensOf(root);
      root.remove();
    },
  };
}

/* ------------------------------------------------------------------ */
/* 11 · Crosshair (scoped diagnostic)                                  */
/* ------------------------------------------------------------------ */

/**
 * A clay crosshair trails the cursor — but ONLY while it is over a hero
 * (.hero-minimal or any .page-hero). Anywhere else the lines bow out.
 * Lerped follow on the shared ticker, transform-only, and below the
 * header so chrome never gets crossed. Pointer-layer gates apply.
 */
function buildCrosshair(): { teardown: () => void } {
  const lineX = document.createElement("div");
  lineX.className = "crosshair crosshair-x";
  lineX.setAttribute("aria-hidden", "true");
  const lineY = document.createElement("div");
  lineY.className = "crosshair crosshair-y";
  lineY.setAttribute("aria-hidden", "true");
  document.body.append(lineX, lineY);

  const target = { x: -100, y: -100 };
  const pos = { x: -100, y: -100 };
  let armed = false;
  let live = false;

  const tick = () => {
    pos.x += (target.x - pos.x) * 0.35;
    pos.y += (target.y - pos.y) * 0.35;
    lineX.style.transform = `translate3d(0, ${pos.y.toFixed(1)}px, 0)`;
    lineY.style.transform = `translate3d(${pos.x.toFixed(1)}px, 0, 0)`;
    const next = armed ? "1" : "0";
    if (lineX.style.opacity !== next) {
      lineX.style.opacity = next;
      lineY.style.opacity = next;
    }
  };

  const onMove = (event: PointerEvent) => {
    target.x = event.clientX;
    target.y = event.clientY;
    armed = Boolean(
      (event.target as HTMLElement | null)?.closest?.(
        ".hero-minimal, .page-hero"
      )
    );
    if (!live) {
      live = true;
      pos.x = target.x;
      pos.y = target.y;
      gsap.ticker.add(tick);
    }
  };
  const onLeave = () => {
    armed = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  return {
    teardown: () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
      lineX.remove();
      lineY.remove();
    },
  };
}

/* ------------------------------------------------------------------ */
/* 12 · Pressure (React Bits TextPressure, tailored)                  */
/* ------------------------------------------------------------------ */

/**
 * Display type swells toward the pointer: each char of [data-pressure]
 * rides the Fraunces variable wght axis by proximity (base → 720 across
 * 170px). Both the pointer and every weight are lerped per frame, so the
 * swell glides instead of stepping; settled chars park (zero idle cost)
 * and leaving the window eases the whole line home. Chars stay inline
 * (kerning preserved — weight-only, no warp), inner elements (em,
 * underlines) survive the split, and an IO gate plus a per-heading
 * cheap-reject keep the loop asleep off-screen. Teardown unwraps the
 * chars, restoring pristine DOM for route swaps.
 */
function buildPressure(): { teardown: () => void } {
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-pressure]")
  );
  if (!targets.length) return { teardown: () => {} };

  const charsOf = new Map<HTMLElement, HTMLElement[]>();
  const baseOf = new Map<HTMLElement, number>();
  const cur = new Map<HTMLElement, number>();
  for (const t of targets) {
    const walker = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    const chars: HTMLElement[] = [];
    for (const node of nodes) {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent ?? "") {
        if (ch === " ") {
          frag.appendChild(document.createTextNode(" "));
          continue;
        }
        const s = document.createElement("span");
        s.className = "pchar";
        s.textContent = ch;
        frag.appendChild(s);
        chars.push(s);
      }
      node.parentNode?.replaceChild(frag, node);
    }
    charsOf.set(t, chars);
    // Numeric base per headline, so the swell starts exactly where the
    // static ink sits — no step at the edge of the radius.
    const b = parseFloat(getComputedStyle(t).fontWeight) || 400;
    baseOf.set(t, b);
    for (const ch of chars) cur.set(ch, b);
  }

  const hardReset = (t: HTMLElement) => {
    const b = baseOf.get(t) ?? 400;
    for (const ch of charsOf.get(t) ?? []) {
      cur.set(ch, b);
      if (ch.style.fontWeight) ch.style.fontWeight = "";
    }
  };

  const visible = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const t = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(t);
        else {
          visible.delete(t);
          hardReset(t);
        }
      }
    },
    { threshold: 0.1 }
  );
  for (const t of targets) io.observe(t);

  const RADIUS = 170;
  const POINTER_EASE = 0.35;
  const WEIGHT_EASE = 0.16;
  const SNAP = 0.6;
  const PEAK = 720;
  let raf = 0;
  let running = false;
  let tx = -9999;
  let ty = -9999;
  let px = -9999;
  let py = -9999;

  const tick = () => {
    // The pointer itself is smoothed first — that is what reads as fluid.
    px += (tx - px) * POINTER_EASE;
    py += (ty - py) * POINTER_EASE;
    if (Math.abs(tx - px) < 0.05) px = tx;
    if (Math.abs(ty - py) < 0.05) py = ty;
    let settled = px === tx && py === ty;
    for (const t of visible) {
      const b = baseOf.get(t) ?? 400;
      const rect = t.getBoundingClientRect();
      const near =
        Math.abs(px - (rect.left + rect.width / 2)) <=
          rect.width / 2 + RADIUS &&
        Math.abs(py - (rect.top + rect.height / 2)) <=
          rect.height / 2 + RADIUS;
      for (const ch of charsOf.get(t) ?? []) {
        let target = b;
        if (near) {
          const r = ch.getBoundingClientRect();
          const d = Math.hypot(
            px - (r.left + r.width / 2),
            py - (r.top + r.height / 2)
          );
          // Continuous weights, no quantization steps — the variable font
          // interpolates every fraction.
          if (d <= RADIUS) target = b + (PEAK - b) * (1 - d / RADIUS);
        }
        const curW = cur.get(ch) ?? b;
        const n = curW + (target - curW) * WEIGHT_EASE;
        if (Math.abs(n - target) < SNAP && Math.abs(curW - target) < SNAP) {
          if (curW !== target) {
            cur.set(ch, target);
            ch.style.fontWeight = target === b ? "" : target.toFixed(1);
          }
          continue;
        }
        settled = false;
        cur.set(ch, n);
        ch.style.fontWeight = n.toFixed(1);
      }
    }
    if (settled) {
      raf = 0;
      running = false;
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const kick = () => {
    if (!running) {
      running = true;
      raf = requestAnimationFrame(tick);
    }
  };

  const onMove = (event: PointerEvent) => {
    tx = event.clientX;
    ty = event.clientY;
    kick();
  };
  const onLeave = () => {
    tx = -9999;
    ty = -9999;
    kick();
  };
  // Scroll moves the ink under a static pointer — recompute, eased.
  const onScroll = () => kick();
  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true });

  return {
    teardown: () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      for (const [t, chars] of charsOf) {
        for (const ch of chars) {
          ch.replaceWith(document.createTextNode(ch.textContent ?? ""));
        }
        t.normalize();
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

export function initPointer(lenis: Lenis) {
  if (dispose) return;
  if (!window.matchMedia(FINE_POINTER).matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const magnetics = buildMagnetics();
  const skew = buildSkew(lenis);
  const pan = buildPan();
  const spotlight = buildSpotlight();
  const tilt = buildTilt();
  const enter = buildEnter();
  const pace = buildPace(lenis);
  const sparks = buildSparks();
  const target = buildTarget();
  const crosshair = buildCrosshair();
  const pressure = buildPressure();

  dispose = () => {
    magnetics.teardown();
    skew.teardown();
    pan.teardown();
    spotlight.teardown();
    tilt.teardown();
    enter.teardown();
    pace.teardown();
    sparks.teardown();
    target.teardown();
    crosshair.teardown();
    pressure.teardown();
  };
}

export function destroyPointer() {
  dispose?.();
  dispose = null;
}
