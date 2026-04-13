import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SpeakerCard from "@/components/SpeakerCard";
import { Mic, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpeakersTrainers = () => {
  const { t } = useLanguage();

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

      <section className="relative pt-24 pb-12 px-4 bg-gradient-to-br from-[#FEF6ED] via-background to-[#FFF8F0]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF2E0] text-[#D4860A] mb-6">
            <Mic className="h-4 w-4" />
            <span className="text-sm font-medium">{t("speakers.badge")}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("speakers.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("speakers.desc")}
          </p>
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