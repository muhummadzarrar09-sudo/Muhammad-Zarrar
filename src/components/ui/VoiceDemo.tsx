import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypewriterCursor } from "@/components/Brutalist";

/**
 * Omni — live voice-agent demo.
 * An animated waveform + a looping typed transcript that shows the agent
 * listening, taking a command, and confirming. Pure CSS/JS — no audio, no
 * network. Under reduced motion it renders as a calm static transcript.
 */

const SCRIPT = [
  { speaker: "you", text: "Omni — open the dashboard." },
  { speaker: "omni", text: "Opening the dashboard — done." },
] as const;

const BARS = [0.9, 0.5, 1.1, 0.7, 1.3, 0.6, 1.0, 0.8, 1.2, 0.55, 0.95, 0.75, 1.15, 0.65, 1.05, 0.85];

function Waveform({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-16 items-center gap-1 sm:h-20" aria-hidden="true">
      {BARS.map((level, i) => (
        <span
          key={i}
          className={reduced ? "" : "voice-bar"}
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

function Transcript({ reduced }: { reduced: boolean }) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

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
          lineItem.speaker === "you"
            ? "text-clay-deep"
            : "text-forest-soft";
        return (
          <div
            key={i}
            className={`flex items-baseline gap-2 ${i > 0 ? "mt-2.5" : ""}`}
          >
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

  return (
    <div
      role="img"
      aria-label="Animated demo of the Omni voice agent: you speak a command, Omni confirms it."
      className="notebook-page overflow-hidden rounded-2xl"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Omni — voice agent
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" />
          live demo
        </span>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <Waveform reduced={reduced} />
        <Transcript reduced={reduced} />
      </div>
    </div>
  );
}
