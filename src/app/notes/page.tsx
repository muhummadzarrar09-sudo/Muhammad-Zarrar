import { pageMeta, breadcrumbLd } from "@/lib/seo";
import {
  NOTES,
  TOPICS,
  readingMinutes,
  topicLabel,
  notesWithTopic,
} from "@/content/notes";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { Scribble } from "@/components/scribble";
import { SITE_URL } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { NotesIndex } from "@/components/notes-index";

export const metadata = pageMeta({
  title: "Field Notes — Short, Honest Write-ups From Real Audits",
  description:
    "Plain-English field notes from real website audits in Pakistan: missing prices, three phone numbers, dead domains, 70-file homepages, and the client-side rendering tax. What we found and what the fix was.",
  path: "/notes",
  ogImage: "/og-notes.png",
});

export default function NotesIndexPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Field Notes — Zarrar.Solutions",
    url: `${SITE_URL}/notes`,
    description:
      "Short, honest write-ups from real audits. Evidence over adjectives.",
    publisher: { "@id": `${SITE_URL}/#org` },
    blogPost: NOTES.map((note) => ({
      "@type": "BlogPosting",
      headline: note.title,
      datePublished: note.dateISO,
      url: `${SITE_URL}/notes/${note.slug}`,
      author: { "@type": "Person", name: "Muhammad Zarrar" },
    })),
  };

  const summaries = NOTES.map((note) => ({
    slug: note.slug,
    title: note.title,
    excerpt: note.excerpt,
    dateLabel: note.date,
    minutes: readingMinutes(note),
    topics: note.topics.map((id) => ({ id, label: topicLabel(id) })),
  }));

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Field Notes", path: "/notes" },
        ])}
      />

      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Field Notes" }]}
        kicker="Field notes"
        title={
          <>
            Evidence,{" "}
            <em>
              <Scribble>written down.</Scribble>
            </em>
          </>
        }
        lede="Short notes from real audits and real builds. No growth-hacking, no listicles — what we found, what it cost the business, and what the fix was."
      >
        <p className="notes-hero-meta">
          <span>{NOTES.length} notes</span>
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          {TOPICS.map((topic) => (
            <span key={topic.id}>
              {topic.label}{" "}
              <span className="notes-hero-count">
                {notesWithTopic(topic.id).length}
              </span>
            </span>
          ))}
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          <a href="/feed.xml" className="notes-rss">
            RSS feed
          </a>
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <NotesIndex notes={summaries} />
        </div>
      </section>

      <CtaBand
        plate="Field notes"
        headline="Recognize your site in these notes?"
        body="That's not a coincidence — these patterns repeat across Pakistani business sites. The free 5-point mini-audit tells you which ones are yours."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I just read your field notes and I think my site has these problems."
      />
    </>
  );
}
