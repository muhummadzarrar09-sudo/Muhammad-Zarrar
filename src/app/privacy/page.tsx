import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { EMAIL } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { PrivacyLive } from "@/components/privacy-live";
import { ProofStrip } from "@/components/proof-strip";

export const metadata = pageMeta({
  title: "Privacy Policy — No Trackers, No Nonsense. Verify it.",
  description:
    "Zarrar.Solutions collects nothing it doesn't need: no analytics, no trackers, no cookies, no stored form data. Open DevTools → Network and verify. 0 external requests.",
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
            <span className="eyebrow">Plain language · last updated August 2026 · verifiable in DevTools</span>
            <h1>Privacy, the way we build: <em>nothing we don&apos;t need.</em></h1>
            <p className="lede">
              We sell sites that respect their visitors. Ours is built the
              same way. Here&apos;s the entire data story — it&apos;s short,
              because there&apos;s almost nothing to tell. And you can verify it live.
            </p>
            <div style={{ marginTop: 24, maxWidth: 560 }}>
              <PrivacyLive />
            </div>
          </Reveal>
        </div>
      </section>

      <ProofStrip />

      <section className="section">
        <div className="container">
          <div className="prose">
            <Reveal>
              <h2>What this site collects</h2>
              <p>
                Nothing. There is no analytics script, no tracking pixel, no
                cookie banner needed, no advertising code, and no database
                behind the forms. The forms on this site don&apos;t submit
                your details to a server — they open WhatsApp on your own
                device with a pre-filled message, and you press send. What you
                type never touches our infrastructure. No service worker caches your form data.
                No localStorage. Nothing.
              </p>
            </Reveal>
            <Reveal>
              <h2>What third parties inevitably see</h2>
              <p>
                Two, and only two. Our hosting provider sees standard access
                logs (IP address, page requested, browser type) the way any
                web server does — used to serve the page, not to profile you.
                Logs rotate and are not mined. And if you contact us, WhatsApp or your email provider handles
                that conversation under their policies. We keep our side of
                those conversations as ordinary business correspondence.
              </p>
              <p className="muted" style={{ marginTop: 12 }}>
                Open DevTools → Network → reload. You&apos;ll see 12 requests, all to this domain.
                No google-analytics.com, no facebook.net, no doubleclick. That&apos;s not a claim — it&apos;s a network log you can screenshot.
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
              <h2>Client work — local-first is a rule</h2>
              <p>
                When we build for you, your data stays yours: on your domain,
                your hosting, your accounts. Access we&apos;re given for a
                project is used for the project and handed back at the end.
                Local-first ownership isn&apos;t a slogan — it&apos;s the
                default. No rented themes, no per-seat fees, no lock-in. You own the code on full payment.
              </p>
            </Reveal>
            <Reveal>
              <h2>Why no analytics? How do you improve?</h2>
              <p>
                We audit with real devices, real Pakistani 4G, and real user flows — not with
                dashboards. Analytics tells you what happened. An audit tells you why. We&apos;d rather
                be accurate once than averaged forever. If you want analytics on your site, we&apos;ll
                add privacy-respecting, self-hosted Plausible or no-analytics at all — your call, in writing.
              </p>
            </Reveal>
            <Reveal>
              <h2>Questions</h2>
              <p>
                Anything unclear, email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We&apos;ll
                answer in the same plain language this page uses. And if you find a tracker we missed,
                we&apos;ll fix it and credit you publicly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
