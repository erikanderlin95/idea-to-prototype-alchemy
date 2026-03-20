import { SearchFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";
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
          const filterKey = activeCategory.toLowerCase();
          // Handle "specialists" filter matching "Specialist" type
          if (filterKey === "specialists" || filterKey === "specialist") {
            return clinicType === "specialist";
          }
          return clinicType === filterKey;
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
    <section id="marketplace" className="py-16 bg-background onboarding-clinics">
      <div className="container px-4 md:px-6">
        <div className="space-y-10">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-3">{title || t("marketplace.title")}</h2>
            <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
              {subtitle || t("marketplace.subtitle")}
            </p>
          </div>

          <SearchFilters defaultCategory={defaultCategory} onCategoryChange={handleCategoryChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredClinics.map((clinic, index) => (
              <ClinicCard key={clinic.id || index} {...clinic} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
