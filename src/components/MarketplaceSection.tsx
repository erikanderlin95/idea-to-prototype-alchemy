import { SearchFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLINICS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
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
    <section id="marketplace" className="pt-8 pb-8 bg-background onboarding-clinics">
      <div className="container px-4 md:px-6">
        <div className="px-2 sm:px-0 space-y-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">{title || t("marketplace.title")}</h2>
            <p className="text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
              {subtitle || t("marketplace.subtitle")}
            </p>
          </div>

          <SearchFilters defaultCategory={defaultCategory} onCategoryChange={handleCategoryChange} />

          {(() => {
            const totalPages = Math.max(1, Math.ceil(filteredClinics.length / CLINICS_PER_PAGE));
            const safePage = Math.min(currentPage, totalPages);
            const start = (safePage - 1) * CLINICS_PER_PAGE;
            const pageClinics = filteredClinics.slice(start, start + CLINICS_PER_PAGE);
            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-[0.4cm] mt-8 md:max-w-[calc(1260px+0.8cm)] md:mx-auto">
                  {pageClinics.map((clinic, index) => (
                    <ClinicCard key={clinic.id || index} {...clinic} />
                  ))}
                </div>

                {filteredClinics.length > 0 && (
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          aria-label={`Page ${i + 1}`}
                          className={`h-2.5 rounded-full transition-all ${
                            safePage === i + 1
                              ? "w-6 bg-primary"
                              : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground tabular-nums ml-1">
                      {safePage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            );
          })()}

        </div>
      </div>
    </section>
  );
};
