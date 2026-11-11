import { pageMeta, pageLd } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { BriefRoom } from "@/components/brief-room";

export const metadata = pageMeta({
  title: "Project brief — practical questions, clear next steps",
  description:
    "Eight practical project questions, around two minutes, no sales call. Tell us the setup, scope, deadline and budget; receive a written reply within 24 hours.",
  path: "/brief",
  ogImage: "/og.png",
});

export default function BriefPage() {
  return (
    <div className="brief-static">
      <JsonLd
        data={pageLd([
          { name: "Home", path: "/" },
          { name: "The brief", path: "/brief" },
        ])}
      />
      {/* JS creates the one-question flow. Without it, this is still a fixed
          contact route — never a dead form or a page that spills into the
          normal site chrome. */}
      <noscript>
        <div className="brief-noscript">
          <p>The step-by-step project brief needs JavaScript.</p>
          <a
            href="https://wa.me/923335666050?text=Hello%20Zarrar%20%E2%80%94%20I%20came%20from%20the%20site.%20I%27d%20rather%20talk%20than%20fill%20the%20brief."
            target="_blank"
            rel="noopener noreferrer"
          >
            Send a WhatsApp message instead
          </a>
          <span> or email muhummadzarrar09@gmail.com.</span>
        </div>
      </noscript>
      <BriefRoom />
    </div>
  );
}
