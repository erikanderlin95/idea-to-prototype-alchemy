import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AfterlifeCard from "@/components/AfterlifeCard";
import { Button } from "@/components/ui/button";
import PartnerIntakeDialog from "@/components/intake/PartnerIntakeDialog";
import { Heart, Flower2, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AfterlifeServicesPage = () => {
  const { t } = useLanguage();
  const [partnerOpen, setPartnerOpen] = useState(false);

  const providers = [
    {
      slug: "nirvana",
      name: "Nirvana",
      subtitle: t("afterlife.badge"),
      description: t("afterlife.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — soft lavender gradient with gentle rays */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EEF8] via-[#FAF7FC] to-white" />
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#E8D5F5]/40 via-transparent to-transparent rounded-full blur-3xl" />
        {/* Gentle gold accent ray */}
        <div className="absolute top-12 right-1/4 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/8 to-transparent rounded-full blur-2xl" />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0E6F8]/60 text-[#9B7DB8] mb-6 border border-[#E0D0ED]/50 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A84C]/70" />
            <span className="text-sm font-medium tracking-wide">ClynicQ Partners</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-4 tracking-tight">
            {t("afterlife.title")}
          </h1>
          <p className="text-[16px] md:text-lg text-[#7A6B8A] max-w-2xl mx-auto leading-relaxed mb-6">
            {t("afterlife.desc")}
          </p>
          <Button
            variant="outline"
            className="gap-2 font-semibold border-[#9B7DB8]/30 text-[#9B7DB8] hover:bg-[#9B7DB8]/10 hover:text-[#9B7DB8]"
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
        partnerType="afterlife_provider"
        title="Partner With Us"
        description="Offer afterlife and pre-planning services through ClynicQ. Share your details and we'll reach out."
        accentClassName="bg-[#9B7DB8] hover:bg-[#8A6BAA] text-white"
      />

      {/* Provider cards */}
      <section className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <AfterlifeCard
                key={provider.slug}
                slug={provider.slug}
                name={provider.name}
                subtitle={provider.subtitle}
                description={provider.description}
                icon={
                  <div className="flex flex-col items-center gap-0.5">
                    <Flower2 className="h-7 w-7 text-[#9B7DB8]" />
                    <span className="text-[7px] font-bold text-[#9B7DB8] tracking-wider uppercase">NVN</span>
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

export default AfterlifeServicesPage;