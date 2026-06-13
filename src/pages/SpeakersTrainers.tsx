import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SpeakerCard from "@/components/SpeakerCard";
import { Button } from "@/components/ui/button";
import PartnerIntakeDialog from "@/components/intake/PartnerIntakeDialog";

import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import cflLogo from "@/assets/caring-for-life-logo.jpg";

const SpeakersTrainers = () => {
  const { t } = useLanguage();
  const [partnerOpen, setPartnerOpen] = useState(false);

  const speakers = [
    {
      slug: "caring-for-life-sg",
      name: "Caring for Life SG",
      subtitle: "Corporate & Community Health",
      description:
        "Mental wellness programmes, suicide prevention training, public education, and community support resources.",
      logo: cflLogo,
      titleColor: "#2F3A20",
      subtitleColor: "#6B7359",
      descColor: "#3F4A2A",
      ctaGradientFrom: "#7D8D54",
      ctaGradientTo: "#5F6E3E",
      ctaGradientHoverFrom: "#5F6E3E",
      ctaGradientHoverTo: "#4A572E",
      ctaShadow: "0 3px 12px rgba(125,141,84,0.35)",
      ctaShadowHover: "0 5px 18px rgba(125,141,84,0.45)",
      hoverShadow: "0 16px 48px rgba(125,141,84,0.22)",
      baseShadow: "0 6px 24px rgba(125,141,84,0.10)",
    },
    {
      slug: "ouch-pte-ltd",
      name: "Ouch Pte Ltd",
      subtitle: t("speakerProfile.badge"),
      description: t("speakerProfile.heroDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — soft sky gradient mirroring Afterlife structure */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F4FB] via-[#F4FAFD] to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#BFE2F3]/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-12 right-1/4 w-32 h-32 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent rounded-full blur-2xl" />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F2FE]/70 text-[#0369A1] mb-6 border border-[#BAE6FD]/60 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#0EA5E9]/80" />
            <span className="text-sm font-medium tracking-wide">ClynicQ Partners</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0D2E4A] mb-4 tracking-tight">
            Corporate & Community Health
          </h1>
          <p className="text-[16px] md:text-lg text-[#4A6580] max-w-2xl mx-auto leading-relaxed mb-6">
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
              <SpeakerCard key={speaker.slug} {...speaker} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpeakersTrainers;