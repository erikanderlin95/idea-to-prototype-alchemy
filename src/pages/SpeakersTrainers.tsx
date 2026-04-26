import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SpeakerCard from "@/components/SpeakerCard";
import { Button } from "@/components/ui/button";
import { Mic, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const SpeakersTrainers = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const speakers = [
    {
      slug: "ouch-pte-ltd",
      name: "Ouch Pte Ltd",
      subtitle: t("speakerProfile.badge"),
      speakerName: "Hui Fang",
      description: t("speakerProfile.heroDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-12 px-4 overflow-hidden bg-gradient-to-br from-ai-purple/10 via-background to-ai-cyan/10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 bg-ai-purple pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25 bg-ai-cyan pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block text-[10.5px] font-semibold tracking-[0.16em] uppercase mb-3 px-3 py-1 rounded-full bg-ai-purple/10 text-ai-purple border border-ai-purple/20">
            ClynicQ Partners
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
            Healthcare Speakers & Trainers
          </h1>
          <p className="text-[15px] md:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore partners who run wellness talks and programs through ClynicQ. Join an upcoming session or invite them to your community.
          </p>
          <Button
            variant="outline"
            className="gap-2 font-semibold border-ai-purple/30 hover:bg-ai-purple/5"
            onClick={() => navigate("/for-clinics")}
          >
            For Providers: Partner With Us
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="py-8 px-4 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-[#FDF2E0]">
                <Mic className="h-5 w-5 text-[#D4860A]" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t("speakers.expertSpeakers")}</p>
                <p className="text-sm text-muted-foreground">{t("speakers.expertSpeakersDesc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-[#FDF2E0]">
                <Sparkles className="h-5 w-5 text-[#D4860A]" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t("speakers.customProgrammes")}</p>
                <p className="text-sm text-muted-foreground">{t("speakers.customProgrammesDesc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-[#FDF2E0]">
                <Mic className="h-5 w-5 text-[#D4860A]" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t("speakers.corporateCommunity")}</p>
                <p className="text-sm text-muted-foreground">{t("speakers.corporateCommunityDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
              <SpeakerCard
                key={speaker.slug}
                slug={speaker.slug}
                name={speaker.name}
                subtitle={speaker.subtitle}
                speakerName={speaker.speakerName}
                description={speaker.description}
                color="#D4860A"
                colorLight="#FDF2E0"
                colorBorder="#D4B07A"
                icon={
                  <div className="flex flex-col items-center gap-0.5">
                    <Mic className="h-7 w-7 text-[#D4860A]" />
                    <span className="text-[7px] font-bold text-[#D4860A] tracking-wider uppercase">OUCH</span>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpeakersTrainers;