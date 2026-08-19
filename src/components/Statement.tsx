import { RevealWords } from "@/components/primitives";

/**
 * Statement — a quiet manifesto band that breaks the page rhythm.
 * Pulls one working principle out of the noise, set big and italic.
 */
export default function Statement() {
  return (
    <section
      aria-label="Working principle"
      className="relative border-y border-line bg-canvas-deep/40 px-5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <RevealWords
          as="p"
          text="If it doesn't get used — it doesn't matter."
          className="font-display text-[clamp(1.8rem,5vw,3.4rem)] font-light italic leading-[1.15] tracking-tightest text-ink text-balance"
        />
        <RevealWords
          as="p"
          text="// Everything on this page is something I built, shipped, and can show."
          delay={0.5}
          className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
        />
      </div>
    </section>
  );
}
