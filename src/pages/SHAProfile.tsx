import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import { SHAHero } from "@/components/sha/SHAHero";
import { SHAWhyConcierge } from "@/components/sha/SHAWhyConcierge";
import { SHAConciergeTeam } from "@/components/sha/SHAConciergeTeam";
import { SHACareJourney } from "@/components/sha/SHACareJourney";
import { SHAServices } from "@/components/sha/SHAServices";

interface Concierge {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
}

const SHAProfile = () => {
  const [concierges, setConcierges] = useState<Concierge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  useEffect(() => {
    const fetchConcierges = async () => {
      const { data } = await supabase
        .from("consultants")
        .select("id, name, title, photo_url, short_bio")
        .eq("is_active", true)
        .order("name");
      if (data) setConcierges(data);
      setLoading(false);
    };
    fetchConcierges();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SHAHero />
      <SHACareJourney />
      <SHAWhyConcierge />
      <SHAConciergeTeam
        concierges={concierges}
        loading={loading}
        onConnect={() => setShowIntakeModal(true)}
      />
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
