import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { sound } from "@/lib/sound";

type SoundCtx = {
  ambientOn: boolean;
  toggle: () => void;
};

const Ctx = createContext<SoundCtx>({ ambientOn: false, toggle: () => {} });

export function useSound() {
  return useContext(Ctx);
}

const INTERACTIVE = "a, button, [data-hover], input, textarea, [role='button']";

export function SoundProvider({ children }: { children: ReactNode }) {
  // The ambient breeze + birds bed is OFF by default; the visitor opts in.
  // UI feedback (pew on hover, click) stays live so the site always feels alive.
  const [ambientOn, setAmbientOn] = useState(false);
  const lastHover = useRef<Element | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mz-ambient");
    if (saved === "1") setAmbientOn(true);
  }, []);

  useEffect(() => {
    if (ambientOn) sound.startAmbient();
    else sound.stopAmbient();
    localStorage.setItem("mz-ambient", ambientOn ? "1" : "0");
  }, [ambientOn]);

  const toggle = useCallback(() => {
    setAmbientOn((prev) => {
      const next = !prev;
      sound.unlock();
      if (next) sound.startAmbient();
      else sound.stopAmbient();
      if (next) sound.chime();
      localStorage.setItem("mz-ambient", next ? "1" : "0");
      return next;
    });
  }, []);

  // Unlock audio on the first interaction (browser autoplay policy), then wire
  // global delegated feedback so EVERY interactive element feels alive.
  useEffect(() => {
    const unlock = () => sound.unlock();
    const onHover = (e: Event) => {
      const target = (e.target as Element)?.closest?.(INTERACTIVE);
      if (target && target !== lastHover.current) {
        lastHover.current = target;
        sound.pew(); // the "pew" on hover
      } else if (!target) {
        lastHover.current = null;
      }
    };
    const onClick = (e: Event) => {
      const target = (e.target as Element)?.closest?.("[data-silent]");
      if (target) return; // element manages its own sound
      sound.click();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("pointerdown", unlock);
    document.addEventListener("mouseover", onHover);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <Ctx.Provider value={{ ambientOn, toggle }}>{children}</Ctx.Provider>;
}
