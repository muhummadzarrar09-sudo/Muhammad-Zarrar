import { NOTES, readingMinutes, topicLabel } from "@/content/notes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Field Notes as RSS 2.0 — generated at build time, one static file,
 * zero dependencies and zero runtime. There is no newsletter and no
 * tracker on this site; a feed reader is the honest way to follow it.
 */
export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** RFC 822, which RSS 2.0 requires for pubDate. */
const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();

export function GET() {
  const newest = NOTES[0]?.dateISO ?? "2026-01-01";

  const items = NOTES.map((note) => {
    const url = `${SITE_URL}/notes/${note.slug}`;
    const categories = note.topics
      .map((id) => `      <category>${escapeXml(topicLabel(id))}</category>`)
      .join("\n");

    return [
      "    <item>",
      `      <title>${escapeXml(note.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${rfc822(note.dateISO)}</pubDate>`,
      `      <description>${escapeXml(note.excerpt)}</description>`,
      categories,
      `      <content:encoded><![CDATA[<p>${escapeXml(note.takeaway)}</p><p>${readingMinutes(note)} min read. <a href="${url}">Read the note</a>.</p>]]></content:encoded>`,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Field Notes — ${SITE_NAME}</title>
    <link>${SITE_URL}/notes</link>
    <description>Short, honest write-ups from real website audits in Pakistan. Evidence over adjectives.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(newest)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/og-notes.png</url>
      <title>Field Notes — ${SITE_NAME}</title>
      <link>${SITE_URL}/notes</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
