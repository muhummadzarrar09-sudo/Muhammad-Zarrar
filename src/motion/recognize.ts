import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 01 — a quiet diagnostic scan, one finding at a time.
 *
 * The wheel drives everything; scroll back and the scan unwrites.
 * Choreography:
 *   · intro rises — then the diagnosis word wipes in and its clay
 *     underline draws, the one note of colour on the page
 *   · each row is scanned into existence: a clay beam sweeps across
 *     while the text clip-reveals behind it, synced to the beam
 *   · the rail is live — a tick fills for every registered finding,
 *     the counter counts, and the whole rail settles to clay on complete
 * Clay is the live signal; ink is the record it leaves behind.
 */
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

  /* ——— Intro: the rise, then the diagnosis ——— */
  const intro = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "recognize-intro",
      trigger: root,
      start: "top 88%",
      end: "top 28%",
      scrub: 0.8,
    },
  });

  const em = root.querySelector<HTMLElement>(".sec-title em");
  const underline = root.querySelector<HTMLElement>(".recognize-underline");

  intro
    .fromTo(
      root.querySelector(".sec-head"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.28 }
    )
    .fromTo(
      root.querySelector(".sec-rule"),
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.3 },
      0.08
    )
    .fromTo(
      root.querySelector(".sec-title"),
      { opacity: 0, y: 34, clipPath: "inset(100% 0 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.42 },
      0.18
    )
    .fromTo(
      root.querySelector(".sec-lede"),
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.34 },
      0.38
    );

  /* Second stage: "undiagnosed." wipes in on its own, then the
     clay underline draws beneath it — scrubbed, so it undraws too. */
  if (em) {
    intro.fromTo(
      em,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.34 },
      0.44
    );
  }
  if (underline) {
    intro.fromTo(
      underline,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3 },
      0.56
    );
  }

  /* ——— The rail: progress fill + traveling dot ——— */
  if (track && progress && active) {
    gsap.fromTo(
      progress,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          id: "recognize-scan-progress",
          trigger: root,
          start: "top 60%",
          end: "bottom 38%",
          scrub: 0.7,
        },
      }
    );

    gsap.fromTo(
      active,
      { y: 0 },
      {
        y: () => Math.max(0, track.clientHeight - active.offsetHeight),
        ease: "none",
        scrollTrigger: {
          id: "recognize-scan-dot",
          trigger: root,
          start: "top 60%",
          end: "bottom 38%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  /* ——— Live counter: how many findings have registered ——— */
  const lit = new Set<number>();
  const paintCounter = () => {
    if (!counter) return;
    counter.textContent = String(Math.max(1, lit.size)).padStart(2, "0");
  };
  paintCounter();

  /* ——— Rows: the scan ——— */
  rows.forEach((row, index) => {
    const rule = row.querySelector<HTMLElement>(".recognize-row-rule");
    const beam = row.querySelector<HTMLElement>(".recognize-row-beam");
    const number = row.querySelector<HTMLElement>(".idx-no");
    const title = row.querySelector<HTMLElement>(".idx-title");
    const body = row.querySelector<HTMLElement>(".idx-sub");
    const tick = ticks[index];

    const lightTick = () => {
      if (!tick || lit.has(index)) return;
      lit.add(index);
      tick.classList.add("is-lit");
      paintCounter();
    };
    const dimTick = () => {
      if (!tick || !lit.has(index)) return;
      lit.delete(index);
      tick.classList.remove("is-lit");
      paintCounter();
    };

    const rowTl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: `recognize-row-${index + 1}`,
        trigger: row,
        start: "top 86%",
        end: "top 48%",
        scrub: 0.62,
        invalidateOnRefresh: true,
        onEnter: () => {
          row.classList.add("is-active");
          lightTick();
        },
        onLeave: () => row.classList.remove("is-active"),
        onEnterBack: () => {
          row.classList.add("is-active");
          lightTick();
        },
        onLeaveBack: () => {
          row.classList.remove("is-active");
          dimTick();
        },
      },
    });

    /* the rule draws the table row… */
    if (rule) {
      rowTl.fromTo(
        rule,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.42 },
        0
      );
    }
    /* …the ordinal files in… */
    if (number) {
      rowTl.fromTo(
        number,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.28 },
        0.06
      );
    }
    /* …the beam sweeps… */
    if (beam) {
      rowTl
        .fromTo(
          beam,
          { opacity: 0 },
          { opacity: 1, duration: 0.05 },
          0.02
        )
        .fromTo(
          beam,
          { x: 0 },
          { x: () => row.offsetWidth, duration: 0.4 },
          0.04
        )
        .fromTo(
          beam,
          { opacity: 1 },
          { opacity: 0, duration: 0.08, immediateRender: false },
          0.38
        );
    }
    /* …and the text is scanned in behind it, clip-wiped in sync. */
    if (title) {
      rowTl.fromTo(
        title,
        { opacity: 0, y: 16, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.36 },
        0.1
      );
    }
    if (body) {
      rowTl.fromTo(
        body,
        { opacity: 0, y: 12, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.34 },
        0.22
      );
    }
  });

  /* ——— Complete: the rail settles to clay ——— */
  const last = rows.at(-1);
  if (last) {
    ScrollTrigger.create({
      id: "recognize-complete",
      trigger: last,
      start: "bottom 58%",
      onEnter: () => diagnostic.classList.add("is-complete"),
      onLeaveBack: () => diagnostic.classList.remove("is-complete"),
    });
  }
}
