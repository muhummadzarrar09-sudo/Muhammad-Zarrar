import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { github, profile } from "@/data/portfolio";
import { ArrowUp, Mail, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import CopyEmail from "@/components/ui/CopyEmail";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";

/** Live clock in the footer — Asia/Karachi (no DST, so it never jumps). */
function RawalpindiClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  return (
    <span className="font-mono text-xs text-faint">
      PKT {time} · Rawalpindi
    </span>
  );
}

/** Back-to-top — the circle ring fills with page scroll progress. */
function BackToTop() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <button
      type="button"
      onClick={() => smoothScrollToTop()}
      className="group flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink"
    >
      Back to top
      <span className="relative grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-clay">
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke="var(--color-clay-deep)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
        </svg>
        <ArrowUp size={14} strokeWidth={1.8} className="transition-transform group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) => smoothScrollToId(id);

  return (
    <footer className="border-t border-line-strong bg-canvas-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <button
              type="button"
              onClick={() => smoothScrollToTop()}
              className="font-display text-2xl font-light tracking-tightest"
            >
              Muhammad<span className="text-clay-deep">.</span>
            </button>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              Full-stack & AI systems, built by hand in Rawalpindi. I like things that are useful
              first, pretty second.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">Navigate</div>
              {["about", "work", "process", "contact"].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => go(l)}
                  className="link-underline w-fit text-sm capitalize text-ink-soft"
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">Contact</div>
              <a href={`mailto:${profile.email}`} className="link-underline w-fit text-sm text-ink-soft inline-flex items-center gap-1.5">
                <Mail size={12} strokeWidth={1.8} />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-sm text-ink-soft inline-flex items-center gap-1.5"
              >
                <GithubIcon size={12} strokeWidth={1.8} />
                GitHub
                <ExternalLink size={10} strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>

        {/* Giant email — the letterhead */}
        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.email}`}
          className="group mt-16 block"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Say hello —
          </span>
          <span className="mt-3 block break-all font-display text-[clamp(1.4rem,5.5vw,4.5rem)] font-light italic leading-none tracking-tightest text-ink-soft transition-colors duration-500 group-hover:text-clay-deep">
            {profile.email}
          </span>
          <span className="mt-4 block h-[2px] max-w-xl bg-gradient-to-r from-clay-deep to-clay/60 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-out group-hover:bg-[length:100%_2px]" />
        </a>
        <div className="mt-4 flex items-center gap-3">
          <CopyEmail email={profile.email} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            straight to my inbox — no tracking
          </span>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line-strong pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <p className="font-mono text-xs text-faint">
              © {year} Muhammad Zarrar — Built without templates, one commit at a time.
            </p>
            <RawalpindiClock />
            <span className="font-mono text-xs text-faint">
              Last push on GitHub: {github.latestPushRelative} ·{" "}
              {github.latestRepos[0]?.name}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rotate-[-4deg] items-center rounded-[3px] border-[1.5px] border-clay-deep/80 px-3 py-1 font-caption text-[10px] font-bold uppercase tracking-[0.12em] text-clay-deep shadow-sm transition-colors hover:bg-clay-wash"
            >
              Hand-built · View source
            </a>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
