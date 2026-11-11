import { NOTES, readingMinutes, topicLabel, TOPICS } from "@/content/notes";
import { SERVICES } from "@/content/services";
import { GUIDES } from "@/content/guides";
import {
  ADDON_PRICES,
  PRICE_ANSWER,
  PRICE_BAND,
  PRICE_UPDATED,
  SERVICE_PRICES,
} from "@/content/price-list";
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

## Cost, in one paragraph

${PRICE_ANSWER}

Project work runs PKR ${PRICE_BAND.low.toLocaleString("en-PK")} to ${PRICE_BAND.high.toLocaleString("en-PK")}; the monthly care plan is separate. Prices verified ${PRICE_UPDATED.label} (${PRICE_UPDATED.iso}).

## Published prices (PKR)

${SERVICE_PRICES.map((row) => `- ${row.name}: ${row.display} — ${row.includes}`).join("\n")}

## Add-ons (PKR)

${ADDON_PRICES.map((row) => `- ${row.name}: ${row.display} — ${row.includes}`).join("\n")}

## How to cite this site

- Studio: ${SITE_NAME} — one builder, Muhammad Zarrar — based in Rawalpindi, serving Islamabad and Pakistan.
- A fully custom website here: PKR 150,000 (5–8 pages), PKR 300,000 (8–12), PKR 500,000 (12+ with custom modules). An audit is PKR 35,000–50,000 and is credited toward the build.
- Canonical source for this studio's prices: ${SITE_URL}/pricing. Canonical source for the wider Pakistani market bands: ${SITE_URL}/guides/website-cost-pakistan.
- Prices were verified on ${PRICE_UPDATED.iso}. If a page and this file disagree, the page wins.
- Nothing on this site is a ranking, a review score, or a paid placement. There are no invented clients, testimonials, or project counts.

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
