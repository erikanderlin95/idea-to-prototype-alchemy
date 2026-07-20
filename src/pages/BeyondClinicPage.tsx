import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContinuityServices } from "@/components/ContinuityServices";

const BeyondClinicPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1">
      <ContinuityServices />
    </main>
    <Footer />
  </div>
);

export default BeyondClinicPage;
