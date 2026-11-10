import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { GUIDES, guideReadingMinutes } from "@/content/guides";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { Scribble } from "@/components/scribble";
import { PageHero } from "@/components/page-hero";
import { ArrowRightIcon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title:
    "Guides — cost, Google, ownership",
  description:
    "Four long answers: what a website really costs, why Google ignores a site, whether a Facebook page is enough, and how to audit your own site in 20 minutes.",
  path: "/guides",
  ogImage: "/og-guides.png",
});

export default function GuidesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/guides#page`,
    url: `${SITE_URL}/guides`,
    name: "Guides — Zarrar.Solutions",
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#org` },
    hasPart: GUIDES.map((guide) => ({
      "@type": "Article",
      headline: guide.h1,
      url: `${SITE_URL}/guides/${guide.slug}`,
      dateModified: guide.updatedISO,
      author: { "@type": "Person", name: "Muhammad Zarrar" },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />

      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Guides" }]}
        kicker="The long answers"
        title={
          <>
            Four questions,{" "}
            <em>
              <Scribble>answered properly.</Scribble>
            </em>
          </>
        }
        lede="Field notes are what we found in audits. Guides are the how-to: what things cost, why Google ignores a site, whether a Facebook page is enough, and how to check your own site before paying anyone."
      >
        <p className="notes-hero-meta">
          <span>{GUIDES.length} guides</span>
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          <span>Updated November 2026</span>
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          <Link href="/faq" className="notes-rss">
            The short answers
          </Link>
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="index-list">
            {GUIDES.map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="index-row"
                data-spotlight
              >
                  <span className="idx-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="idx-title">{guide.h1}</h2>
                    <p className="idx-sub">{guide.answer}</p>
                    <p className="note-meta">
                      <span className="note-meta-item">
                        {guideReadingMinutes(guide)} min read
                      </span>
                      <span className="note-meta-item">
                        Updated {guide.updatedLabel}
                      </span>
                    </p>
                  </div>
                <span className="idx-side">
                  <span className="idx-arrow">
                    <ArrowRightIcon size={20} />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="compare-caveat">
            Every figure in these guides is published elsewhere on this site —
            in the pricing page or in a field note. If a number here ever
            disagrees with the page it came from, the page wins and this is a
            bug.
          </p>
        </div>
      </section>

      <CtaBand
        plate="Guides"
        headline="Reading is the cheap part."
        body="The free five-point mini-audit tells you which of these problems are actually yours — speed on mobile data, Google visibility, mobile experience, conversion path, security. 24 hours, no obligation."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I read the guides and I'd like the free 5-point audit."
      />
    </>
  );
}
