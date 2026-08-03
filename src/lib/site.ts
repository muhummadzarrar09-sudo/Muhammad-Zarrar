export const SITE_URL = "https://muhummadzarrar.vercel.app";
export const OG_IMAGE = `${SITE_URL}/og-image.svg`;

export const META = {
  portfolio: {
    title: "Muhammad Zarrar — Full-Stack & AI Engineer building things people actually use",
    description:
      "I'm Zarrar, a full-stack developer and AI systems engineer from Rawalpindi. I build voice agents, dashboards, booking flows, and product systems that feel real and get used.",
    path: "/",
  },
  // legacy business meta kept for backwards compat but unused now — personal portfolio is single route
  business: {
    title: "Muhammad Zarrar — Full-Stack & AI Engineer",
    description: "Personal portfolio of Muhammad Zarrar",
    path: "/",
  },
};

export { CSP_JSON_LD_HASH, CSP_POLICY_CORE, CSP_META, CSP_HEADER } from "./csp";
