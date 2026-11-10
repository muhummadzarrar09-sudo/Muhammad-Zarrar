import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { FAQ_GROUPS, ALL_FAQS } from "@/content/faq";
import { GUIDES } from "@/content/guides";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { Scribble } from "@/components/scribble";
import { PageHero } from "@/components/page-hero";
import { SITE_URL, waLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Website Questions, Answered Honestly — Pricing, Google, Speed, Ownership",
  description:
    "The questions business owners actually ask: what a website costs in Pakistan, why quotes differ, why Google ignores a site, whether you need a redesign, and who owns the code. Direct answers, no sales fog.",
  path: "/faq",
  ogImage: "/og-faq.png",
});

export default function FaqPage() {
  /* One FAQPage node for the whole hub. Each service page keeps its own
     narrow FAQ set; this is the canonical place for the general questions. */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#page`,
    url: `${SITE_URL}/faq`,
    name: "Website questions, answered honestly — Zarrar.Solutions",
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#org` },
    mainEntity: ALL_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "FAQ" }]}
        kicker="Straight answers"
        title={
          <>
            The questions{" "}
            <em>
              <Scribble>owners actually ask.</Scribble>
            </em>
          </>
        }
        lede="Collected from real calls, WhatsApp threads, and the forums where business owners ask strangers instead — Reddit, Quora, Google's “People also ask”. Same answers here, without the sales fog."
      >
        <p className="notes-hero-meta">
          <span>{ALL_FAQS.length} questions</span>
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          <span>Four topics</span>
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          <a href="/feed.xml" className="notes-rss">
            Field notes · RSS
          </a>
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="faq-groups">
            {FAQ_GROUPS.map((group) => (
              <div key={group.id} id={group.id}>
                <div className="faq-group-head">
                  <span className="faq-group-no">{group.no}</span>
                  <h2 className="faq-group-title">{group.title}</h2>
                  <span className="faq-group-note">{group.note}</span>
                </div>

                {group.items.map((item) => (
                  <details key={item.q} className="faq-entry">
                    <summary>
                      <span>{item.q}</span>
                    </summary>
                    <div className="faq-a">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            ))}
          </div>

          <div className="faq-guides">
            <div className="faq-group-head">
              <span className="faq-group-no">→</span>
              <h2 className="faq-group-title">The long answers</h2>
              <span className="faq-group-note">When a paragraph isn&rsquo;t enough</span>
            </div>
            <ul className="faq-guides-list">
              {GUIDES.map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}`}>
                    <span className="faq-guide-q">{guide.h1}</span>
                    <span className="faq-guide-meta">
                      Guide · {guide.updatedLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="inset-panel faq-ask">
            <p className="note-takeaway-label">Not answered here?</p>
            <p className="note-takeaway">
              Ask on WhatsApp. One number, one person, usually within the hour.
            </p>
            <a
              className="btn btn-primary btn-sm"
              href={waLink(
                "Hello Zarrar.Solutions — I read the FAQ and I have a question.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask your question
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        plate="FAQ"
        headline="Reading is free. The diagnosis isn't guesswork."
        body="The free 5-point mini-audit checks speed on mobile data, Google visibility, mobile experience, conversion path, and security basics. 24 hours, no obligation."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I was reading the FAQ and I'd like the free 5-point audit."
      />
    </>
  );
}
