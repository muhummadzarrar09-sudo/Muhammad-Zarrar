import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Proof Strip — numbers animate in with a staggered rise when the
 * strip enters the viewport. Works with the .proof-caption spans.
 */
export function playProofRise() {
  const strip = document.querySelector<HTMLElement>(".proof-strip");
  if (!strip) return;

  const spans = Array.from(
    strip.querySelectorAll<HTMLElement>(".proof-caption span")
  );
  if (!spans.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;

  gsap.fromTo(
    spans,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: "none",
      stagger: 0.08,
      scrollTrigger: {
        id: "proof-rise",
        trigger: strip,
        start: "top 90%",
        end: "top 60%",
        scrub: mobile ? 0.3 : 0.6,
        invalidateOnRefresh: true,
      },
    }
  );
}
