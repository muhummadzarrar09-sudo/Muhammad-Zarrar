/** The Z mark — ink tile, canvas Z, teal period. Used in nav, footer, icons. */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="11" fill="var(--ink)" />
      <path
        d="M12 12h24v5L21.5 31H36v5H12v-5l14.5-14H12z"
        fill="var(--canvas)"
      />
      <circle cx="40" cy="33.5" r="3" fill="#4fa3a0" />
    </svg>
  );
}
