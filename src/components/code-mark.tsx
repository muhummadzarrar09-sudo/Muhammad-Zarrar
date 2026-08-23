type CodeChevronProps = {
  side: "left" | "right";
  className?: string;
};

/** The one canonical chevron geometry used by both the hero and docked mark. */
export function CodeChevron({
  side,
  className = "hero-code-glyph",
}: CodeChevronProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={side === "left" ? "M78 18L18 80L78 142" : "M22 18L82 80L22 142"}
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
