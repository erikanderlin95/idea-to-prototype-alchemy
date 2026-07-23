import { SearchFilters, type ClinicFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";
import { DirectoryClinicCard } from "./DirectoryClinicCard";
import { TWENTY_FOUR_HR_CLINICS } from "@/data/twentyFourHrClinics";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLINICS_PER_PAGE_MOBILE = 6;
const CLINICS_PER_PAGE_DESKTOP = 6;

const isOtherTCMClinic = (clinic: { name?: string; type?: string }) =>
  clinic.type === "TCM" && clinic.name !== "Harmony TCM Centre";

const hasBookActionVisible = (clinic: { name?: string; hasDigitalQueue?: boolean; type?: string }) =>
  !clinic.hasDigitalQueue || clinic.name === "Harmony TCM Centre" || isOtherTCMClinic(clinic);

interface MarketplaceSectionProps {
  defaultCategory?: string;
  title?: string;
  subtitle?: string;
}

export const MarketplaceSection = ({ defaultCategory = "all", title, subtitle }: MarketplaceSectionProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [clinics, setClinics] = useState<any[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<ClinicFilters>({ openNow: false, queue: false, booking: false });

  const [currentPage, setCurrentPage] = useState(1);
  const [directoryPage, setDirectoryPage] = useState(1);
  const [directoryMobileCount, setDirectoryMobileCount] = useState(6);

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
      base = base.filter((c) => c.hasDigitalQueue || c.is24Hr);
    } else {
      base = base.filter((clinic) => {
        const clinicType = (clinic.type || "").toLowerCase().trim();
        switch (activeCategory) {
          case "gp":
            return ["gp", "general practitioner", "family medicine", "family doctor"].includes(clinicType) || clinic.is24Hr;
          case "specialist":
            return ["specialist", "specialist referral"].includes(clinicType);
          case "dental":
            return ["dental", "dentist", "dental clinic"].includes(clinicType);
          case "therapy_rehab":
            return ["physiotherapy", "podiatry", "occupational therapy", "chiropractic", "rehab", "therapy", "therapy & rehab"].includes(clinicType);
          case "mental_wellness":
            return ["psychiatrist", "psychologist", "counselling", "counseling", "mental health", "mental wellness"].includes(clinicType);
          case "tcm":
            return ["tcm", "sowa rigpa", "traditional medicine", "chinese medicine"].includes(clinicType);
          case "vets":
            return ["vet", "vets", "veterinary", "veterinarian"].includes(clinicType);
          case "dna_health":
            return ["dna", "dna & health", "genomics", "health screening", "screening"].includes(clinicType);
          default:
            return true;
        }
      });
    }

    const q = searchText.trim().toLowerCase();
    if (q) {
      base = base.filter((c) => {
        const fields = [c.name, c.type, c.address];
        if (c.services) {
          if (Array.isArray(c.services)) fields.push(...c.services);
          else fields.push(String(c.services));
        }
        if (c.specialties) {
          if (Array.isArray(c.specialties)) fields.push(...c.specialties);
          else fields.push(String(c.specialties));
        }
        return fields.some((v: string | undefined) =>
          (v || "").toLowerCase().includes(q)
        );
      });
    }

    if (filters.openNow) base = base.filter((c) => c.isOpen === true);
    if (filters.queue) base = base.filter((c) => c.hasJoinQueue === true);
    if (filters.booking) base = base.filter((c) => c.hasOnlineBooking === true);

    setFilteredClinics(base);
    setCurrentPage(1);
  }, [activeCategory, clinics, searchText, filters]);


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

        const isOpen = clinic.is_open === true;
        const hasDigitalQueue = clinic.has_digital_queue === true;
        const bookingUrl = typeof clinic.booking_url === "string" && clinic.booking_url.trim().length > 0
          ? clinic.booking_url.trim()
          : null;
        const phone = typeof clinic.phone === "string" && clinic.phone.trim().length > 0
          ? clinic.phone.trim()
          : null;
        const normalizedClinic = {
          name: clinic.name,
          type: clinic.type,
          address: clinic.address,
          phone,
          services: (clinic as any).services,
          specialties: (clinic as any).specialties,
          queueCount,
          waitTime: queueCount === 0 ? "Walk-in" : `${estimatedWait}-${estimatedWait + 15} min`,
          rating: clinic.rating,
          isOpen,
          id: clinic.id,
          hasDigitalQueue,
          bookingUrl,
          isNmgAffiliated: clinic.is_nmg_affiliated === true,
        };

        return {
          ...normalizedClinic,
          hasJoinQueue: isOpen && hasDigitalQueue && !isOtherTCMClinic(normalizedClinic),
          hasOnlineBooking: isOpen && hasBookActionVisible(normalizedClinic) && Boolean(bookingUrl || phone),
        };
      });

      // Normalize 24hr clinics into the same array so they participate in search/filter
      const normalized24Hr = TWENTY_FOUR_HR_CLINICS.map((c) => ({
        id: c.id,
        name: c.name,
        type: "24HR GP",
        address: c.address,
        phone: null,
        services: [],
        specialties: [],
        queueCount: 0,
        waitTime: "24 Hours",
        rating: 0,
        isOpen: true,
        hasDigitalQueue: false,
        bookingUrl: null,
        isNmgAffiliated: false,
        hasJoinQueue: false,
        hasOnlineBooking: false,
        is24Hr: true,
        mapsUrl: c.mapsUrl,
        area: c.area,
      }));

      setClinics([...clinicsWithQueue, ...normalized24Hr]);
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
    <section id="marketplace" className="pt-6 pb-8 bg-background onboarding-clinics">
      <div className="container px-4 md:px-6">
        <div className="px-2 sm:px-0 space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">{title || t("marketplace.title")}</h2>
            <p className="text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
              {subtitle || t("marketplace.subtitle")}
            </p>
          </div>

          <SearchFilters
            defaultCategory={defaultCategory}
            onCategoryChange={handleCategoryChange}
            onSearchChange={setSearchText}
            onFiltersChange={setFilters}
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
                    clinic.is24Hr ? (
                      <DirectoryClinicCard
                        key={clinic.id}
                        name={clinic.name}
                        type={clinic.area ? `24HR · ${clinic.area}` : "24HR"}
                        address={clinic.address}
                        mapsUrl={clinic.mapsUrl}
                      />
                    ) : (
                      <ClinicCard key={clinic.id || index} {...clinic} />
                    )
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

          {/* 24hr Clinics Directory Section */}
          {activeCategory === "all" && (
            <div className="pt-4 border-t border-border/30 mt-4">
              <div className="mb-2 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {t("marketplace.directoryTitle")}
                </h2>
              </div>
              {(() => {
                const DIRECTORY_PAGE_SIZE = 6;
                const totalDirPages = Math.max(1, Math.ceil(TWENTY_FOUR_HR_CLINICS.length / DIRECTORY_PAGE_SIZE));
                const safeDirPage = Math.min(directoryPage, totalDirPages);
                const dirVisibleCount = isMobile ? directoryMobileCount : DIRECTORY_PAGE_SIZE;
                const dirStart = isMobile ? 0 : (safeDirPage - 1) * DIRECTORY_PAGE_SIZE;
                const dirClinics = isMobile
                  ? TWENTY_FOUR_HR_CLINICS.slice(0, dirVisibleCount)
                  : TWENTY_FOUR_HR_CLINICS.slice(dirStart, dirStart + DIRECTORY_PAGE_SIZE);
                const dirHasMore = isMobile && dirVisibleCount < TWENTY_FOUR_HR_CLINICS.length;
                return (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 md:max-w-[calc(1260px+0.8cm)] md:mx-auto">
                      {dirClinics.map((c) => (
                        <DirectoryClinicCard
                          key={c.id}
                          name={c.name}
                          type={c.area ? `24HR · ${c.area}` : "24HR"}
                          address={c.address}
                          mapsUrl={c.mapsUrl}
                        />
                      ))}
                    </div>

                    {isMobile && dirHasMore && (
                      <div className="flex justify-center mt-6">
                        <Button
                          variant="outline"
                          className="border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted bg-muted/30 font-medium px-8 h-10"
                          onClick={() => setDirectoryMobileCount((p) => p + DIRECTORY_PAGE_SIZE)}
                        >
                          {t("marketplace.loadMore")}
                        </Button>
                      </div>
                    )}

                    {!isMobile && TWENTY_FOUR_HR_CLINICS.length > 0 && totalDirPages > 1 && (
                      <div className="flex items-center justify-center gap-3 mt-8">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                          onClick={() => setDirectoryPage((p) => Math.max(1, p - 1))}
                          disabled={safeDirPage === 1}
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: totalDirPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setDirectoryPage(i + 1)}
                              aria-label={`Page ${i + 1}`}
                              className={`h-2.5 rounded-full transition-all ${
                                safeDirPage === i + 1
                                  ? "w-6 bg-primary"
                                  : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground tabular-nums ml-1">
                          {safeDirPage} / {totalDirPages}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                          onClick={() => setDirectoryPage((p) => Math.min(totalDirPages, p + 1))}
                          disabled={safeDirPage === totalDirPages}
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
          )}
        </div>
      </div>
    </section>
  );
};
