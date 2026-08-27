import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Point = { x: number; y: number };

/** Read an untransformed offset all the way back to the stage. */
function layoutOffset(
  el: HTMLElement,
  ancestor: HTMLElement,
  axis: "x" | "y"
) {
  let value = 0;
  let current: HTMLElement | null = el;

  while (current && current !== ancestor) {
    value += axis === "x" ? current.offsetLeft : current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return value;
}

/** Return the horizontal translation that puts a chevron beside the centre slash. */
function convergeX(
  el: HTMLElement,
  side: "left" | "right",
  stage: HTMLElement,
  slash: HTMLElement
) {
  const stageRect = stage.getBoundingClientRect();
  const slashRect = slash.getBoundingClientRect();
  const slashWidth = slashRect.width;
  // Use the slash's actual rendered centre rather than assuming the stage
  // starts at x=0. This survives fullscreen, mobile browser chrome and any
  // future change to the hero's horizontal inset.
  const centre = slashRect.left + slashWidth / 2;
  // Give the slash a deliberate optical gutter. The old 7px minimum was
  // swallowed by the heavy strokes, making the final </> lockup feel cramped.
  const gap = Math.max(14, slashWidth * 0.22);
  // The slash path occupies x=8…32 (including its round stroke) inside a
  // 40-unit viewBox, so its visible half-width is 30% of the SVG box.
  const slashInkHalf = slashWidth * 0.3;
  // Layout offsets describe the untransformed box. That matters here: the
  // opening pose is rotated, while the completed mark must resolve upright.
  const naturalLeft = stageRect.left + layoutOffset(el, stage, "x");
  // The SVG path occupies x=18…78 for `<` and x=22…82 for `>`.
  // Meet those visible strokes—not the transparent viewBox padding.
  const visibleInnerEdge = side === "left"
    ? naturalLeft + el.offsetWidth * 0.78
    : naturalLeft + el.offsetWidth * 0.22;

  return side === "left"
    ? centre - slashInkHalf - gap - visibleInnerEdge
    : centre + slashInkHalf + gap - visibleInnerEdge;
}

/** Lift a chevron from its lower corner until its visual centre meets the slash. */
function convergeY(el: HTMLElement, stage: HTMLElement, slash: HTMLElement) {
  const stageRect = stage.getBoundingClientRect();
  const slashRect = slash.getBoundingClientRect();
  const pane = el.querySelector<HTMLElement>(".hero-sign-pane");
  const paneTop = pane ? layoutOffset(pane, el, "y") : 0;
  const paneHeight = pane?.offsetHeight ?? el.offsetHeight;
  // Use the untransformed layout box for the current centre, but the slash's
  // actual rendered centre for the target. That keeps the two marks aligned
  // when fullscreen changes the viewport height or the header inset.
  const naturalCentre =
    stageRect.top + layoutOffset(el, stage, "y") + paneTop + paneHeight / 2;
  const targetCentre = slashRect.top + slashRect.height / 2;
  return targetCentre - naturalCentre;
}

/** A mirrored, rising inward arc from either lower screen edge. */
function risePath(
  el: HTMLElement,
  side: "left" | "right",
  stage: HTMLElement,
  slash: HTMLElement
) {
  const x = convergeX(el, side, stage, slash);
  const y = convergeY(el, stage, slash);
  return [
    { x: 0, y: 0 },
    { x: x * 0.16, y: y * 0.08 },
    { x: x * 0.4, y: y * 0.55 },
    { x: x * 0.72, y: y * 0.88 },
    { x, y },
  ];
}

function refreshHeroPaths(
  timeline: gsap.core.Timeline,
  stage: HTMLElement,
  slash: HTMLElement,
  left: HTMLElement,
  right: HTMLElement
) {
  const children = timeline.getChildren(false, true, false);
  const paths: Array<[string, "left" | "right", HTMLElement]> = [
    ["hero-left-converge", "left", left],
    ["hero-right-converge", "right", right],
  ];

  for (const [id, side, target] of paths) {
    const tween = children.find((child) => child.vars.id === id) as
      | gsap.core.Tween
      | undefined;
    const motionPath = tween?.vars.motionPath;

    if (
      !motionPath ||
      typeof motionPath !== "object" ||
      Array.isArray(motionPath)
    ) {
      continue;
    }

    (motionPath as { path: Point[] }).path = risePath(
      target,
      side,
      stage,
      slash
    );
  }
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
      // F11 and mobile browser chrome can change both dimensions after the
      // scene is built. Recalculate the motion path before GSAP invalidates
      // the timeline so the final chevrons still land on the slash centre.
      onRefreshInit: (self) => {
        const animation = self.animation as gsap.core.Timeline | undefined;
        if (animation) refreshHeroPaths(animation, stage, slash, left, right);
      },
      onLeave: handOff,
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
      id: "hero-left-converge",
      rotation: 0,
      duration: 0.48,
      motionPath: {
        path: risePath(left, "left", stage, slash),
        curviness: 1.35,
        autoRotate: false,
      },
    },
    0.2
  )
    .to(
      right,
      {
        id: "hero-right-converge",
        rotation: 0,
        duration: 0.48,
        motionPath: {
          path: risePath(right, "right", stage, slash),
          curviness: 1.35,
          autoRotate: false,
        },
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
