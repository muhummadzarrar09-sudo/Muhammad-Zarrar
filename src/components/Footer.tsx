import { profile } from "@/data/portfolio";
import { ArrowUp, Mail, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-line-strong bg-canvas-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line-strong pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-faint">
            © {year} Muhammad Zarrar — Built without templates, one commit at a time.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            Back to top
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-all group-hover:-translate-y-0.5 group-hover:border-clay">
              <ArrowUp size={14} strokeWidth={1.8} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
