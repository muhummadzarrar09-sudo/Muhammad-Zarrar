/**
 * ============================================================
 *  SITE CONSTANTS — single source of truth for contact details.
 *  Every usage (footer, CTA bands, forms, contact page, wa.me
 *  deep links) reads from this file.
 * ============================================================
 */

/** Digits-only international format for wa.me deep links. */
export const WHATSAPP_NUMBER = "923335666050";

/** Human-readable format shown on the site. */
export const WHATSAPP_DISPLAY = "+92 333 5666050";

export const EMAIL = "muhummadzarrar09@gmail.com";

/**
 * Canonical production URL — ONE-LINE SWAP when the domain lands.
 * Currently the Vercel preview host; change to https://zarrarsolutions.com
 * (or whatever you buy) and rebuild — canonicals, OG URLs, sitemap,
 * robots, and JSON-LD all read from this constant.
 */
export const SITE_URL = "https://zarrarsolutions.vercel.app";

export const SITE_NAME = "Zarrar.Solutions";

export const POSITIONING =
  "We don't just make websites. We audit broken digital flows — and build the systems that fix them.";

export const DEFAULT_WA_MESSAGE =
  "Hello Zarrar.Solutions — I'd like to talk about a project.";

/** Builds a wa.me deep link with a URL-encoded, pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
