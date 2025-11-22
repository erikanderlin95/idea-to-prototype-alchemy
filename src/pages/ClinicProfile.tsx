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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Star, Users, Calendar, User, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQueueStore } from "@/stores/useQueueStore";

const ClinicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { patient, status } = useQueueStore();
  const [clinic, setClinic] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [visitType, setVisitType] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  
  // Check if patient is in queue for THIS clinic
  const isInQueueForThisClinic = patient !== null && patient.clinicId === id;

  useEffect(() => {
    fetchClinicData();
    
    if (user && id) {
      // Subscribe to queue changes
      const channel = supabase
        .channel(`queue-${id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'queue_entries',
            filter: `clinic_id=eq.${id}`,
          },
          (payload) => {
            fetchClinicData();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id, user]);

  const fetchClinicData = async () => {
    try {
      const [clinicData, doctorsData, reviewsData, queueData] = await Promise.all([
        supabase.from("clinics").select("*").eq("id", id).single(),
        supabase.from("doctors").select("*").eq("clinic_id", id),
        supabase.from("reviews").select("*, profiles(full_name)").eq("clinic_id", id).order("created_at", { ascending: false }),
        supabase.from("queue_entries").select("*").eq("clinic_id", id).in("status", ["waiting", "checked_in", "serving"]).order("queue_number"),
      ]);

      if (clinicData.data) setClinic(clinicData.data);
      if (doctorsData.data) setDoctors(doctorsData.data);
      if (reviewsData.data) setReviews(reviewsData.data);
      if (queueData.data) setQueue(queueData.data);
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error(t('clinicProfile.failedToLoad'));
    } finally {
      setLoading(false);
    }
  };

  const handleJoinQueue = () => {
    if (!user) {
      toast.error(t("clinicCard.signInRequired"));
      navigate("/auth");
      return;
    }
    setShowDisclaimer(true);
  };

  const addToQueue = () => {
    if (!id) return;
    
    const { joinQueue } = useQueueStore.getState();
    joinQueue({
      clinicId: id,
      visitType,
      estimatedWaitTime: queue.length * 15,
    });
    
    setShowDisclaimer(false);
    setIsJoining(false);
    navigate(`/queue?clinic=${id}`);
  };

  const handleCancelQueue = () => {
    const { leaveQueue } = useQueueStore.getState();
    leaveQueue();
    toast.success(t("clinicCard.leftQueue"));
  };

  const handleCheckIn = () => {
    navigate(`/queue?clinic=${id}`);
  };

  const handleBookAppointment = () => {
    if (!user) {
      toast.error(t('clinicProfile.signInToBook'));
      navigate("/auth");
      return;
    }
    navigate(`/booking/${id}`);
  };

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
                  <Calendar className="mr-2 h-6 w-6" />
                  {t('clinicProfile.bookAppointment')}
                </Button>
                {!isInQueueForThisClinic && status !== 'served' && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-base px-6 py-6"
                    onClick={handleJoinQueue}
                    disabled={!clinic.is_open}
                  >
                    <Users className="mr-2 h-6 w-6" />
                    {t('clinicProfile.joinQueue')}
                  </Button>
                )}
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

          {/* Queue Status Card */}
          {isInQueueForThisClinic && status === 'waiting' && (
            <Card className="p-6 border-2 shadow-xl" style={{ borderColor: 'hsl(var(--ai-purple)/0.4)' }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border-2"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.1), hsl(var(--ai-blue)/0.1))',
                    borderColor: 'hsl(var(--ai-purple)/0.3)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16">
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" opacity="0.3" />
                        <circle
                          cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--accent))" strokeWidth="4"
                          strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - ((queue.length - (patient?.queueNumber || 0)) / queue.length))}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg">
                        #{patient?.queueNumber}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t("clinicCard.youreInQueue")}</p>
                      <p className="text-lg font-bold text-foreground">
                        {t("clinicCard.position")} <span className="text-2xl font-black text-primary">#{patient?.queueNumber}</span>
                        <span className="text-sm font-medium text-muted-foreground ml-2">{t("clinicCard.of")} {queue.length}</span>
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs font-semibold px-3 py-1">
                    {t("clinicCard.waiting")}
                  </Badge>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black shadow-md border-0 h-16 text-lg" 
                    onClick={handleCheckIn}
                  >
                    <CheckCircle className="mr-2 h-6 w-6" strokeWidth={2.5} />
                    {t("clinicCard.checkIn")}
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive font-black h-16 text-lg" 
                    onClick={handleCancelQueue}
                  >
                    <XCircle className="mr-2 h-6 w-6" strokeWidth={2.5} />
                    {t("clinicCard.leaveQueue")}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Thank You Screen */}
          {status === 'served' && (
            <Card className="p-12 text-center space-y-6 border-2 shadow-xl" style={{ borderColor: 'hsl(var(--primary)/0.3)' }}>
              <div className="space-y-4">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                  <CheckCircle className="h-12 w-12 text-primary-foreground" strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-black text-foreground">Thank you for visiting!</h2>
                <p className="text-xl text-muted-foreground font-medium">Your visit is complete.</p>
              </div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-lg shadow-2xl shadow-primary/50 h-14 px-8"
                onClick={() => {
                  const { leaveQueue } = useQueueStore.getState();
                  leaveQueue();
                }}
              >
                <Calendar className="mr-2 h-6 w-6" />
                Book Again
              </Button>
            </Card>
          )}

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
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">{review.profiles?.full_name || t('clinicProfile.anonymous')}</p>
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

      {/* Disclaimer Dialog */}
      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Queue</DialogTitle>
            <DialogDescription>Please read and agree to continue</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Visit Type *</label>
              <Select value={visitType} onValueChange={setVisitType}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="General Consultation">General Consultation</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="TCM Treatment">TCM Treatment</SelectItem>
                  <SelectItem value="Pain & Wellness">Pain & Wellness</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important Notice:</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Queue order is fully managed by clinic staff.</p>
                  <p>Queue numbers are estimates, not guaranteed.</p>
                  <p>Queue positions may shift due to urgent cases, drop-offs, or clinic triage.</p>
                  <p>ClynicQ displays data based on clinic updates; platform is not liable for delays or changes.</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisclaimer(false)}>
              Cancel
            </Button>
          <Button 
            onClick={() => {
              setShowDisclaimer(false);
              addToQueue();
            }}
            disabled={isJoining || !visitType}
          >
            {isJoining ? "Joining..." : "I understand and agree"}
          </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicProfile;
