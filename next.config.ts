import type { NextConfig } from "next";

/**
 * Static export → deployable to Cloudflare Pages with zero server cost.
 * `npm run build` produces a fully static site in ./out
 */
const nextConfig: NextConfig = {
  // Next 16 protects dev-only client chunks by origin. Arena proxies the
  // preview through this trusted host, so allow it during local development
  // or the Lenis/GSAP motion chunk is blocked before it can hydrate.
  allowedDevOrigins: ["3000-iwg1ratpfefca1hixbunh.e2b.app"],
  output: "export",
  // Required for static export. All imagery on this site is local and
  // dimension-explicit, so no optimization endpoint is needed.
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
