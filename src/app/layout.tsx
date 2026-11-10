import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RouteProgress } from "@/components/route-progress";
import { RouteWipe } from "@/components/route-wipe";
import { ScrollTimeline } from "@/components/scroll-timeline";
import { MotionRoot } from "@/components/motion-root";
import { RegisterSw } from "@/components/register-sw";
import { JsonLd } from "@/components/jsonld";
import { SITE_URL, SITE_NAME, POSITIONING, EMAIL, WHATSAPP_DISPLAY } from "@/lib/site";

/* Self-hosted fonts — zero CDN calls. Inter (variable) for body/UI,
   Fraunces (variable, optical editorial serif) for display headlines. */
const inter = localFont({
  src: [{ path: "../fonts/inter-latin-wght-normal.woff2" }],
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/fraunces-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* No template on purpose: pageMeta owns the whole title and adds the brand
     only when the result still fits inside 60 characters. */
  title: "Audit-led web studio · Islamabad & Rawalpindi",
  description:
    "We audit broken digital flows and build systems that fix them. Serving Islamabad, Rawalpindi, Pakistan. Get your free audit.",
  applicationName: SITE_NAME,
  /* max-snippet:-1 lets answer engines quote a full paragraph instead of a
     truncated one; large image previews help the share cards. */
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  authors: [{ name: "Muhammad Zarrar" }],
  creator: "Muhammad Zarrar",
  keywords: [
    "website audit Islamabad",
    "web development Rawalpindi",
    "booking system Pakistan",
    "website design Pakistan",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F3E4C7",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-192.png`,
      description: POSITIONING,
      email: EMAIL,
      telephone: WHATSAPP_DISPLAY,
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}/about#person`,
        name: "Muhammad Zarrar",
        jobTitle: "Full-stack developer",
        url: `${SITE_URL}/about`,
      },
      areaServed: ["Islamabad", "Rawalpindi", "Pakistan"],
      knowsAbout: [
        "website audits",
        "web performance",
        "technical SEO",
        "Next.js development",
        "e-commerce catalog systems",
        "appointment booking systems",
        "internal dashboards",
      ],
      slogan: POSITIONING,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#local-business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      description: POSITIONING,
      priceRange: "PKR 35,000 – PKR 500,000",
      email: EMAIL,
      telephone: WHATSAPP_DISPLAY,
      currenciesAccepted: "PKR",
      paymentAccepted: "Bank transfer, cash",
      openingHours: "Mo-Sa 10:00-19:00",
      founder: { "@id": `${SITE_URL}/about#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rawalpindi",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      areaServed: ["Islamabad", "Rawalpindi", "Pakistan"],
      parentOrganization: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${montserrat.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <RouteProgress />
        <RouteWipe />
        <ScrollTimeline />
        <MotionRoot />
        <div className="gallery-ground" aria-hidden="true" />
        <div className="focus-veil focus-veil-top" aria-hidden="true" />
        <div className="focus-veil focus-veil-bottom" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RegisterSw />
        <JsonLd data={orgSchema} />
      </body>
    </html>
  );
}
