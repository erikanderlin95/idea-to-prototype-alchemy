import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AfterlifeCard from "@/components/AfterlifeCard";
import { Heart, Flower2, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AfterlifeServicesPage = () => {
  const { t } = useLanguage();

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
            <span className="text-sm font-medium tracking-wide">{t("afterlife.badge")}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-4 tracking-tight">
            {t("afterlife.title")}
          </h1>
          <p className="text-[16px] md:text-lg text-[#7A6B8A] max-w-2xl mx-auto leading-relaxed">
            {t("afterlife.desc")}
          </p>
        </div>
      </section>

      {/* Value pillars */}
      <section className="py-8 px-4 border-b border-[#E8DDF0]/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Heart, label: t("afterlife.compassionateCare"), desc: t("afterlife.compassionateCareDesc") },
              { icon: Shield, label: t("afterlife.prePlanning"), desc: t("afterlife.prePlanningDesc") },
              { icon: Flower2, label: t("afterlife.familySupport"), desc: t("afterlife.familySupportDesc") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#FAF7FC] to-[#F5EEF8]/50 border border-[#E8DDF0]/40">
                <div className="p-2.5 rounded-full bg-gradient-to-br from-[#F0E6F8] to-[#E8D5F5] shadow-sm">
                  <item.icon className="h-5 w-5 text-[#9B7DB8]" />
                </div>
                <div>
                  <p className="font-medium text-[#2D1B4E]">{item.label}</p>
                  <p className="text-sm text-[#8A7A9A]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider cards */}
      <section className="py-14 px-4">
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