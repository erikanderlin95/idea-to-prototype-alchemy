import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import { SHAHero } from "@/components/sha/SHAHero";
import { SHAWhyConcierge } from "@/components/sha/SHAWhyConcierge";
import { SHACareJourney } from "@/components/sha/SHACareJourney";
import { SHAServices } from "@/components/sha/SHAServices";

const SHAProfile = () => {
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SHAHero />
      <SHACareJourney onStartIntake={() => setShowIntakeModal(true)} />
      <SHAWhyConcierge />
      <SHAServices />
      <ManagedCareModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        clinicName="Singapore HealthCare Alliance"
        source="organization_profile"
      />
      <Footer />
    </div>
  );
};

export default SHAProfile;
