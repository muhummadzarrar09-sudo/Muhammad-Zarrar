/**
 * The actual ZS monogram, shipped from the provided source art.
 * Header + footer use the tight transparent raster cut so the real logo
 * appears exactly as supplied rather than an interpretive redraw.
 */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <img
      src="/images/logo-actual-mark-small.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="logo-mark-image"
      decoding="async"
    />
  );
}
