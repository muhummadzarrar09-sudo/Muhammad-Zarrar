import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Pause, Square } from "lucide-react";
import { TypewriterCursor } from "@/components/Brutalist";
import { cn } from "@/utils/cn";

/**
 * Omni — press-to-talk voice-agent demo.
 * Hold the mic, the waveform breathes like a live channel, release and
 * Omni "thinks" for a beat, then the transcript types the exchange.
 * Pure CSS/JS — no audio, no network. Under reduced motion it renders
 * as a calm static transcript with the mic disabled.
 */

const SCRIPT = [
  { speaker: "you", text: "Omni — open the dashboard." },
  { speaker: "omni", text: "Opening the dashboard — done." },
] as const;

const BARS = [0.9, 0.5, 1.1, 0.7, 1.3, 0.6, 1.0, 0.8, 1.2, 0.55, 0.95, 0.75, 1.15, 0.65, 1.05, 0.85];

type Phase = "idle" | "listening" | "thinking";

function Waveform({ reduced, live }: { reduced: boolean; live: boolean }) {
  return (
    <div className="flex h-16 items-center gap-1 sm:h-20" aria-hidden="true">
      {BARS.map((level, i) => (
        <span
          key={i}
          className={cn(
            "voice-bar",
            reduced && "!animation-none",
            live && "voice-bar-live"
          )}
          style={{
            height: `${level * 100}%`,
            animationDelay: `${i * 0.07}s`,
            animationDuration: `${0.8 + (i % 5) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

function Transcript({
  reduced,
  setRestart,
}: {
  reduced: boolean;
  setRestart: (fn: (() => void) | null) => void;
}) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  // External control: the mic button resets the loop to the top.
  const restart = useCallback(() => {
    setLine(0);
    setChars(0);
  }, []);

  useEffect(() => {
    setRestart(restart);
  }, [restart, setRestart]);

  useEffect(() => {
    if (reduced) return;
    const text = SCRIPT[line].text;
    if (chars < text.length) {
      const t = window.setTimeout(() => setChars((c) => c + 1), 26);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      if (line < SCRIPT.length - 1) {
        setLine(line + 1);
        setChars(0);
      } else {
        setLine(0);
        setChars(0);
      }
    }, 1500);
    return () => window.clearTimeout(t);
  }, [chars, line, reduced]);

  return (
    <div className="min-w-0 font-mono text-[13px] leading-relaxed" aria-hidden="true">
      {SCRIPT.map((lineItem, i) => {
        const isCurrent = !reduced && i === line;
        const shown = isCurrent ? lineItem.text.slice(0, chars) : lineItem.text;
        const speaker =
          lineItem.speaker === "you" ? "text-clay-deep" : "text-forest-soft";
        return (
          <div key={i} className={`flex items-baseline gap-2 ${i > 0 ? "mt-2.5" : ""}`}>
            <span className={`shrink-0 text-[10px] uppercase tracking-[0.2em] ${speaker}`}>
              {lineItem.speaker}
            </span>
            <span className="text-ink-soft">
              “{shown}
              {isCurrent && <TypewriterCursor />}”
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function VoiceDemo() {
  const reduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>("idle");
  const holdRef = useRef<{ id: number; pointerId: number } | null>(null);
  const thinkTimer = useRef<number | null>(null);
  const restartRef = useRef<(() => void) | null>(null);

  const setTranscriptRestart = useCallback((fn: (() => void) | null) => {
    restartRef.current = fn;
  }, []);

  const startListening = useCallback(() => {
    if (reduced) return;
    if (thinkTimer.current) window.clearTimeout(thinkTimer.current);
    setPhase("listening");
  }, [reduced]);

  const stopListening = useCallback(() => {
    if (reduced) return;
    setPhase("thinking");
    thinkTimer.current = window.setTimeout(() => {
      restartRef.current?.();
      setPhase("idle");
    }, 900);
  }, [reduced]);

  useEffect(() => {
    return () => {
      if (thinkTimer.current) window.clearTimeout(thinkTimer.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced) return;
    e.preventDefault();
    holdRef.current = { id: Date.now(), pointerId: e.pointerId };
    (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
    startListening();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || !holdRef.current) return;
    if (e.pointerId !== holdRef.current.pointerId) return;
    holdRef.current = null;
    stopListening();
  };

  const label =
    phase === "listening"
      ? "listening…"
      : phase === "thinking"
        ? "thinking…"
        : reduced
          ? "demo — press-to-talk disabled for reduced motion"
          : "hold to talk";

  return (
    <div
      role="img"
      aria-label="Interactive demo of the Omni voice agent: hold the microphone, release, and Omni confirms the command."
      className="notebook-page overflow-hidden rounded-2xl"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Omni — voice agent
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              phase === "listening" ? "animate-pulse bg-clay" : "bg-clay/60"
            )}
          />
          {phase === "idle" ? "hold-to-talk demo" : label}
        </span>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <div className="flex flex-col items-center gap-3">
          <Waveform reduced={reduced} live={phase === "listening"} />
          {/* Press-to-talk mic */}
          <button
            type="button"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={(e) => {
              if (holdRef.current && e.pointerId === holdRef.current.pointerId) {
                holdRef.current = null;
                stopListening();
              }
            }}
            onKeyDown={(e) => {
              if (reduced) return;
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                if (phase === "idle") startListening();
                else stopListening();
              }
            }}
            disabled={reduced}
            aria-label="Hold to talk to the Omni demo"
            aria-pressed={phase === "listening"}
            className={cn(
              "grid h-14 w-14 place-items-center rounded-full border transition-all duration-200",
              phase === "listening"
                ? "scale-105 border-clay-deep bg-clay text-canvas"
                : "border-line-strong bg-surface text-ink hover:border-clay-deep hover:text-clay-deep",
              reduced && "cursor-not-allowed opacity-40"
            )}
          >
            {phase === "listening" ? (
              <Square size={15} strokeWidth={1.8} />
            ) : phase === "thinking" ? (
              <Pause size={15} strokeWidth={1.8} className="animate-pulse" />
            ) : (
              <Mic size={15} strokeWidth={1.8} />
            )}
          </button>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
            {label}
          </span>
        </div>

        <Transcript reduced={reduced} setRestart={setTranscriptRestart} />
      </div>

      <div className="border-t border-line bg-canvas-deep/40 px-6 py-3 font-mono text-[10px] leading-relaxed text-muted">
        Demo only — nothing is recorded, no audio leaves the page. The real Omni
        hears with Whisper, thinks with a local 1.5B model, and acts with 100+ tools.
      </div>
    </div>
  );
}
