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
import { Clock, Languages, Award, CheckCircle2, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
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
          <p>{language === 'en' ? t('doctorProfile.loading') : t('doctorProfile.loadingZh')}</p>
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
          <p>{language === 'en' ? t('doctorProfile.notFound') : t('doctorProfile.notFoundZh')}</p>
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
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        <Card className="mb-4 sm:mb-6">
          <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-32 sm:w-32">
                <AvatarImage src={doctor.photo_url} alt={doctor.name} />
                <AvatarFallback className="text-xl sm:text-3xl">{initials}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <h1 className="text-xl sm:text-3xl font-bold">{doctor.name}</h1>
                  {doctor.is_verified && (
                    <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  )}
                </div>
                
                {doctor.specialty && (
                  <p className="text-sm sm:text-xl text-muted-foreground mb-2 sm:mb-3">{doctor.specialty}</p>
                )}
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {doctor.registration_no && (
                    <Badge variant="secondary" className="text-[10px] sm:text-sm">
                      {language === 'en' ? t('doctorProfile.registration') : t('doctorProfile.registrationZh')}: {doctor.registration_no}
                    </Badge>
                  )}
                  {doctor.years_of_practice && (
                    <Badge variant="secondary" className="text-[10px] sm:text-sm">
                      {doctor.years_of_practice} {language === 'en' ? t('doctorProfile.yearsExperience') : t('doctorProfile.yearsExperienceZh')}
                    </Badge>
                  )}
                </div>

                {clinic && (
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
                    <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-base">{clinic.name}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Card>
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm sm:text-base">
                <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                {language === 'en' ? t('doctorProfile.qualifications') : t('doctorProfile.qualificationsZh')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="whitespace-pre-line text-xs sm:text-base">
                {doctor.qualifications || (language === 'en' ? t('doctorProfile.noQualifications') : t('doctorProfile.noQualificationsZh'))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm sm:text-base">
                <Languages className="h-4 w-4 sm:h-5 sm:w-5" />
                {language === 'en' ? t('doctorProfile.languages') : t('doctorProfile.languagesZh')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {doctor.languages && doctor.languages.length > 0 ? (
                  doctor.languages.map((lang: string) => (
                    <Badge key={lang} variant="outline" className="text-[10px] sm:text-sm">
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs sm:text-base text-muted-foreground">
                    {language === 'en' ? t('doctorProfile.noLanguages') : t('doctorProfile.noLanguagesZh')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {doctor.bio && (
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base">{language === 'en' ? t('doctorProfile.about') : t('doctorProfile.aboutZh')}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="whitespace-pre-line text-xs sm:text-base">{doctor.bio}</p>
            </CardContent>
          </Card>
        )}

        {doctor.availability && (
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm sm:text-base">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                {language === 'en' ? t('doctorProfile.availability') : t('doctorProfile.availabilityZh')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-1.5 sm:space-y-2">
                {Object.entries(doctor.availability).map(([day, hours]: [string, any]) => (
                  <div key={day} className="flex justify-between items-center py-1.5 sm:py-2 border-b last:border-0">
                    <span className="font-medium capitalize text-xs sm:text-base">{day}</span>
                    <span className="text-muted-foreground text-xs sm:text-base">
                      {Array.isArray(hours) ? hours.join(", ") : (language === 'en' ? t('doctorProfile.closed') : t('doctorProfile.closedZh'))}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {clinic && (
          <div className="flex gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-base"
              onClick={() => navigate(`/clinic/${clinic.id}`)}
            >
              {language === 'en' ? t('doctorProfile.viewClinic') : t('doctorProfile.viewClinicZh')}
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
