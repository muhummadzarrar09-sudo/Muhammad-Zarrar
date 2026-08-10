import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * SwingFrame — interactive frame scrubber.
 * Six frames of a golf swing, generated in the site's surreal style.
 * Drag horizontally to scrub (like SwingFrame's frame-accurate engine),
 * or press play for slow-mo. This is the "video engine, demonstrated"
 * move: the film panel's own mechanic.
 */

const FRAMES = [
  "/images/swing-f1.webp",
  "/images/swing-f2.webp",
  "/images/swing-f3.webp",
  "/images/swing-f4.webp",
  "/images/swing-f5.webp",
  "/images/swing-f6.webp",
];

const PLAY_MS = 140;

export default function SwingFrameScrubber() {
  const reduced = useReducedMotion();
  const [finePointer] = useState(
    () => window.matchMedia("(pointer: fine)").matches
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const dragRef = useRef<{ startX: number; startIndex: number } | null>(null);
  const timerRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
  }, []);

  // Auto-play — skipped under reduced motion
  useEffect(() => {
    if (!playing || reduced) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % FRAMES.length);
    }, PLAY_MS);
    return stop;
  }, [playing, reduced, stop]);

  useEffect(() => stop, [stop]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !finePointer) return;
    stop();
    dragRef.current = { startX: e.clientX, startIndex: index };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const delta = drag.startX - e.clientX;
    const next = Math.min(
      FRAMES.length - 1,
      Math.max(0, drag.startIndex + Math.round(delta / 52))
    );
    setIndex(next);
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="relative">
      {/* The frames — drag to scrub */}
      <div
        role="slider"
        aria-label="Scrub through the golf swing frames"
        aria-valuemin={1}
        aria-valuemax={FRAMES.length}
        aria-valuenow={index + 1}
        aria-valuetext={`Frame ${index + 1} of ${FRAMES.length}`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            setIndex((i) => Math.max(0, i - 1));
          }
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            setIndex((i) => Math.min(FRAMES.length - 1, i + 1));
          }
        }}
        className={cn(
          "group relative aspect-[4/3] select-none overflow-hidden",
          finePointer && !reduced && "cursor-ew-resize touch-none"
        )}
      >
        {FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading={i === 0 ? "eager" : "lazy"}
            width={640}
            height={480}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-100",
              i === index ? "opacity-100" : "opacity-0"
            )}
            draggable={false}
          />
        ))}

        {/* Scrub hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/60 to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/90">
          <span>{reduced ? "frames 1–6" : "drag to scrub"}</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Play / pause + timeline */}
      <div className="flex items-center gap-3 border-t border-line bg-surface px-4 py-3">
        <button
          type="button"
          onClick={() => (playing ? stop() : setPlaying(true))}
          disabled={!!reduced}
          aria-label={playing ? "Pause the swing" : "Play the swing in slow motion"}
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors",
            reduced
              ? "cursor-not-allowed opacity-40"
              : "hover:border-clay-deep hover:bg-clay-wash"
          )}
        >
          {playing ? (
            <Pause size={13} strokeWidth={1.8} />
          ) : (
            <Play size={13} strokeWidth={1.8} className="ml-0.5" />
          )}
        </button>

        <input
          type="range"
          min={0}
          max={FRAMES.length - 1}
          value={index}
          onChange={(e) => {
            stop();
            setIndex(Number(e.target.value));
          }}
          aria-label="Swing frame position"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-line-strong/60 accent-[var(--color-clay-deep)]"
        />

        <span className="shrink-0 font-mono text-[10px] text-muted">
          {playing ? "slow-mo" : finePointer ? "drag or use the slider" : "use the slider"}
        </span>
      </div>
    </div>
  );
}
