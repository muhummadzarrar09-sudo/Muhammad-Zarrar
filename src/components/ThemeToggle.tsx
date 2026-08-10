import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

type Theme = "light" | "dark" | "system";

function getStored(): Theme {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem("theme");
  if (v === "light" || v === "dark") return v;
  return "system";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    localStorage.removeItem("theme");
    // Let prefers-color-scheme handle it
  } else {
    localStorage.setItem("theme", theme);
    root.classList.add(theme);
  }
}

const THEME_COLORS: Record<Theme, string> = {
  light: "#FCFAF7",
  dark: "#17130F",
  system: "#FCFAF7",
};

function syncThemeColor() {
  const root = document.documentElement;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) return;
  const isDark =
    root.classList.contains("dark") ||
    (!root.classList.contains("light") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  meta.content = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
}

export default function ThemeToggle({ className }: { className?: string }) {
  // Lazy init — read the stored theme once on first render (client-only SPA,
  // theme-init.js already applied the class before React mounts).
  const [theme, setTheme] = useState<Theme>(getStored);

  useEffect(() => {
    apply(theme);
  }, [theme]);

  // Keep the browser chrome (address bar) in sync with the paper/ink theme.
  useEffect(() => {
    syncThemeColor();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", syncThemeColor);
    return () => mq.removeEventListener("change", syncThemeColor);
  }, [theme]);

  const cycle = () => {
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));
  };

  const icon = theme === "light" ? "☀" : theme === "dark" ? "☾" : "◎";
  const label = theme === "light" ? "Light mode" : theme === "dark" ? "Dark mode" : "System theme";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-[15px] transition-colors hover:border-clay-soft hover:text-clay-deep",
        className
      )}
    >
      {icon}
    </button>
  );
}
