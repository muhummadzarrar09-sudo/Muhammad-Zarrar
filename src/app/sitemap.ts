import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { NOTES } from "@/content/notes";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/brief", priority: 0.95 },
  { path: "/free-audit", priority: 0.95 },
  { path: "/services", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/process", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/notes", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
] as const;

/**
 * Sitemap URLs are the public, extensionless canonical routes. Next's static
 * export writes `.html` files; Vercel and Cloudflare resolve those clean URLs
 * at the edge. Keep hosting filenames (and the `/breif` correction redirect)
 * out of the sitemap.
 */
const canonicalUrl = (path: string) =>
  path === "/" ? SITE_URL.replace(/\/+$/, "") : new URL(path, `${SITE_URL}/`).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: canonicalUrl(path),
      lastModified: generatedAt,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...SERVICES.map((service) => ({
      url: canonicalUrl(`/services/${service.slug}`),
      lastModified: generatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...NOTES.map((note) => ({
      url: canonicalUrl(`/notes/${note.slug}`),
      lastModified: new Date(note.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
