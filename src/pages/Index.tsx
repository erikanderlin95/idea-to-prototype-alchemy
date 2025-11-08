import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MarketplaceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
