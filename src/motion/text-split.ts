import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Text Split — word-by-word mask reveal for page-hero h1s.
 *
 * Splits each h1 inside a .page-hero into individual word spans with
 * overflow:hidden masks. A ScrollTrigger timeline scrubs each word
 * upward into view as the page-hero enters the viewport.
 *
 * Respects prefers-reduced-motion (the CSS keeps words visible).
 */
export function playTextSplit() {
  const heroes = document.querySelectorAll<HTMLElement>(".page-hero h1");
  if (!heroes.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;

  heroes.forEach((h1) => {
    /* Don't re-split if already processed */
    if (h1.dataset.splitDone === "true") return;
    h1.dataset.splitDone = "true";

    const words: HTMLElement[] = [];

    /* Walk child nodes — text nodes become word spans, element nodes
       (like <em>) get their text split into word spans too. */
    const children = Array.from(h1.childNodes);
    h1.textContent = "";

    children.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        text.split(/(\s+)/).forEach((token) => {
          if (!token.trim()) {
            h1.appendChild(document.createTextNode(token));
            return;
          }
          const wrapper = document.createElement("span");
          wrapper.className = "ts-word";
          const inner = document.createElement("span");
          inner.className = "ts-word-inner";
          inner.textContent = token;
          wrapper.appendChild(inner);
          h1.appendChild(wrapper);
          words.push(inner);
        });
      } else if (child instanceof HTMLElement) {
        /* Handle <em> and similar inline elements */
        const text = child.textContent ?? "";
        text.split(/(\s+)/).forEach((token) => {
          if (!token.trim()) {
            h1.appendChild(document.createTextNode(token));
            return;
          }
          const wrapper = document.createElement("span");
          wrapper.className = "ts-word";
          const inner = document.createElement("span");
          inner.className = "ts-word-inner";
          const em = document.createElement(child.tagName.toLowerCase());
          if (child.className) em.className = child.className;
          em.textContent = token;
          inner.appendChild(em);
          wrapper.appendChild(inner);
          h1.appendChild(wrapper);
          words.push(inner);
        });
      }
    });

    if (!words.length) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        id: `text-split-${h1.closest(".page-hero")?.id || "hero"}`,
        trigger: h1.closest(".page-hero") ?? h1,
        start: "top 88%",
        end: "top 40%",
        scrub: mobile ? 0.35 : 0.7,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      words,
      { y: "110%" },
      {
        y: "0%",
        duration: 1,
        stagger: 0.06,
      },
      0
    );
  });
}
