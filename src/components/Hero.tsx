import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

const EASE = [0.25, 1, 0.5, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28"
    >
      <div className="mx-auto max-w-[820px]">
        {/* Eyebrow — personal, handwritten feel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-px w-8 bg-line" />
          <span>Personal folio — {new Date().getFullYear()}</span>
          <span className="hidden h-1 w-1 rounded-full bg-muted sm:block" />
          <span className="hidden sm:block">{profile.location}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.8rem,9vw,5.6rem)] font-light leading-[0.95] tracking-tightest text-balance"
        >
          <span className="block">I&apos;m Zarrar —</span>
          <span className="block font-light italic text-clay tracking-human">
            I build things people
          </span>
          <span className="block font-light italic text-clay tracking-human">actually use.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: EASE }}
          className="mt-10 max-w-[66ch] space-y-5 text-[17px] leading-[1.75] text-ink-soft text-pretty sm:text-[18px]"
        >
          <p>
            Hey — I&apos;m <span className="font-medium text-ink">Muhammad Zarrar</span>, a
            full-stack developer and AI systems guy from Rawalpindi. I like taking rough,
            messy ideas and turning them into working software — voice agents that
            listen, dashboards that don&apos;t suck, booking flows, catalog systems,
            little automations that delete boring work.
          </p>
          <p className="text-[16px] leading-[1.7] text-muted">
            No agency fluff. I design it, build it, ship it, fix it. I care about speed,
            clarity, and the feeling when something just works. Right now I&apos;m deep
            in <span className="text-ink">Omni</span> — a push-to-talk voice agent with
            local AI + browser automation — and <span className="text-ink">Operator-OS</span>, a supervision layer for
            autonomous operators.
          </p>
        </motion.div>

        {/* Human meta strip — avatar + tiny notes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <img
            src={profile.avatar}
            alt="Muhammad Zarrar"
            className="h-11 w-11 rounded-full border border-line object-cover"
            loading="eager"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-clay" />
              {profile.availability}
            </span>
            <span className="hidden h-3 w-px bg-line-soft sm:block" />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              @{profile.handle}
            </a>
            <span className="hidden h-3 w-px bg-line-soft sm:block" />
            <span>14+ repos shipped</span>
          </div>
        </motion.div>

        {/* CTAs — human, no magnetic trick */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
          >
            Get in touch
            <span aria-hidden>→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-clay-soft hover:text-ink"
          >
            See work
          </a>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`}
            className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-transparent px-5 py-3 font-mono text-xs text-muted transition-colors hover:text-ink hover:border-line"
          >
            {profile.email}
          </a>
        </motion.div>

        {/* Now / handwritten note block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-16 grid gap-3 rounded-[1.6rem] border border-line bg-surface/80 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:p-7"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">Now</div>
          <div className="space-y-2 text-[13.5px] leading-relaxed text-ink-soft">
            <div className="flex gap-3">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-clay/40" />
              <span>
                Building voice-first UX — push-to-talk, local inference, browser as an API.
                Obsessed with latency &lt; 300ms.
              </span>
            </div>
            <div className="flex gap-3 text-muted">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-line" />
              <span>Learning: edge TTS, tool-use evals, designing for hands-free.</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue — minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
        >
          <span>Scroll</span>
          <span className="h-px w-12 bg-line-soft" />
          <span className="text-muted">work & notes below</span>
        </motion.div>
      </div>
    </section>
  );
}
