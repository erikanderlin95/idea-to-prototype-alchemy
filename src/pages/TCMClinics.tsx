import { Navbar } from "@/components/Navbar";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const TCMClinics = () => {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = "Find Trusted TCM Clinics | ClynicQ";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MarketplaceSection 
          defaultCategory="tcm" 
          title={t("tcmClinics.title")}
          subtitle={t("tcmClinics.subtitle")}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TCMClinics;
