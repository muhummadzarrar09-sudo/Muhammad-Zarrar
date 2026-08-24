import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Section 01 — a quiet diagnostic scan, one familiar problem at a time. */
export function playRecognize() {
  const root = document.querySelector<HTMLElement>("#you");
  const diagnostic = root?.querySelector<HTMLElement>(".recognize-diagnostic");
  const rows = root
    ? Array.from(root.querySelectorAll<HTMLElement>(".recognize-row"))
    : [];
  const track = root?.querySelector<HTMLElement>(".recognize-scan-track");
  const progress = root?.querySelector<HTMLElement>(".recognize-scan-progress");
  const active = root?.querySelector<HTMLElement>(".recognize-scan-active");
  if (!root || !diagnostic || !rows.length) return;

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

  if (track && progress && active) {
    gsap.fromTo(
      progress,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          id: "recognize-scan-progress",
          trigger: diagnostic,
          start: "top 68%",
          end: "bottom 42%",
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
          trigger: diagnostic,
          start: "top 68%",
          end: "bottom 42%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  rows.forEach((row, index) => {
    const rule = row.querySelector<HTMLElement>(".recognize-row-rule");
    const number = row.querySelector<HTMLElement>(".idx-no");
    const title = row.querySelector<HTMLElement>(".idx-title");
    const body = row.querySelector<HTMLElement>(".idx-sub");

    const rowTl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: `recognize-row-${index + 1}`,
        trigger: row,
        start: "top 86%",
        end: "top 48%",
        scrub: 0.62,
        onEnter: () => row.classList.add("is-active"),
        onLeave: () => row.classList.remove("is-active"),
        onEnterBack: () => row.classList.add("is-active"),
        onLeaveBack: () => row.classList.remove("is-active"),
      },
    });

    if (rule) {
      rowTl.fromTo(
        rule,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.42 },
        0
      );
    }
    if (number) {
      rowTl.fromTo(number, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.28 }, 0.08);
    }
    if (title) {
      rowTl.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.34 }, 0.14);
    }
    if (body) {
      rowTl.fromTo(body, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.34 }, 0.24);
    }
  });

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
