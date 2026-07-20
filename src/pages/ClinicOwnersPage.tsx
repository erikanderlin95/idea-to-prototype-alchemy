import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClinicConversion } from "@/components/ClinicConversion";

const ClinicOwnersPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1">
      <ClinicConversion />
    </main>
    <Footer />
  </div>
);

export default ClinicOwnersPage;
