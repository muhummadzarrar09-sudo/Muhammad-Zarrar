import { motion } from "framer-motion";
import { profile, github } from "@/data/portfolio";
import { TypewriterCursor } from "@/components/Brutalist";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";

const EASE = [0.25, 1, 0.5, 1] as const;

// Top repos by recent activity — dynamic from GitHub fetch
const activeRepos = github.latestRepos
  .filter((r) => r.name !== "Muhammad-Zarrar")
  .slice(0, 6);

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Aceternity Spotlight — subtle warm glow */}
      <Spotlight className="left-0 top-0" fill="var(--color-clay)" />

      <div className="mx-auto max-w-[780px] relative z-10">
        {/* Meta line — dynamic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-px w-8 bg-line-strong" />
          <span>Active {github.latestPushRelative}</span>
          <span className="hidden h-1 w-1 rounded-full bg-muted sm:block" />
          <span className="hidden sm:block">{profile.location}</span>
        </motion.div>

        {/* Headline — clean, big, Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.6rem,8vw,5rem)] font-light leading-[0.95] tracking-tightest text-balance"
        >
          <span className="block">I&apos;m Zarrar —</span>
          <span className="block font-light italic text-clay-deep tracking-human">
            I build things people
          </span>
          <span className="block font-light italic text-clay-deep tracking-human">
            actually use.
            <TypewriterCursor />
          </span>
        </motion.h1>

        {/* Sub — Aceternity TextGenerateEffect */}
        <TextGenerateEffect
          words="Full-stack, AI and mobile engineer from Rawalpindi. I build voice agents, mobile video AI, client products — whatever the problem needs. Shipped real things for real people."
          className="mt-8 max-w-[58ch] text-[17px] leading-[1.75] text-ink-soft sm:text-[18px] font-normal"
          duration={0.4}
        />

        {/* CTAs with Lucide icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
          >
            See my work
            <ArrowRight size={14} strokeWidth={1.8} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-clay-soft hover:text-ink"
          >
            <Mail size={14} strokeWidth={1.8} />
            Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-line-soft bg-transparent px-5 py-3 font-mono text-xs text-muted transition-colors hover:text-ink hover:border-line sm:inline-flex"
          >
            <GithubIcon size={14} strokeWidth={1.8} />
            @{profile.handle}
          </a>
        </motion.div>

        {/* Avatar + live status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7, ease: EASE }}
          className="mt-10 flex items-center gap-4"
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
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1">
              @{profile.handle}
              <ExternalLink size={10} strokeWidth={1.8} />
            </a>
            <span className="hidden h-3 w-px bg-line-soft sm:block" />
            <span>{github.totalRepos} repos · {github.recentCommits30d} pushes this month</span>
          </div>
        </motion.div>

        {/* Activity strip — dynamic, compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 rounded-2xl border border-line-strong bg-surface/80 p-5 notebook-page"
        >
          <div className="font-caption text-[10px] uppercase tracking-[0.2em] text-clay-deep mb-3">
            Latest activity — live from GitHub
          </div>
          <div className="flex flex-wrap gap-2">
            {activeRepos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-canvas-deep/40 px-3 py-2.5 transition-colors hover:border-clay-soft hover:bg-canvas-deep"
              >
                <span className="font-medium text-[13px] text-ink group-hover:text-clay-deep transition-colors">
                  {r.name}
                </span>
                {r.language && (
                  <span className="font-mono text-[10px] text-faint">{r.language}</span>
                )}
                <span className="font-mono text-[10px] text-faint">
                  {r.daysAgo === 0 ? "today" : r.daysAgo === 1 ? "yesterday" : `${r.daysAgo}d ago`}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
        >
          <span>Scroll</span>
          <span className="h-px w-12 bg-line-soft" />
        </motion.div>
      </div>
    </section>
  );
}
