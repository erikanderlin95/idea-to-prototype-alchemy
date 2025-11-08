import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Calendar, Clock, Languages, Award, CheckCircle2, Building2 } from "lucide-react";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any>(null);
  const [clinic, setClinic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctorProfile();
  }, [id]);

  const loadDoctorProfile = async () => {
    try {
      const { data: doctorData, error: doctorError } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", id)
        .single();

      if (doctorError) throw doctorError;
      setDoctor(doctorData);

      if (doctorData.clinic_id) {
        const { data: clinicData } = await supabase
          .from("clinics")
          .select("*")
          .eq("id", doctorData.clinic_id)
          .single();
        
        setClinic(clinicData);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading doctor profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Doctor not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const initials = doctor.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={doctor.photo_url} alt={doctor.name} />
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{doctor.name}</h1>
                  {doctor.is_verified && (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  )}
                </div>
                
                {doctor.specialty && (
                  <p className="text-xl text-muted-foreground mb-3">{doctor.specialty}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.registration_no && (
                    <Badge variant="secondary">Reg: {doctor.registration_no}</Badge>
                  )}
                  {doctor.years_of_practice && (
                    <Badge variant="secondary">
                      {doctor.years_of_practice} years experience
                    </Badge>
                  )}
                </div>

                {clinic && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Building2 className="h-4 w-4" />
                    <span>{clinic.name}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">
                {doctor.qualifications || "No qualifications listed"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.languages && doctor.languages.length > 0 ? (
                  doctor.languages.map((lang: string) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No languages listed</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {doctor.bio && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{doctor.bio}</p>
            </CardContent>
          </Card>
        )}

        {doctor.availability && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(doctor.availability).map(([day, hours]: [string, any]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium capitalize">{day}</span>
                    <span className="text-muted-foreground">
                      {Array.isArray(hours) ? hours.join(", ") : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button 
            className="flex-1" 
            size="lg"
            onClick={() => navigate(`/booking?clinic=${clinic?.id}&doctor=${doctor.id}`)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
          {clinic && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate(`/clinic/${clinic.id}`)}
            >
              View Clinic
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
