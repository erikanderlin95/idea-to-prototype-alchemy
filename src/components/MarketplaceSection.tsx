import { SearchFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface MarketplaceSectionProps {
  defaultCategory?: string;
  title?: string;
  subtitle?: string;
}

export const MarketplaceSection = ({ defaultCategory = "all", title, subtitle }: MarketplaceSectionProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<any[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  useEffect(() => {
    fetchClinics();

    // Subscribe to real-time queue changes to update counts
    const channel = supabase
      .channel('marketplace-queue-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'queue_entries',
        },
        () => {
          fetchClinics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredClinics(clinics);
    } else {
      setFilteredClinics(
        clinics.filter((clinic) => {
          const clinicType = clinic.type?.toLowerCase();
          switch (activeCategory) {
            case "gp_specialist":
              return ["gp", "specialist"].includes(clinicType);
            case "dental":
              return clinicType === "dental";
            case "therapy_rehab":
              return ["physiotherapy", "podiatry", "occupational therapy", "chiropractic", "rehab", "therapy"].includes(clinicType);
            case "mental_wellness":
              return ["psychiatrist", "psychologist", "counselling", "mental health"].includes(clinicType);
            case "traditional_medicine":
              return ["tcm", "sowa rigpa", "traditional medicine"].includes(clinicType);
            default:
              return true;
          }
        })
      );
    }
  }, [activeCategory, clinics]);

  const fetchClinics = async () => {
    try {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .order("rating", { ascending: false });

      if (error) throw error;
      
      // Use the secure queue_stats_public view for aggregated stats (no personal data exposed)
      const { data: queueStats } = await supabase
        .from("queue_stats_public")
        .select("clinic_id, queue_count, estimated_wait_minutes");

      // Create a map for quick lookup
      const statsMap = new Map(
        (queueStats || []).map((stat: any) => [stat.clinic_id, stat])
      );

      const clinicsWithQueue = (data || []).map((clinic) => {
        const stats = statsMap.get(clinic.id);
        const queueCount = Number(stats?.queue_count) || 0;
        const estimatedWait = Number(stats?.estimated_wait_minutes) || 0;

        return {
          name: clinic.name,
          type: clinic.type,
          address: clinic.address,
          queueCount,
          waitTime: queueCount === 0 ? "Walk-in" : `${estimatedWait}-${estimatedWait + 15} min`,
          rating: clinic.rating,
          isOpen: clinic.is_open,
          id: clinic.id,
          hasDigitalQueue: clinic.has_digital_queue !== false,
          isNmgAffiliated: clinic.is_nmg_affiliated === true,
        };
      });

      setClinics(clinicsWithQueue);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center">{t("marketplace.loading")}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="marketplace" className="pt-16 pb-12 bg-background onboarding-clinics">
      <div className="container px-4 md:px-6">
        <div className="px-2 sm:px-0 space-y-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3">{title || t("marketplace.title")}</h2>
            <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
              {subtitle || t("marketplace.subtitle")}
            </p>
          </div>

          <SearchFilters defaultCategory={defaultCategory} onCategoryChange={handleCategoryChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-5 mt-8">
            {filteredClinics.map((clinic, index) => (
              <ClinicCard key={clinic.id || index} {...clinic} />
            ))}
          </div>

          {/* Clinic onboarding CTA */}
          <div className="mt-16 text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/30 to-primary/10 border border-primary/10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3 leading-snug max-w-xl mx-auto">
              Reduce front desk interruptions.<br />Manage walk-ins more efficiently.
            </h3>
            <p className="text-foreground/70 text-base leading-relaxed mb-6 max-w-lg mx-auto">
              Let patients check queue load before arriving and reduce repeated "how long" questions — works alongside your existing workflow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 text-[15px] text-foreground/90">
              <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✓</span> Reduce repeated queue questions</span>
              <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✓</span> Let patients check before arriving</span>
              <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✓</span> No system replacement required</span>
            </div>

            <p className="text-sm text-foreground/60 mb-4">Suitable for clinics with regular walk-ins or queue congestion.</p>
            <Button size="lg" className="text-base px-8" onClick={() => navigate("/for-clinics")}>
              Submit Clinic Request
            </Button>
            <p className="text-sm text-foreground/60 mt-4">We review each request to ensure fit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
