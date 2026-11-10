import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { COMPARE_ROWS, COLUMNS } from "@/content/compare";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { Scribble } from "@/components/scribble";
import { PageHero } from "@/components/page-hero";
import { ArrowRightIcon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title:
    "Freelancer, agency or audit-first studio?",
  description:
    "Three ways to get a website in Pakistan, compared on cost, risk and who owns the code — including the projects where this studio is the wrong choice.",
  path: "/compare",
  ogImage: "/og-compare.png",
});

export default function ComparePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/compare#page`,
    url: `${SITE_URL}/compare`,
    name: "Freelancer, agency or audit-first studio — an honest comparison",
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#org` },
    about: {
      "@type": "Thing",
      name: "Choosing who builds a business website in Pakistan",
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ])}
      />

      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Compare" }]}
        kicker="An honest comparison"
        title={
          <>
            Three ways to get a site.{" "}
            <em>
              <Scribble>None is always right.</Scribble>
            </em>
          </>
        }
        lede="Freelancer, agency, or an audit-first studio. The table below includes the rows where each option is the wrong choice — including the column that happens to be ours."
      >
        <p className="notes-hero-meta">
          <span>{COMPARE_ROWS.length} rows</span>
          <span className="notes-hero-sep" aria-hidden="true">
            /
          </span>
          <span>Advertised PKR ranges, November 2026</span>
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="compare-scroll">
            <table className="compare-table">
              <caption className="sr-only">
                Comparison of a freelancer, an agency and Zarrar.Solutions across
                price, ownership, process and risk. Market price ranges are
                advertised ranges observed in November 2026.
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="compare-head-label">The question</span>
                  </th>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={col.key === "here" ? "is-here" : undefined}
                    >
                      <span className="compare-head-label">{col.label}</span>
                      <span className="compare-head-note">{col.note}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.freelancer}</td>
                    <td>{row.agency}</td>
                    <td className="is-here">{row.here}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="compare-caveat">
            Price ranges are <em>advertised</em> ranges observed across Pakistani
            providers in November 2026 — freestanding packages from about PKR
            20,000, broader business builds advertised from roughly PKR 80,000 to
            250,000 and up. They describe the market, not any named company. A
            higher number is only justified when the scope explains it.
          </p>

          <div className="compare-fork">
            <div className="compare-fork-col">
              <p className="note-takeaway-label">If your budget is under PKR 100,000</p>
              <p>
                Hire a freelancer, and hire them well. Ask the seven questions in{" "}
                <Link href="/notes/seven-questions-before-you-hire">
                  this field note
                </Link>{" "}
                first. You do not need us yet — and a rebuild you can't fund
                properly is worse than a simple site that works.
              </p>
            </div>
            <div className="compare-fork-col">
              <p className="note-takeaway-label">If inquiries are already leaking</p>
              <p>
                Start with{" "}
                <Link href="/free-audit">the free five-point audit</Link>. It costs
                nothing, takes 24 hours, and frequently ends with the advice to
                fix rather than rebuild. If the site is fine, we'll say so.
              </p>
            </div>
          </div>

          <Link href="/pricing" className="compare-next">
            See every published price
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </section>

      <CtaBand
        plate="Compare"
        headline="The cheapest way to decide is to look first."
        body="A free five-point mini-audit gives you the evidence either way — speed on mobile data, Google visibility, mobile experience, conversion path, security. 24 hours, no obligation."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I was comparing options and I'd like the free 5-point audit."
      />
    </>
  );
}
