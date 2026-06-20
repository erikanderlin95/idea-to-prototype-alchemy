import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Star, Users, Calendar, User, Shield, CheckCircle2, FileImage, ChevronDown, ChevronUp, Stethoscope, Syringe, HeartPulse, Brain, Activity, Scan, Baby, Pill, ExternalLink, MessageCircle, Play, Smile, Leaf, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_CLINIC_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { isManagedCareType, NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";
import { JoinQueueIntakeDialog } from "@/components/intake/JoinQueueIntakeDialog";
import { BookingIntakeDialog } from "@/components/intake/BookingIntakeDialog";

const DEFAULT_SERVICES = [
  { icon: Stethoscope, label: "GP Consult", desc: "General practice consultations for everyday health concerns" },
  { icon: Syringe, label: "Vaccination", desc: "Routine and travel vaccinations for all ages" },
  { icon: HeartPulse, label: "Chronic Care", desc: "Ongoing management of chronic conditions" },
  { icon: Baby, label: "Women's Health", desc: "Comprehensive women's health and wellness services" },
  { icon: Scan, label: "Health Screening", desc: "Preventive health check-ups and screenings" },
  { icon: Brain, label: "Teleconsult", desc: "Virtual consultations from the comfort of home" },
];

const SERVICE_ICON_MAP: Record<string, any> = {
  "gp consult": Stethoscope,
  "vaccination": Syringe,
  "chronic care": HeartPulse,
  "women's health": Baby,
  "health screening": Scan,
  "teleconsult": Brain,
  "rehabilitation": Activity,
  "mental wellness": Brain,
  "specialist referral": Shield,
  "medication": Pill,
};

const ExploreChip = ({
  chip,
  onImpression,
  onClick,
}: {
  chip: { key: string; label: string; emoji: string };
  onImpression: () => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const firedRef = useRef(false);
  useEffect(() => {
    if (!ref.current || firedRef.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          onImpression();
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onImpression]);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="shrink-0 inline-flex items-center gap-2 h-12 sm:h-[52px] px-4 rounded-full border border-border bg-background hover:bg-primary/5 hover:border-primary/40 active:scale-[0.97] transition-all shadow-sm"
    >
      <span className="text-base leading-none" aria-hidden="true">{chip.emoji}</span>
      <span className="text-sm font-semibold text-foreground whitespace-nowrap">{chip.label}</span>
    </button>
  );
};

// Canonical ClynicQ clinic types (matches homepage category filter)
const CLYNICQ_CLINIC_TYPES: { key: string; label: string; emoji: string }[] = [
  { key: "dna_health", label: "DNA & Health", emoji: "🧬" },
  { key: "dental", label: "Dental", emoji: "🦷" },
  { key: "gp", label: "General Practitioner", emoji: "🩺" },
  { key: "mental_wellness", label: "Mental Wellness", emoji: "🧠" },
  { key: "tcm", label: "TCM", emoji: "🌿" },
  { key: "therapy_rehab", label: "Therapy & Rehab", emoji: "💪" },
  { key: "vets", label: "Vets", emoji: "🐾" },
  { key: "specialist", label: "Specialist", emoji: "👨‍⚕️" },
];

// Map a raw clinic.type value from the DB to a ClynicQ category key
const mapClinicTypeToCategory = (rawType?: string | null): string | null => {
  if (!rawType) return null;
  const t = rawType.toLowerCase().trim();
  if (["gp", "general practitioner", "family medicine", "family doctor"].includes(t)) return "gp";
  if (["dental", "dentist", "dental clinic"].includes(t)) return "dental";
  if (["tcm", "sowa rigpa", "traditional medicine", "chinese medicine"].includes(t)) return "tcm";
  if (["vet", "vets", "veterinary", "veterinarian"].includes(t)) return "vets";
  if (["physiotherapy", "podiatry", "occupational therapy", "chiropractic", "rehab", "therapy", "therapy_rehab", "therapy & rehab"].includes(t)) return "therapy_rehab";
  if (["psychiatrist", "psychologist", "counselling", "counseling", "mental health", "mental wellness"].includes(t)) return "mental_wellness";
  if (["dna", "dna & health", "dna_health", "genomics", "health screening", "screening"].includes(t)) return "dna_health";
  if (["specialist", "specialist referral"].includes(t)) return "specialist";
  return null;
};

const ClinicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [clinic, setClinic] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showManagedCareModal, setShowManagedCareModal] = useState(false);
  const [managedCareSubmitted, setManagedCareSubmitted] = useState(false);
  const [mcName, setMcName] = useState("");
  const [mcPhone, setMcPhone] = useState("");
  const [mcTiming, setMcTiming] = useState("");
  const [mcConcern, setMcConcern] = useState("");
  const [mcSubmitting, setMcSubmitting] = useState(false);
  const [expandedAward, setExpandedAward] = useState<number | null>(null);
  const [showJoinQueue, setShowJoinQueue] = useState(false);
  const [showBookingIntake, setShowBookingIntake] = useState(false);
  const [bookingPreferWhatsApp, setBookingPreferWhatsApp] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoMilestonesRef = useRef<Set<number>>(new Set());

  const logVideoEvent = (event: string, extra: Record<string, unknown> = {}) => {
    try {
      const payload = {
        event: `clinic_video_${event}`,
        clinicId: clinic?.id,
        clinicName: clinic?.name,
        timestamp: new Date().toISOString(),
        ...extra,
      };
      const key = "clynicq_video_events";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(payload);
      localStorage.setItem(key, JSON.stringify(existing.slice(-200)));
    } catch {}
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (!v.duration || isNaN(v.duration)) return;
    const pct = (v.currentTime / v.duration) * 100;
    [25, 50, 75, 100].forEach((m) => {
      if (pct >= m && !videoMilestonesRef.current.has(m)) {
        videoMilestonesRef.current.add(m);
        logVideoEvent(m === 100 ? "complete" : `progress_${m}`);
      }
    });
  };

  const EXPLORE_CHIPS = (() => {
    const currentCategory = mapClinicTypeToCategory(clinic?.type);
    return CLYNICQ_CLINIC_TYPES.filter((c) => c.key !== currentCategory);
  })();


  const logExploreEvent = (event: "impression" | "click", chipKey: string, category: string) => {
    try {
      const payload = {
        event,
        source: "clinic_profile",
        source_clinic_id: id,
        source_clinic_name: clinic?.name,
        chip: chipKey,
        destination_category: category,
        timestamp: new Date().toISOString(),
      };
      console.log("[explore_healthcare]", payload);
      const key = "explore_healthcare_events";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev.slice(-200)));
    } catch {/* ignore */}
  };

  const handleExploreClick = (chipKey: string, category: string) => {
    logExploreEvent("click", chipKey, category);
    navigate(`/?category=${category}#marketplace`);
  };

  useEffect(() => {
    fetchClinicData();
  }, [id]);

  const fetchClinicData = async () => {
    try {
      const [clinicData, doctorsData, reviewsData, queueStatsData] = await Promise.all([
        supabase.from("clinics").select("*").eq("id", id).single(),
        supabase.from("doctors").select("*").eq("clinic_id", id),
        supabase.from("reviews").select("*, profiles(full_name)").eq("clinic_id", id).order("created_at", { ascending: false }),
        // Use secure queue_stats_public view instead of direct table access
        supabase.from("queue_stats_public").select("queue_count").eq("clinic_id", id).maybeSingle(),
      ]);

      if (clinicData.data) setClinic(clinicData.data);
      if (doctorsData.data) setDoctors(doctorsData.data);
      if (reviewsData.data) setReviews(reviewsData.data);
      // Set queue as count only (no personal data exposed)
      const queueCount = queueStatsData.data?.queue_count || 0;
      setQueue(Array.from({ length: Number(queueCount) }, (_, i) => ({ queue_number: i + 1 })));
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error(t('clinicProfile.failedToLoad'));
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (preferWhatsApp = false) => {
    if (!clinic) return;
    if (isManagedCareType(clinic.type)) {
      setShowManagedCareModal(true);
      setManagedCareSubmitted(false);
      setMcName("");
      setMcPhone("");
      setMcTiming("");
      setMcConcern("");
    } else {
      setBookingPreferWhatsApp(preferWhatsApp);
      setShowBookingIntake(true);
    }
  };

  const handleManagedCareSubmit = () => {
    if (!mcName.trim() || !mcPhone.trim()) {
      toast.error(t('clinicProfile.fieldName') + " & " + t('clinicProfile.fieldPhone') + " required");
      return;
    }
    setMcSubmitting(true);
    // Demo: simulate submission
    console.log(`[MANAGED CARE] ${NMG_ATTRIBUTION_TAG}`);
    console.log(`[MANAGED CARE] Clinic: ${clinic?.name}, Name: ${mcName}, Phone: ${mcPhone}`);
    setTimeout(() => {
      setMcSubmitting(false);
      setManagedCareSubmitted(true);
      toast.success(t('clinicProfile.requestReceived'));
    }, 800);
  };

  // Demo reviews fallback for clinics without real reviews
  const DEMO_REVIEWS: Record<string, Array<{ id: string; name: string; rating: number; comment: string }>> = {
    "NMG Family Clinic": [
      { id: "d1", name: "Lim Wei Ting", rating: 5, comment: "Excellent family clinic. Dr. Tan is very thorough and takes time to explain everything clearly. Highly recommended for families." },
      { id: "d2", name: "Ahmad Razak", rating: 4, comment: "Friendly staff and short waiting times. The digital queue system is very convenient." },
      { id: "d3", name: "Rachel Chen", rating: 5, comment: "Been coming here for years. The managed care coordination is seamless — they handle all the referrals efficiently." },
    ],
    "ABC Specialist Clinic": [
      { id: "d4", name: "David Ong", rating: 5, comment: "Dr. Nair is one of the best cardiologists I've seen. Very professional and reassuring. The NMG referral process was smooth." },
      { id: "d5", name: "Siti Aminah", rating: 5, comment: "Dr. Lim performed my knee surgery. Recovery was fast and he followed up personally. Excellent care." },
      { id: "d6", name: "Michael Teo", rating: 4, comment: "Top-notch specialist clinic. Appointments are well-managed through the managed care pathway." },
    ],
  };

  const displayReviews = reviews.length > 0
    ? reviews
    : (clinic ? (DEMO_REVIEWS[clinic.name] || []) : []);

  if (loading || !clinic) {
    return <div className="min-h-screen flex items-center justify-center">{t('clinicProfile.loading')}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-3 md:px-6 py-4 sm:py-8">
        <div className="space-y-4 sm:space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-base sm:text-2xl font-bold text-primary leading-none">{clinic.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                  </div>
                  <h1 className="text-xl sm:text-4xl font-bold">{clinic.name}</h1>
                  <Badge variant="secondary" className="text-xs sm:text-sm px-2 py-0.5">{clinic.type}</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-foreground flex-shrink-0" />
                    <span className="text-xs sm:text-base font-medium text-foreground">{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                    <span className="text-xs sm:text-base font-bold text-foreground">{clinic.rating}</span>
                  </div>
                </div>
              </div>
            
            </div>

            <p className="text-sm sm:text-base text-foreground/90 font-medium">{clinic.description}</p>
          </div>

          {/* Clinic Photos - Show from DB or demo fallback */}
          {(() => {
            const photos = clinic.photos || clinic.images || clinic.gallery || null;
            const DEMO_PHOTOS: Record<string, string[]> = {
              "Harmony TCM Centre": [
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
                "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80",
                "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
                "https://images.unsplash.com/photo-1583912267550-d6c2a8e5c7a1?w=600&q=80",
              ],
              "Unity Health Clinic": [
                "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80",
                "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
                "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
              ],
              "Wellness Plus Clinic": [
                "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80",
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
                "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
              ],
              "NMG Family Clinic": [
                "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&q=80",
                "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80",
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
              ],
              "ABC Specialist Clinic": [
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
                "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80",
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
              ],
            };
            const DEFAULT_CLINIC_PHOTOS = [
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
              "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
              "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
              "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
            ];
            const displayPhotos = (photos && photos.length > 0)
              ? photos.slice(0, 4)
              : (DEMO_PHOTOS[clinic.name] || DEFAULT_CLINIC_PHOTOS);

            const videoUrl: string = clinic.video_url || clinic.video || DEMO_CLINIC_VIDEO;
            const thumbnail = displayPhotos[0];

            return (
              <div className="space-y-2">
                {videoUrl && (
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-black">
                    {!videoStarted ? (
                      <button
                        type="button"
                        onClick={() => {
                          setVideoStarted(true);
                          logVideoEvent("play");
                          requestAnimationFrame(() => {
                            videoRef.current?.play().catch(() => {});
                          });
                        }}
                        className="group absolute inset-0 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={`Play ${clinic.name} intro video`}
                      >
                        <img
                          src={thumbnail}
                          alt={`${clinic.name} video preview`}
                          className="w-full h-full object-cover contrast-[1.05] saturate-[1.1] transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/15 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="h-7 w-7 sm:h-9 sm:w-9 text-primary fill-primary ml-1" />
                          </div>
                        </div>
                      </button>
                    ) : (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        poster={thumbnail}
                        controls
                        playsInline
                        preload="metadata"
                        onPlay={() => logVideoEvent("play")}
                        onPause={() => logVideoEvent("pause")}
                        onTimeUpdate={handleVideoTimeUpdate}
                        className="w-full h-full object-cover bg-black"
                      />
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {displayPhotos.map((photo: string, index: number) => {
                    const total = displayPhotos.length;
                    const spanFull = total === 1 || (total === 3 && index === 2);
                    return (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-primary",
                              spanFull && "col-span-2"
                            )}
                            aria-label={`View ${clinic.name} photo ${index + 1}`}
                          >
                            <img
                              src={photo}
                              alt={`${clinic.name} photo ${index + 1}`}
                              className="w-full aspect-square object-cover contrast-[1.05] saturate-[1.1] transition-transform group-hover:scale-105"
                              loading="lazy"
                              width={640}
                              height={640}
                              onError={(e) => {
                                const wrapper = (e.currentTarget.parentElement as HTMLElement | null);
                                if (wrapper) wrapper.style.display = "none";
                              }}
                            />
                            <div className="absolute inset-0 bg-[#12385B]/5 mix-blend-multiply pointer-events-none" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-2 sm:p-3 bg-background border-0">
                          <DialogHeader className="sr-only">
                            <DialogTitle>{`${clinic.name} photo ${index + 1}`}</DialogTitle>
                          </DialogHeader>
                          <img
                            src={photo.replace(/w=\d+/, 'w=1600')}
                            alt={`${clinic.name} photo ${index + 1} enlarged`}
                            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                          />
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Services Offered */}
          <Card className="p-3 sm:p-4">
            <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-3">Services Offered</h2>
            {(() => {
              const services = clinic.services && clinic.services.length > 0
                ? clinic.services.map((s: string) => ({
                    icon: SERVICE_ICON_MAP[s.toLowerCase()] || Stethoscope,
                    label: s,
                    desc: "",
                  }))
                : DEFAULT_SERVICES;
              const VISIBLE = 6;
              const hasMore = services.length > VISIBLE;
              const items = showAllServices ? services : services.slice(0, VISIBLE);
              const useTwoCols = items.length > 3;
              return (
                <>
                  <div className={`grid gap-2 sm:gap-3 ${useTwoCols ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {items.map((service: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border border-[#D8E4ED] bg-[#F5FAFB] shadow-[0_1px_6px_rgba(18,56,91,0.05)] hover:bg-[#EDF7F8] hover:border-[#18B7C9]/30 hover:shadow-[0_3px_12px_rgba(24,183,201,0.08)] transition-all cursor-default h-full"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E6F7FA] flex items-center justify-center shrink-0">
                          <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-sm sm:text-base font-bold text-foreground leading-snug">{service.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasMore && (
                    <button
                      type="button"
                      onClick={() => setShowAllServices((v) => !v)}
                      className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
                    >
                      {showAllServices ? "Show less" : `Show more (${services.length - VISIBLE})`}
                      {showAllServices ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  )}
                </>
              );
            })()}
          </Card>

          {(() => {
            const isManagedCare = isManagedCareType(clinic.type);
            const isManagedCareNmg = clinic.is_nmg_affiliated && isManagedCare;
            const showBookingButtons = !clinic.has_digital_queue || clinic.name === "Harmony TCM Centre";
            const showWhatsApp = showBookingButtons && !isManagedCare && clinic.phone && clinic.name !== "Harmony TCM Centre";
            const showBook = showBookingButtons && !isManagedCare && (clinic.phone || clinic.booking_url);
            const showRequest = showBookingButtons && isManagedCare;

            const ctas: React.ReactNode[] = [];
            if (clinic.has_digital_queue) {
              ctas.push(
                <button
                  key="join"
                  className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent/20 active:bg-accent/25 transition-all cursor-pointer"
                  onClick={() => setShowJoinQueue(true)}
                >
                  <div className="p-2 sm:p-2.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-sm shrink-0">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-foreground">{t('clinicProfile.joinQueue')}</span>
                </button>
              );
            }
            if (showWhatsApp) {
              ctas.push(
                <button
                  key="whatsapp"
                  className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent/20 active:bg-accent/25 transition-all cursor-pointer"
                  onClick={() => handleBookAppointment(true)}
                >
                  <div className="p-2 sm:p-2.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-sm shrink-0">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-foreground">{t('clinicProfile.bookWhatsApp')}</span>
                </button>
              );
            }
            if (showBook) {
              ctas.push(
                <button
                  key="book"
                  className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent/20 active:bg-accent/25 transition-all cursor-pointer"
                  onClick={() => handleBookAppointment()}
                >
                  <div className="p-2 sm:p-2.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-sm shrink-0">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-foreground">{t('clinicProfile.bookAppointment')}</span>
                </button>
              );
            }
            if (showRequest) {
              ctas.push(
                <button
                  key="request"
                  className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent/20 active:bg-accent/25 transition-all cursor-pointer"
                  onClick={() => handleBookAppointment()}
                >
                  <div className="p-2 sm:p-2.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-sm shrink-0">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-foreground">{t('clinicProfile.requestManagedCare')}</span>
                </button>
              );
            }
            if (clinic.has_digital_queue) {
              ctas.push(
                <div key="ahead" className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg border border-accent/40 bg-accent/10">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-sm shrink-0">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">{t('clinicProfile.currentQueue')}</p>
                    <p className="font-black text-lg sm:text-xl text-primary">{queue.length} {t('clinicProfile.waiting')}</p>
                  </div>
                </div>
              );
            }

            const cols = ctas.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : ctas.length === 3 ? 'sm:grid-cols-3' : ctas.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1';
            return (
              <div className={`grid grid-cols-1 ${cols} gap-2.5 sm:gap-3`}>{ctas}</div>
            );
          })()}
          {!isManagedCareType(clinic.type) && (clinic.booking_url || clinic.phone) && (
            <p className="text-[11px] text-center text-muted-foreground mt-1">
              {t("clinicProfile.appointmentHandledByClinic")}
            </p>
          )}

          {/* Explore Healthcare — compact category navigator */}
          <section aria-labelledby="explore-healthcare-title" className="-mx-3 sm:mx-0">
            <div className="flex items-center gap-2 px-3 sm:px-0 mb-2">
              <Compass className="h-3.5 w-3.5 text-muted-foreground" />
              <h2 id="explore-healthcare-title" className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Explore Healthcare
              </h2>
            </div>
            <div className="overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2 px-3 sm:px-0 pb-1">
                {EXPLORE_CHIPS.map((chip) => (
                  <ExploreChip
                    key={chip.key}
                    chip={chip}
                    onImpression={() => logExploreEvent("impression", chip.key, chip.key)}
                    onClick={() => handleExploreClick(chip.key, chip.key)}
                  />
                ))}
              </div>
            </div>
          </section>



          {/* Tabs */}
          <Tabs defaultValue="doctors" className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-0.5 sm:p-2 bg-muted/50">
              <TabsTrigger value="doctors" className="text-[10px] sm:text-base font-bold sm:font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md px-1 sm:px-3">{t('clinicProfile.doctors')}</TabsTrigger>
              <TabsTrigger value="awards" className="text-[10px] sm:text-base font-bold sm:font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md px-1 sm:px-3">{t('clinicProfile.awards')}</TabsTrigger>
              <TabsTrigger value="hours" className="text-[10px] sm:text-base font-bold sm:font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md px-1 sm:px-3">{t('clinicProfile.operatingHours')}</TabsTrigger>
              <TabsTrigger value="reviews" className="text-[10px] sm:text-base font-bold sm:font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md px-1 sm:px-3">{t('clinicProfile.reviews')}</TabsTrigger>
            </TabsList>

            <TabsContent value="doctors" className="space-y-3 sm:space-y-6">
              {doctors.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-6">
                  {doctors.map((doctor) => (
                    <Card 
                      key={doctor.id} 
                      className="p-3 sm:p-8 cursor-pointer hover:border-primary transition-all hover:shadow-lg"
                      onClick={() => navigate(`/doctor/${doctor.id}`)}
                    >
                      <div className="flex items-start gap-2.5 sm:gap-6">
                        <Avatar className="h-12 w-12 sm:h-32 sm:w-32 border-2 border-primary/20 flex-shrink-0">
                          <AvatarImage src={doctor.photo_url} alt={doctor.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm sm:text-3xl font-bold">
                            <User className="h-5 w-5 sm:h-16 sm:w-16" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5 sm:space-y-4 min-w-0">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-2xl font-bold">{doctor.name}</h3>
                              {doctor.is_verified && (
                                <Badge variant="default" className="text-[8px] sm:text-xs">{t('clinicProfile.verified')}</Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-lg text-muted-foreground mt-0.5">{doctor.specialty}</p>
                            {doctor.years_of_practice && (
                              <p className="text-xs sm:text-base text-muted-foreground mt-1">
                                {doctor.years_of_practice} {t('clinicProfile.yearsExperience')}
                              </p>
                            )}
                          </div>
                          {doctor.qualifications && (
                            <div className="space-y-1">
                              <h4 className="text-xs font-semibold text-foreground">{t('clinicProfile.qualifications')}</h4>
                              <p className="text-xs sm:text-base line-clamp-3 text-foreground/90">{doctor.qualifications}</p>
                            </div>
                          )}
                          {doctor.languages && doctor.languages.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {doctor.languages.map((lang: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-[10px] sm:text-sm">{lang}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-4 sm:p-6 text-center text-muted-foreground text-sm">
                  {t('clinicProfile.noDoctorsAvailable')}
                </Card>
              )}
            </TabsContent>

             <TabsContent value="awards" className="space-y-3 sm:space-y-6">
              <Card className="p-4 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6">{t('clinicProfile.awardsRecognition')}</h3>
                {(() => {
                  const DEMO_AWARDS = [
                    { title: "Centre of Excellence – Cardiac Care", description: "Recognised by the National Heart Association for advanced interventional cardiology services.", year: "2024", certificateUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80" },
                    { title: "Top Specialist Clinic Award", description: "Awarded by Singapore Medical Journal for excellence in specialist outpatient care.", year: "2023", certificateUrl: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&q=80" },
                    { title: "Patient Safety Excellence Award", description: "Achieved zero surgical complication rate for three consecutive years.", year: "2022", certificateUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80" },
                  ];
                  const displayAwards = clinic.awards && clinic.awards.length > 0 ? clinic.awards : DEMO_AWARDS;
                  return (
                    <div className="space-y-3 sm:space-y-4">
                      {displayAwards.map((award: any, index: number) => (
                        <div key={index} className="rounded-lg border border-amber-200 dark:border-amber-800 overflow-hidden">
                          <div className="flex items-start gap-2.5 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
                            <Star className="h-5 w-5 sm:h-8 sm:w-8 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-lg font-bold text-foreground">{award.title}</h4>
                              <p className="text-xs sm:text-base text-foreground/80 mt-0.5">{award.description}</p>
                              {award.year && <p className="text-xs text-muted-foreground mt-1">{t('clinicProfile.awardedIn')} {award.year}</p>}
                            </div>
                            <button
                              onClick={() => setExpandedAward(expandedAward === index ? null : index)}
                              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0 mt-1 p-1.5 rounded-md hover:bg-primary/10"
                              title="View certificate"
                            >
                              <FileImage className="h-5 w-5 sm:h-6 sm:w-6" />
                              {expandedAward === index ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                          {expandedAward === index && (
                            <div className="p-3 sm:p-4 bg-background border-t border-amber-200 dark:border-amber-800">
                              <img
                                src={award.certificateUrl || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"}
                                alt={`${award.title} certificate`}
                                className="w-full max-h-[400px] object-contain rounded-md border"
                              />
                              <p className="text-xs text-muted-foreground mt-2 text-center">{award.title} — {t('clinicProfile.awardedIn')} {award.year}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </Card>
            </TabsContent>

            <TabsContent value="hours">
              <Card className="p-4 sm:p-8">
                <div className="space-y-2 sm:space-y-4">
                  <div className="flex items-center gap-2 mb-3 sm:mb-6">
                    <Clock className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                    <h3 className="text-lg sm:text-2xl font-bold">{t('clinicProfile.operatingHours')}</h3>
                  </div>
                  {clinic.operating_hours && Object.entries(clinic.operating_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="capitalize font-semibold text-sm sm:text-lg">{day}</span>
                      <span className="text-foreground/80 font-medium text-xs sm:text-base">{hours as string}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-3 sm:space-y-6">
              {displayReviews.length > 0 ? (
                displayReviews.map((review: any) => (
                  <Card key={review.id} className="p-4 sm:p-8">
                    <div className="space-y-2 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm sm:text-lg">{review.profiles?.full_name || review.name || t('clinicProfile.anonymous')}</p>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-xs sm:text-base text-foreground/80">{review.comment}</p>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-4 sm:p-8 text-center">
                  <p className="text-sm text-muted-foreground">{t('clinicProfile.noReviews')}</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Managed Care Request Modal */}
      <Dialog open={showManagedCareModal} onOpenChange={setShowManagedCareModal}>
        <DialogContent>
          {!managedCareSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle>{t('clinicProfile.requestManagedCare')}</DialogTitle>
                <DialogDescription>{t('clinicProfile.managedCareSubtitle')}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="mc-name">{t('clinicProfile.fieldName')} *</Label>
                  <Input
                    id="mc-name"
                    value={mcName}
                    onChange={(e) => setMcName(e.target.value)}
                    placeholder={t('clinicProfile.fieldName')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mc-phone">{t('clinicProfile.fieldPhone')} *</Label>
                  <Input
                    id="mc-phone"
                    type="tel"
                    value={mcPhone}
                    onChange={(e) => setMcPhone(e.target.value)}
                    placeholder="e.g. +6591234567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mc-timing">{t('clinicProfile.fieldTiming')}</Label>
                  <Input
                    id="mc-timing"
                    value={mcTiming}
                    onChange={(e) => setMcTiming(e.target.value)}
                    placeholder={t('clinicProfile.fieldTimingPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mc-concern">{t('clinicProfile.fieldConcern')}</Label>
                  <Textarea
                    id="mc-concern"
                    value={mcConcern}
                    onChange={(e) => setMcConcern(e.target.value)}
                    placeholder={t('clinicProfile.fieldConcernPlaceholder')}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleManagedCareSubmit}
                  disabled={mcSubmitting}
                  className="w-full"
                  size="lg"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  {mcSubmitting ? t('clinicProfile.submitting') : t('clinicProfile.submitRequest')}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
              <DialogHeader>
                <DialogTitle>{t('clinicProfile.requestReceived')}</DialogTitle>
              </DialogHeader>
              <Button variant="outline" onClick={() => setShowManagedCareModal(false)}>
                OK
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Shared Join Queue intake (matches ClinicCard) */}
      {clinic && id && (
        <JoinQueueIntakeDialog
          open={showJoinQueue}
          onOpenChange={setShowJoinQueue}
          clinicId={id}
          clinicName={clinic.name}
          clinicType={clinic.type}
        />
      )}

      {/* Shared Booking intake (matches ClinicCard) */}
      {clinic && id && (
        <BookingIntakeDialog
          open={showBookingIntake}
          onOpenChange={setShowBookingIntake}
          clinicId={id}
          clinicName={clinic.name}
          preferWhatsApp={bookingPreferWhatsApp}
        />
      )}
    </div>
  );
};

export default ClinicProfile;
