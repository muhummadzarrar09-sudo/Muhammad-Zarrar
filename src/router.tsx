// =========================================================================
// TINY ROUTER — path-based so the business sub-site lives at /business with
// its own URL + nav, without touching the portfolio's fragment (#section)
// scroll links. Works in-session (pushState) and on hosts with SPA fallback.
// =========================================================================
import { useEffect, useState } from "react";

export function usePathname() {
  const [path, setPath] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

export function navigate(to: string) {
  if (typeof window === "undefined") return;
  if (window.location.pathname === to) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}
