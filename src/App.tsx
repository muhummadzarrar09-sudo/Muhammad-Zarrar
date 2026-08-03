import { lazy, Suspense } from "react";
import { SeoRouteMeta } from "@/components/SeoRouteMeta";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoading } from "@/components/LazyFallback";
import ScrollProgress from "@/components/ScrollProgress";
import { Fold } from "@/components/Brutalist";

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
    <div className="notebook relative min-h-screen overflow-x-clip bg-canvas text-ink antialiased grain">
      {/* Dot-grid + paper — brutalist notebook base */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.35] dot-grid" />
      {/* Red margin line is via .notebook::before in CSS */}

      <SeoRouteMeta />
      <ScrollProgress />
      <Nav />

      <main className="relative">
        <Hero />
        <Fold label="unfold — about" />
        <LazySection label="Loading about">
          <About />
        </LazySection>

        <Fold label="unfold — expertise" />
        <LazySection label="Loading expertise">
          <Expertise />
        </LazySection>

        <Fold label="unfold — work — 3 only" />
        <LazySection label="Loading work">
          <Work />
        </LazySection>

        <Fold label="unfold — process" />
        <LazySection label="Loading process">
          <Process />
        </LazySection>

        <Fold label="unfold — contact — seal the letter" />
        <LazySection label="Loading contact">
          <Contact />
        </LazySection>
      </main>

      <Footer />
      <ErrorBoundary>{null}</ErrorBoundary>
    </div>
  );
}
