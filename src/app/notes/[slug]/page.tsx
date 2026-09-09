import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { NOTES, getNote } from "@/content/notes";
import { Reveal } from "@/components/reveal";
import { ReadingProgress } from "@/components/reading-progress";
import { ArrowUpRightIcon } from "@/components/icons";
import { ScrambleText } from "@/components/scramble-text";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { SITE_URL } from "@/lib/site";

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

      <section className="page-hero" id="top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <Link href="/notes">Field Notes</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">{note.title}</span>
            </nav>
            <ScrambleText
              className="eyebrow"
              text={`${note.date} · Muhammad Zarrar`}
            />
            <h1>{note.title}</h1>
            <p className="lede">{note.excerpt}</p>
          </Reveal>
        </div>
      </section>

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
        headline="Want the same eyes on your site?"
        body="The free 5-point mini-audit checks speed on mobile data, Google visibility, mobile experience, conversion path, and security. 24 hours, no obligation."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage={`Hello Zarrar.Solutions — I read "${note.title}" and I'd like the free 5-point audit.`}
      />
    </>
  );
}
