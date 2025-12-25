import { Navbar } from "@/components/Navbar";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const GPClinics = () => {
  useEffect(() => {
    document.title = "Book a GP Appointment | ClynicQ";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MarketplaceSection 
          defaultCategory="gp" 
          title="Book a GP Appointment"
          subtitle="Find trusted general practitioners near you with real-time availability and digital queue management."
        />
      </main>
      <Footer />
    </div>
  );
};

export default GPClinics;
