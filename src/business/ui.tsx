import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

/* Stroke icon set for service cards */
export function BizIcon({ name, className }: { name: string; className?: string }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: className ?? "h-6 w-6",
  };
  switch (name) {
    case "globe":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5 -2.5 15 0 18" />
        </svg>
      );
    case "grid":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4M8 14h3v3H8z" />
        </svg>
      );
    case "form":
      return (
        <svg {...p}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="8" height="10" rx="1.5" />
          <rect x="13" y="3" width="8" height="6" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
          <rect x="3" y="17" width="8" height="4" rx="1.5" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...p}>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9.5 2v3M14.5 2v3M9.5 19v3M14.5 19v3M2 9.5h3M2 14.5h3M19 9.5h3M19 14.5h3" />
        </svg>
      );
    default: // rocket
      return (
        <svg {...p}>
          <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a16 16 0 0 1 8-8c2 0 3 1 3 3a16 16 0 0 1-8 8l-3-3Z" />
          <circle cx="14.5" cy="9.5" r="1.2" />
        </svg>
      );
  }
}

/* Faux app window — warm, paper-like (no neon) */
export function MockWindow({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-surface lift", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-muted">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
