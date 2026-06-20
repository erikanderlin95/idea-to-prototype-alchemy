import { SearchFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";
import { DirectoryClinicCard } from "./DirectoryClinicCard";
import { TWENTY_FOUR_HR_CLINICS } from "@/data/twentyFourHrClinics";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLINICS_PER_PAGE_MOBILE = 6;
const CLINICS_PER_PAGE_DESKTOP = 6;

interface MarketplaceSectionProps {
  defaultCategory?: string;
  title?: string;
  subtitle?: string;
}

export const MarketplaceSection = ({ defaultCategory = "all", title, subtitle }: MarketplaceSectionProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [clinics, setClinics] = useState<any[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchText, setSearchText] = useState("");
  const location = "all";
  const [currentPage, setCurrentPage] = useState(1);
  
  const clinicsPerPage = isMobile ? CLINICS_PER_PAGE_MOBILE : CLINICS_PER_PAGE_DESKTOP;

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
    let base = clinics;
    if (activeCategory === "all") {
      base = base.filter((c) => c.hasDigitalQueue);
    } else {
      base = base.filter((clinic) => {
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
      });
    }

    const q = searchText.trim().toLowerCase();
    if (q) {
      base = base.filter((c) =>
        [c.name, c.type, c.address].some((v: string | undefined) =>
          (v || "").toLowerCase().includes(q)
        )
      );
    }

    if (location !== "all") {
      const loc = location.toLowerCase();
      base = base.filter((c) => (c.address || "").toLowerCase().includes(loc));
    }

    setFilteredClinics(base);
    setCurrentPage(1);
  }, [activeCategory, clinics, searchText, location]);


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

          <SearchFilters
            defaultCategory={defaultCategory}
            onCategoryChange={handleCategoryChange}
            onSearchChange={setSearchText}
            onLocationChange={setLocation}
            locations={Array.from(
              new Set(
                clinics
                  .map((c) => {
                    const parts = (c.address || "").split(",").map((p: string) => p.trim()).filter(Boolean);
                    return parts[parts.length - 1] || "";
                  })
                  .filter((s: string) => s && !/^singapore$/i.test(s) && !/^\d+$/.test(s))
              )
            ).sort()}
          />

          {(() => {
            const totalPages = Math.max(1, Math.ceil(filteredClinics.length / clinicsPerPage));
            const safePage = Math.min(currentPage, totalPages);
            const visibleCount = isMobile ? safePage * clinicsPerPage : clinicsPerPage;
            const start = isMobile ? 0 : (safePage - 1) * clinicsPerPage;
            const pageClinics = isMobile
              ? filteredClinics.slice(0, visibleCount)
              : filteredClinics.slice(start, start + clinicsPerPage);
            const hasMore = isMobile && visibleCount < filteredClinics.length;
            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[0.4cm] mt-8 md:max-w-[calc(1260px+0.8cm)] md:mx-auto">
                  {pageClinics.map((clinic, index) => (
                    <ClinicCard key={clinic.id || index} {...clinic} />
                  ))}
                </div>

                {isMobile && hasMore && (
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold px-8 h-11"
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      {t("marketplace.loadMore") || "Load More"}
                    </Button>
                  </div>
                )}

                {!isMobile && filteredClinics.length > 0 && totalPages > 1 && (
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

          <DirectorySection isMobile={isMobile} loadMoreLabel={t("marketplace.loadMore") || "Load More"} />


        </div>
      </div>
    </section>
  );
};

const DIRECTORY_PAGE_SIZE = 6;

const DirectorySection = ({ isMobile, loadMoreLabel }: { isMobile: boolean; loadMoreLabel: string }) => {
  const [mobileCount, setMobileCount] = useState(DIRECTORY_PAGE_SIZE);
  const [page, setPage] = useState(0);
  const all = TWENTY_FOUR_HR_CLINICS;
  const totalPages = Math.max(1, Math.ceil(all.length / DIRECTORY_PAGE_SIZE));
  const desktopStart = page * DIRECTORY_PAGE_SIZE;
  const visible = isMobile
    ? all.slice(0, mobileCount)
    : all.slice(desktopStart, desktopStart + DIRECTORY_PAGE_SIZE);
  const hasMoreMobile = isMobile && mobileCount < all.length;

  return (
    <div className="mt-10 pt-6 border-t border-border/50 md:max-w-[calc(1260px+0.8cm)] md:mx-auto">
      <div className="mb-4 text-center">
        <p className="text-lg sm:text-xl font-bold uppercase tracking-wide text-foreground">
          24hr Clinics Across Singapore
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[0.4cm]">
        {visible.map((c) => (
          <DirectoryClinicCard
            key={c.id}
            name={c.name}
            type={c.area ? `24HR · ${c.area}` : "24HR"}
            address={c.address}
            mapsUrl={c.mapsUrl}
          />
        ))}
      </div>

      {isMobile && hasMoreMobile && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted bg-muted/30 font-medium px-8 h-10"
            onClick={() => setMobileCount((c) => c + DIRECTORY_PAGE_SIZE)}
          >
            {loadMoreLabel}
          </Button>
        </div>
      )}

      {!isMobile && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

