import { Navbar } from "@/components/Navbar";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const WellnessClinics = () => {
  useEffect(() => {
    document.title = "Wellness & Health Services | ClynicQ";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MarketplaceSection 
          defaultCategory="wellness" 
          title="Wellness & Health Services"
          subtitle="Explore wellness centers, spas, and holistic health services to support your wellbeing journey."
        />
      </main>
      <Footer />
    </div>
  );
};

export default WellnessClinics;
