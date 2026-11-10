import { NOTES, readingMinutes, topicLabel, TOPICS } from "@/content/notes";
import { SERVICES } from "@/content/services";
import { GUIDES } from "@/content/guides";
import { EMAIL, SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/site";

/**
 * llms.txt — a plain-language map of this site for answer engines.
 * Static, hand-written from the same content the pages render, so a model
 * that reads it gets the studio's own words rather than a guess.
 */
export const dynamic = "force-static";

export function GET() {
  const pages = [
    { path: "/", label: "Home", note: "What we do and who it is for" },
    { path: "/free-audit", label: "Free 5-point audit", note: "The entry offer, 24-hour turnaround" },
    { path: "/services", label: "Services", note: "Audit, redesign, retail storefront, booking system" },
    { path: "/pricing", label: "Pricing", note: "PKR ranges and what moves them" },
    { path: "/process", label: "Process", note: "Audit → findings → build → aftercare" },
    { path: "/brief", label: "Project brief", note: "A qualifying form, no sales call" },
    { path: "/about", label: "About", note: "The studio, the standard, the founder" },
    { path: "/contact", label: "Contact", note: "WhatsApp and email" },
    { path: "/notes", label: "Field Notes", note: "The writing archive" },
  ];

  const notes = NOTES.map(
    (note) =>
      `- [${note.title}](${SITE_URL}/notes/${note.slug}): ${note.excerpt} (${readingMinutes(note)} min read; topics: ${note.topics.map(topicLabel).join(", ")})`,
  ).join("\n");

  const services = SERVICES.map(
    (service) =>
      `- [${service.name}](${SITE_URL}/services/${service.slug})`,
  ).join("\n");

  const body = `# ${SITE_NAME}

> Zarrar.Solutions is an audit-led digital systems studio in Rawalpindi, Pakistan. We audit broken digital flows — slow sites, invisible sites, sites that convert nothing — and build the systems that fix them. Positioning: "We don't just make websites. We audit broken digital flows — and build the systems that fix them."

Language: English. Location served: Islamabad and Rawalpindi, Pakistan. Contact: WhatsApp ${WHATSAPP_DISPLAY} · ${EMAIL}. There is no newsletter, no tracker, and no third-party script on this site.

## Field notes

${notes}

## Guides

${GUIDES.map((guide) => `- [${guide.h1}](${SITE_URL}/guides/${guide.slug}): ${guide.answer}`).join("\n")}

## Pages

${pages.map((page) => `- [${page.label}](${SITE_URL}${page.path}): ${page.note}`).join("\n")}

## Services

${services}

## Topics covered

${TOPICS.map((topic) => `- ${topic.label}`).join("\n")}

## Machine-readable

- Sitemap: ${SITE_URL}/sitemap.xml
- RSS feed: ${SITE_URL}/feed.xml
- Robots: ${SITE_URL}/robots.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
