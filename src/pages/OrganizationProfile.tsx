import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import { OrgHero } from "@/components/org/OrgHero";
import { OrgAbout } from "@/components/org/OrgAbout";
import { OrgWhyConcierge } from "@/components/org/OrgWhyConcierge";
import { OrgHowItWorks } from "@/components/org/OrgHowItWorks";
import { OrgConciergeTeam } from "@/components/org/OrgConciergeTeam";
import { OrgCareJourney } from "@/components/org/OrgCareJourney";
import { OrgServices } from "@/components/org/OrgServices";

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
      if (data) setConcierges(data);
      setLoading(false);
    };
    fetchConcierges();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <OrgHero />

      <OrgAbout />

      <OrgWhyConcierge />

      <OrgHowItWorks />

      <OrgConciergeTeam
        concierges={concierges}
        loading={loading}
        onConnect={() => setShowIntakeModal(true)}
      />

      <OrgCareJourney />

      <OrgServices />

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
