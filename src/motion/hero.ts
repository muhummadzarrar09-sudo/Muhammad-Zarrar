import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function meetX(el: HTMLElement, side: "l" | "r", stage: HTMLElement) {
  const current = Number(gsap.getProperty(el, "x")) || 0;
  const sr = stage.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  const mid = sr.left + sr.width / 2;
  const left = er.left - current;
  if (side === "l") return mid - (left + er.width);
  return mid - left;
}

function arc(el: HTMLElement, side: "l" | "r", stage: HTMLElement, dip: number) {
  const end = meetX(el, side, stage);
  return [
    { x: 0, y: 0 },
    { x: end * 0.48, y: dip },
    { x: end, y: 0 },
  ];
}

/**
 * Hero leave — the promise swooshes back. The two halves of the
 * glass sign ride an arc and lock into one mark.
 */
export function playHero() {
  const root = document.querySelector<HTMLElement>(".hero-minimal");
  if (!root) return;

  const stage = root.querySelector<HTMLElement>(".hero-stage");
  const left = root.querySelector<HTMLElement>(".hero-sign-l");
  const right = root.querySelector<HTMLElement>(".hero-sign-r");
  const type = root.querySelector<HTMLElement>(".hero-cluster");
  const bar = root.querySelector<HTMLElement>(".hero-toolbar");
  const floor = root.querySelector<HTMLElement>(".hero-floor");
  if (!stage || !left || !right) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const pinEnd = mobile ? "+=100%" : "+=160%";
  const scrub = mobile ? 0.45 : 0.95;
  const dip = mobile ? 36 : 72;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "hero-converge",
      trigger: root,
      start: "top top",
      end: pinEnd,
      // Do not let ScrollTrigger physically re-parent a React-owned section.
      // CSS owns the visual hold; the timeline remains fully scrubbed.
      pin: false,
      scrub,
      invalidateOnRefresh: true,
    },
  });

  if (type) {
    tl.fromTo(
      type,
      { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
      { y: -90, scale: 0.42, opacity: 0, filter: "blur(10px)", duration: 0.55 },
      0
    );
  }
  if (bar) {
    tl.fromTo(bar, { opacity: 1, y: 0 }, { opacity: 0, y: 16, duration: 0.22 }, 0);
  }
  if (floor) {
    tl.fromTo(floor, { opacity: 1 }, { opacity: 0, duration: 0.18 }, 0);
  }

  tl.to(
    left,
    {
      duration: 1,
      motionPath: {
        path: arc(left, "l", stage, dip),
        curviness: 1.25,
        autoRotate: false,
      },
    },
    0.08
  );

  tl.to(
    right,
    {
      duration: 1,
      motionPath: {
        path: arc(right, "r", stage, dip),
        curviness: 1.25,
        autoRotate: false,
      },
    },
    0.08
  );
}
