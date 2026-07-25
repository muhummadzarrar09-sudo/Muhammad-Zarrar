import { lazy, Suspense, useEffect, useState } from "react";
import { SoundProvider } from "@/context/SoundContext";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";
import AmbientParticles from "@/components/AmbientParticles";
import ScrollProgress from "@/components/ScrollProgress";
import { SeoRouteMeta } from "@/components/SeoRouteMeta";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { FilmGrain } from "@/components/FilmGrain";
import { ProjectorVignette } from "@/components/ProjectorVignette";
import { CinematicProjectorAudio } from "@/components/CinematicProjectorAudio";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { usePathname } from "@/router";
import { useLenis } from "@/hooks/useLenis";
import { SectionLoading } from "@/components/LazyFallback";

const About = lazy(() => import("@/components/About"));
const Expertise = lazy(() => import("@/components/Expertise"));
const Work = lazy(() => import("@/components/Work"));
const Process = lazy(() => import("@/components/Process"));
const Contact = lazy(() => import("@/components/Contact"));
const BusinessSite = lazy(() => import("@/business/BusinessSite"));

function LazySection({ label, children }: { label: string; children: React.ReactNode }) {
  return <Suspense fallback={<SectionLoading label={label} />}>{children}</Suspense>;
}

// Main Portfolio — now with Awwwards-level Kinetic Typography + cinematic scroll
function Portfolio() {
  // Initialize premium Lenis smooth scroll — ALWAYS cinematic (2.8s default)
  useLenis(true);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <LazySection label="Loading about"><About /></LazySection>
        <LazySection label="Loading expertise"><Expertise /></LazySection>
        <LazySection label="Loading work"><Work /></LazySection>
        <LazySection label="Loading process"><Process /></LazySection>
        <LazySection label="Loading contact"><Contact /></LazySection>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  const isBusiness = path === "/business" || path.startsWith("/business/");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", loading);
    return () => document.body.classList.remove("no-scroll");
  }, [loading]);

  // Reset scroll position + Lenis on route change
  // ALWAYS enable full cinematic (Director's Cut) mode on portfolio — permanent, no toggle
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isBusiness) {
      document.documentElement.classList.add("directors-cut");
    } else {
      document.documentElement.classList.remove("directors-cut");
    }

    // Lenis will handle the rest via its own RAF
  }, [isBusiness]);

  return (
    <SoundProvider>
      <div className="grain relative min-h-screen overflow-x-clip">
        <SeoRouteMeta />
        <Cursor />
        <ScrollProgress />
        {/* Shared warm editorial canvas */}
        <Background />
        <AmbientParticles />
        {loading && <Preloader onDone={() => setLoading(false)} />}

        <ErrorBoundary>
          {isBusiness ? (
            <Suspense fallback={<SectionLoading label="Loading business site" />}>
              <BusinessSite />
            </Suspense>
          ) : (
            <Portfolio />
          )}
        </ErrorBoundary>
        
        {/* Cinematic mode is ALWAYS ON — permanent full film experience */}
        <FilmGrain />
        <ProjectorVignette />
        {!isBusiness && <CinematicProjectorAudio />}
      </div>
    </SoundProvider>
  );
}
