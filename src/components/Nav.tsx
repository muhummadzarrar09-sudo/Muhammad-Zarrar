import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/utils/cn";

const LINKS = [
  { id: "about", label: "Origin" },
  { id: "expertise", label: "Range" },
  { id: "work", label: "Proof" },
  { id: "process", label: "Protocol" },
  { id: "contact", label: "Signal" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
            scrolled ? "border border-line bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(23,21,15,0.12)]" : "border border-transparent"
          )}
        >
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 pl-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-[10px] text-canvas">MZ</span>
            <span className="hidden font-display text-[15px] tracking-tight sm:block">Zarrar<span className="text-spark">.</span></span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn("relative rounded-full px-3.5 py-2 text-[13px] tracking-tight transition", active === l.id ? "text-ink" : "text-muted hover:text-ink")}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-canvas-deep" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => go("contact")} className="hidden rounded-full bg-ink px-5 py-2 text-sm text-canvas hover:bg-spark transition sm:block">
              Talk
            </button>
            <button onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/60 md:hidden">
              <div className="flex flex-col gap-[4px]"><span className="block h-px w-4 bg-ink" /><span className="block h-px w-4 bg-ink" /></div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-canvas/95 backdrop-blur-xl md:hidden">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="font-display text-4xl font-light">
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
