import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  ArrowLeft,
  MessageCircle,
  Briefcase,
  Users,
  Building2,
  CheckCircle,
  Star,
  MapPin,
} from "lucide-react";

interface Consultant {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
  full_bio: string | null;
  areas_of_focus: string[];
  services_offered: string[];
  patient_types: string[];
}

interface RecommendedClinic {
  id: string;
  name: string;
  type: string;
  address: string;
  rating: number | null;
}

const ConsultantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [recommendedClinics, setRecommendedClinics] = useState<RecommendedClinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      // Fetch consultant
      const { data: consultantData, error: consultantError } = await supabase
        .from("consultants")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (!consultantError && consultantData) {
        setConsultant(consultantData);

        // Fetch recommended clinics
        const { data: recommendations } = await supabase
          .from("consultant_clinic_recommendations")
          .select("clinic_id")
          .eq("consultant_id", id);

        if (recommendations && recommendations.length > 0) {
          const clinicIds = recommendations.map((r) => r.clinic_id);
          const { data: clinicsData } = await supabase
            .from("clinics")
            .select("id, name, type, address, rating")
            .in("id", clinicIds);

          if (clinicsData) {
            setRecommendedClinics(clinicsData);
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t("consultant.notFound")}
          </h1>
          <Button onClick={() => navigate("/consultants")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("consultant.backToList")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/consultants")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("consultant.backToList")}
          </Button>

          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted ring-4 ring-background shadow-lg flex-shrink-0">
                  {consultant.photo_url ? (
                    <img
                      src={consultant.photo_url}
                      alt={consultant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                      <User className="h-16 w-16 text-primary/60" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {consultant.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    {consultant.title}
                  </p>

                  {/* Areas of Focus */}
                  {consultant.areas_of_focus && consultant.areas_of_focus.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {consultant.areas_of_focus.map((area, index) => (
                        <Badge
                          key={index}
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <Button size="lg" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {t("consultant.getGuidance")}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              {consultant.full_bio && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      {t("consultant.about")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {consultant.full_bio}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Services Offered */}
              {consultant.services_offered && consultant.services_offered.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {t("consultant.services")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {consultant.services_offered.map((service, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Patient Types */}
              {consultant.patient_types && consultant.patient_types.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      {t("consultant.patientTypes")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {consultant.patient_types.map((type, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{type}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("consultant.needHelp")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("consultant.needHelpDesc")}
                  </p>
                  <Button className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {t("consultant.speakToConsultant")}
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Clinics */}
              {recommendedClinics.length > 0 && (
                <Card>
                  <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-5 w-5 text-primary" />
                      {t("consultant.recommendedClinics")}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {t("consultant.recommendedBy").replace("{name}", consultant.name)}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recommendedClinics.map((clinic) => (
                      <div
                        key={clinic.id}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => navigate(`/clinic/${clinic.id}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {clinic.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {clinic.type}
                            </p>
                          </div>
                          {clinic.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-medium">
                                {clinic.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground truncate">
                            {clinic.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsultantProfile;
