import { useEffect } from "react";
import BusinessNav from "@/business/BusinessNav";
import BusinessHero from "@/business/BusinessHero";
import BizMarquee from "@/business/BizMarquee";
import { BizServices, BizWhyUs } from "@/business/BusinessSections";
import RetailFlow from "@/business/RetailFlow";
import BusinessProjects from "@/business/BusinessProjects";
import BusinessProcess from "@/business/BusinessProcess";
import BusinessContact from "@/business/BusinessContact";
import BusinessFooter from "@/business/BusinessFooter";

/**
 * Zarrar.Solutions — business landing page. Shares the SAME warm Vivid+Co
 * palette as the portfolio, plus the global premium chrome (cursor, sound,
 * scroll progress). Brand-first studio positioning; RetailFlow is the star
 * productized offer.
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
        <RetailFlow />
        <BusinessProjects />
        <BusinessProcess />
        <BizWhyUs />
        <BusinessContact />
      </main>
      <BusinessFooter />
    </div>
  );
}
