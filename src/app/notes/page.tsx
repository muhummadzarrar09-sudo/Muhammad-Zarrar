import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { NOTES } from "@/content/notes";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { ArrowRightIcon } from "@/components/icons";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata = pageMeta({
  title: "Field Notes — Short, Honest Write-ups From Real Audits",
  description:
    "Plain-English field notes from real website audits in Pakistan: why homepages weigh 70 files, why Google sees blank pages, and what the fix actually is.",
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

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Field Notes", path: "/notes" },
        ])}
      />

      <section className="page-hero" id="top" data-tl="Top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Field Notes</span>
            </nav>
            <span className="eyebrow">Field Notes</span>
            <h1>Evidence, <em>written down.</em></h1>
            <p className="lede">
              Short notes from real audits and real builds. No growth-hacking,
              no listicles — what we found, what it cost the business, and
              what the fix was.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="index-list">
            {NOTES.map((note, i) => (
              <Reveal key={note.slug}>
                <Link href={`/notes/${note.slug}`} className="index-row">
                  <span className="idx-no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="idx-title">{note.title}</h3>
                    <p className="idx-sub">{note.excerpt}</p>
                  </div>
                  <span className="idx-side">
                    <span className="note-date">{note.date}</span>
                    <span className="idx-arrow">
                      <ArrowRightIcon size={20} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline={`Recognize your site in these notes?`}
        body="That's not a coincidence — these patterns repeat across Pakistani business sites. The free 5-point mini-audit tells you which ones are yours."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I just read your field notes and I think my site has these problems."
      />
    </>
  );
}
