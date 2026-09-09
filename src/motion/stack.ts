import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Audit deck — React Bits ScrollStack, tailored to the walk.
 *
 * The eight website-audit checks stack as sticky cards (pure CSS: no-JS
 * and reduced-motion readers get the same deck, statically layered).
 * On the full-motion boot each covered card eases to 0.93 scale as the
 * next card arrives at its sticky seat — scrubbed, reversible, desktop
 * only (matchMedia; mobile holds the static stack).
 */
export function playStack() {
  const deck = document.querySelector<HTMLElement>(".stack-deck");
  if (!deck) return;
  const cards = Array.from(deck.querySelectorAll<HTMLElement>(".stack-card"));
  if (cards.length < 2) return;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 761px)", () => {
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.93,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          id: `stack-${i}`,
          trigger: cards[i + 1],
          start: "top bottom",
          // The seat matches the CSS sticky top: 132px + 30px per card.
          end: `top top+=${132 + (i + 1) * 30}`,
          scrub: true,
        },
      });
    });
  });
}
