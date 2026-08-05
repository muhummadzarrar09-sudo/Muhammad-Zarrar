import { lazy, Suspense } from "react";
import { SeoRouteMeta } from "@/components/SeoRouteMeta";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoading } from "@/components/LazyFallback";
import ScrollProgress from "@/components/ScrollProgress";

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
    // Clean full-screen canvas — no dot-grid, no grain, no margin line.
    <div className="relative isolate min-h-screen overflow-x-clip bg-canvas text-ink antialiased">
      {/* Skip to content — accessibility */}
      <a href="#work" className="skip-link">Skip to main content</a>

      <SeoRouteMeta />
      <ScrollProgress />
      <Nav />

      <main id="main-content" className="relative">
        <Hero />
        <LazySection label="Loading about">
          <About />
        </LazySection>

        <LazySection label="Loading expertise">
          <Expertise />
        </LazySection>

        <LazySection label="Loading work">
          <Work />
        </LazySection>

        <LazySection label="Loading process">
          <Process />
        </LazySection>

        <LazySection label="Loading contact">
          <Contact />
        </LazySection>
      </main>

      <Footer />
      <ErrorBoundary>{null}</ErrorBoundary>
    </div>
  );
}
