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
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-px w-8 bg-line" />
          <span>Personal folio — {new Date().getFullYear()} • {profile.bio}</span>
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
          <span className="block font-light italic text-clay tracking-human">I build things people</span>
          <span className="block font-light italic text-clay tracking-human">actually use.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: EASE }}
          className="mt-10 max-w-[66ch] space-y-5 text-[17px] leading-[1.75] text-ink-soft text-pretty sm:text-[18px]"
        >
          <p>
            Hey — I&apos;m <span className="font-medium text-ink">{profile.name}</span>, a {profile.role.toLowerCase()} from Rawalpindi.
            I like taking messy ideas and turning them into working software — whether that&apos;s{" "}
            <span className="text-ink">voice agents that listen</span>,{" "}
            <span className="text-ink">a study OS that keeps me locked in</span>, or{" "}
            <span className="text-ink">Kotlin apps that analyze golf swings frame-by-frame</span>.
          </p>
          <p className="text-[16px] leading-[1.7] text-muted">
            No agency fluff. I design it, build it, ship it, harden it. Right now I&apos;m deep in{" "}
            <span className="text-ink">Omni</span> (push-to-talk browser agent, 36 commits, 14 test
            suites), <span className="text-ink">LOCK-IN</span> (Next.js + Supabase study OS, 121
            commits, 8 branches, auth audits), and{" "}
            <span className="text-ink">SwingFrame</span> (Kotlin video engine + AI diagnostics for golf,
            custom graffiti golfer logo, last shipped 2 days ago).
          </p>
        </motion.div>

        {/* Human meta strip */}
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
            <span>21+ repos • 437 contributions</span>
          </div>
        </motion.div>

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

        {/* Now */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-16 grid gap-3 rounded-[1.6rem] border border-line bg-surface/80 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:p-7"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">Now — Aug 2 2026</div>
          <div className="space-y-2.5 text-[13.5px] leading-relaxed text-ink-soft">
            <div className="flex gap-3">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-clay/40" />
              <span>
                <span className="text-ink">Omni:</span> Push-to-talk + local inference. Obsessed with &lt;300ms. 14 test
                suites green.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-clay/30" />
              <span>
                <span className="text-ink">LOCK-IN:</span> Supabase RLS hardening + data-leak audit + premium UX. My own study OS I actually use.
              </span>
            </div>
            <div className="flex gap-3 text-muted">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-line" />
              <span>
                <span className="text-ink">SwingFrame:</span> Kotlin video engine for golf — graffiti human golfer logo, cold-boot splash, AI diagnostics. Shipped phase 1 & 2 Jul 31.
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
        >
          <span>Scroll</span>
          <span className="h-px w-12 bg-line-soft" />
          <span className="text-muted">live work below — from GitHub</span>
        </motion.div>
      </div>
    </section>
  );
}
