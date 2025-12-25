import { Navbar } from "@/components/Navbar";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const TCMClinics = () => {
  useEffect(() => {
    document.title = "Find Trusted TCM Clinics | ClynicQ";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MarketplaceSection 
          defaultCategory="tcm" 
          title="Find Trusted TCM Clinics"
          subtitle="Discover experienced Traditional Chinese Medicine practitioners for acupuncture, herbal medicine, and holistic care."
        />
      </main>
      <Footer />
    </div>
  );
};

export default TCMClinics;
