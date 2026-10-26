import { SearchFilters, type ClinicFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";
import { DirectoryClinicCard } from "./DirectoryClinicCard";
import { TWENTY_FOUR_HR_CLINICS } from "@/data/twentyFourHrClinics";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Link, useLocation, useNavigationType } from "react-router-dom";


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
  const location = useLocation();
  const navType = useNavigationType();
  const stateKey = `clynicq_listing_${location.pathname}_${defaultCategory}`;
  const [saved] = useState<any>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(stateKey) || "null");
    } catch {
      return null;
    }
  });
  const [clinics, setClinics] = useState<any[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem("clynicq_clinics_cache") || "[]");
    } catch {
      return [];
    }
  });
  const [filteredClinics, setFilteredClinics] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState(saved?.category ?? defaultCategory);
  const [searchText, setSearchText] = useState<string>(saved?.search ?? "");
  const [filters, setFilters] = useState<ClinicFilters>(saved?.filters ?? { openNow: false, queue: false, booking: false });

  const [currentPage, setCurrentPage] = useState<number>(saved?.page ?? 1);
  const scrollYRef = useRef<number>(saved?.scrollY ?? 0);
  const restoringRef = useRef<boolean>(navType === "POP" && (saved?.scrollY ?? 0) > 0);
  const filterKeyRef = useRef<string | null>(null);

  const clinicsPerPage = isMobile ? CLINICS_PER_PAGE_MOBILE : CLINICS_PER_PAGE_DESKTOP;

  // Persist listing state (filters, search, page, scroll) for back navigation
  useEffect(() => {
    try {
      const cur = JSON.parse(sessionStorage.getItem(stateKey) || "{}");
      sessionStorage.setItem(
        stateKey,
        JSON.stringify({ ...cur, category: activeCategory, search: searchText, filters, page: currentPage, scrollY: scrollYRef.current })
      );
    } catch {}
  }, [stateKey, activeCategory, searchText, filters, currentPage]);

  useEffect(() => {
    const persist = (y: number) => {
      scrollYRef.current = y;
      // Anchor to the first visible clinic card so restore survives late-loading content above
      let anchorIndex = -1;
      let anchorTop = 0;
      const cards = document.querySelectorAll(".onboarding-join-queue");
      for (let i = 0; i < cards.length; i++) {
        const r = cards[i].getBoundingClientRect();
        if (r.bottom > 0) {
          anchorIndex = i;
          anchorTop = r.top;
          break;
        }
      }
      try {
        const cur = JSON.parse(sessionStorage.getItem(stateKey) || "{}");
        sessionStorage.setItem(stateKey, JSON.stringify({ ...cur, scrollY: y, anchorIndex, anchorTop }));
      } catch {}
    };
    let raf = 0;
    const save = () => {
      if (restoringRef.current || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        persist(window.scrollY);
      });
    };
    // Flush immediately so taps that navigate away right after scrolling don't lose the position
    const flush = () => {
      if (restoringRef.current) return;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      persist(window.scrollY);
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flush);
    document.addEventListener("click", flush, true);
    return () => {
      // Do NOT flush here: on route change the browser may already have clamped
      // the scroll to the shorter next page, which would overwrite the real position.
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
      document.removeEventListener("click", flush, true);
    };
  }, [stateKey]);

  // Restore scroll position when returning via back navigation; keep retrying as content grows
  useEffect(() => {
    if (!restoringRef.current) return;
    const targetY = scrollYRef.current;
    const anchorIndex: number = saved?.anchorIndex ?? -1;
    const anchorTop: number = saved?.anchorTop ?? 0;
    const started = Date.now();
    let iv = 0;
    let ro: ResizeObserver | null = null;
    // Teardown only; must NOT clear restoringRef (StrictMode runs cleanup once before the real effect)
    const teardown = () => {
      window.clearInterval(iv);
      ro?.disconnect();
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("pointerdown", finish);
    };
    const finish = () => {
      restoringRef.current = false;
      teardown();
    };
    // Prefer anchoring to the same clinic card; fall back to raw scroll offset
    const desiredY = (): number | null => {
      if (anchorIndex >= 0) {
        const cards = document.querySelectorAll(".onboarding-join-queue");
        if (cards.length > anchorIndex) {
          const r = cards[anchorIndex].getBoundingClientRect();
          return window.scrollY + r.top - anchorTop;
        }
        return null;
      }
      return targetY;
    };
    const tryScroll = () => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const want = desiredY();
      if (want != null && maxY > 0) {
        const to = Math.max(0, Math.min(want, maxY));
        if (Math.abs(window.scrollY - to) > 2) {
          window.scrollTo(0, to);
        }
      }
      if (Date.now() - started > 6000) finish();
    };
    // Keep re-applying as layout shifts; stop as soon as the user starts scrolling
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    window.addEventListener("pointerdown", finish);
    iv = window.setInterval(tryScroll, 100);
    ro = new ResizeObserver(tryScroll);
    ro.observe(document.documentElement);
    tryScroll();
    return teardown;
  }, []);

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
      base = base.filter((c) => c.hasDigitalQueue || c.is24Hr || c.hasOnlineBooking || c.phone);
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
    const key = JSON.stringify([activeCategory, searchText, filters]);
    if (filterKeyRef.current !== null && filterKeyRef.current !== key) setCurrentPage(1);
    filterKeyRef.current = key;
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

      const allClinics = [...clinicsWithQueue, ...normalized24Hr];
      setClinics(allClinics);
      try {
        sessionStorage.setItem("clynicq_clinics_cache", JSON.stringify(allClinics));
      } catch {}
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section id="marketplace" className="py-6 md:py-8 bg-background onboarding-clinics">
      <div className="container px-4 md:px-6">
        <div className="px-2 sm:px-0 space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">{title || t("marketplace.title")}</h2>
            <p className="text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
              {subtitle || t("marketplace.subtitle")}
            </p>
          </div>

          <SearchFilters
            defaultCategory={activeCategory}
            initialSearch={searchText}
            initialFilters={filters}
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

          {/* 24hr Clinics — compact entry card */}
          {activeCategory === "all" && (
            <div className="pt-2 mt-2">
              <Link
                to="/24-hour-clinics-singapore"
                className="group block w-full max-w-[560px] mx-auto rounded-lg border border-border/80 bg-muted/30 hover:bg-muted/50 hover:border-border transition-colors px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                      24-Hour Clinics in Singapore
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-snug">
                      Find clinics open around the clock and get directions.
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary">
                    View Clinics
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
              <p className="mt-2 text-center text-[11px] sm:text-xs text-foreground/70">
                Operating hours may change. Please confirm with the clinic before visiting.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
