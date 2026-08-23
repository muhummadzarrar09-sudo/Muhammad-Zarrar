import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Marquee Velocity — the marquee track speeds up when scrolling down
 * and slows when scrolling up. Uses CSS custom properties to modulate
 * the animation-duration, avoiding transform conflicts with the CSS
 * keyframe animation.
 */
export function playMarqueeVelocity() {
  const marquees = document.querySelectorAll<HTMLElement>(".marquee");
  if (!marquees.length) return;

  const BASE_SPEED = 42; /* seconds for full cycle, matches CSS */
  const MAX_SPEED_MULT = 3.5; /* max 3.5x faster */
  const MIN_SPEED_MULT = 0.3; /* can slow to 0.3x (almost stopped) */

  let lastScrollY = window.scrollY;
  let velocity = 0;
  let rafId = 0;

  const update = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    /* Smooth the velocity with a lerp */
    velocity = gsap.utils.interpolate(velocity, delta, 0.1);

    /* Map velocity to a speed multiplier:
       - Scrolling down (positive delta) → faster marquee
       - Scrolling up (negative delta) → slower marquee
       - No scroll → base speed */
    const normalizedVel = velocity / 15; /* normalize to roughly -1 to +1 */
    const speedMult = Math.max(
      MIN_SPEED_MULT,
      Math.min(MAX_SPEED_MULT, 1 + normalizedVel)
    );

    /* Calculate new duration: faster multiplier = shorter duration */
    const newDuration = BASE_SPEED / speedMult;

    marquees.forEach((marquee) => {
      marquee.style.setProperty("--marquee-speed", `${newDuration.toFixed(1)}s`);
    });

    rafId = requestAnimationFrame(update);
  };

  /* Only run when motion is enabled */
  if (document.documentElement.classList.contains("has-motion")) {
    rafId = requestAnimationFrame(update);
  }

  /* Return cleanup function */
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    marquees.forEach((marquee) => {
      marquee.style.removeProperty("--marquee-speed");
    });
  };
}
