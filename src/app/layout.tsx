import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RouteProgress } from "@/components/route-progress";
import { ScrollTimeline } from "@/components/scroll-timeline";
import { RegisterSw } from "@/components/register-sw";
import { JsonLd } from "@/components/jsonld";
import { SITE_URL, SITE_NAME, POSITIONING } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Audit-Led Digital Systems · Islamabad & Rawalpindi`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "We don't just make websites. We audit broken digital flows — and build the systems that fix them. Serving Islamabad, Rawalpindi, and Pakistan-wide.",
  applicationName: SITE_NAME,
  authors: [{ name: "Muhammad Zarrar" }],
  creator: "Muhammad Zarrar",
  keywords: [
    "website audit Islamabad",
    "web development Rawalpindi",
    "booking system Pakistan",
    "website design Pakistan",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E8",
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
      founder: { "@type": "Person", name: "Muhammad Zarrar" },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#local-business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      description: POSITIONING,
      priceRange: "PKR 35,000 – PKR 500,000",
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <RouteProgress />
        <ScrollTimeline />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RegisterSw />
        <JsonLd data={orgSchema} />
      </body>
    </html>
  );
}
