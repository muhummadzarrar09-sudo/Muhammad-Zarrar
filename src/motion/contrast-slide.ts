import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Contrast Rows — "Usual" slides from LEFT, "Here" slides from RIGHT.
 * Each contrast-row pair meets in the middle with a staggered delay.
 */
export function playContrastSlide() {
  const rows = document.querySelectorAll<HTMLElement>(".contrast-row");
  if (!rows.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;

  rows.forEach((row, i) => {
    const usual = row.querySelector<HTMLElement>(".contrast-usual");
    const here = row.querySelector<HTMLElement>(".contrast-here");
    if (!usual || !here) return;

    const offset = mobile ? 40 : 80;

    gsap.fromTo(
      usual,
      { x: -offset, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: `contrast-usual-${i}`,
          trigger: row,
          start: "top 88%",
          end: "top 50%",
          scrub: mobile ? 0.35 : 0.7,
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.fromTo(
      here,
      { x: offset, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: `contrast-here-${i}`,
          trigger: row,
          start: "top 88%",
          end: "top 50%",
          scrub: mobile ? 0.35 : 0.7,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}
