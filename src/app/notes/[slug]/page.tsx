import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { NOTES, getNote } from "@/content/notes";
import { Reveal } from "@/components/reveal";
import { ReadingProgress } from "@/components/reading-progress";
import { ArrowUpRightIcon } from "@/components/icons";
import { Diagram } from "@/components/diagram";
import { WaterfallFigure, RenderFigure } from "@/components/note-figures";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { SITE_URL } from "@/lib/site";
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
  return pageMeta({
    title: `${note.title} — Field Notes`,
    description: note.excerpt,
    path: `/notes/${note.slug}`,
    ogImage: "/og-notes.png",
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const postingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.dateISO,
    dateModified: note.dateISO,
    url: `${SITE_URL}/notes/${note.slug}`,
    author: { "@type": "Person", name: "Muhammad Zarrar" },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/notes/${note.slug}`,
  };

  return (
    <>
      <JsonLd data={postingSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Field Notes", path: "/notes" },
          { name: note.title, path: `/notes/${note.slug}` },
        ])}
      />

      <PageHero
        compact
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/notes", label: "Field Notes" },
          { label: note.title },
        ]}
        kicker={`${note.date} · Muhammad Zarrar`}
        title={note.title}
        lede={note.excerpt}
      />

      <ReadingProgress target=".note-article" />
      <section className="section note-article">
        <div className="container">
          <div className="prose prose-reveal">
            {note.sections.map((section, si) => (
              <Reveal key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph, pi) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className={si === 0 && pi === 0 ? "dropcap" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
                {si === 0 && note.figure && (
                  <Diagram
                    label={
                      note.figure === "waterfall"
                        ? "Fig. 01 — Waterfall"
                        : "Fig. 01 — Two audiences"
                    }
                    caption={
                      note.figure === "waterfall"
                        ? "Illustrative waterfall of the pattern above — theme, builder, fonts, slider, and chat, every bar something the visitor never asked for."
                        : "Same URL, two audiences — the crawler gets the shell. Illustrative, after the pattern above."
                    }
                    artLabel={
                      note.figure === "waterfall"
                        ? "Illustrative waterfall chart: five request bars stack past nine seconds; visitors leave around second four; first paint lands near second ten."
                        : "Two browser frames: what Google fetched is an empty shell with zero words; what visitors saw is the painted page."
                    }
                  >
                    {note.figure === "waterfall" ? (
                      <WaterfallFigure />
                    ) : (
                      <RenderFigure />
                    )}
                  </Diagram>
                )}
              </Reveal>
            ))}
            <Reveal className="inset-panel" >
              <p className="note-takeaway-label">The takeaway</p>
              <p className="note-takeaway">{note.takeaway}</p>
            </Reveal>
            {(() => {
              const idx = NOTES.findIndex((n) => n.slug === note.slug);
              const next = NOTES[(idx + 1) % NOTES.length];
              if (!next || next.slug === note.slug) return null;
              return (
                <Reveal className="card card-hover keep-reading" spotlight>
                  <p className="keep-label">Keep reading</p>
                  <Link
                    href={`/notes/${next.slug}`}
                    className="keep-link"
                  >
                    {next.title}{" "}
                    <ArrowUpRightIcon size={18} className="keep-arrow" />
                  </Link>
                  <p className="idx-sub">{next.excerpt}</p>
                </Reveal>
              );
            })()}
          </div>
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
