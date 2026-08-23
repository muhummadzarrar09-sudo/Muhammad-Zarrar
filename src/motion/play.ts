import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playExhibit } from "./exhibit";
import { playHero } from "./hero";
import { playManifesto } from "./manifesto";
import { playPlaques } from "./plaques";
import { playWalk } from "./walk";
import { playTextSplit } from "./text-split";
import { playContrastSlide } from "./contrast-slide";
import { playProofRise } from "./proof-rise";
import { playMarqueeVelocity } from "./marquee-velocity";
import { EASE, WIREFRAMES, type MotionVars, type WireframeScene } from "./wireframes";

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | null = null;
let marqueeCleanup: (() => void) | undefined;

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
  marqueeCleanup?.();

  ctx = gsap.context(() => {
    const home = pathname === "/";

    // Each module wrapped in try/catch so one failure doesn't cascade
    const safe = (name: string, fn: () => any) => {
      try {
        return fn();
      } catch (error) {
        console.error(`[motion] ${name} failed:`, error);
        return undefined;
      }
    };

    /* Walk — background color transitions between rooms */
    safe("walk", playWalk);

    /* Text split — word-by-word mask reveal on ALL page-hero h1s */
    safe("textSplit", playTextSplit);

    /* Wireframe scenes (recognize, contrast, next-steps, brief, page-leave) */
    for (const scene of WIREFRAMES) {
      if (scene.page === "/" && !home) continue;
      safe(`scene:${scene.id}`, () => playScene(scene));
    }

    if (home) {
      /* Home-specific animations */
      safe("hero", playHero);
      safe("exhibit", playExhibit);
      safe("plaques", playPlaques);
      safe("manifesto", playManifesto);
      safe("proofRise", playProofRise);
      safe("contrastSlide", playContrastSlide);
      marqueeCleanup = safe("marqueeVelocity", playMarqueeVelocity);
    } else {
      /* Inner pages: contrast slide if present, proof rise if present */
      safe("contrastSlide", playContrastSlide);
      safe("proofRise", playProofRise);
      marqueeCleanup = safe("marqueeVelocity", playMarqueeVelocity);
    }
  });
  ScrollTrigger.refresh();
}

export function killWireframes() {
  const active = ctx;
  marqueeCleanup?.();
  marqueeCleanup = undefined;
  ctx = null;
  if (!active) return;
  try {
    active.revert();
  } catch (error) {
    if (!(error instanceof DOMException && error.name === "NotFoundError")) {
      throw error;
    }
  }
}
