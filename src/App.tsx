import { lazy, Suspense, useEffect } from "react";
import { SeoRouteMeta } from "@/components/SeoRouteMeta";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoading } from "@/components/LazyFallback";
import ScrollProgress from "@/components/ScrollProgress";
import SectionIndex from "@/components/SectionIndex";
import Statement from "@/components/Statement";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Grain from "@/components/ui/Grain";
import Marquee from "@/components/ui/Marquee";
import TypeWall from "@/components/ui/TypeWall";
import { destroySmoothScroll, initSmoothScroll } from "@/lib/scroll";

const About = lazy(() => import("@/components/About"));
const Expertise = lazy(() => import("@/components/Expertise"));
const Work = lazy(() => import("@/components/Work"));
const Process = lazy(() => import("@/components/Process"));
const Contact = lazy(() => import("@/components/Contact"));

function LazySection({ label, children }: { label: string; children: React.ReactNode }) {
  return <Suspense fallback={<SectionLoading label={label} />}>{children}</Suspense>;
}

/** Lenis smooth scroll — module-scoped singleton, no window leak. */
function SmoothScroll() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);
  return null;
}

export default function App() {
  return (
    // Clean full-screen canvas — no dot-grid. A whisper of film grain returns
    // with the cinematic pass (see Grain) — subtle, blend-mode overlay.
    <div className="relative isolate min-h-screen overflow-x-clip bg-canvas text-ink antialiased">
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <SeoRouteMeta />
      <SmoothScroll />
      <Preloader />
      <CustomCursor />
      <Grain />
      <ScrollProgress />
      <SectionIndex />
      <Nav />

      <main id="main-content" tabIndex={-1} className="relative">
        <Hero />

        {/* The type wall — full-bleed PX/PUSH-style display rows */}
        <TypeWall
          label="Product engineer — full-stack, voice AI, and mobile."
          rows={[
            { text: "Product engineer", speed: 44 },
            { text: "Product engineer", outline: true, reverse: true, speed: 52 },
            { text: "Product engineer", reverse: true, speed: 48 },
            { text: "Product engineer", outline: true, speed: 56 },
          ]}
        />

        <Marquee />
        <LazySection label="Loading about">
          <About />
        </LazySection>

        <LazySection label="Loading expertise">
          <Expertise />
        </LazySection>

        <LazySection label="Loading work">
          <Work />
        </LazySection>

        <Statement />

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
