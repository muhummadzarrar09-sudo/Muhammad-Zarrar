import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* These three were hardcoded to a palette the site no longer uses (putty
   #c4c3b6 / bone #e7e5e4 / black), so the ground walk painted a colour that
   appears nowhere in globals.css. Read the live tokens instead — one source
   of truth, no drift. */
function token(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

const GROUND = () => token("--ground-700", "#f3e4c7");
const BONE = () => token("--ground-800", "#f0ccb7");
const INK = () => token("--text", "#1a1412");

function groundColor(el: HTMLElement) {
  if (el.classList.contains("exhibit") || el.classList.contains("room-ink")) {
    return INK();
  }
  if (el.classList.contains("section-ink")) return BONE();
  return GROUND();
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
