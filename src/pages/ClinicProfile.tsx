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
import { MapPin, Phone, Mail, Clock, Star, Users, Calendar, User, Shield, CheckCircle2 } from "lucide-react";
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
      
      <main className="container px-4 md:px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">{clinic.name}</h1>
                  <Badge variant="secondary" className="text-base px-3 py-1">{clinic.type}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-foreground" />
                    <span className="text-base font-medium text-foreground">{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="text-base font-bold text-foreground">{clinic.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button size="lg" className="text-base px-6 py-6" onClick={handleBookAppointment}>
                  {isManagedCareType(clinic.type) ? <Shield className="mr-2 h-6 w-6" /> : <Calendar className="mr-2 h-6 w-6" />}
                  {isManagedCareType(clinic.type) ? t('clinicProfile.requestManagedCare') : t('clinicProfile.bookAppointment')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base px-6 py-6"
                  onClick={() => navigate(`/queue?clinic=${id}`)}
                >
                  <Users className="mr-2 h-6 w-6" />
                  {t('clinicProfile.joinQueue')}
                </Button>
              </div>
            </div>

            <p className="text-base text-foreground/90 font-medium">{clinic.description}</p>
          </div>

          {/* Photo Gallery */}
          <Card className="p-4">
            <h2 className="text-2xl font-bold mb-3">{t('clinicProfile.clinicPhotos')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clinic.photos && clinic.photos.length > 0 ? (
                clinic.photos.map((photo: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={photo} alt={`${clinic.name} photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-6 text-muted-foreground">
                  <p className="text-base">{t('clinicProfile.photoGalleryComingSoon')}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Contact & Queue Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border-2 border-primary/30 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground mb-1">{t('clinicProfile.phone')}</p>
                  <p className="text-lg text-foreground">{clinic.phone}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-2 border-primary/30 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground mb-1">{t('clinicProfile.email')}</p>
                  <p className="text-lg text-foreground">{clinic.email || t('clinicProfile.notAvailable')}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-4 border-primary/50 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground mb-1">{t('clinicProfile.currentQueue')}</p>
                  <p className="font-black text-2xl text-primary">{queue.length} {t('clinicProfile.waiting')}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="doctors" className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-2 bg-muted/50">
              <TabsTrigger value="doctors" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">{t('clinicProfile.doctors')}</TabsTrigger>
              <TabsTrigger value="awards" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">{t('clinicProfile.awards')}</TabsTrigger>
              <TabsTrigger value="hours" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">{t('clinicProfile.operatingHours')}</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">{t('clinicProfile.reviews')}</TabsTrigger>
            </TabsList>

            <TabsContent value="doctors" className="space-y-6">
              {doctors.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {doctors.map((doctor) => (
                    <Card 
                      key={doctor.id} 
                      className="p-8 cursor-pointer hover:border-primary transition-all hover:shadow-lg"
                      onClick={() => navigate(`/doctor/${doctor.id}`)}
                    >
                      <div className="flex items-start gap-6">
                        <Avatar className="h-32 w-32 border-4 border-primary/20">
                          <AvatarImage src={doctor.photo_url} alt={doctor.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-3xl font-bold">
                            <User className="h-16 w-16" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-2xl font-bold">{doctor.name}</h3>
                              {doctor.is_verified && (
                                <Badge variant="default" className="text-sm">{t('clinicProfile.verified')}</Badge>
                              )}
                            </div>
                            <p className="text-lg text-muted-foreground mt-1">{doctor.specialty}</p>
                            {doctor.years_of_practice && (
                              <p className="text-base text-muted-foreground mt-2">
                                {doctor.years_of_practice} {t('clinicProfile.yearsExperience')}
                              </p>
                            )}
                          </div>
                          {doctor.qualifications && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-foreground">{t('clinicProfile.qualifications')}</h4>
                              <p className="text-base line-clamp-3 text-foreground/90">{doctor.qualifications}</p>
                            </div>
                          )}
                          {doctor.languages && doctor.languages.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {doctor.languages.map((lang: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-sm">{lang}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center text-muted-foreground">
                  {t('clinicProfile.noDoctorsAvailable')}
                </Card>
              )}
            </TabsContent>

            <TabsContent value="awards" className="space-y-6">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('clinicProfile.awardsRecognition')}</h3>
                {clinic.awards && clinic.awards.length > 0 ? (
                  <div className="space-y-6">
                    {clinic.awards.map((award: any, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <Star className="h-8 w-8 text-amber-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-lg font-bold text-foreground">{award.title}</h4>
                          <p className="text-base text-foreground/80 mt-1">{award.description}</p>
                          {award.year && <p className="text-sm text-muted-foreground mt-2">{t('clinicProfile.awardedIn')} {award.year}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-muted mx-auto mb-4" />
                    <p className="text-base text-muted-foreground">{t('clinicProfile.awardsComingSoon')}</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="hours">
              <Card className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-7 w-7 text-primary" />
                    <h3 className="text-2xl font-bold">{t('clinicProfile.operatingHours')}</h3>
                  </div>
                  {clinic.operating_hours && Object.entries(clinic.operating_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-3 border-b last:border-0">
                      <span className="capitalize font-semibold text-lg">{day}</span>
                      <span className="text-foreground/80 font-medium text-base">{hours as string}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              {displayReviews.length > 0 ? (
                displayReviews.map((review: any) => (
                  <Card key={review.id} className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">{review.profiles?.full_name || review.name || t('clinicProfile.anonymous')}</p>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                          <span className="text-base font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-base text-foreground/80">{review.comment}</p>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-base text-muted-foreground">{t('clinicProfile.noReviews')}</p>
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
