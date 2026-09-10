import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { waLink, EMAIL, WHATSAPP_DISPLAY, DEFAULT_WA_MESSAGE } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import BorderGlow from "@/components/border-glow";
import { JsonLd } from "@/components/jsonld";
import { WhatsAppIcon } from "@/components/icons";
import { Scribble } from "@/components/scribble";
import { PageHero } from "@/components/page-hero";

export const metadata = pageMeta({
  title: "Contact — Talk to the Builder",
  description:
    "Contact Zarrar.Solutions in Rawalpindi — direct WhatsApp or email, no support tickets. Serving Islamabad, Rawalpindi, and businesses across Pakistan. Replies within 24 hours.",
  path: "/contact",
  ogImage: "/og-contact.png",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
        kicker="Direct line"
        title={
          <>
            Talk to{" "}
            <em>
              <Scribble>the builder.</Scribble>
            </em>
          </>
        }
        lede="No support tickets, no account managers, no “our team will reach out.” Messages land with the person who writes the code. Replies within 24 hours — usually much faster."
      >
        <div className="page-hero-actions">
          <a
            href={waLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
          >
            <WhatsAppIcon size={16} /> WhatsApp us
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
            {EMAIL}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container service-detail-grid">
          <div>
            <div className="grid" style={{ gap: 16 }}>
              <Reveal className="card">
                <h2 className="card-title">WhatsApp — fastest</h2>
                <p className="card-body">
                  The channel we build for clients is the one we answer on.
                  Number: <strong>{WHATSAPP_DISPLAY}</strong>
                </p>
                <a
                  href={waLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary"
                >
                  <WhatsAppIcon size={16} /> Start a conversation
                </a>
              </Reveal>

              <Reveal className="card">
                <h2 className="card-title">Email</h2>
                <p className="card-body">
                  For briefs, documents, and anything longer than a chat.
                </p>
                <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
                  {EMAIL}
                </a>
              </Reveal>

              <Reveal className="card">
                <h2 className="card-title">Location &amp; hours</h2>
                <p className="card-body">
                  Rawalpindi, Pakistan — serving Islamabad, Rawalpindi, and
                  businesses Pakistan-wide. Monday to Saturday, 10:00–19:00
                  PKT. Meetings by call or video; everything important gets
                  confirmed in writing.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <BorderGlow
              tone="glass"
              className="border-glow-card--form"
              coneSpread={34}
              glowIntensity={0.85}
            >
              <h2 className="form-title">Send a quick message</h2>
              <p className="form-sub">
                Opens WhatsApp with your message pre-filled — nothing is stored.
              </p>
              <ContactForm />
            </BorderGlow>
          </Reveal>
        </div>
      </section>
    </>
  );
}
