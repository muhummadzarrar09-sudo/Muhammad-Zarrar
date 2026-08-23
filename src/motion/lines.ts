import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Line-masked title reveals (SplitText).
 *
 * - Below-the-fold titles (`.sec-title`, `.room-title`) split into masked
 *   lines that rise *with the wheel* — scrubbed, so scrolling back pushes
 *   the lines down again. The existing whole-title tweens keep running on
 *   the parent; the lines ride inside them for a layered entrance.
 * - Above-the-fold `.page-hero h1` lines rise once as an entrance on route
 *   load (a scrub there would start hidden at scroll 0).
 *
 * Splitting waits for fonts so lines break where Fraunces actually breaks.
 * Everything is created inside the route's gsap.context, so a route change
 * reverts the split and restores the original text nodes.
 */

function targets(root: Document) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(".sec-title, .room-title")
  ).filter((el) => el.offsetParent !== null || el.getBoundingClientRect().height > 0);
}

export function playLineReveals() {
  const titles = targets(document);
  if (!titles.length) return;

  const run = () => {
    const live = targets(document);
    if (!live.length) return;

    const split = SplitText.create(live, {
      type: "lines",
      mask: "lines",
      linesClass: "tl-line",
      autoSplit: true,
      onSplit: (self) => {
        // autoSplit re-runs this on font/resize refreshes; wire each
        // title's lines to its own scrubbed rise and return the whole
        // batch so SplitText can cleanly revert it before a re-split.
        // Single-line titles are left to the existing whole-title tween —
        // a mask adds nothing.
        const tl = gsap.timeline();
        for (const el of live) {
          const lines = self.lines.filter((line) => el.contains(line as Node));
          if (lines.length < 2) continue;
          tl.fromTo(
            lines,
            { yPercent: 135 },
            {
              yPercent: 0,
              ease: "none",
              stagger: 0.08,
              scrollTrigger: {
                id: `lines-${el.id || el.className.split(" ")[0]}`,
                trigger: el,
                start: "top 88%",
                end: "top 46%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            },
            0
          );
        }
        return tl;
      },
    });
    void split;
  };

  const fonts = document.fonts;
  if (fonts?.ready) {
    fonts.ready.then(() => requestAnimationFrame(run));
  } else {
    run();
  }
}

/** One-shot masked rise for the `.page-hero h1` on route load. */
export function playPageHeroLines() {
  const h1 = document.querySelector<HTMLElement>(".page-hero h1");
  if (!h1) return;

  const run = () => {
    const el = document.querySelector<HTMLElement>(".page-hero h1");
    if (!el) return;
    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "tl-line",
      autoSplit: true,
      onSplit: (self) => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1.05 },
        });
        tl.from(self.lines, { yPercent: 135, stagger: 0.14 }, 0.15);
        const support = el.parentElement?.querySelectorAll(
          ".lede, .breadcrumb, .eyebrow"
        );
        if (support && support.length) {
          tl.from(
            support,
            { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 },
            0.45
          );
        }
        return tl;
      },
    });
    void split;
  };

  const fonts = document.fonts;
  if (fonts?.ready) {
    fonts.ready.then(() => requestAnimationFrame(run));
  } else {
    run();
  }
}
