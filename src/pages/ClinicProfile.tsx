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
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{clinic.name}</h1>
                  <Badge variant="secondary">{clinic.type}</Badge>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{clinic.rating}</span>
                  </div>
                </div>
              </div>
              <Button size="lg" onClick={handleBookAppointment}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate(`/queue?clinic=${id}`)}
              >
                <Users className="mr-2 h-5 w-5" />
                Join Queue
              </Button>
            </div>

            <p className="text-muted-foreground">{clinic.description}</p>
          </div>

          {/* Contact & Queue Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{clinic.phone}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{clinic.email || "Not available"}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Current Queue</p>
                  <p className="font-medium">{queue.length} waiting</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="doctors" className="w-full">
            <TabsList>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="hours">Operating Hours</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
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
                            <p className="text-base line-clamp-3">{doctor.qualifications}</p>
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

            <TabsContent value="hours">
              <Card className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Operating Hours</h3>
                  </div>
                  {clinic.operating_hours && Object.entries(clinic.operating_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="capitalize font-medium">{day}</span>
                      <span className="text-muted-foreground">{hours as string}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{review.profiles?.full_name || "Anonymous"}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center text-muted-foreground">
                  No reviews yet
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
