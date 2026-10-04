import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { ConnectVia } from "@/components/ConnectVia";
import { FeaturedConsultants } from "@/components/FeaturedConsultants";
import { LaunchPartners } from "@/components/LaunchPartners";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import { OnboardingTour } from "@/components/OnboardingTour";
import { useOnboarding } from "@/hooks/useOnboarding";

const Index = () => {
  const { showOnboarding, completeOnboarding, startOnboarding } = useOnboarding();
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "all";
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRestartTour={startOnboarding} />
      <main>
        <Hero />
        <div className="border-t border-border/60" />
        <MarketplaceSection defaultCategory={defaultCategory} />
        <div className="border-t border-border/60" />
        <FeaturedConsultants />
        <div className="border-t border-border/60" />
        <LaunchPartners />

        <section className="container px-4 md:px-6 pt-4 pb-10 md:pb-14">
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => window.dispatchEvent(new Event("open-explore-sidebar"))}
            >
              {t("explore.more.title")}
            </Button>
          </div>
        </section>

        <ConnectVia />
      </main>
      <Footer />

      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}
    </div>
  );
};

export default Index;
