import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, github } from "@/data/portfolio";
import { TypewriterCursor } from "@/components/Brutalist";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MagneticButton } from "@/components/primitives";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { useAppEnter } from "@/lib/enter";

const EASE = [0.25, 1, 0.5, 1] as const;

const ROLES = [
  "Independent product engineer",
  "Voice AI builder",
  "Mobile video engineer",
  "Motion designer",
];

/** Cycles through the roles in the hero meta line, typewriter-style. */
function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      2800
    );
    return () => window.clearInterval(t);
  }, [reduced]);

  if (reduced) return <span>{ROLES[0]}</span>;

  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "0.65em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.65em", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  // Hero choreography waits for the preloader to signal the reveal,
  // so the headline is mid-animation as the overlay lifts.
  const entered = useAppEnter();

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[780px] relative z-10">
        {/* Meta line — dynamic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-px w-8 bg-line-strong" />
          <RotatingRole />
          <span className="hidden h-1 w-1 rounded-full bg-muted sm:block" />
          <span className="hidden sm:block">{profile.location}</span>
        </motion.div>

        {/* Headline — clean, big, Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.6rem,8vw,5rem)] font-light leading-[0.95] tracking-tightest text-balance"
        >
          <span className="block">I turn complex work</span>
          <span className="block font-light italic text-clay-deep tracking-human">
            into products people
          </span>
          <span className="block font-light italic text-clay-deep tracking-human">
            want to use.<TypewriterCursor />
          </span>
        </motion.h1>

        {/* Sub — Aceternity TextGenerateEffect (remounts on reveal) */}
        <TextGenerateEffect
          key={entered ? "on" : "off"}
          words="I partner with founders and teams who have a real workflow to improve. From AI-assisted tools and product MVPs to native mobile experiences, I take the hard technical parts through to a clean, usable handoff."
          className="mt-8 max-w-[58ch] text-[17px] leading-[1.75] text-ink-soft sm:text-[18px] font-normal"
          duration={0.4}
        />

        {/* CTAs with Lucide icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            href="#work"
            variant="solid"
            className="bg-ink px-6 py-3 text-sm font-medium text-canvas hover:bg-clay-deep"
          >
            See selected work
            <ArrowRight size={14} strokeWidth={1.8} />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            variant="outline"
            className="border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink-soft hover:border-clay-soft hover:text-ink"
          >
            <Mail size={14} strokeWidth={1.8} />
            Start a project
          </MagneticButton>
        </motion.div>

        {/* Avatar + live status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0 }}
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
      </div>
    </section>
  );
}
