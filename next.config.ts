import type { NextConfig } from "next";

/**
 * Static export → deployable to Cloudflare Pages with zero server cost.
 * `npm run build` produces a fully static site in ./out
 */
const nextConfig: NextConfig = {
  // Next 16 protects dev-only client chunks by origin. The preview host
  // changes every session ({port}-{sandboxId}.e2b.app), so allow the whole
  // e2b.app range — otherwise the preview gets zero hydration and the
  // motion stack never boots (the page looks "static").
  allowedDevOrigins: ["*.e2b.app", "3000-iwg1ratpfefca1hixbunh.e2b.app"],
  output: "export",
  // Required for static export. All imagery on this site is local and
  // dimension-explicit, so no optimization endpoint is needed.
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
