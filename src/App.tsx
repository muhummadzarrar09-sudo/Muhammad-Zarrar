import { lazy, Suspense } from "react";
import { SeoRouteMeta } from "@/components/SeoRouteMeta";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoading } from "@/components/LazyFallback";
import ScrollProgress from "@/components/ScrollProgress";
import { Fold, PageNumbers } from "@/components/Brutalist";

const About = lazy(() => import("@/components/About"));
const Expertise = lazy(() => import("@/components/Expertise"));
const Work = lazy(() => import("@/components/Work"));
const Process = lazy(() => import("@/components/Process"));
const Contact = lazy(() => import("@/components/Contact"));

function LazySection({ label, children }: { label: string; children: React.ReactNode }) {
  return <Suspense fallback={<SectionLoading label={label} />}>{children}</Suspense>;
}

export default function App() {
  return (
    <div className="notebook isolate relative min-h-screen overflow-x-clip bg-canvas text-ink antialiased grain">
      {/* Skip to content — accessibility */}
      <a href="#work" className="skip-link">Skip to main content</a>

      {/* Dot-grid + paper — brutalist notebook base */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.15] dot-grid" />

      <SeoRouteMeta />
      <ScrollProgress />
      <PageNumbers />
      <Nav />

      <main id="main-content" className="relative">
        <Hero />
        <Fold label="about" />
        <LazySection label="Loading about">
          <About />
        </LazySection>

        <Fold label="expertise" />
        <LazySection label="Loading expertise">
          <Expertise />
        </LazySection>

        <Fold label="work" />
        <LazySection label="Loading work">
          <Work />
        </LazySection>

        <Fold label="process" />
        <LazySection label="Loading process">
          <Process />
        </LazySection>

        <Fold label="contact" />
        <LazySection label="Loading contact">
          <Contact />
        </LazySection>
      </main>

      <Footer />
      <ErrorBoundary>{null}</ErrorBoundary>
    </div>
  );
}
