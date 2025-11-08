import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { MyClynicQPlugin } from "@/components/MyClynicQPlugin";
import { Footer } from "@/components/Footer";
import { OnboardingTour } from "@/components/OnboardingTour";
import { QuickGuide } from "@/components/QuickGuide";
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
        <MyClynicQPlugin />
      </main>
      <Footer />
      
      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}
      
      {/* Quick Guide - Only show when logged in */}
      {user && <QuickGuide />}
    </div>
  );
};

export default Index;
