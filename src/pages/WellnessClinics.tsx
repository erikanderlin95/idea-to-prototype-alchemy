import { Navbar } from "@/components/Navbar";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WellnessClinics = () => {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = "Wellness & Health Services | ClynicQ";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MarketplaceSection 
          defaultCategory="wellness" 
          title={t("wellnessClinics.title")}
          subtitle={t("wellnessClinics.subtitle")}
        />
      </main>
      <Footer />
    </div>
  );
};

export default WellnessClinics;
