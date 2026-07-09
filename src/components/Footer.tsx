import { profile } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="border-t border-line bg-canvas-deep/50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-3xl font-light tracking-tightest"
            >
              Muhammad<span className="text-spark">.</span>
            </button>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {profile.role}. Building intelligent, end-to-end products that feel
              alive.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Navigate
              </div>
              {["work", "about", "expertise", "process", "contact"].map((l) => (
                <button
                  key={l}
                  onClick={() => go(l)}
                  className="link-underline w-fit text-sm capitalize text-ink-soft"
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Elsewhere
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline w-fit text-sm text-ink-soft"
              >
                GitHub ↗
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline w-fit text-sm text-ink-soft"
              >
                Email ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} Muhammad Zarrar — Designed & engineered, end to end.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-all group-hover:-translate-y-0.5 group-hover:border-spark">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
