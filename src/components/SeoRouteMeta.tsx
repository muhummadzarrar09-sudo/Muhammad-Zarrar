import { useEffect } from "react";
import { usePathname } from "@/router";

const SITE_URL = "https://muhummadzarrar.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;

const META = {
  portfolio: {
    title: "Muhammad Zarrar / Zarrar.Solutions — Full-Stack Developer & AI Systems Engineer",
    description:
      "Full-stack products, AI agents, voice interfaces, catalog systems, booking flows, dashboards, and design-led web experiences.",
    path: "/",
  },
  business: {
    title: "Zarrar.Solutions — Websites, Catalog Systems & Booking Flows for Local Businesses",
    description:
      "Digital studio building websites, RetailFlow catalog systems, booking systems, dashboards, and WhatsApp workflows for retailers, clinics, salons, academies, and service businesses.",
    path: "/business",
  },
};

function setMetaByName(name: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (el) el.content = content;
}

function setMetaByProperty(property: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (el) el.content = content;
}

export function SeoRouteMeta() {
  const pathname = usePathname();

  useEffect(() => {
    const isBusiness = pathname === "/business" || pathname.startsWith("/business/");
    const meta = isBusiness ? META.business : META.portfolio;
    const url = `${SITE_URL}${meta.path}`;

    document.title = meta.title;
    setMetaByName("description", meta.description);
    setMetaByName("twitter:title", meta.title);
    setMetaByName("twitter:description", meta.description);
    setMetaByName("twitter:image", OG_IMAGE);
    setMetaByProperty("og:title", meta.title);
    setMetaByProperty("og:description", meta.description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", OG_IMAGE);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [pathname]);

  return null;
}
