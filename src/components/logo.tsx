/** The Z mark — aura tile, ardent Z, sunbeam period. Used in nav, footer, icons. */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="9" fill="#852616" />
      <path
        d="M12 12h24v5L21.5 31H36v5H12v-5l14.5-14H12z"
        fill="#FFD5A9"
      />
      <circle cx="40" cy="33.5" r="3" fill="#DA7134" />
    </svg>
  );
}
