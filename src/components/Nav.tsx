import { useEffect, useState, useRef, useCallback } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/utils/cn";
import ThemeToggle from "@/components/ThemeToggle";
import { Mail, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";

const LINKS = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
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
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
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
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    smoothScrollToId(id);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-line-strong bg-canvas/85 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8"
        >
          <button
            type="button"
            onClick={() => smoothScrollToTop()}
            aria-label="Back to top"
            className="group flex items-center gap-1.5"
          >
            <span className="font-sans text-[15px] font-extrabold uppercase tracking-[-0.01em] text-ink transition-colors group-hover:text-clay-deep">
              Zarrar
            </span>
            <span
              aria-hidden="true"
              className="inline-block h-[7px] w-[7px] rounded-full bg-clay-deep transition-transform duration-300 group-hover:scale-125"
            />
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                  active === l.id ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-[5px] w-[5px] shrink-0 rounded-full bg-clay-deep transition-opacity duration-300",
                      active === l.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="relative">
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-clay-deep transition-all duration-300",
                        active === l.id ? "w-full" : "w-0"
                      )}
                    />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Hey Zarrar — let's get started")}`}
              className="btn-brutal btn-brutal-solid btn-brutal-sm hidden sm:inline-flex"
            >
              Get started
              <span aria-hidden="true" className="text-[0.9em]">↗</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center border border-ink text-ink transition-colors hover:bg-ink hover:text-canvas md:hidden"
            >
              {open ? <X size={16} strokeWidth={1.8} /> : <Menu size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 flex flex-col bg-canvas pt-20 md:hidden"
        >
          <div className="flex flex-1 flex-col justify-center px-8">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="border-b border-line py-4 text-left font-sans text-[2.4rem] font-extrabold uppercase leading-none tracking-[-0.02em] text-ink"
              >
                <span className="inline-flex items-baseline gap-4">
                  <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-clay-deep">
                    Nº00{i + 1}
                  </span>
                  {l.label}
                </span>
              </button>
            ))}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Hey Zarrar — let's get started")}`}
                className="btn-brutal btn-brutal-solid"
              >
                <Mail className="shrink-0" size={14} strokeWidth={1.8} />
                Get started
                <span aria-hidden="true" className="text-[0.95em]">↗</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal"
              >
                <GithubIcon size={14} strokeWidth={1.8} />
                GitHub
              </a>
            </div>
          </div>
          <div className="px-8 pb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            © {new Date().getFullYear()} — Built by hand in Rawalpindi
          </div>
        </div>
      )}
    </>
  );
}
