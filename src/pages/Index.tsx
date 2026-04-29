import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { WellnessTalks } from "@/components/WellnessTalks";
import { ClinicConversion } from "@/components/ClinicConversion";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { FeaturedConsultants } from "@/components/FeaturedConsultants";
import { ContinuityServices } from "@/components/ContinuityServices";
import { MyClynicQPlugin } from "@/components/MyClynicQPlugin";
import { Footer } from "@/components/Footer";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const { showOnboarding, completeOnboarding, startOnboarding } = useOnboarding();
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRestartTour={startOnboarding} />
      <main>
        <Hero />
        <Features />
        <MarketplaceSection defaultCategory={defaultCategory} />
        <FeaturedConsultants />
        <ClinicConversion />
        <WellnessTalks />
        <ContinuityServices />
        <MyClynicQPlugin />
      </main>
      <Footer />
      
      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}
    </div>
  );
};

export default Index;
