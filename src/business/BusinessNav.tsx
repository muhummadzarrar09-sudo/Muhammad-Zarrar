import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { bizLinks } from "@/business/data";
import { navigate } from "@/router";
import { cn } from "@/utils/cn";

export default function BusinessNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    bizLinks.forEach((l) => {
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
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500",
            scrolled ? "border border-line bg-surface/80 backdrop-blur-xl lift" : "border border-transparent bg-transparent",
          )}
        >
          <div className="flex items-center gap-3 pl-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="font-display text-base font-medium tracking-tight">
                Zarrar<span className="text-spark">.Solutions</span>
              </span>
            </button>
            <span className="h-4 w-px bg-line" />
            <button
              onClick={() => navigate("/")}
              data-hover
              data-cursor-label="Back"
              className="group flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              Portfolio
            </button>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {bizLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-hover
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm tracking-tight transition-colors",
                  active === l.id ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {active === l.id && (
                  <motion.span layoutId="biz-pill" className="absolute inset-0 rounded-full bg-canvas-deep" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              data-hover
              data-cursor-label="Hire"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-spark sm:block"
            >
              Start a project
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              data-hover
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 md:hidden"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span animate={open ? { rotate: 45, y: 7 } : {}} className="block h-[1.5px] w-5 bg-ink" />
                <motion.span animate={open ? { opacity: 0 } : {}} className="block h-[1.5px] w-5 bg-ink" />
                <motion.span animate={open ? { rotate: -45, y: -7 } : {}} className="block h-[1.5px] w-5 bg-ink" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            {bizLinks.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => go(l.id)}
                className="font-display text-4xl font-light tracking-tight"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => go("contact")}
              className="mt-4 rounded-full bg-spark px-7 py-3 text-sm font-medium text-canvas"
            >
              Start a project
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function BackToPortfolio() {
  return (
    <button
      onClick={() => navigate("/")}
      data-hover
      data-cursor-label="Back"
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs font-medium text-muted backdrop-blur transition-colors hover:border-spark/50 hover:text-ink"
    >
      <span className="transition-transform group-hover:-translate-x-0.5">←</span>
      Back to portfolio
    </button>
  );
}
