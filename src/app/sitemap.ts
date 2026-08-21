import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { NOTES } from "@/content/notes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0 },
    { path: "/free-audit", priority: 0.95 },
    { path: "/services", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/process", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
    { path: "/notes", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...NOTES.map((note) => ({
      url: `${SITE_URL}/notes/${note.slug}`,
      lastModified: new Date(note.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
