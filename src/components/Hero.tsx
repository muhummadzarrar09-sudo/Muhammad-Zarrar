import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { TypewriterCursor, PaperClip, Tape, CoffeeStain } from "@/components/Brutalist";

const EASE = [0.25, 1, 0.5, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-[820px] relative">
        {/* Surreal desk artifacts — paper clip + tape + coffee stain */}
        <PaperClip className="-right-4 -top-2 hidden sm:block rotate-12" />
        <Tape className="left-12 -top-6 hidden sm:block" rotate={-14} />
        <CoffeeStain className="right-20 top-24 hidden sm:block" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-px w-8 bg-line-strong" />
          <span>Latest commits: Aug 1 • {profile.bio}</span>
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
          <span className="block font-light italic text-clay tracking-human">
            actually use.
            <TypewriterCursor />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: EASE }}
          className="mt-10 max-w-[66ch] space-y-5 text-[17px] leading-[1.75] text-ink-soft text-pretty sm:text-[18px]"
        >
          <p className="typewriter">
            Hey — I&apos;m <span className="font-medium text-ink">{profile.name}</span>, {profile.role.toLowerCase()} from Rawalpindi.
            Latest by commit date: <span className="text-ink">Recto</span> (Kotlin lab Aug 1, 35 commits),{" "}
            <span className="text-ink">SwingFrame</span> (golf video AI Aug 1),{" "}
            <span className="text-ink">forms</span> (86 commits engine Jul 30),{" "}
            <span className="text-ink">LOCK-IN</span> — that one is a{" "}
            <span className="font-semibold text-clay-deep">CLIENT PROJECT</span> (Next.js + Supabase + Cloudflare, 121
            commits Jul 30) — not a personal OS successor.
          </p>
          <p className="text-[16px] leading-[1.7] text-muted typewriter">
            Then: <span className="text-ink">TheStandard</span> enrollment v2 magic link Jul 23,{" "}
            <span className="text-ink">retailflow</span> Marigold & Clay demo storefront Jul 22,{" "}
            <span className="text-ink">Omni</span> voice agent PTT Jul 19 (36 commits, 14 suites),{" "}
            <span className="text-ink">TheDesiEdit</span> scroll-driven GSAP+Lenis landing Jul 16. All pulled by latest,
            not pinned.
          </p>
        </motion.div>

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
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-underline">
              @{profile.handle}
            </a>
            <span className="hidden h-3 w-px bg-line-soft sm:block" />
            <span>21+ repos • 437 contribs • Latest Aug 1</span>
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
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-clay-soft hover:text-ink"
          >
            Latest work — Aug 1
          </a>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`}
            className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-transparent px-5 py-3 font-mono text-xs text-muted transition-colors hover:text-ink hover:border-line"
          >
            {profile.email}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-16 grid gap-3 rounded-[1.6rem] border border-line-strong bg-surface/80 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:p-7 notebook-page"
        >
          <div className="font-caption text-[10px] uppercase tracking-[0.2em] text-clay-deep">Now — latest commit order</div>
          <div className="space-y-2.5 text-[13.5px] leading-relaxed text-ink-soft typewriter">
            <div className="flex gap-3">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-clay/60" />
              <span>
                <span className="text-ink">Aug 1:</span> Recto 35c + SwingFrame video engine + graffiti golfer — latest.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-clay/40" />
              <span>
                <span className="text-ink">Jul 30:</span> forms 86c + LOCK-IN <span className="text-clay-deep font-semibold">CLIENT PROJECT</span>{" "}
                121c/8 branches — auth deep-dive + Cloudflare.
              </span>
            </div>
            <div className="flex gap-3 text-muted">
              <span className="mt-[9px] h-px w-6 shrink-0 bg-line-strong" />
              <span>
                <span className="text-ink">Jul 16-23:</span> TheStandard magic link v2, retailflow Marigold & Clay demo, Omni PTT 36c/14 suites, TheDesiEdit GSAP+Lenis scroll.
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
          <span className="text-muted">work ordered by latest commit, not pinned — surreal paper</span>
        </motion.div>
      </div>
    </section>
  );
}
