import type { NextConfig } from "next";

/**
 * Static export → deployable to Cloudflare Pages with zero server cost.
 * `npm run build` produces a fully static site in ./out
 */
const nextConfig: NextConfig = {
  output: "export",
  // Required for static export. All imagery on this site is local and
  // dimension-explicit, so no optimization endpoint is needed.
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
