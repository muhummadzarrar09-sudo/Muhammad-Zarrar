import { cn } from "@/utils/cn";

/**
 * Accessible dropdown using the native select control.
 * This preserves keyboard, screen-reader, and mobile picker behavior while
 * matching the custom warm/dark visual style of the business form.
 */
export default function Dropdown({
  value,
  options,
  onChange,
  className,
  dark = false,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
  dark?: boolean;
}) {
  const selectClass = dark
    ? "border-canvas/20 bg-[#242119] text-canvas hover:border-canvas/40 focus:border-spark/70"
    : "border-line bg-canvas text-ink hover:border-spark/50 focus:border-spark/70";

  const iconClass = dark ? "text-canvas/50" : "text-muted";

  return (
    <span className={cn("relative block", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg border px-3.5 py-2.5 pr-10 text-left text-sm outline-none transition-colors",
          selectClass,
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2", iconClass)}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}
