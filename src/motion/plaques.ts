import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HANG_ANGLES = [-5, 4, -4];

/**
 * Three circular plaques hang in the ink room. The image is the plaque; the
 * caption remains a quiet wall label below it. Everything in this room uses
 * one scrubbed timeline, so the plaques enter, settle and rewind with the
 * visitor's scroll instead of completing on an unrelated timer.
 */
export function playPlaques() {
  const root = document.querySelector<HTMLElement>(".room-ink");
  if (!root) return;

  const plaques = Array.from(
    root.querySelectorAll<HTMLElement>(".vignette-plaque")
  );
  if (!plaques.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const scrub = mobile ? 0.4 : 0.75;
  const label = root.querySelector<HTMLElement>(".room-label");
  const title = root.querySelector<HTMLElement>(".room-title");

  const room = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "plaque-room",
      trigger: root,
      start: mobile ? "top 86%" : "top 84%",
      end: mobile ? "bottom 64%" : "bottom 66%",
      scrub,
      invalidateOnRefresh: true,
    },
  });

  /* The room label and title lead the plaques by a short, readable beat. */
  if (label) {
    room.fromTo(
      label,
      { y: 20, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.12 },
      0
    );
  }

  if (title) {
    room.fromTo(
      title,
      { y: 42, opacity: 0.15 },
      { y: 0, opacity: 1, duration: 0.18 },
      0.05
    );
  }

  plaques.forEach((el, i) => {
    const angle = HANG_ANGLES[i % HANG_ANGLES.length];
    const at = 0.22 + i * (mobile ? 0.2 : 0.17);
    const settleAngle = angle > 0 ? -0.8 : 0.8;

    /* A short vertical arrival gives the cord a believable pivot. The tiny
       opposite tilt is the settle; there is no sideways fly-in or guillotine
       mask to make the artwork look like a UI panel. */
    room
      .fromTo(
        el,
        {
          y: mobile ? -30 : -56,
          rotate: angle,
          scale: 0.96,
          opacity: 0,
        },
        {
          y: 0,
          rotate: settleAngle,
          scale: 1,
          opacity: 1,
          duration: 0.58,
        },
        at
      )
      .to(el, { rotate: 0, duration: 0.22 }, at + 0.58);
  });
}
