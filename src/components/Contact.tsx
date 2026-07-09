import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { sound } from "@/lib/sound";
import { MagneticButton, Reveal } from "@/components/primitives";

/** Pre-filled mailto so the user just fills in the blanks and sends. */
const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  profile.emailSubject,
)}&body=${encodeURIComponent(profile.emailBody)}`;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      sound.chime();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-24">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spark/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-circuit/30 blur-[90px]" />

        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas/50">
            <span className="text-spark">05</span>
            <span className="h-px w-8 bg-canvas/20" />
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tightest text-balance">
            Have an idea worth{" "}
            <span className="italic text-spark">building?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-canvas/60 text-pretty">
            I’m open to product engineering, applied AI and design-led builds.
            Tell me what you’re making — let’s make it feel alive.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton
              href={mailto}
              variant="solid"
              cursorLabel="Compose"
              className="bg-spark text-canvas hover:bg-canvas hover:text-ink"
            >
              Start a conversation
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
                  <motion.span
                    key="ok"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    Copied ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-canvas/35">
            ✦ Opens your mail app with a ready-to-fill project brief
          </p>
        </Reveal>

        {/* socials */}
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-canvas/10 pt-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">
                {s.label}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-canvas/90 transition-colors group-hover:text-spark">
                <span className="link-underline">{s.handle}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
