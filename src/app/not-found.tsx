import Link from "next/link";
import ParticleText from "@/components/particle-text";

export const metadata = {
  title: "404 — This Page Failed Its Audit",
  description: "The page you're looking for doesn't exist. Both broken links and missing pages are fixable — that's literally our job.",
};

export default function NotFound() {
  return (
    <section className="notfound">
      <img
        src="/images/logo-mark-transparent-original.png"
        alt=""
        aria-hidden="true"
        className="notfound-mark"
        width={96}
        height={96}
      />
      <span className="status-code">Audit finding · 404</span>
      <div className="nf-stage">
        {/* The real heading — the particle canvas below is decorative. */}
        <h1 className="sr-only">This page failed its audit.</h1>
        <ParticleText
          text="This page failed its audit."
          decorative
          particleSize={1.8}
          density={3}
          scatter={160}
          gatherDuration={800}
          stagger={260}
          pointerRepel={34}
          repelRadius={110}
          trigger="mount"
          className="nf-particles"
        />
      </div>
      <p>
        Either the link is broken, or the page never existed. Both are
        fixable — that&rsquo;s literally our job.
      </p>
      <p className="finding-line">
        finding: route not found · severity: cosmetic · fix: one click
      </p>
      <div className="notfound-actions">
        <Link href="/" className="btn btn-primary btn-lg">
          Back to the homepage
        </Link>
        <Link href="/free-audit" className="btn btn-ghost btn-lg">
          Get a free 5-point audit
        </Link>
      </div>
    </section>
  );
}
