import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { EMAIL } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMeta({
  title: "Terms of Work — Honest, Short, In Writing",
  description:
    "How Zarrar.Solutions works in plain language: written quotes, 40–50% deposit, full ownership on payment, no lock-in, and what we're responsible for.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Terms</span>
            </nav>
            <span className="eyebrow">Plain language · last updated August 2026</span>
            <h1>Terms of work</h1>
            <p className="lede">
              No twenty-page wall of legalese. These are the rules we actually
              work by — the same ones you&rsquo;ll see in any written quote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose" style={{ maxWidth: 760 }}>
            <Reveal>
              <h2>Quotes and scope</h2>
              <p>
                Prices on this website are honest ranges. The binding number
                is the written quote you receive after the audit, and it
                doesn&rsquo;t change unless the scope changes — in which case
                the change and its price are agreed in writing before we build
                it. Anything we haven&rsquo;t quoted is not silently included
                and not silently billed.
              </p>
            </Reveal>
            <Reveal>
              <h2>Payments</h2>
              <p>
                A 40–50% deposit starts the work; the balance is due before
                go-live, after you&rsquo;ve approved the build on the preview
                link. Audit fees are credited toward any build we perform
                afterwards, as stated on the audit page.
              </p>
            </Reveal>
            <Reveal>
              <h2>Ownership</h2>
              <p>
                On full payment, you own the code, the design, and the content
                — completely. Domain, hosting, and accounts sit in your name.
                There is no lock-in: take the site anywhere, anytime. We keep
                nothing hostage, because we don&rsquo;t need to.
              </p>
            </Reveal>
            <Reveal>
              <h2>Timelines</h2>
              <p>
                Timelines in a quote are commitments, not decorations. If
                something on our side slips, we tell you before it slips
                further. Timelines reasonably move when feedback or content
                from your side moves — we&rsquo;ll say so plainly if that
                happens.
              </p>
            </Reveal>
            <Reveal>
              <h2>Care plans</h2>
              <p>
                Care plans are month-to-month and cancel anytime with the
                current month settled. They cover hosting, updates, agreed
                small changes, and the monthly report. New features are quoted
                separately — they&rsquo;re scope, not care.
              </p>
            </Reveal>
            <Reveal>
              <h2>What we&rsquo;re responsible for</h2>
              <p>
                We build carefully, test like customers, and fix our own
                mistakes promptly after launch. We are not responsible for
                third-party platforms we don&rsquo;t control — WhatsApp,
                Google&rsquo;s ranking decisions, payment providers, or
                hosting chosen outside our care plan — nor for business losses
                that predate or lie outside the work. If a problem is ours,
                we say so and we fix it.
              </p>
            </Reveal>
            <Reveal>
              <h2>Questions</h2>
              <p>
                Anything you&rsquo;d like worded differently or explained
                further, ask before signing — email{" "}
                <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>. A term you
                don&rsquo;t understand is a term we haven&rsquo;t finished
                writing.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
