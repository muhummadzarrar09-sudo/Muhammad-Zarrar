import Link from "next/link";

export const metadata = {
  title: "404 — This Page Failed Its Audit",
  description: "The page you're looking for doesn't exist. Both broken links and missing pages are fixable — that's literally our job.",
};

export default function NotFound() {
  return (
    <section className="notfound">
      <img
        src="/images/logo-mark.svg"
        alt=""
        aria-hidden="true"
        className="notfound-mark"
        width={96}
        height={96}
      />
      <span className="status-code">Audit finding · 404</span>
      <h1 className="serif-display">This page failed its audit.</h1>
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
