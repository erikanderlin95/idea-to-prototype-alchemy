import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import {
  Building2,
  ArrowRight,
  ClipboardList,
  Users,
  MessageCircle,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Activity,
  User,
} from "lucide-react";

interface Concierge {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
}

const SERVICES = [
  "org.service.general",
  "org.service.chronic",
  "org.service.specialist",
  "org.service.preventive",
];

const OrganizationProfile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [concierges, setConcierges] = useState<Concierge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  useEffect(() => {
    const fetchConcierges = async () => {
      const { data } = await supabase
        .from("consultants")
        .select("id, name, title, photo_url, short_bio")
        .eq("is_active", true)
        .order("name");
      if (data) setConcierges(data);
      setLoading(false);
    };
    fetchConcierges();
  }, []);

  const scrollToServices = () => {
    document.getElementById("org-services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* SECTION A — HERO */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left — Logo */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-white ring-2 ring-primary/20 flex items-center justify-center p-4 shadow-sm">
                <div className="flex flex-col items-center gap-1">
                  <Building2 className="h-14 w-14 text-primary" />
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase">NYMG</span>
                </div>
              </div>
            </div>

            {/* Right — Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t("org.name")}
              </h1>
              <p className="text-muted-foreground mb-6 max-w-xl">
                {t("org.heroIntro")}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button size="lg" onClick={() => setShowIntakeModal(true)}>
                  <ClipboardList className="mr-2 h-5 w-5" />
                  {t("org.startConsultation")}
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToServices}>
                  {t("org.viewServices")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — ABOUT */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            {t("org.aboutTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("org.aboutBody")}
          </p>
        </div>
      </section>

      {/* SECTION C — HOW IT WORKS */}
      <section className="py-14 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            {t("org.howItWorksTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ClipboardList, step: "1", titleKey: "org.step1Title", descKey: "org.step1Desc" },
              { icon: Users, step: "2", titleKey: "org.step2Title", descKey: "org.step2Desc" },
              { icon: MessageCircle, step: "3", titleKey: "org.step3Title", descKey: "org.step3Desc" },
            ].map((item) => (
              <Card key={item.step} className="text-center border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("org.stepLabel")} {item.step}
                  </Badge>
                  <h3 className="font-semibold text-foreground">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D — MEDICAL CONCIERGE TEAM */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            {t("org.conciergeTitle")}
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : concierges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concierges.map((person) => (
                <Card key={person.id} className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-muted ring-2 ring-primary/20">
                      {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                          <User className="h-8 w-8 text-primary/60" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{person.name}</h3>
                      <p className="text-xs text-muted-foreground">{person.title}</p>
                    </div>
                    {person.short_bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{person.short_bio}</p>
                    )}
                    <Button
                      size="sm"
                      className="w-full mt-auto"
                      onClick={() => setShowIntakeModal(true)}
                    >
                      {t("org.connect")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">{t("org.noConcierges")}</p>
          )}
        </div>
      </section>

      {/* SECTION F — SERVICES OVERVIEW */}
      <section id="org-services" className="py-14 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            {t("org.servicesTitle")}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {SERVICES.map((key) => (
              <Badge key={key} variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary gap-2">
                {key === "org.service.general" && <Stethoscope className="h-4 w-4" />}
                {key === "org.service.chronic" && <HeartPulse className="h-4 w-4" />}
                {key === "org.service.specialist" && <ShieldCheck className="h-4 w-4" />}
                {key === "org.service.preventive" && <Activity className="h-4 w-4" />}
                {t(key)}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Intake Modal (Section E) */}
      <ManagedCareModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        clinicName="Nanyang Medical Group"
        source="organization_profile"
      />

      <Footer />
    </div>
  );
};

export default OrganizationProfile;
