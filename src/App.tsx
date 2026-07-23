import { useEffect, useState } from "react";
import { SoundProvider } from "@/context/SoundContext";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";
import AmbientParticles from "@/components/AmbientParticles";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FilmGrain } from "@/components/FilmGrain";
import { ProjectorVignette } from "@/components/ProjectorVignette";
import { CinematicProjectorAudio } from "@/components/CinematicProjectorAudio";
import { usePathname } from "@/router";
import BusinessSite from "@/business/BusinessSite";
import { useLenis } from "@/hooks/useLenis";

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
        <About />
        <Expertise />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  const isBusiness = path.startsWith("/business");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", loading);
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
        <Cursor />
        <ScrollProgress />
        {/* Shared warm editorial canvas */}
        <Background />
        <AmbientParticles />
        {loading && <Preloader onDone={() => setLoading(false)} />}

        {isBusiness ? <BusinessSite /> : <Portfolio />}
        
        {/* Cinematic mode is ALWAYS ON — permanent full film experience */}
        <FilmGrain />
        <ProjectorVignette />
        {!isBusiness && <CinematicProjectorAudio />}
      </div>
    </SoundProvider>
  );
}
