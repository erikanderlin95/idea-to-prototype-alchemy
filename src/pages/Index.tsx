import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { ConnectVia } from "@/components/ConnectVia";
import { FeaturedConsultants } from "@/components/FeaturedConsultants";
import { LaunchPartners } from "@/components/LaunchPartners";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Compass, ChevronRight } from "lucide-react";
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
              className="group h-10 w-48 justify-center gap-2 rounded-lg bg-primary/90 hover:bg-primary hover:-translate-y-0.5 text-sm font-semibold tracking-wide shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-all duration-300 active:scale-[0.97]"
              onClick={() => window.dispatchEvent(new Event("open-explore-sidebar"))}
            >
              <Compass className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
              {t("explore.more.title")}
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
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
