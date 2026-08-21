import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { NOTES, getNote } from "@/content/notes";
import { Reveal } from "@/components/reveal";
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

      <section className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <Link href="/notes">Field Notes</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">{note.title}</span>
            </nav>
            <span className="eyebrow">{note.date} · Muhammad Zarrar</span>
            <h1>{note.title}</h1>
            <p className="lede">{note.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            {note.sections.map((section) => (
              <Reveal key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </Reveal>
            ))}
            <Reveal className="inset-panel" >
              <p className="note-takeaway-label">The takeaway</p>
              <p className="note-takeaway">{note.takeaway}</p>
            </Reveal>
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
