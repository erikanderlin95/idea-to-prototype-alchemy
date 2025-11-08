import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { OnboardingTour } from "@/components/OnboardingTour";
import { VirtualGuide } from "@/components/VirtualGuide";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { showOnboarding, completeOnboarding, startOnboarding } = useOnboarding();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRestartTour={startOnboarding} />
      <main>
        <Hero />
        <Features />
        <MarketplaceSection />
      </main>
      <Footer />
      
      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}
      
      {/* Virtual Guide - Only show when logged in */}
      {user && <VirtualGuide />}
    </div>
  );
};

export default Index;
