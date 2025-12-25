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
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredClinics(clinics);
    } else {
      setFilteredClinics(
        clinics.filter((clinic) => 
          clinic.type?.toLowerCase() === activeCategory.toLowerCase()
        )
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
      
      // Calculate queue stats for each clinic
      const clinicsWithQueue = await Promise.all(
        (data || []).map(async (clinic) => {
          const { data: queueData } = await supabase
            .from("queue_entries")
            .select("*")
            .eq("clinic_id", clinic.id)
            .eq("status", "waiting");

          const queueCount = queueData?.length || 0;
          const estimatedWait = queueCount * 15; // 15 min per person

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
          };
        })
      );

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
    <section id="marketplace" className="py-24 bg-background onboarding-clinics">
      <div className="container px-4 md:px-6">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{title || t("marketplace.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
