import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Return the horizontal translation that puts a chevron beside the centre slash. */
function convergeX(
  el: HTMLElement,
  side: "left" | "right",
  stage: HTMLElement,
  slash: HTMLElement
) {
  const stageRect = stage.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  const currentX = Number(gsap.getProperty(el, "x")) || 0;
  const slashWidth = slash.getBoundingClientRect().width;
  const centre = stageRect.left + stageRect.width / 2;
  const gap = Math.max(2, slashWidth * 0.02);
  const naturalLeft = rect.left - currentX;
  const naturalRight = rect.right - currentX;

  return side === "left"
    ? centre - slashWidth / 2 - gap - naturalRight
    : centre + slashWidth / 2 + gap - naturalLeft;
}

/** Lift a chevron from its lower corner until its visual centre meets the stage centre. */
function convergeY(el: HTMLElement, stage: HTMLElement) {
  const pane = el.querySelector<HTMLElement>(".hero-sign-pane");
  const currentY = Number(gsap.getProperty(el, "y")) || 0;
  const stageRect = stage.getBoundingClientRect();
  const rect = (pane ?? el).getBoundingClientRect();
  const naturalCentre = rect.top + rect.height / 2 - currentY;
  return stageRect.top + stageRect.height / 2 - naturalCentre;
}

/**
 * A wheel-led opening scene:
 * 1. the promise dissolves;
 * 2. the isolated < and > converge;
 * 3. the slash resolves them into </>;
 * 4. a restrained loading line completes before Lenis carries the visitor on.
 */
export function playHero() {
  const root = document.querySelector<HTMLElement>(".hero-minimal");
  if (!root) return;

  const stage = root.querySelector<HTMLElement>(".hero-stage");
  const left = root.querySelector<HTMLElement>(".hero-sign-l");
  const right = root.querySelector<HTMLElement>(".hero-sign-r");
  const slash = root.querySelector<HTMLElement>(".hero-code-slash");
  const type = root.querySelector<HTMLElement>(".hero-cluster");
  const bar = root.querySelector<HTMLElement>(".hero-toolbar");
  const floor = root.querySelector<HTMLElement>(".hero-floor");
  const loader = root.querySelector<HTMLElement>(".hero-loader");
  const loaderFill = root.querySelector<HTMLElement>(".hero-loader-fill");
  const loaderValue = root.querySelector<HTMLElement>(".hero-loader-value");
  if (!stage || !left || !right || !slash || !loader || !loaderFill) return;

  let handedOff = false;
  const progress = { value: 0 };

  const handOff = () => {
    if (handedOff) return;
    handedOff = true;
    window.dispatchEvent(
      new CustomEvent("motion:scrollTo", { detail: "#after-hero" })
    );
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "hero-converge",
      trigger: root,
      start: () => {
        const header = document.querySelector<HTMLElement>(".site-header");
        return `top ${header?.offsetHeight ?? 68}px`;
      },
      end: window.matchMedia("(max-width: 760px)").matches ? "+=150%" : "+=220%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: window.matchMedia("(max-width: 760px)").matches ? 0.5 : 0.9,
      invalidateOnRefresh: true,
    },
  });

  if (type) {
    tl.fromTo(
      type,
      { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
      { y: -64, scale: 0.72, opacity: 0, filter: "blur(12px)", duration: 0.34 },
      0
    );
  }
  if (bar) tl.to(bar, { opacity: 0, y: 14, duration: 0.18 }, 0);
  if (floor) tl.to(floor, { opacity: 0, duration: 0.16 }, 0);

  tl.to(
    left,
    {
      x: () => convergeX(left, "left", stage, slash),
      y: () => convergeY(left, stage),
      duration: 0.48,
    },
    0.2
  )
    .to(
      right,
      {
        x: () => convergeX(right, "right", stage, slash),
        y: () => convergeY(right, stage),
        duration: 0.48,
      },
      0.2
    )
    .fromTo(
      slash,
      { opacity: 0, scaleY: 0.2, rotate: 14 },
      { opacity: 1, scaleY: 1, rotate: 0, duration: 0.16 },
      0.66
    )
    .fromTo(
      loader,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.1 },
      0.76
    )
    .fromTo(
      loaderFill,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.2 },
      0.8
    )
    .to(
      progress,
      {
        value: 100,
        duration: 0.2,
        onUpdate: () => {
          if (loaderValue) loaderValue.textContent = `${Math.round(progress.value)}`;
        },
      },
      0.8
    )
    .call(handOff, [], 1);
}
