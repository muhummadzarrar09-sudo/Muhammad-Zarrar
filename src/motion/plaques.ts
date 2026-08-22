import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TILT = [-11, 7, -6];

/**
 * Three circular plaques hang into the black room — gallery nails,
 * not a fade. Wheel-tied. Scroll back and they lift off again.
 */
export function playPlaques() {
  const root = document.querySelector<HTMLElement>(".room-ink");
  if (!root) return;

  const plaques = Array.from(root.querySelectorAll<HTMLElement>(".vignette"));
  if (!plaques.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const scrub = mobile ? 0.4 : 0.9;

  const label = root.querySelector(".room-label");
  const title = root.querySelector(".room-title");

  if (label) {
    gsap.fromTo(
      label,
      { y: 24, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: "plaque-label",
          trigger: root,
          start: "top 88%",
          end: "top 40%",
          scrub,
        },
      }
    );
  }

  if (title) {
    gsap.fromTo(
      title,
      { y: 48, opacity: 0.15 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: "plaque-title",
          trigger: root,
          start: "top 84%",
          end: "top 32%",
          scrub,
        },
      }
    );
  }

  plaques.forEach((el, i) => {
    const tilt = TILT[i] ?? (i % 2 === 0 ? -8 : 8);
    gsap.fromTo(
      el,
      { y: mobile ? 64 : 110, rotate: tilt, scale: 0.72, opacity: 0.15 },
      {
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: `plaque-${i}`,
          trigger: root,
          start: `top ${78 - i * 8}%`,
          end: `top ${28 - i * 4}%`,
          scrub,
        },
      }
    );
  });
}
