import Link from "next/link";
import { pageMeta, pageLd } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { BriefRoom } from "@/components/brief-room";

export const metadata = pageMeta({
  title:
    "Project brief — seven questions, one quote",
  description:
    "Seven questions, two minutes, no sales call. Tell us what you need and what you hoped to pay; we reply within 24 hours with findings and a written quote.",
  path: "/brief",
  ogImage: "/og.png",
});

export default function BriefPage() {
  return (
    <>
      <JsonLd
        data={pageLd([
          { name: "Home", path: "/" },
          { name: "The brief", path: "/brief" },
        ])}
      />
      {/* The brief is a full-screen room, so the trail sits above it as a slim
          strip rather than inside the form. It is the one route that does not
          open with PageHero, and every route should say where it is. */}
      <div className="container brief-crumbs">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">The brief</span>
        </nav>
      </div>
      {/* The brief is a client flow; WhatsApp is not. Say so plainly rather
          than showing someone a button that does nothing. */}
      <noscript>
        <p className="container brief-noscript">
          The step-by-step brief needs JavaScript. The one-tap route does not:{" "}
          <a
            href="https://wa.me/923335666050?text=Hello%20Zarrar%20%E2%80%94%20I%20came%20from%20the%20site.%20I%27d%20rather%20talk%20than%20fill%20the%20brief."
            target="_blank"
            rel="noopener noreferrer"
          >
            message on WhatsApp
          </a>{" "}
          or email muhummadzarrar09@gmail.com.
        </p>
      </noscript>
      <BriefRoom />
    </>
  );
}
