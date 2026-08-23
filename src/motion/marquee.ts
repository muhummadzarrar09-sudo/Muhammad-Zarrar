import gsap from "gsap";
import { motionState } from "./engine";

/**
 * Velocity-reactive marquee.
 *
 * At rest the wall label drifts left at reading speed. Sweep the wheel and
 * the strip answers — scrolling down pulls it faster, scrolling up drags it
 * backwards — then it settles back into its idle drift. Scroll away and
 * stop, and it keeps moving: the room never fully stops breathing.
 *
 * Only runs under `html.has-motion`. Reduced-motion keeps the static CSS
 * animation (which `globals.css` disables only for .has-motion).
 */

const BASE_PX_PER_MS = 0.028; // ≈ the old 42s CSS loop at typical width
const MAX_BOOST = 0.16;

let stop: (() => void) | null = null;

export function playMarquee() {
  const track = document.querySelector<HTMLElement>(".marquee-track");
  if (!track || !track.firstElementChild) return;

  let x = 0;
  let boost = 0;

  const tick = (_time: number, dt: number) => {
    const step = Math.min(dt, 50); // keep tab-switch spikes tame
    // Ease toward the wheel's velocity, then decay — a swell, not a snap.
    const target = gsap.utils.clamp(-MAX_BOOST, MAX_BOOST, motionState.velocity * 0.0022);
    boost += (target - boost) * 0.08;
    x -= (BASE_PX_PER_MS + boost) * step;

    const half = track.scrollWidth / 2;
    if (half > 0) {
      if (x <= -half) x += half;
      if (x > 0) x -= half;
    }
    gsap.set(track, { x });
  };

  gsap.ticker.add(tick);
  stop = () => {
    gsap.ticker.remove(tick);
    gsap.set(track, { x: 0 });
    stop = null;
  };
}

export function stopMarquee() {
  stop?.();
}
