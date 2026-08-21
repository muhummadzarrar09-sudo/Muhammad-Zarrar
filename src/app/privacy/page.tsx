import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { EMAIL } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMeta({
  title: "Privacy Policy — No Trackers, No Nonsense",
  description:
    "Zarrar.Solutions collects nothing it doesn't need: no analytics, no trackers, no cookies, no stored form data. The privacy policy, in plain language.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Privacy</span>
            </nav>
            <span className="eyebrow">Plain language · last updated August 2026</span>
            <h1>Privacy, the way we build: nothing we don&rsquo;t need.</h1>
            <p className="lede">
              We sell sites that respect their visitors. Ours is built the
              same way. Here&rsquo;s the entire data story — it&rsquo;s short,
              because there&rsquo;s almost nothing to tell.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose" style={{ maxWidth: 760 }}>
            <Reveal>
              <h2>What this site collects</h2>
              <p>
                Nothing. There is no analytics script, no tracking pixel, no
                cookie banner needed, no advertising code, and no database
                behind the forms. The forms on this site don&rsquo;t submit
                your details to a server — they open WhatsApp on your own
                device with a pre-filled message, and you press send. What you
                type never touches our infrastructure.
              </p>
            </Reveal>
            <Reveal>
              <h2>What third parties inevitably see</h2>
              <p>
                Two, and only two. Our hosting provider sees standard access
                logs (IP address, page requested, browser type) the way any
                web server does — used to serve the page, not to profile you.
                And if you contact us, WhatsApp or your email provider handles
                that conversation under their policies. We keep our side of
                those conversations as ordinary business correspondence.
              </p>
            </Reveal>
            <Reveal>
              <h2>What we do with what you send us</h2>
              <p>
                If you request an audit or a quote, we use your details to do
                exactly that — run the audit, write the findings, price the
                work. No mailing lists, no &ldquo;follow-up sequences,&rdquo;
                no sharing with anyone else. You ask for findings; you get
                findings; it ends there unless you continue the conversation.
              </p>
            </Reveal>
            <Reveal>
              <h2>Client work</h2>
              <p>
                When we build for you, your data stays yours: on your domain,
                your hosting, your accounts. Access we&rsquo;re given for a
                project is used for the project and handed back at the end.
                Local-first ownership isn&rsquo;t a slogan — it&rsquo;s the
                default.
              </p>
            </Reveal>
            <Reveal>
              <h2>Questions</h2>
              <p>
                Anything unclear, email{" "}
                <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>. We&rsquo;ll
                answer in the same plain language this page uses.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
