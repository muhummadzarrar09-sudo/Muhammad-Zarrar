import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta, pageLd } from "@/lib/seo";
import {
  NOTES,
  getNote,
  readingMinutes,
  noteWordCount,
  relatedNotes,
  sectionId,
  topicLabel,
  type Figure,
} from "@/content/notes";
import { Reveal } from "@/components/reveal";
import { ReadingProgress } from "@/components/reading-progress";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { Diagram } from "@/components/diagram";
import {
  WaterfallFigure,
  RenderFigure,
  PriceGapFigure,
} from "@/components/note-figures";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { SITE_URL, waLink } from "@/lib/site";
import { PageHero } from "@/components/page-hero";

type RouteParams = { slug: string };

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  const base = pageMeta({
    title: note.title,
    description: note.excerpt,
    path: `/notes/${note.slug}`,
    ogImage: `/social/notes/${note.slug}.png`,
  });

  return {
    ...base,
    /* An article is not a page: give share cards a publish date, a section
       and the post's own tags. */
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: note.dateISO,
      modifiedTime: note.dateISO,
      authors: ["Muhammad Zarrar"],
      section: topicLabel(note.topics[0]),
      tags: note.hashtags,
    },
    /* Each note carries its own tab icon — the ordinal in clay. */
    icons: {
      icon: [
        {
          url: `/social/notes/${note.slug}-icon.png`,
          type: "image/png",
          sizes: "96x96",
        },
      ],
    },
  };
}

/** Every figure in one place: label, honest caption, alt summary, art. */
function NoteFigure({ figure }: { figure: Figure | undefined }) {
  if (figure === "waterfall") {
    return (
      <Diagram
        label="Fig. 01 — Waterfall"
        caption="Illustrative waterfall of the pattern above — theme, builder, fonts, slider, and chat, every bar something the visitor never asked for."
        artLabel="Illustrative waterfall chart: five request bars stack past nine seconds; visitors leave around second four; first paint lands near second ten."
      >
        <WaterfallFigure />
      </Diagram>
    );
  }

  if (figure === "price-gap") {
    return (
      <Diagram
        label="Fig. 01 — The price gap"
        caption="The same catalogue twice: a question mark the customer has to spend a message on, and a range that lets them place themselves. Illustrative; the pattern is the point, not the figures."
        artLabel="Two menu cards. The left lists items with no prices, each row ending in a question mark. The right lists the same items with price ranges, so the customer can decide without asking."
      >
        <PriceGapFigure />
      </Diagram>
    );
  }

  if (figure === "render") {
    return (
      <Diagram
        label="Fig. 01 — Two audiences"
        caption="Same URL, two audiences — the crawler gets the shell. Illustrative, after the pattern above."
        artLabel="Two browser frames: what Google fetched is an empty shell with zero words; what visitors saw is the painted page."
      >
        <RenderFigure />
      </Diagram>
    );
  }

  return null;
}

export default async function NotePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const minutes = readingMinutes(note);
  const words = noteWordCount(note);
  const topics = note.topics.map((id) => ({ id, label: topicLabel(id) }));

  const postingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.dateISO,
    dateModified: note.dateISO,
    url: `${SITE_URL}/notes/${note.slug}`,
    image: `${SITE_URL}/social/notes/${note.slug}.png`,
    inLanguage: "en",
    articleSection: topics[0]?.label,
    keywords: [...note.hashtags.map((tag) => tag.slice(1)), ...topics.map((t) => t.label), "website audit", "Pakistan"].join(", "),
    wordCount: words,
    timeRequired: `PT${minutes}M`,
    author: { "@type": "Person", name: "Muhammad Zarrar" },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/notes/${note.slug}`,
    isPartOf: { "@id": `${SITE_URL}/notes` },
  };

  const related = (() => {
    const hits = relatedNotes(note, 2);
    if (hits.length > 0) return hits;
    const idx = NOTES.findIndex((n) => n.slug === note.slug);
    const next = NOTES[(idx + 1) % NOTES.length];
    return next && next.slug !== note.slug ? [next] : [];
  })();

  const shareText = `${note.title} — a field note from Zarrar.Solutions: ${SITE_URL}/notes/${note.slug}`;

  return (
    <>
      <JsonLd data={postingSchema} />
      <JsonLd
        data={pageLd([
          { name: "Home", path: "/" },
          { name: "Field Notes", path: "/notes" },
          { name: note.title, path: `/notes/${note.slug}` },
        ], { updated: note.dateISO })}
      />

      <PageHero
        compact
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/notes", label: "Field Notes" },
          { label: note.title },
        ]}
        kicker={`${note.date} · ${minutes} min read · Muhammad Zarrar`}
        title={note.title}
        lede={note.excerpt}
      >
        <p className="note-hero-topics">
          {topics.map((topic) => (
            <span key={topic.id} className="note-topic">
              {topic.label}
            </span>
          ))}
          <span className="note-meta-item">{words} words</span>
        </p>
      </PageHero>

      <ReadingProgress target=".note-article" />
      <section className="section note-article">
        <div className="container">
          <div className="note-layout">
            <aside className="note-toc" aria-label="In this note">
              <p className="note-toc-label">In this note</p>
              <ol className="note-toc-list">
                {note.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${sectionId(section.heading)}`}>
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#takeaway">The takeaway</a>
                </li>
              </ol>
              <p className="note-toc-meta">
                {minutes} min · {words} words
              </p>
              <a className="note-toc-rss" href="/feed.xml">
                Follow by RSS
              </a>
            </aside>

            <div className="prose prose-reveal">
              {note.sections.map((section, si) => (
                <Reveal key={section.heading}>
                  <h2 id={sectionId(section.heading)}>{section.heading}</h2>
                  {section.body.map((paragraph, pi) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className={si === 0 && pi === 0 ? "dropcap" : undefined}
                    >
                      {paragraph}
                    </p>
                  ))}
                  {si === 0 && note.figure && (
                    <NoteFigure figure={note.figure} />
                  )}
                </Reveal>
              ))}

              <Reveal className="inset-panel" id="takeaway">
                <p className="note-takeaway-label">The takeaway</p>
                <p className="note-takeaway">{note.takeaway}</p>
              </Reveal>

              <div className="note-share">
                <p className="note-share-label">Send this to someone who needs it</p>
                <div className="note-share-row">
                  <a
                    className="note-share-link"
                    href={waLink(shareText)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                  <a
                    className="note-share-link"
                    href={`mailto:?subject=${encodeURIComponent(note.title)}&body=${encodeURIComponent(shareText)}`}
                  >
                    Email
                  </a>
                  <a className="note-share-link" href="/notes">
                    All field notes
                  </a>
                </div>
                <p className="note-tags" aria-label="Social tags">
                  {note.hashtags.map((tag) => (
                    <span key={tag} className="note-tag">
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="note-related">
              <p className="note-related-label">Related notes</p>
              <div className="note-related-grid">
                {related.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/notes/${other.slug}`}
                    className="card card-hover note-related-card"
                    data-spotlight
                  >
                    <span className="note-date">{other.date}</span>
                    <h3 className="note-related-title">
                      {other.title} <ArrowUpRightIcon size={16} />
                    </h3>
                    <p className="idx-sub">{other.excerpt}</p>
                    <span className="note-meta">
                      <span className="note-meta-item">
                        {readingMinutes(other)} min read
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        plate="Field notes"
        headline="Want the same eyes on your site?"
        body="The free 5-point mini-audit checks speed on mobile data, Google visibility, mobile experience, conversion path, and security. 24 hours, no obligation."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage={`Hello Zarrar.Solutions — I read "${note.title}" and I'd like the free 5-point audit.`}
      />
    </>
  );
}
