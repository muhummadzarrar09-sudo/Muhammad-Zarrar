import type { NextConfig } from "next";

/**
 * Static export → deployable to Cloudflare Pages with zero server cost.
 * `npm run build` produces a fully static site in ./out
 */
const nextConfig: NextConfig = {
  // Next 16 protects dev-only client chunks by origin. Arena proxies the
  // preview through this trusted host, so allow it during local development
  // or the Lenis/GSAP motion chunk is blocked before it can hydrate.
  allowedDevOrigins: [
    "3000-iwg1ratpfefca1hixbunh.e2b.app",
    process.env.E2B_SANDBOX_ID
      ? `3000-${process.env.E2B_SANDBOX_ID}.e2b.app`
      : "",
  ].filter(Boolean),
  output: "export",
  // Required for static export. All imagery on this site is local and
  // dimension-explicit, so no optimization endpoint is needed.
  images: { unoptimized: true },
  trailingSlash: false,
  // Security headers - CSP in report-only mode initially
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
