import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Three boards hang into the black room — gallery pieces, not a fade. They
 * enter in sequence as the room arrives, then lift off again on scroll back.
 */
export function playPlaques() {
  const root = document.querySelector<HTMLElement>(".room-ink");
  if (!root) return;

  const plaques = Array.from(root.querySelectorAll<HTMLElement>(".vignette"));
  if (!plaques.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const scrub = mobile ? 0.4 : 0.9;

  const label = root.querySelector(".room-label");
  const title = root.querySelector(".room-title");

  if (label) {
    gsap.fromTo(
      label,
      { y: 24, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: "plaque-label",
          trigger: root,
          start: "top 88%",
          end: "top 40%",
          scrub,
        },
      }
    );
  }

  if (title) {
    gsap.fromTo(
      title,
      { y: 48, opacity: 0.15 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: "plaque-title",
          trigger: root,
          start: "top 84%",
          end: "top 32%",
          scrub,
        },
      }
    );
  }

  /*
   * The boards now use a clean, unmistakable entrance: top-to-bottom on
   * larger screens, then left / right / left on phones. No rotation — the
   * direction and the board reveal do the work.
   */
  const drop = gsap.timeline({ paused: true });
  const mobileX = [-132, 132, -132];

  plaques.forEach((el, i) => {
    const x = mobile ? (mobileX[i] ?? (i % 2 === 0 ? -132 : 132)) : 0;
    drop.fromTo(
      el,
      {
        x,
        y: mobile ? -24 : -168,
        scale: mobile ? 0.94 : 0.86,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: mobile ? 0.72 : 0.86,
        ease: "power3.out",
      },
      i * (mobile ? 0.28 : 0.2)
    );
  });

  /* Drive the paused timeline explicitly. This keeps the entrance reliable
     with Lenis touch scrolling instead of relying on timeline toggle actions
     to infer the first mobile enter. */
  drop.pause(0);
  ScrollTrigger.create({
    id: "plaque-cards",
    trigger: root,
    start: "top 82%",
    invalidateOnRefresh: true,
    onEnter: () => drop.play(),
    onEnterBack: () => drop.play(),
    onLeaveBack: () => drop.reverse(),
  });
}
