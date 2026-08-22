import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function copyOf(el: HTMLElement | null) {
  return (el?.textContent ?? "").replace(/\s+/g, " ").trim();
}

function write(el: HTMLElement | null, text: string, n: number) {
  if (!el) return;
  const next = Math.max(0, Math.min(text.length, Math.round(n)));
  el.textContent = text.slice(0, next);
  el.classList.toggle("is-typing", next > 0 && next < text.length);
  el.classList.toggle("is-typed", next >= text.length);
}

/**
 * The Note — letters start as this room walks in, not after a long wait.
 * CSS sticky still holds the folio. No GSAP pin.
 */
export function playManifesto() {
  const root = document.querySelector<HTMLElement>(".manifesto");
  if (!root) return;

  const kicker = root.querySelector<HTMLElement>(".manifesto-kicker");
  const lines = Array.from(root.querySelectorAll<HTMLElement>(".manifesto-line"));
  if (!lines.length) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const scrub = mobile ? 0.35 : 0.7;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "manifesto-write",
      trigger: root,
      start: "top 80%",
      end: mobile ? "+=80%" : "+=110%",
      scrub,
      invalidateOnRefresh: true,
    },
  });

  if (kicker) {
    tl.fromTo(
      kicker,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.06 },
      0
    );
  }

  let at = 0.04;
  for (const line of lines) {
    const src = line.querySelector<HTMLElement>(".type-src");
    const out = line.querySelector<HTMLElement>(".type-out");
    const text = copyOf(src);
    if (!out || !text) continue;
    out.textContent = "";
    const counter = { n: 0 };
    const duration = Math.max(0.1, Math.min(0.22, text.length / 90));
    tl.to(
      counter,
      {
        n: text.length,
        duration,
        onUpdate: () => write(out, text, counter.n),
      },
      at
    );
    at += duration + 0.03;
  }
}
