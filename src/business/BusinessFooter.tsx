import { biz, bizLinks } from "@/business/data";
import { navigate } from "@/router";

/** Mirrors the portfolio Footer exactly — brand-first, honest founder line. */
export default function BusinessFooter() {
  const year = new Date().getFullYear();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="border-t border-line bg-canvas-deep/50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-3xl font-light tracking-tightest">
              Zarrar<span className="text-spark">.Solutions</span>
            </button>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Websites, catalog systems, booking systems, dashboards, and automation tools for local businesses.
            </p>
            <button onClick={() => navigate("/")} data-hover className="link-underline mt-4 w-fit text-xs text-muted transition-colors hover:text-ink">
              ← View the main portfolio
            </button>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Navigate</div>
              {bizLinks.map((l) => (
                <button key={l.id} onClick={() => go(l.id)} className="link-underline w-fit text-sm text-ink-soft">
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Elsewhere</div>
              <a href={biz.whatsappCta} target="_blank" rel="noreferrer" className="link-underline w-fit text-sm text-ink-soft">
                WhatsApp ↗
              </a>
              <a href={`mailto:${biz.email}`} className="link-underline w-fit text-sm text-ink-soft">
                Email ↗
              </a>
              <a href={biz.github} target="_blank" rel="noreferrer" className="link-underline w-fit text-sm text-ink-soft">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} {biz.brand}. Websites, catalog systems, booking systems, dashboards & automation.
          </p>
          <p className="font-mono text-[11px] text-muted/70">Built & operated by {biz.founder}.</p>
        </div>
      </div>
    </footer>
  );
}
