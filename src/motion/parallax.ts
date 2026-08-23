import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Attribute-driven parallax — `data-parallax="0.06"` means the element
 * drifts ±6% of its own height, opposite the wheel, across the time it
 * spends travelling the viewport. Scrubbed, so it runs backwards cleanly
 * on the return journey (the "re-scroll" contract every scene honors).
 *
 * Opt any element in from JSX — no JS changes needed:
 *   <img data-parallax="0.05" ... />
 */
export function playParallax() {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]")
  );
  if (!nodes.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;

  for (const el of nodes) {
    const speed = Math.min(0.2, Math.max(0.01, parseFloat(el.dataset.parallax || "0.06")));
    const dist = () => el.offsetHeight * speed * (mobile ? 0.6 : 1);
    const scope = el.closest("section, figure") ?? el;

    gsap.fromTo(
      el,
      { y: () => dist() },
      {
        y: () => -dist(),
        ease: "none",
        scrollTrigger: {
          id: `parallax-${el.className.split(" ")[0] || el.tagName.toLowerCase()}`,
          trigger: scope as HTMLElement,
          start: "top bottom",
          end: "bottom top",
          scrub: mobile ? 0.5 : 1.1,
          invalidateOnRefresh: true,
        },
      }
    );
  }
}
