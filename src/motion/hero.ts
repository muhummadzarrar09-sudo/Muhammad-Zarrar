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

/*
  PHONE CHROME — why the opening scene re-fits itself
  ---------------------------------------------------
  A phone retracts its tool/search bar a moment after you start scrolling, and
  the screen gets ~60–90px taller. Three things used to disagree about that:

  1. the room was 100svh, so it went on resolving to the *small* box and
     stopped short of the bottom edge — the ground showed through under the
     floor and the hero read as clipped exactly as the bar disappeared
     (fixed in globals.css: 100dvh, so the wall always paints under the whole
     screen). ScrollTrigger cannot act on that resize either, so the pin
     spacer would otherwise keep the exact distance the short box needed and
     the lockup's final beat would spill into the proof rail;
  2. the converge arc was measured against the taller box while the mark was
     still positioned against the smaller one, so once the scrub started the
     chevrons arrived below the slash and the </> lockup came up crooked;
  3. ScrollTrigger deliberately ignores this resize (it is browser chrome, not
     a page resize), so nothing ever re-measured.

  Re-measuring is ours to do, and it has to be a real refresh: the pin's
  distance is derived from the room's height, so only a refresh can re-derive
  it (see `end` below). It runs once the bar has finished animating, which is
  also the moment the layout stops moving — refreshing mid-slide would bake a
  half-grown height into the spacer and leave a different overlap behind.
*/
const REFIT_SLOP = 8; // px — smaller than any toolbar step, larger than jitter
const REFIT_SETTLE = 180; // ms — let the bar finish animating before measuring

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
  const crank = root.querySelector<HTMLElement>(".crank-ring");
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

  /* The chevrons open rotated by CSS (`rotate(±45deg)`), so the rotation they
     travel back from has to be in the tween — not read off the element. A
     re-fit (or any F11 / rotation refresh) re-initialises these poses, and an
     implicit "from" would lock in whatever the opening rotation had scrubbed
     to. Same discipline for the toolbar, the floor and the counter below:
     every pose states where it starts. */
  const OPEN_ROTATION = { left: -45, right: 45 };

  /* The scene is authored as a multiple of the room's own height — a device
     whose screen is 844 tall gets an 844-tall room *and* the longer travel
     that goes with it, rather than a 844-tall room pinned inside the 700px
     journey the shorter screen asked for. Expressed as a function so a
     refresh re-derives it. */
  const PIN_SPAN = 1.5; // phone; 2.2 on desktop
  const PIN_SPAN_WIDE = 2.2;

  const pinLength = () =>
    Math.round(
      root.offsetHeight *
        (window.matchMedia("(max-width: 760px)").matches
          ? PIN_SPAN
          : PIN_SPAN_WIDE)
    );

  let fittedHeight = root.offsetHeight;
  let settleTimer = 0;

  /**
   * The bar has stopped moving: re-measure the room, its arcs and its pin.
   * A refresh re-runs `onRefreshInit` (fresh motion paths) and re-inits every
   * tween, which is only lossless because each pose below carries an explicit
   * start value — a bare .to() would freeze at whatever the scrub had
   * already reached.
   */
  const refit = () => {
    // The route may have moved on while the bar was still animating.
    if (!root.isConnected) return;
    const height = root.offsetHeight;
    if (Math.abs(height - fittedHeight) < REFIT_SLOP) return;
    fittedHeight = height;
    ScrollTrigger.refresh();
  };

  const onViewportResize = () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(refit, REFIT_SETTLE);
  };

  const trackViewport = () => {
    window.clearTimeout(settleTimer);
    window.removeEventListener("resize", onViewportResize);
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "hero-converge",
      trigger: root,
      // The header is a fixed overlay now; the hero is pulled under it
      // with a negative margin. Pinning from `top ${header.offsetHeight}`
      // treated the scene as already 64px into the scrub on load, so the
      // first wheel tick jumped the pin-spacer — the navbar looked like
      // it was sliding/resizing with the page.
      start: "top top",
      // Same distance the author wrote as `+=150%` / `+=220%`, but read off
      // the live room every time the scene is measured — so a phone that grew
      // a tool-bar's worth of screen (see PHONE CHROME above) gets the travel
      // that matches it instead of the travel its first, shorter frame asked
      // for. On an untouched load this is byte-for-byte the old value.
      end: () => `+=${pinLength()}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,
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
      onKill: trackViewport,
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
  if (bar) {
    tl.fromTo(
      bar,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 14, duration: 0.18 },
      0
    );
  }
  /* The scroll crank (React Bits CircularText, tailored) turns WITH the
     wheel — a reel, not a spinner — then bows out as the line completes. */
  if (crank) {
    tl.fromTo(
      crank,
      { rotation: 0, transformOrigin: "50% 50%" },
      { rotation: 300, duration: 0.88, ease: "none" },
      0
    );
  }
  if (floor) {
    tl.fromTo(
      floor,
      { opacity: 1 },
      { opacity: 0, duration: 0.1, ease: "none" },
      0.9
    );
  }

  tl.fromTo(
    left,
    { rotation: OPEN_ROTATION.left },
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
    .fromTo(
      right,
      { rotation: OPEN_ROTATION.right },
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
    .fromTo(
      progress,
      { value: 0 },
      {
        value: 100,
        duration: 0.2,
        /* The counter renders from the tween, not from whatever the DOM last
           showed — a refresh mid-scrub would otherwise freeze the readout at
           the value it happened to hold. */
        onUpdate: () => {
          if (loaderValue) loaderValue.textContent = `${Math.round(progress.value)}`;
        },
      },
      0.8
    )
    .call(handOff, [], 1);

  // The toolbar retracting is a resize ScrollTrigger will not act on, so the
  // scene watches the box itself. See the PHONE CHROME note above.
  window.addEventListener("resize", onViewportResize);
}
