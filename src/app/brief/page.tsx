import { pageMeta, breadcrumbLd } from "@/lib/seo";
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
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "The brief", path: "/brief" },
        ])}
      />
      <BriefRoom />
    </>
  );
}
