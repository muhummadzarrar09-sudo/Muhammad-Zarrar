import { useEffect, useState } from "react";
import { SoundProvider } from "@/context/SoundContext";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import HorizontalManifesto from "@/components/HorizontalManifesto";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { usePathname } from "@/router";
import BusinessSite from "@/business/BusinessSite";

function Portfolio() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <HorizontalManifesto />
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isBusiness]);

  return (
    <SoundProvider>
      <LenisProvider>
        <div className="grain relative min-h-screen overflow-x-clip">
          <Cursor />
          <ScrollProgress />
          <Background />
          {loading && <Preloader onDone={() => setLoading(false)} />}
          {isBusiness ? <BusinessSite /> : <Portfolio />}
        </div>
      </LenisProvider>
    </SoundProvider>
  );
}
