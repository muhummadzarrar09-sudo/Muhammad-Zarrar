import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSound } from "@/context/SoundContext";
import { profile } from "@/data/portfolio";
import { cn } from "@/utils/cn";

// Mirrors the exact page sequence: About → Expertise → Work → Process → Contact
const LINKS = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

const STREAKS = [
  { top: "34%", w: 10, dur: 1.7, delay: 0 },
  { top: "50%", w: 14, dur: 2.1, delay: 0.35 },
  { top: "66%", w: 9, dur: 1.5, delay: 0.7 },
];

export function SoundToggle() {
  const { ambientOn, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={ambientOn}
      aria-label={ambientOn ? "Mute the breeze" : "Enable the breeze"}
      data-cursor-label={ambientOn ? "Mute" : "Wind"}
      title={ambientOn ? "Breeze & birds on — click to mute" : "Turn on the breeze & birds"}
      className="group relative h-9 w-[60px] shrink-0 rounded-full border border-line bg-surface/70 backdrop-blur transition-colors duration-300 hover:border-ink/40"
    >
      {/* active wash */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ opacity: ambientOn ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,77,23,0.14), rgba(185,242,74,0.10))",
        }}
      />
      {/* flowing air streaks — travel left → right across the track */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        {STREAKS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute left-0 rounded-full bg-spark"
            style={{ top: s.top, width: s.w, height: 1.5 }}
            animate={
              ambientOn
                ? { x: [-16, 64], opacity: [0, 0.85, 0.85, 0] }
                : { opacity: 0 }
            }
            transition={
              ambientOn
                ? {
                    x: { duration: s.dur, repeat: Infinity, ease: "linear", delay: s.delay },
                    opacity: {
                      duration: s.dur,
                      repeat: Infinity,
                      ease: "linear",
                      delay: s.delay,
                      times: [0, 0.18, 0.82, 1],
                    },
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </span>
      {/* sliding knob — centered via top:50% + y:-50% so the transform never fights framer */}
      <motion.span
        className="absolute z-10 grid h-7 w-7 place-items-center rounded-full shadow-sm"
        style={{ top: "50%" }}
        animate={{
          x: ambientOn ? 29 : 3,
          y: "-50%",
          backgroundColor: ambientOn ? "#ff4d17" : "#ddd6c8",
          color: ambientOn ? "#f4f1ea" : "#837d6f",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {ambientOn ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 12-4 16-9 16Z" />
            <path d="M8 17c4-4 6-6 9-9" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2" />
          </svg>
        )}
      </motion.span>
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
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
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500",
            scrolled
              ? "border border-line bg-surface/80 backdrop-blur-xl lift"
              : "border border-transparent bg-transparent",
          )}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 pl-2"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-xs font-semibold text-canvas transition-transform duration-300 group-hover:rotate-[18deg]">
              {profile.initials}
            </span>
            <span className="hidden font-display text-base font-medium tracking-tight sm:block">
              Muhammad<span className="text-spark">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm tracking-tight transition-colors",
                  active === l.id ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-canvas-deep"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SoundToggle />
            <button
              onClick={() => go("contact")}
              data-cursor-label="Contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-spark sm:block"
            >
              Let's talk
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 md:hidden"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-5 bg-ink"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-[1.5px] w-5 bg-ink"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-5 bg-ink"
                />
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
            {LINKS.map((l, i) => (
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
              transition={{ delay: 0.3 }}
              onClick={() => go("contact")}
              className="mt-4 rounded-full bg-spark px-7 py-3 text-sm font-medium text-canvas"
            >
              Let's talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
