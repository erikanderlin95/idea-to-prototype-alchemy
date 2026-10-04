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
        <MarketplaceSection defaultCategory={defaultCategory} />
        <FeaturedConsultants />
        <LaunchPartners />

        <section className="container px-4 md:px-6 py-6 md:py-8">
          <div className="flex justify-center">
            <Button
              className="h-10 w-48 justify-center rounded-lg bg-primary/90 hover:bg-primary/80 text-sm font-semibold tracking-wide shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-[0.97]"
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
