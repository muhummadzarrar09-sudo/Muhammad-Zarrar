import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import {
  GUIDES,
  getGuide,
  guideReadingMinutes,
} from "@/content/guides";
import { sectionId } from "@/content/notes";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ArrowUpRightIcon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

type RouteParams = { slug: string };

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const base = pageMeta({
    title: guide.metaTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    ogImage: `/social/guides/${guide.slug}.png`,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: guide.updatedISO,
      modifiedTime: guide.updatedISO,
      authors: ["Muhammad Zarrar"],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const minutes = guideReadingMinutes(guide);
  const url = `${SITE_URL}/guides/${guide.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    datePublished: guide.updatedISO,
    dateModified: guide.updatedISO,
    url,
    image: `${SITE_URL}/social/guides/${guide.slug}.png`,
    inLanguage: "en",
    keywords: guide.keywords.join(", "),
    author: { "@type": "Person", name: "Muhammad Zarrar" },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: url,
    isPartOf: { "@id": `${SITE_URL}/guides#page` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: "en",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.h1, path: `/guides/${guide.slug}` },
        ])}
      />

      <PageHero
        compact
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { label: guide.h1 },
        ]}
        kicker={`Guide · ${minutes} min · updated ${guide.updatedLabel}`}
        title={guide.h1}
        lede={guide.description}
      />

      <section className="section guide-article">
        <div className="container">
          <div className="note-layout">
            <aside className="note-toc" aria-label="On this page">
              <p className="note-toc-label">On this page</p>
              <ol className="note-toc-list">
                {guide.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${sectionId(section.heading)}`}>
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#questions">Questions</a>
                </li>
              </ol>
              <p className="note-toc-meta">{minutes} min read</p>
              <Link className="note-toc-rss" href="/guides">
                All guides
              </Link>
            </aside>

            <div className="prose prose-reveal">
              <Reveal className="guide-answer">
                <p className="note-takeaway-label">The short answer</p>
                <p>{guide.answer}</p>
              </Reveal>

              {guide.sections.map((section) => (
                <Reveal key={section.heading}>
                  <h2 id={sectionId(section.heading)}>{section.heading}</h2>
                  {section.body?.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="guide-list">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              ))}

              {guide.table ? (
                <Reveal>
                  <div className="compare-scroll">
                    <table className="compare-table guide-table">
                      <caption>{guide.table.caption}</caption>
                      <thead>
                        <tr>
                          {guide.table.columns.map((column, i) => (
                            <th key={`${column}-${i}`} scope="col">
                              <span className="compare-head-label">
                                {column || <span className="sr-only">Item</span>}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {guide.table.rows.map((row) => (
                          <tr key={row[0]}>
                            <th scope="row">{row[0]}</th>
                            {row.slice(1).map((cell, i) => (
                              <td key={`${row[0]}-${i}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>
              ) : null}

              <div id="questions">
                <Reveal>
                  <h2>Questions</h2>
                </Reveal>
                {guide.faqs.map((faq) => (
                  <details key={faq.q} className="faq-entry">
                    <summary>
                      <span>{faq.q}</span>
                    </summary>
                    <div className="faq-a">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>

              <div className="guide-related">
                <p className="note-related-label">Go deeper</p>
                <ul className="guide-related-list">
                  {guide.related.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        {link.label} <ArrowUpRightIcon size={14} />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/notes">
                      All field notes <ArrowUpRightIcon size={14} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        plate="Guides"
        headline="Want this done for you, in writing?"
        body="The free five-point mini-audit checks the four things these guides describe, plus security — and names what to fix first. 24 hours, no obligation."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage={`Hello Zarrar.Solutions — I read the guide "${guide.h1}" and I'd like the free 5-point audit.`}
      />
    </>
  );
}
