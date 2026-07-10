import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { biz } from "@/business/data";
import { MagneticButton, Reveal } from "@/components/primitives";

const waLink = `https://wa.me/${biz.whatsapp}`;

/** Mirrors the portfolio Contact — the same dark "ink" card + ambient glow. */
export default function BusinessContact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(biz.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const socials = [
    { label: "WhatsApp", handle: biz.phone, url: waLink },
    { label: "Email", handle: biz.email, url: `mailto:${biz.email}` },
    { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: biz.github },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-24">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spark/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-circuit/30 blur-[90px]" />

        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas/50">
            <span className="text-spark">06</span>
            <span className="h-px w-8 bg-canvas/20" />
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tightest text-balance">
            Let's build something that{" "}
            <span className="italic text-spark">pays for itself.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-canvas/60 text-pretty">
            Tell me what your business needs. I'll reply fast — usually the same
            day — with a clear plan and a quote.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton
              href={waLink}
              variant="solid"
              cursorLabel="WhatsApp"
              className="bg-spark text-canvas hover:bg-canvas hover:text-ink"
            >
              Message on WhatsApp
              <span aria-hidden>↗</span>
            </MagneticButton>
            <button
              onClick={copy}
              data-hover
              data-cursor-label="Copy email"
              className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-6 py-3.5 text-sm font-medium text-canvas/80 transition-colors hover:border-canvas/50 hover:text-canvas"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Copied ✓
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-canvas/35">
            ✦ Or book a free audit — reply usually same day
          </p>
        </Reveal>

        {/* socials */}
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-canvas/10 pt-8">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">{s.label}</div>
              <div className="mt-1 flex items-center gap-1.5 text-canvas/90 transition-colors group-hover:text-spark">
                <span className="link-underline">{s.handle}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
