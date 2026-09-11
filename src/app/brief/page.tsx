import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { BriefRoom } from "@/components/brief-room";

export const metadata = pageMeta({
  title: "Write the brief — seven questions, one honest quote",
  description:
    "One question at a time. What you need, the number you hoped for, and how to reach you. It leaves as a single WhatsApp message to the builder — nothing stored, no trackers. Replies within 24 hours.",
  path: "/brief",
  ogImage: "/og.png",
});

export default function BriefPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "The brief", path: "/brief" },
        ])}
      />
      <BriefRoom />
    </>
  );
}
