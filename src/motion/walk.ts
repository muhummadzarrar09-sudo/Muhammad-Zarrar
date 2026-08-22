import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PUTTY = "#c4c3b6";
const BONE = "#e7e5e4";
const INK = "#000000";

function groundColor(el: HTMLElement) {
  if (el.classList.contains("exhibit") || el.classList.contains("room-ink")) {
    return INK;
  }
  if (el.classList.contains("section-ink")) return BONE;
  return PUTTY;
}

function rooms(): HTMLElement[] {
  const main = document.querySelector("main");
  if (!main) return [];
  return Array.from(main.children).filter((node): node is HTMLElement => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.tagName !== "SECTION") return false;
    if (node.classList.contains("marquee")) return false;
    return true;
  });
}

/**
 * Canvas only. Rooms keep their own opaque walls — we never fade a
 * whole section, or later type sits on top of the room you're in.
 */
export function playWalk() {
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const scrub = mobile ? 0.45 : 1.05;
  const list = rooms();
  if (!list.length) return;

  const ground =
    document.querySelector<HTMLElement>(".gallery-ground") ??
    document.body;

  list.forEach((el, i) => {
    const first = i === 0;
    const color = groundColor(el);
    gsap.fromTo(
      ground,
      { backgroundColor: i === 0 ? color : groundColor(list[i - 1]) },
      {
        backgroundColor: color,
        ease: "none",
        scrollTrigger: {
          id: `ground-${el.id || i}`,
          trigger: el,
          start: first ? "top top" : "top 85%",
          end: "top 25%",
          scrub,
        },
      }
    );
  });
}
