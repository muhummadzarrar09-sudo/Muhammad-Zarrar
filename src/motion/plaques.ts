import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TILT = [-11, 7, -6];

/* Scatter offsets — plaques start at random-ish positions and assemble */
const SCATTER_X = [-120, 90, -60];
const SCATTER_Y = [40, -30, 70];
const SCATTER_ROTATE = [-25, 18, -15];

/**
 * Three circular plaques hang into the black room — scatter-to-grid assembly.
 * Start scattered and rotated, then assemble into their grid positions
 * on scroll. Wheel-tied. Scroll back and they scatter again.
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
    const scatterX = (SCATTER_X[i] ?? (i % 2 === 0 ? -80 : 80)) * (mobile ? 0.5 : 1);
    const scatterY = (SCATTER_Y[i] ?? 40) * (mobile ? 0.5 : 1);
    const scatterRotate = SCATTER_ROTATE[i] ?? (i % 2 === 0 ? -15 : 15);

    gsap.fromTo(
      el,
      {
        x: scatterX,
        y: scatterY + (mobile ? 64 : 110),
        rotation: scatterRotate + tilt,
        scale: 0.6,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
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
