import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Mail, Clock, Star, Users, Calendar, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ClinicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clinic, setClinic] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinicData();
  }, [id]);

  const fetchClinicData = async () => {
    try {
      const [clinicData, doctorsData, reviewsData, queueData] = await Promise.all([
        supabase.from("clinics").select("*").eq("id", id).single(),
        supabase.from("doctors").select("*").eq("clinic_id", id),
        supabase.from("reviews").select("*, profiles(full_name)").eq("clinic_id", id).order("created_at", { ascending: false }),
        supabase.from("queue_entries").select("*").eq("clinic_id", id).eq("status", "waiting").order("queue_number"),
      ]);

      if (clinicData.data) setClinic(clinicData.data);
      if (doctorsData.data) setDoctors(doctorsData.data);
      if (reviewsData.data) setReviews(reviewsData.data);
      if (queueData.data) setQueue(queueData.data);
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error("Failed to load clinic information");
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    if (!user) {
      toast.error("Please sign in to book an appointment");
      navigate("/auth");
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading || !clinic) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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
                  Book Appointment
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base px-6 py-6"
                  onClick={() => navigate(`/queue?clinic=${id}`)}
                >
                  <Users className="mr-2 h-6 w-6" />
                  Join Queue
                </Button>
              </div>
            </div>

            <p className="text-base text-foreground/90 font-medium">{clinic.description}</p>
          </div>

          {/* Photo Gallery */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Clinic Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clinic.photos && clinic.photos.length > 0 ? (
                clinic.photos.map((photo: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={photo} alt={`${clinic.name} photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <p className="text-base">Photo gallery coming soon</p>
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
                  <p className="text-base font-bold text-foreground mb-1">Phone</p>
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
                  <p className="text-base font-bold text-foreground mb-1">Email</p>
                  <p className="text-lg text-foreground">{clinic.email || "Not available"}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-4 border-primary/50 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground mb-1">Current Queue</p>
                  <p className="font-black text-2xl text-primary">{queue.length} waiting</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="doctors" className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-2 bg-muted/50">
              <TabsTrigger value="doctors" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Doctors</TabsTrigger>
              <TabsTrigger value="awards" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Awards</TabsTrigger>
              <TabsTrigger value="hours" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Operating Hours</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base font-black text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Reviews</TabsTrigger>
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
                                <Badge variant="default" className="text-sm">Verified</Badge>
                              )}
                            </div>
                            <p className="text-lg text-muted-foreground mt-1">{doctor.specialty}</p>
                            {doctor.years_of_practice && (
                              <p className="text-base text-muted-foreground mt-2">
                                {doctor.years_of_practice} years experience
                              </p>
                            )}
                          </div>
                          {doctor.qualifications && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-foreground">Qualifications & Certificates</h4>
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
                  No doctors information available
                </Card>
              )}
            </TabsContent>

            <TabsContent value="awards" className="space-y-6">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Awards & Recognition</h3>
                {clinic.awards && clinic.awards.length > 0 ? (
                  <div className="space-y-6">
                    {clinic.awards.map((award: any, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <Star className="h-8 w-8 text-amber-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-lg font-bold text-foreground">{award.title}</h4>
                          <p className="text-base text-foreground/80 mt-1">{award.description}</p>
                          {award.year && <p className="text-sm text-muted-foreground mt-2">Awarded in {award.year}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-muted mx-auto mb-4" />
                    <p className="text-base text-muted-foreground">Awards and recognition will be displayed here</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="hours">
              <Card className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-7 w-7 text-primary" />
                    <h3 className="text-2xl font-bold">Operating Hours</h3>
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
                        <p className="font-bold text-lg">{review.profiles?.full_name || "Anonymous"}</p>
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
                  <p className="text-base text-muted-foreground">No reviews yet</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClinicProfile;
