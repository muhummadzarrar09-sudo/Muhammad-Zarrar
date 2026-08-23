import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero — GSAP PIN. The dev sign halves rest at the bottom corners, tilted 45°.
 * GSAP pins the hero; the halves slide together and lock into one complete
 * </> glyph. A loader line draws underneath, then the "Scroll to explore"
 * prompt fades in.
 */
export function playHero() {
  const root = document.querySelector<HTMLElement>(".hero-minimal");
  if (!root) return;

  const left = root.querySelector<HTMLElement>(".hero-sign-l");
  const right = root.querySelector<HTMLElement>(".hero-sign-r");
  const type = root.querySelector<HTMLElement>(".hero-cluster");
  const bar = root.querySelector<HTMLElement>(".hero-toolbar");
  const loaderLine = root.querySelector<HTMLElement>(".hero-loader-line");
  const floor = root.querySelector<HTMLElement>(".hero-floor");
  if (!left || !right) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const scrub = mobile ? 0.5 : 0.9;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "hero-converge",
      trigger: root,
      start: "top top",
      end: mobile ? "+=120%" : "+=160%",
      pin: true,
      scrub,
      invalidateOnRefresh: true,
    },
  });

  /* Phase 1: Promise text rises and softens (0 – 0.25) */
  if (type) {
    tl.fromTo(
      type,
      { y: 0, opacity: 1 },
      { y: mobile ? -30 : -50, opacity: 0.7, duration: 0.25 },
      0
    );
  }
  if (bar) {
    tl.fromTo(
      bar,
      { y: 0, opacity: 1 },
      { y: mobile ? -20 : -35, opacity: 0.5, duration: 0.22 },
      0
    );
  }

  /* Phase 2: Sign halves converge + un-tilt (0.05 – 0.65)
     Use function-based values so invalidateOnRefresh recalculates. */
  tl.fromTo(
    left,
    { x: 0, y: 0, rotation: -45, scale: mobile ? 0.8 : 1 },
    {
      x: () => {
        const lock = root.querySelector<HTMLElement>(".hero-lock");
        if (!lock) return 0;
        const lr = lock.getBoundingClientRect();
        const er = left.getBoundingClientRect();
        return (lr.left + lr.width / 2) - (er.left + er.width / 2);
      },
      y: () => {
        const lock = root.querySelector<HTMLElement>(".hero-lock");
        if (!lock) return 0;
        const lr = lock.getBoundingClientRect();
        const er = left.getBoundingClientRect();
        return (lr.top + lr.height * 0.45) - (er.top + er.height / 2);
      },
      rotation: 0,
      scale: mobile ? 0.6 : 0.7,
      duration: 0.6,
      ease: "power2.inOut",
    },
    0.05
  );

  tl.fromTo(
    right,
    { x: 0, y: 0, rotation: 45, scale: mobile ? 0.8 : 1 },
    {
      x: () => {
        const lock = root.querySelector<HTMLElement>(".hero-lock");
        if (!lock) return 0;
        const lr = lock.getBoundingClientRect();
        const er = right.getBoundingClientRect();
        return (lr.left + lr.width / 2) - (er.left + er.width / 2);
      },
      y: () => {
        const lock = root.querySelector<HTMLElement>(".hero-lock");
        if (!lock) return 0;
        const lr = lock.getBoundingClientRect();
        const er = right.getBoundingClientRect();
        return (lr.top + lr.height * 0.45) - (er.top + er.height / 2);
      },
      rotation: 0,
      scale: mobile ? 0.6 : 0.7,
      duration: 0.6,
      ease: "power2.inOut",
    },
    0.05
  );

  /* Phase 3: Loader line draws from center outward (0.65 – 0.82) */
  if (loaderLine) {
    tl.fromTo(
      loaderLine,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.17, ease: "power1.inOut" },
      0.65
    );
  }

  /* Phase 4: "Scroll to explore" prompt fades in (0.82 – 1.0) */
  if (floor) {
    tl.fromTo(
      floor,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.18 },
      0.82
    );
  }
}
