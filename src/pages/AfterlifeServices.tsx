import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AfterlifeCard from "@/components/AfterlifeCard";
import { Flower2, Sparkles, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import drKhwajaAsif from "@/assets/dr-khwaja-asif.jpg.asset.json";

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
      <section className="relative pt-16 pb-8 px-4 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EEF8] via-[#FAF7FC] to-white" />
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#E8D5F5]/40 via-transparent to-transparent rounded-full blur-3xl" />
        {/* Gentle gold accent ray */}
        <div className="absolute top-12 right-1/4 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/8 to-transparent rounded-full blur-2xl" />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0E6F8]/60 text-[#9B7DB8] mb-3 border border-[#E0D0ED]/50 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A84C]/70" />
            <span className="text-sm font-medium tracking-wide">ClynicQ Partners</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-2 tracking-tight">
            {t("afterlife.title")}
          </h1>
          <p className="text-[16px] md:text-lg text-[#7A6B8A] max-w-2xl mx-auto leading-relaxed">
            {t("afterlife.desc")}
          </p>
        </div>
      </section>

      {/* Provider cards */}
      <section className="py-3 px-4">
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

          {/* Compact blog preview — secondary to the provider card */}
          <div className="max-w-[380px] mx-auto w-full mt-3">
            <a
              href="https://www.nirvanalife.com.sg/why-nirvana-partners-with-healthcare-professionals-singapore-2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-stretch gap-2.5 rounded-lg border border-[#E8DDF0] bg-white/80 p-2 hover:bg-white hover:border-[#DDD0EA] transition-colors"
            >
              <img
                src="https://www.nirvanalife.com.sg/wp-content/uploads/2026/07/Why-Nirvana-Memorial-Garden-Partners-with-Healthcare-Professionals-Singapore-2026.png"
                alt="Nirvana Memorial Garden partnering with healthcare professionals in Singapore"
                loading="lazy"
                className="w-[76px] h-[56px] rounded-md object-cover shrink-0"
              />
              <div className="min-w-0 flex flex-col justify-center">
                <p className="text-[12px] font-semibold text-[#2D1B4E] leading-snug line-clamp-2">
                  Why Nirvana Memorial Garden Partners With Healthcare Professionals In Singapore (2026)
                </p>
                <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-[#8A7A9A]">
                  <LinkIcon className="h-2.5 w-2.5" />
                  nirvanalife.com.sg
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default AfterlifeServicesPage;
