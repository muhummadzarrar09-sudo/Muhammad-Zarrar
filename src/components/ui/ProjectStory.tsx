import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Staple, Stamp } from "@/components/Brutalist";
import type { Project } from "@/data/portfolio";

/**
 * ProjectStory — the deep-dive overlay.
 * Every featured panel can open a full case-study sheet (problem → focus →
 * shipped → stats → links) without leaving the page. Body scroll is locked
 * while open; Escape / backdrop / ✕ close it. Focus is moved into the sheet
 * and restored on close.
 */
export default function ProjectStory({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const open = project !== null;

  // Scroll lock + focus + Escape handling while open
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          key="story"
          className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.22 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close the story"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} — full story`}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="notebook-page relative max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-7 sm:p-10"
          >
            <Staple />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-line bg-canvas text-ink transition-colors hover:border-clay-deep hover:text-clay-deep"
            >
              <X size={15} strokeWidth={1.8} />
            </button>

            <div className="flex flex-wrap items-center gap-3 pr-12">
              <span className="font-caption text-[11px] uppercase tracking-[0.18em] text-muted">
                Case study — {project.tag} · {project.year}
              </span>
              <Stamp>{project.tag === "Client Project" ? "DELIVERED" : "SHIPPED"}</Stamp>
            </div>

            <h3 className="mt-5 font-display text-4xl font-light leading-[1.02] tracking-tightest sm:text-5xl">
              {project.name}
            </h3>
            <p className="mt-3 text-[15px] font-medium leading-snug text-clay-deep">
              {project.blurb}
            </p>

            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-soft">
              <p className="text-pretty">{project.description}</p>
            </div>

            <dl className="mt-6 space-y-3 border-y border-line py-5 text-[13px]">
              <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Focus</dt>
                <dd className="leading-relaxed text-ink-soft">{project.focus}</dd>
              </div>
              <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Shipped</dt>
                <dd className="leading-relaxed text-ink-soft">{project.outcome}</dd>
              </div>
            </dl>

            {project.stats && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {project.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-line bg-canvas-deep/40 px-4 py-3"
                  >
                    <div className="font-display text-2xl font-light tracking-tight text-ink">
                      {s.value}
                    </div>
                    <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
                >
                  Open live project <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-clay-deep hover:bg-clay-wash"
                >
                  Inspect source <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
