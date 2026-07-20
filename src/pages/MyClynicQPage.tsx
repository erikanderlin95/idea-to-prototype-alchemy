import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MyClynicQPlugin } from "@/components/MyClynicQPlugin";

const MyClynicQPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1">
      <MyClynicQPlugin />
    </main>
    <Footer />
  </div>
);

export default MyClynicQPage;
