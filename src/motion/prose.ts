import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reading-room unblur — React Bits ScrollReveal, tailored.
 *
 * Storytelling prose (.prose-reveal) resolves word by word as it travels
 * up the viewport: scrubbed, reversible, input-driven. Legal and pricing
 * copy is deliberately excluded — readability first where money and rights
 * are discussed. Runs only on the full-motion boot; no-JS and reduced
 * motion readers get plain paragraphs (the words start at full opacity
 * and are only ever dimmed by the scrub itself).
 */
function splitWords(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    const parent = node.parentNode;
    if (!parent) continue;
    const frag = document.createDocumentFragment();
    for (const part of node.textContent?.split(/(\s+)/) ?? []) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const w = document.createElement("span");
        w.className = "pw";
        w.textContent = part;
        frag.appendChild(w);
      }
    }
    parent.replaceChild(frag, node);
  }
}

export function playProse() {
  const rooms = Array.from(document.querySelectorAll<HTMLElement>(".prose-reveal"));
  if (!rooms.length) return;

  for (const room of rooms) {
    const paragraphs = Array.from(room.querySelectorAll("p"));
    for (const p of paragraphs) {
      if (p.closest("blockquote, aside")) continue;
      splitWords(p);
      const words = p.querySelectorAll(".pw");
      if (!words.length) continue;
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            id: `prose-${Math.random().toString(36).slice(2, 7)}`,
            trigger: p,
            start: "top 88%",
            end: "top 32%",
            scrub: 0.6,
          },
        }
      );
    }
  }
}
