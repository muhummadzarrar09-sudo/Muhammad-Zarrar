import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
  /** Stroke weight in grid units. Every house icon draws at 2. */
  strokeWidth?: number;
  children: ReactNode;
};

/**
 * One grid to rule them all. Every house icon is a 24-unit currentColor
 * drawing — round-capped strokes, or filled glyphs with knocked-out
 * counters. Aria-hidden by default: icons decorate, the words beside them
 * carry the meaning.
 */
function Icon({ size = 16, className, strokeWidth = 2, children }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.2A9.5 9.5 0 1 0 12 2.5z"
      />
      <path
        fill="var(--wa-glyph, #fff)"
        stroke="none"
        d="M9.1 7.4c.25-.55.8-.62 1.12-.15l.93 1.66c.2.36.13.8-.17 1.08l-.63.6a6.9 6.9 0 0 0 2.68 2.68l.6-.63c.28-.3.73-.37 1.08-.17l1.66.93c.47.32.4.87-.15 1.12-.58.27-1.24.37-1.88.26-3-.5-5.43-2.94-5.94-5.94-.1-.63 0-1.3.26-1.88z"
      />
    </Icon>
  );
}

export function CheckIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M20 6.5 9.4 17 4 11.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function CrossIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ArrowRightIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M4.5 12h15m-6.5-6.5L19.5 12 13 18.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function SpinnerIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={`spin${className ? ` ${className}` : ""}`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  );
}

/**
 * Wayfinding suite — same 24-grid, same round voice as ArrowRight.
 * UpRight marks every exit (external links, keep-reading); Up rides the
 * back-to-top ring; Left walks 404s home.
 */
export function ArrowUpRightIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M7 17 17 7M8.5 7H17v8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ArrowUpIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M12 19.5v-15m-6.5 6.5L12 4.5l6.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ArrowLeftIcon({ size = 16, className }: Omit<IconProps, "children">) {
  return (
    <Icon size={size} className={className}>
      <path
        d="M19.5 12h-15m6.5-6.5L4.5 12l6.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
