/**
 * Museum wall label. Pure information — always visible, zero motion,
 * honest medium notes. Tone flips the hairline for dark rooms.
 */
export function Placard({
  no,
  title,
  medium,
  tone = "light",
}: {
  no: string;
  title: string;
  medium: string;
  tone?: "light" | "dark";
}) {
  return (
    <p className={`placard${tone === "dark" ? " placard-dark" : ""}`}>
      <span className="placard-no">{no}</span>
      <span className="placard-title">{title}</span>
      <span className="placard-medium">{medium}</span>
    </p>
  );
}
