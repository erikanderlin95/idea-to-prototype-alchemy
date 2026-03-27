import { Navbar } from "@/components/Navbar";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const GPClinics = () => {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = "Book a GP Appointment | ClynicQ";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MarketplaceSection 
          defaultCategory="gp" 
          title={t("gpClinics.title")}
          subtitle={t("gpClinics.subtitle")}
        />
      </main>
      <Footer />
    </div>
  );
};

export default GPClinics;
