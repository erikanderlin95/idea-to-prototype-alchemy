import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Star, Users, Calendar, User, Shield, CheckCircle2, FileImage, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { isManagedCareType, NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";

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

  const handleBookAppointment = () => {
    if (!clinic) return;
    if (isManagedCareType(clinic.type)) {
      setShowManagedCareModal(true);
      setManagedCareSubmitted(false);
      setMcName("");
      setMcPhone("");
      setMcTiming("");
      setMcConcern("");
    } else {
      navigate(`/booking/${id}`);
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

          {/* Photo Gallery */}
          <Card className="p-3 sm:p-4">
            <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">{t('clinicProfile.clinicPhotos')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {clinic.photos && clinic.photos.length > 0 ? (
                clinic.photos.map((photo: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={photo} alt={`${clinic.name} photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-4 text-muted-foreground">
                  <p className="text-sm sm:text-base">{t('clinicProfile.photoGalleryComingSoon')}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Button className="w-full text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 h-auto" onClick={handleBookAppointment}>
              {isManagedCareType(clinic.type) ? <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
              {isManagedCareType(clinic.type) ? t('clinicProfile.requestManagedCare') : t('clinicProfile.bookAppointment')}
            </Button>
            {clinic.has_digital_queue && (
              <Button 
                variant="outline"
                className="w-full text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 h-auto"
                onClick={() => navigate(`/queue?clinic=${id}`)}
              >
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {t('clinicProfile.joinQueue')}
              </Button>
            )}
            {clinic.has_digital_queue && (
              <Card className="p-3 sm:p-5 border-4 border-primary/50 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-center gap-2.5 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-primary to-accent rounded-lg shadow-md">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                  <div>
                     <p className="text-xs sm:text-base font-bold text-foreground mb-0.5">{t('clinicProfile.currentQueue')}</p>
                    <p className="font-black text-xl sm:text-2xl text-primary">{queue.length} {t('clinicProfile.waiting')}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

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
                                <Badge variant="default" className="text-[10px] sm:text-sm">{t('clinicProfile.verified')}</Badge>
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
    </div>
  );
};

export default ClinicProfile;
