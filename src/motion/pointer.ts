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
/* 1 · Cursor aura                                                     */
/* ------------------------------------------------------------------ */

/**
 * A difference-blended dot (fast) and ring (slow) that trail the pointer.
 * The ring eases with a long lerp so it reads as a weight following the
 * cursor — deliberately the only "timer-free" motion here: it tracks
 * input 1:1 rather than playing a duration, so it can never block a task.
 */
function buildAura(): { teardown: () => void } {
  const root = document.createElement("div");
  root.className = "cursor-aura";
  root.setAttribute("aria-hidden", "true");

  const dot = document.createElement("span");
  dot.className = "cursor-aura-dot";
  const ring = document.createElement("span");
  ring.className = "cursor-aura-ring";
  root.append(ring, dot);
  document.body.appendChild(root);

  const target = { x: -100, y: -100 };
  const dotPos = { x: -100, y: -100, s: 1 };
  const ringPos = { x: -100, y: -100, s: 1 };
  const scaleTarget = { dot: 1, ring: 1 };
  let live = false;

  const render = () => {
    dotPos.x += (target.x - dotPos.x) * 0.55;
    dotPos.y += (target.y - dotPos.y) * 0.55;
    ringPos.x += (target.x - ringPos.x) * 0.16;
    ringPos.y += (target.y - ringPos.y) * 0.16;
    dotPos.s += (scaleTarget.dot - dotPos.s) * 0.2;
    ringPos.s += (scaleTarget.ring - ringPos.s) * 0.2;

    dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${dotPos.s.toFixed(3)})`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringPos.s.toFixed(3)})`;
  };

  const tick = () => {
    if (!live) return;
    render();
  };

  const onMove = (event: PointerEvent) => {
    target.x = event.clientX;
    target.y = event.clientY;
    if (!live) {
      live = true;
      dotPos.x = ringPos.x = target.x;
      dotPos.y = ringPos.y = target.y;
      root.classList.add("is-live");
      gsap.ticker.add(tick);
    }
  };

  /* Delegated hover state — one listener for the whole document. */
  const INTERACTIVE =
    'a, button, [role="button"], input, select, textarea, label, summary, [data-cursor]';
  const onOver = (event: PointerEvent) => {
    const hit = (event.target as HTMLElement | null)?.closest?.(INTERACTIVE);
    root.classList.toggle("is-link", Boolean(hit));
    scaleTarget.dot = hit ? 1.7 : 1;
    scaleTarget.ring = hit ? 1.55 : 1;
  };

  const onDown = () => {
    root.classList.add("is-down");
    scaleTarget.dot = 0.72;
    scaleTarget.ring = 0.8;
  };
  const onUp = () => {
    root.classList.remove("is-down");
    const linked = root.classList.contains("is-link");
    scaleTarget.dot = linked ? 1.7 : 1;
    scaleTarget.ring = linked ? 1.55 : 1;
  };

  /* Leave the window → the aura bows out. */
  const onLeave = () => root.classList.remove("is-live");
  const onEnter = () => {
    if (live) root.classList.add("is-live");
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("pointerdown", onDown, { passive: true });
  document.addEventListener("pointerup", onUp, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  document.documentElement.addEventListener("pointerenter", onEnter);

  return {
    teardown: () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      root.remove();
    },
  };
}

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
/* 5 · Spotlight (React Bits SpotlightCard, tailored)                  */
/* ------------------------------------------------------------------ */

/**
 * One delegated pointermove feeds --spot-x/--spot-y (element-relative %)
 * to whatever [data-spotlight] row or card sits under the cursor. The glow
 * itself is a CSS radial-gradient pseudo that fades on --spot-o, so hover,
 * :focus-within and :focus-visible all get it — keyboard parity for free —
 * and no-JS readers still get a centred wash on hover. Percentage coords
 * keep the light glued through scroll and resize. Upstream uses per-card
 * listeners + a motion dep; delegation + tokens do the same work here.
 */
function buildSpotlight(): { teardown: () => void } {
  let current: HTMLElement | null = null;
  let raf = 0;
  let pending: PointerEvent | null = null;

  const apply = () => {
    raf = 0;
    const event = pending;
    pending = null;
    if (!event) return;
    const hit = (event.target as HTMLElement | null)?.closest?.(
      "[data-spotlight]"
    ) as HTMLElement | null;
    if (hit !== current) current = hit;
    if (!current) return;
    const rect = current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    current.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
    current.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
  };

  const onMove = (event: PointerEvent) => {
    pending = event;
    if (!raf) raf = requestAnimationFrame(apply);
  };

  document.addEventListener("pointermove", onMove, { passive: true });

  return {
    teardown: () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      document
        .querySelectorAll<HTMLElement>("[data-spotlight]")
        .forEach((el) => {
          el.style.removeProperty("--spot-x");
          el.style.removeProperty("--spot-y");
        });
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
/* Boot                                                                */
/* ------------------------------------------------------------------ */

export function initPointer(lenis: Lenis) {
  if (dispose) return;
  if (!window.matchMedia(FINE_POINTER).matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const aura = buildAura();
  const magnetics = buildMagnetics();
  const skew = buildSkew(lenis);
  const pan = buildPan();
  const spotlight = buildSpotlight();
  const tilt = buildTilt();
  const enter = buildEnter();
  const pace = buildPace(lenis);

  dispose = () => {
    aura.teardown();
    magnetics.teardown();
    skew.teardown();
    pan.teardown();
    spotlight.teardown();
    tilt.teardown();
    enter.teardown();
    pace.teardown();
  };
}

export function destroyPointer() {
  dispose?.();
  dispose = null;
}
