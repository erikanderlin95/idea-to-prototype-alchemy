import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { FeaturedConsultants } from "@/components/FeaturedConsultants";
import { LaunchPartners } from "@/components/LaunchPartners";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mic, Sparkles, Stethoscope, Smartphone, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import { OnboardingTour } from "@/components/OnboardingTour";
import { useOnboarding } from "@/hooks/useOnboarding";

const Index = () => {
  const { showOnboarding, completeOnboarding, startOnboarding } = useOnboarding();
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "all";
  const navigate = useNavigate();
  const { t } = useLanguage();

  const explorePages = [
    { to: "/wellness-talks", icon: Mic, key: "sidebar.section.wellnessTalks", accent: "text-violet-600 bg-violet-50" },
    { to: "/beyond-clinic", icon: Sparkles, key: "sidebar.section.otherProviders", accent: "text-amber-600 bg-amber-50" },
    { to: "/clinic-owners", icon: Stethoscope, key: "sidebar.section.forClinics", accent: "text-teal-600 bg-teal-50" },
    { to: "/myclynicq", icon: Smartphone, key: "sidebar.section.myClynicQ", accent: "text-sky-600 bg-sky-50" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRestartTour={startOnboarding} />
      <main>
        <Hero />
        <MarketplaceSection defaultCategory={defaultCategory} />
        <FeaturedConsultants />
        <LaunchPartners />

        <section className="container px-4 md:px-6 pt-2 pb-10 md:pb-14">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-lg md:text-xl font-semibold text-foreground mb-4">
              {t("explore.more.title") || "Explore more"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {explorePages.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.to}
                    onClick={() => navigate(p.to)}
                    className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:bg-muted/40 transition-all hover:shadow-md active:scale-[0.98]"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-foreground/90 text-center leading-tight">
                      {t(p.key)}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}
    </div>
  );
};

export default Index;
