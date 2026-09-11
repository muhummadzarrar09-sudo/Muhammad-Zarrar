/**
 * ZARRAR · SOLUTIONS lockup.
 * Set in real Montserrat ExtraBold — not traced polygons.
 * Letters inherit currentColor. The clay bead and rules keep house copper.
 * Compact = nav / footer brand. Full = name + “we build digital”.
 */
export function Wordmark({
  variant = "compact",
  className = "",
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const full = variant === "full";
  const cls = `wordmark${full ? " wordmark-full" : ""}${className ? ` ${className}` : ""}`;

  return (
    <span className={cls} aria-hidden="true">
      <span className="wordmark-row">
        <span className="wordmark-name">ZARRAR</span>
        <span className="wordmark-bead" />
        <span className="wordmark-name">SOLUTIONS</span>
      </span>
      {full ? (
        <span className="wordmark-tagline">
          <span className="wordmark-rule" />
          <span className="wordmark-tag">WE BUILD DIGITAL</span>
          <span className="wordmark-rule" />
        </span>
      ) : null}
    </span>
  );
}
