import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SpeakerCard from "@/components/SpeakerCard";
import { Button } from "@/components/ui/button";
import PartnerIntakeDialog from "@/components/intake/PartnerIntakeDialog";

import { Mic, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpeakersTrainers = () => {
  const { t } = useLanguage();
  const [partnerOpen, setPartnerOpen] = useState(false);

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

      <section className="relative pt-24 pb-12 px-4 overflow-hidden bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE]">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-40 bg-[#0EA5E9] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 bg-[#7DD3FC] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block text-[10.5px] font-semibold tracking-[0.16em] uppercase mb-3 px-3 py-1 rounded-full bg-[#0EA5E9]/10 text-[#0369A1] border border-[#0EA5E9]/25">
            ClynicQ Partners
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
            Corporate & Community Health
          </h1>
          <p className="text-[15px] md:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore partners delivering corporate wellness, community health initiatives, wellness talks, healthcare education, and support services through ClynicQ.
          </p>
          <Button
            variant="outline"
            className="gap-2 font-semibold border-[#0EA5E9]/30 text-[#0369A1] hover:bg-[#0EA5E9]/10 hover:text-[#0369A1]"
            onClick={() => setPartnerOpen(true)}
          >
            For Providers: Partner With Us
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <PartnerIntakeDialog
        open={partnerOpen}
        onOpenChange={setPartnerOpen}
        partnerType="speaker_trainer"
        title="Partner With Us"
        description="Partner with ClynicQ on corporate wellness, community health, and healthcare education. Share your details and we'll reach out."
        accentClassName="bg-[#0EA5E9] hover:bg-[#0284C7] text-white"
      />

      <section className="py-6 px-4">
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