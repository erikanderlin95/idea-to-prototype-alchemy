import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogSection } from "@/components/BlogSection";
import { WellnessTalks } from "@/components/WellnessTalks";

const WellnessTalksPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1">
      <WellnessTalks />
      <BlogSection />
    </main>
    <Footer />
  </div>
);

export default WellnessTalksPage;
