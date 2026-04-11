import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import { OrgHero } from "@/components/org/OrgHero";
import { OrgWhyConcierge } from "@/components/org/OrgWhyConcierge";
import { OrgServicesGrid } from "@/components/org/OrgServicesGrid";
import { OrgConciergeTeam } from "@/components/org/OrgConciergeTeam";
import { OrgCareJourney } from "@/components/org/OrgCareJourney";

import { OrgOtherOfferings } from "@/components/org/OrgOtherOfferings";

interface Concierge {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
}

const OrganizationProfile = () => {
  const { t } = useLanguage();
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
      if (data) setConcierges(data.filter(c => c.name.toLowerCase().includes("aellan")));
      setLoading(false);
    };
    fetchConcierges();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <OrgHero onStartIntake={() => setShowIntakeModal(true)} />

      <OrgCareJourney />

      <OrgWhyConcierge />

      <OrgServicesGrid />

      <OrgConciergeTeam
        concierges={concierges}
        loading={loading}
        onConnect={() => setShowIntakeModal(true)}
      />

      <OrgOtherOfferings />

      

      <ManagedCareModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        clinicName="Nanyang Medical Group"
        source="organization_profile"
      />

      <Footer />
    </div>
  );
};

export default OrganizationProfile;
