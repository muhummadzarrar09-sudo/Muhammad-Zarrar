import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* The "script" the terminal types out — a developer's intro, in shell. */
type Line = {
  kind: "cmd" | "out";
  text: string;
  accent?: "name" | "live" | "stack";
};

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Muhammad Zarrar", accent: "name" },
  { kind: "cmd", text: "cat role.txt" },
  { kind: "out", text: "Full-Stack Developer · AI Systems Engineer" },
  { kind: "cmd", text: "ls --stack" },
  { kind: "out", text: "voice-ai/  agents/  fullstack/  design-eng/", accent: "stack" },
  { kind: "cmd", text: "./status --now" },
  { kind: "out", text: "● Available for select projects", accent: "live" },
];

const SPEEDS = { cmd: 52, out: 22 } as const;

function Command({ text }: { text: string }) {
  const [cmd, ...rest] = text.split(" ");
  return (
    <span className="flex flex-wrap items-baseline gap-x-1.5">
      <span className="text-spark">$</span>
      <span className="text-[#5fd0c9]">{cmd}</span>
      {rest.length > 0 && (
        <span className="text-ember">{rest.join(" ")}</span>
      )}
    </span>
  );
}

function Output({ line }: { line: Line }) {
  if (line.accent === "name")
    return <span className="text-volt">{line.text}</span>;
  if (line.accent === "live")
    return (
      <span className="text-volt">
        <motion.span
          className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-volt align-middle"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {line.text.replace("● ", "")}
      </span>
    );
  if (line.accent === "stack")
    return (
      <span className="whitespace-pre text-[#9fb8d6]">{line.text}</span>
    );
  return <span className="text-canvas/55">{line.text}</span>;
}

export default function Terminal() {
  const [completed, setCompleted] = useState<Line[]>([]);
  const [current, setCurrent] = useState<{ line: Line; chars: number } | null>(
    null,
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (lineIdx >= SCRIPT.length) {
        setCurrent(null);
        setDone(true);
        return;
      }
      const line = SCRIPT[lineIdx];
      charIdx += 1;
      setCurrent({ line, chars: charIdx });

      const finished = charIdx >= line.text.length;
      const speed = SPEEDS[line.kind];

      if (finished) {
        timer = setTimeout(() => {
          if (cancelled) return;
          setCompleted((c) => [...c, line]);
          setCurrent(null);
          lineIdx += 1;
          charIdx = 0;
          timer = setTimeout(type, line.kind === "cmd" ? 140 : 360);
        }, line.kind === "cmd" ? 60 : 20);
      } else {
        timer = setTimeout(type, speed);
      }
    };

    timer = setTimeout(type, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[460px]">
      {/* ambient glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-spark/20 blur-3xl" />

      {/* window */}
      <motion.div
        initial={{ opacity: 0, y: 18, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0d0a] shadow-2xl shadow-ink/40"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.04), transparent 30%)",
        }}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="mx-auto font-mono text-[11px] tracking-tight text-canvas/40">
            zarrar@portfolio — zsh
          </span>
          <span className="font-mono text-[10px] text-canvas/25">100%</span>
        </div>

        {/* body */}
        <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          {completed.map((line, i) => (
            <div key={i} className="min-h-[1.25rem]">
              {line.kind === "cmd" ? (
                <Command text={line.text} />
              ) : (
                <Output line={line} />
              )}
            </div>
          ))}

          {/* live typing line */}
          {current && (
            <div className="min-h-[1.25rem]">
              {current.line.kind === "cmd" ? (
                <Command text={current.line.text.slice(0, current.chars)} />
              ) : (
                <Output line={{ ...current.line, text: current.line.text.slice(0, current.chars) }} />
              )}
            </div>
          )}

          {/* final resting prompt */}
          {done && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-spark">$</span>
              <motion.span
                className="inline-block h-[1.05rem] w-[8px] bg-spark"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-1.5 font-mono text-[10px] text-canvas/30">
          <span>main</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" /> live
          </span>
          <span>utf-8 · zsh</span>
        </div>
      </motion.div>
    </div>
  );
}
