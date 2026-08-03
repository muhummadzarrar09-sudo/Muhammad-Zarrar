export function SectionLoading({ label = "Loading section" }: { label?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32" aria-label={label}>
      <div className="rounded-3xl border border-line bg-surface/50 p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-clay-deep">{label}</div>
        <div className="mt-4 h-8 w-2/3 rounded-full bg-line/60" />
        <div className="mt-3 h-4 w-1/2 rounded-full bg-line/40" />
      </div>
    </section>
  );
}

export function CinematicLoadingFrame({
  label = "Loading cinematic layer",
  title = "Preparing the frame.",
  className = "h-full min-h-[320px]",
}: {
  label?: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`relative grid w-full place-items-center overflow-hidden rounded-3xl bg-[#100e0a] text-canvas ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:3px_3px]" />
      <div className="relative px-8 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-spark/70">{label}</div>
        <div className="mt-2 font-display text-3xl leading-none tracking-tightest sm:text-4xl">{title}</div>
      </div>
    </div>
  );
}
