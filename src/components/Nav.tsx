import { useEffect, useState, useRef, useCallback } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/utils/cn";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const observe = () => {
      [...LINKS.map(l => l.id), "top"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
    };

    observe();
    const t = window.setTimeout(observe, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!open) return;
    const el = menuRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3.5 py-2.5 transition-all duration-300",
            scrolled
              ? "border border-line-strong bg-surface/85 backdrop-blur-2xl lift"
              : "border border-transparent bg-surface/40 backdrop-blur-md"
          )}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 pl-1"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold text-canvas transition-transform duration-300 group-hover:rotate-6">
              {profile.initials}
            </span>
            <span className="hidden font-display text-[15px] font-medium tracking-tight sm:block">
              Zarrar<span className="text-clay-deep">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={cn(
                  "rounded-full px-4 py-2 font-mono text-[13px] tracking-[0.02em] transition-colors",
                  active === l.id ? "bg-canvas-deep text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep sm:inline-flex"
            >
              Email
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface md:hidden"
            >
              <span className="flex flex-col gap-[4px]">
                <span className={cn("block h-px w-4 bg-ink transition-all", open && "translate-y-[2.5px] rotate-45")} />
                <span className={cn("block h-px w-4 bg-ink transition-opacity", open && "opacity-0")} />
                <span className={cn("block h-px w-4 bg-ink transition-all", open && "-translate-y-[2.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — with focus trap */}
      {open && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 flex flex-col bg-canvas backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-1 flex-col justify-center px-8">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="py-3 text-left font-display text-[2.6rem] font-light leading-none tracking-tightest text-ink"
              >
                <span className="inline-flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-clay-deep">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </span>
              </button>
            ))}
            <div className="mt-10 flex gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-ink px-6 py-3 text-sm text-canvas"
              >
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-6 py-3 text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="px-8 pb-8 font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} — Built by hand in Rawalpindi
          </div>
        </div>
      )}
    </>
  );
}
