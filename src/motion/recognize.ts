import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ROOM 01 — the diagnostic scan, pinned.
 *
 * [ pinned intro ]  [ scan rail ]  [ cycling findings ]
 *
 * The section grows tall (html.has-motion) and a CSS-sticky stage holds the
 * room — the house fake-pin (GSAP pin:false; physical pinning reparents
 * nodes and fights the App Router). One master scrubbed timeline drives
 * everything; scroll back and the whole diagnosis unwrites.
 *
 *   0.00–0.10  the room assembles — intro rises, the diagnosis word
 *               wipes in, its clay underline draws
 *   0.10–0.96  the six findings, one per step: crossfade + the clay
 *               beam scans each card's text into existence
 *   0.96–1.00  hold — the rail settles to clay, diagnosis complete
 *
 * The rail is derived state, not tweens: ticks, counter, active ordinal
 * and is-complete are computed from progress in onUpdate, so they are
 * always exactly right in both scroll directions.
 */

const INTRO_END = 0.1;
const HOLD_START = 0.96;

export function playRecognize() {
  const root = document.querySelector<HTMLElement>("#you");
  const diagnostic = root?.querySelector<HTMLElement>(".recognize-diagnostic");
  const rows = root
    ? Array.from(root.querySelectorAll<HTMLElement>(".recognize-row"))
    : [];
  const track = root?.querySelector<HTMLElement>(".recognize-scan-track");
  const progress = root?.querySelector<HTMLElement>(".recognize-scan-progress");
  const active = root?.querySelector<HTMLElement>(".recognize-scan-active");
  const ticks = track
    ? Array.from(track.querySelectorAll<HTMLElement>("i"))
    : [];
  const counter = root?.querySelector<HTMLElement>(".recognize-scan-end");
  if (!root || !diagnostic || !rows.length) return;
  /* capture narrowed refs for the closures below */
  const diag = diagnostic;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  /* Stage heights live in CSS (360/320/300vh) — the scrub end matches the
   * sticky distance exactly: section height minus one viewport. */
  const end = mobile ? "+=240%" : "+=320%";

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "recognize-room",
      trigger: root,
      start: "top top",
      end,
      scrub: mobile ? 0.45 : 0.75,
      invalidateOnRefresh: true,
      onUpdate: (self) => paintRail(self.progress),
    },
  });

  /* ——— Phase 1 · the room assembles ——— */
  tl.fromTo(
    root.querySelector(".sec-head"),
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.03 },
    0
  )
    .fromTo(
      root.querySelector(".sec-rule"),
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.035 },
      0.01
    )
    .fromTo(
      root.querySelector(".sec-title"),
      { opacity: 0, y: 34 },
      // No clip-path on the h2 — a clip-path cuts at the element's box edge,
      // which sheared the nowrap em mid-word when it overhung. The em keeps
      // its own wipe (an element's clip always fits its own box exactly).
      { opacity: 1, y: 0, duration: 0.05 },
      0.02
    );

  const em = root.querySelector<HTMLElement>(".sec-title em");
  const underline = root.querySelector<HTMLElement>(".recognize-underline");

  if (em) {
    tl.fromTo(
      em,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.04 },
      0.05
    );
  }
  if (underline) {
    tl.fromTo(
      underline,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.035 },
      0.06
    );
  }
  tl.fromTo(
    root.querySelector(".sec-lede"),
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.04 },
    0.045
  );

  /* ——— Phase 2 · the findings, one per step ——— */
  const step = (HOLD_START - INTRO_END) / rows.length;

  rows.forEach((row, i) => {
    const at = INTRO_END + i * step;
    const rule = row.querySelector<HTMLElement>(".recognize-row-rule");
    const beam = row.querySelector<HTMLElement>(".recognize-row-beam");
    const number = row.querySelector<HTMLElement>(".idx-no");
    const title = row.querySelector<HTMLElement>(".idx-title");
    const body = row.querySelector<HTMLElement>(".idx-sub");

    /* the card itself lands — unhurried */
    tl.fromTo(
      row,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: step * 0.4, immediateRender: i > 0 },
      at
    );
    /* …and departs upward as the next lands */
    if (i < rows.length - 1) {
      tl.to(
        row,
        { opacity: 0, y: -20, duration: step * 0.4 },
        at + step * 0.78
      );
    }

    if (rule) {
      tl.fromTo(
        rule,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: step * 0.42 },
        at
      );
    }
    if (number) {
      tl.fromTo(
        number,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: step * 0.26 },
        at + step * 0.05
      );
    }
    if (beam) {
      tl.fromTo(beam, { opacity: 0 }, { opacity: 1, duration: step * 0.06 }, at + step * 0.03)
        .fromTo(
          beam,
          { x: 0 },
          { x: () => row.offsetWidth, duration: step * 0.44 },
          at + step * 0.05
        )
        .fromTo(
          beam,
          { opacity: 1 },
          { opacity: 0, duration: step * 0.09, immediateRender: false },
          at + step * 0.42
        );
    }
    if (title) {
      tl.fromTo(
        title,
        { opacity: 0, y: 14, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: step * 0.38 },
        at + step * 0.12
      );
    }
    if (body) {
      tl.fromTo(
        body,
        { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: step * 0.34 },
        at + step * 0.24
      );
    }
  });

  /* ——— Normalize: pad the timeline to duration 1 so phase constants
     map exactly onto scroll progress ——— */
  if (tl.duration() < 1) {
    tl.to({}, { duration: 1 - tl.duration() });
  }

  /* ——— The rail: derived state, always exact in both directions ——— */
  function currentIndex(p: number) {
    if (p < INTRO_END) return -1;
    const i = Math.floor((p - INTRO_END) / step);
    return Math.min(rows.length - 1, Math.max(0, i));
  }

  let painted = -2;
  function paintRail(p: number) {
    const idx = currentIndex(p);
    const cycle = Math.min(
      1,
      Math.max(0, (p - INTRO_END) / (HOLD_START - INTRO_END))
    );

    /* progress fill + traveling dot track the cycle phase */
    if (progress) {
      progress.style.transformOrigin = "top center";
      progress.style.transform = `translateX(-50%) scaleY(${cycle})`;
    }
    if (active && track) {
      const y = cycle * Math.max(0, track.clientHeight - active.offsetHeight);
      active.style.transform = `translateY(${y}px)`;
    }

    if (idx === painted) return;
    painted = idx;

    rows.forEach((row, i) => row.classList.toggle("is-active", i === idx));
    ticks.forEach((tick, i) => tick.classList.toggle("is-lit", i <= idx));
    if (counter) {
      counter.textContent = String(Math.max(1, idx + 1)).padStart(2, "0");
    }
    diag.classList.toggle("is-complete", idx === rows.length - 1);
  }

  /* first paint — room pre-assembled at whatever progress we land on */
  paintRail(0);
}
