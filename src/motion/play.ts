import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playExhibit } from "./exhibit";
import { playHero } from "./hero";
import { playManifesto } from "./manifesto";
import { playPlaques } from "./plaques";
import { playRecognize } from "./recognize";
import { playWalk } from "./walk";
import { EASE, WIREFRAMES, type MotionVars, type WireframeScene } from "./wireframes";

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | null = null;

function exists(selector: string) {
  return Boolean(document.querySelector(selector));
}

function isMobile() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function pinEnd(scene: WireframeScene, pin: boolean | string | undefined) {
  const raw = scene.end ?? "bottom top";
  if (!pin || !isMobile() || typeof raw !== "string" || !raw.startsWith("+=")) {
    return raw;
  }
  const n = parseFloat(raw.slice(2));
  if (Number.isNaN(n)) return raw;
  return `+=${Math.round(n * 0.65)}%`;
}

function vars(input: MotionVars | undefined, scrubbing: boolean): gsap.TweenVars {
  const next: gsap.TweenVars = { ...(input as gsap.TweenVars | undefined) };
  if (next.ease == null) next.ease = scrubbing ? "none" : EASE;
  return next;
}

function playScene(scene: WireframeScene) {
  if (!exists(scene.trigger)) return;

  const pinWanted = Boolean(scene.pin);
  const pin =
    pinWanted && (scene.pinOnMobile !== false || !isMobile())
      ? scene.pin
      : false;
  const mobileUnpin = pinWanted && !pin;
  const scrubbing = !mobileUnpin && scene.scrub !== false;
  const scrub = mobileUnpin
    ? false
    : scene.scrub == null
      ? false
      : isMobile() && typeof scene.scrub === "number"
        ? Math.max(0.3, scene.scrub * 0.55)
        : scene.scrub;

  const tl = gsap.timeline({
    defaults: {
      ease: scrubbing ? "none" : EASE,
      duration: 1,
      overwrite: "auto",
    },
    scrollTrigger: {
      id: scene.id,
      trigger: scene.trigger,
      start: mobileUnpin ? "top 72%" : (scene.start ?? "top 80%"),
      end: mobileUnpin ? "bottom 40%" : pinEnd(scene, pin),
      scrub,
      pin,
      anticipatePin: scene.anticipatePin,
      once: false,
      invalidateOnRefresh: scrubbing,
    },
  });

  const tween = (
    target: string,
    from: MotionVars | undefined,
    to: MotionVars | undefined,
    position: number | string,
    extra: gsap.TweenVars
  ) => {
    if (!exists(target)) return;
    if (from && to) {
      tl.fromTo(
        target,
        vars(from, scrubbing),
        { ...vars(to, scrubbing), ...extra },
        position
      );
    } else if (from) {
      tl.from(target, { ...vars(from, scrubbing), ...extra }, position);
    } else if (to) {
      tl.to(target, { ...vars(to, scrubbing), ...extra }, position);
    }
  };

  for (const step of scene.tweens ?? []) {
    const extra: gsap.TweenVars = {};
    if (step.duration != null) extra.duration = step.duration;
    if (step.stagger != null) extra.stagger = step.stagger;
    tween(step.target, step.from, step.to, step.at ?? 0, extra);
  }

  if (scene.stagger && exists(scene.stagger.target)) {
    tween(
      scene.stagger.target,
      scene.stagger.from,
      scene.stagger.to,
      scene.tweens?.length ? ">" : 0,
      { stagger: scene.stagger.each ?? 0.12 }
    );
  }
}

export function playWireframes(pathname: string) {
  ctx?.revert();
  ctx = gsap.context(() => {
    const home = pathname === "/";
    playWalk();
    for (const scene of WIREFRAMES) {
      if (scene.page === "/" && !home) continue;
      playScene(scene);
    }
    if (home) {
      playHero();
      playExhibit();
      playPlaques();
      playRecognize();
      playManifesto();
    }
  });
  ScrollTrigger.refresh();
}

export function killWireframes() {
  const active = ctx;
  // Usually called by the capture-phase navigation handler in engine.ts,
  // before React replaces a page that contains pinned elements.
  ctx = null;
  if (!active) return;
  try {
    active.revert();
  } catch (error) {
    // Route cleanup must never take down navigation. This defensive branch
    // covers a browser back/forward race where React already released a pin.
    if (!(error instanceof DOMException && error.name === "NotFoundError")) {
      throw error;
    }
  }
}
