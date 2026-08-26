import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TILT = [-11, 7, -6];

/**
 * Three circular plaques hang into the black room — gallery nails,
 * not a fade. They drop into place in sequence as the room arrives, then
 * lift off again when the visitor scrolls back above it.
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

  /*
   * This is intentionally a play/reverse entrance rather than a scrubbed
   * transform. Each plaque falls from above, catches with a small overshoot,
   * and settles before the next one drops — the champion-card feeling.
   */
  const drop = gsap.timeline({
    scrollTrigger: {
      id: "plaque-cards",
      trigger: root,
      start: "top 76%",
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

  plaques.forEach((el, i) => {
    const tilt = TILT[i] ?? (i % 2 === 0 ? -8 : 8);
    drop.fromTo(
      el,
      {
        y: mobile ? -84 : -120,
        rotate: tilt,
        scale: 0.82,
        opacity: 0,
      },
      {
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 0.72,
        ease: "back.out(1.18)",
      },
      i * (mobile ? 0.16 : 0.12)
    );
  });
}
