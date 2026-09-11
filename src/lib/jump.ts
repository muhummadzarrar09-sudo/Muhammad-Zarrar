/**
 * wipeJump — "skip to" that behaves like a page load, not a fast-forward.
 *
 * A plain Lenis `scrollTo` walks the viewport through every pinned scene
 * between here and there. On a 420vh diagnose room that reads as the page
 * sticking, then snapping. Instead we drop the same paper curtain the router
 * uses, teleport underneath it, and lift — so a jump lands the way a fresh
 * route lands.
 *
 * Degrades three ways, all honest:
 *  - no curtain element (shouldn't happen)  → instant jump
 *  - prefers-reduced-motion                 → instant jump, no curtain
 *  - no Lenis (reduced boot / no JS motion) → native scrollIntoView
 */

const CURTAIN_DOWN_MS = 200;
const CURTAIN_LIFT_MS = 340;
/** How far into the lift the arrival beat fires. The curtain clears bottom-up,
 *  so firing it at t=0 would spend the whole entrance under paper. */
const ARRIVE_DELAY_MS = 170;
const ARRIVE_MS = 520;

function curtain() {
  return document.querySelector<HTMLElement>(".route-wipe");
}

function selector(hash: string) {
  return hash.startsWith("#") ? hash : `#${hash}`;
}

/** Replay the room's one-shot arrival. `from`-only keyframes: never hides. */
function land(el: HTMLElement) {
  el.classList.remove("is-arriving");
  // Force a reflow so a repeat jump to the same room restarts the animation.
  void el.offsetWidth;
  el.classList.add("is-arriving");
  window.setTimeout(() => el.classList.remove("is-arriving"), ARRIVE_MS);
}

export function wipeJump(hash: string) {
  const target = document.querySelector<HTMLElement>(selector(hash));
  if (!target) return;

  const teleport = () => {
    if (document.documentElement.classList.contains("has-lenis")) {
      window.dispatchEvent(new CustomEvent("motion:jumpTo", { detail: hash }));
    } else {
      // No Lenis: the header offset is already in the flow, so a plain
      // scrollIntoView lands in the right place.
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const el = curtain();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!el || reduced) {
    teleport();
    land(target);
    return;
  }

  el.classList.add("is-down");
  window.setTimeout(() => {
    teleport();
    el.classList.remove("is-down");
    el.classList.add("is-lifting");
    window.setTimeout(() => {
      el.classList.remove("is-lifting");
    }, CURTAIN_LIFT_MS);
    // The room rises into a clearing curtain instead of behind it.
    window.setTimeout(() => land(target), ARRIVE_DELAY_MS);
  }, CURTAIN_DOWN_MS);
}
