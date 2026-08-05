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
