import { useEffect } from "react";
import BusinessNav from "@/business/BusinessNav";
import BusinessHero from "@/business/BusinessHero";
import BizMarquee from "@/business/BizMarquee";
import { BizServices, BizWhyMe } from "@/business/BusinessSections";
import BusinessProjects from "@/business/BusinessProjects";
import ClinicLaunch from "@/business/ClinicLaunch";
import BusinessProcess from "@/business/BusinessProcess";
import BusinessContact from "@/business/BusinessContact";
import BusinessFooter from "@/business/BusinessFooter";

/**
 * The business sub-site — a complete, separate experience sharing the SAME warm
 * Vivid+Co palette as the portfolio. Has its own nav (sitemap), sections, and
 * contact flow, plus the global premium chrome (cursor, sound, scroll progress).
 */
export default function BusinessSite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <BusinessNav />
      <main>
        <BusinessHero />
        <BizMarquee />
        <BizServices />
        <BusinessProjects />
        <ClinicLaunch />
        <BusinessProcess />
        <BizWhyMe />
        <BusinessContact />
      </main>
      <BusinessFooter />
    </div>
  );
}
