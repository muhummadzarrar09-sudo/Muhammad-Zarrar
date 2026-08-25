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
 * Pause room — pin the painting, then the card and the typewriter
 * are tied to the wheel. Scroll back and the letters unwrite.
 */
export function playExhibit() {
  const root = document.querySelector<HTMLElement>(".exhibit");
  if (!root) return;

  const card = root.querySelector<HTMLElement>(".notch-card");
  const kicker = root.querySelector<HTMLElement>(".notch-kicker");
  const link = root.querySelector<HTMLElement>(".notch-scroll");
  const canvas = root.querySelector<HTMLElement>(".exhibit-canvas");
  const titleOut = root.querySelector<HTMLElement>(".notch-title .type-out");
  const bodyOut = root.querySelector<HTMLElement>(".notch-body .type-out");
  const titleText = copyOf(root.querySelector(".notch-title .type-src"));
  const bodyText = copyOf(root.querySelector(".notch-body .type-src"));

  if (!card) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  /* The section is 280vh tall (180vh phone) with a 100svh sticky stage —
   * the room HOLDS for 180vh (80vh phone). The scrub end now matches the
   * hold exactly: the whole story types out while pinned, not after the
   * room has already let go and scrolled away. */
  const pinEnd = mobile ? "+=80%" : "+=180%";
  const scrub = mobile ? 0.4 : 0.75;

  if (titleOut) titleOut.textContent = "";
  if (bodyOut) bodyOut.textContent = "";

  const title = { n: 0 };
  const body = { n: 0 };

  if (canvas) {
    /* One breath per pin: zoom IN through the first half, OUT through the
     * second. Wheel-tied — pause and the painting rests. */
    const breathe = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "exhibit-breathe",
        trigger: root,
        start: "top top",
        end: pinEnd,
        scrub: mobile ? 0.5 : 0.9,
      },
    });
    breathe
      .fromTo(canvas, { scale: 1.08 }, { scale: 1.18, duration: 0.5 })
      .to(canvas, { scale: 1.06, duration: 0.5 });
  }

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "exhibit-pin",
      trigger: root,
      start: "top top",
      end: pinEnd,
      // Physical GSAP pinning reparents the section and conflicts with App
      // Router deletion during a route transition. Keep the scroll-scrubbed
      // sequence; CSS provides the visual full-screen stage.
      pin: false,
      scrub,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    card,
    { y: 48, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.12 },
    0.02
  );

  /* While the room holds, the card drifts gently upward — a heartbeat of
   * counter-motion against the breathing painting. */
  tl.to(card, { y: -14, duration: 0.8 }, 0.15);

  if (kicker) {
    tl.fromTo(kicker, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.08);
  }

  if (titleOut && titleText) {
    tl.to(
      title,
      {
        n: titleText.length,
        duration: 0.22,
        onUpdate: () => write(titleOut, titleText, title.n),
      },
      0.16
    );
  }

  if (bodyOut && bodyText) {
    tl.to(
      body,
      {
        n: bodyText.length,
        duration: 0.36,
        onUpdate: () => write(bodyOut, bodyText, body.n),
      },
      0.4
    );
  }

  if (link) {
    tl.fromTo(link, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.78);
  }

  tl.to({}, { duration: 0.14 }, 0.86);
}
