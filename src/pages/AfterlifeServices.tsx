import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AfterlifeCard from "@/components/AfterlifeCard";
import { Button } from "@/components/ui/button";
import PartnerIntakeDialog from "@/components/intake/PartnerIntakeDialog";
import { Heart, Flower2, Shield, Sparkles, ArrowRight, Link as LinkIcon, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import drKhwajaAsif from "@/assets/dr-khwaja-asif.jpg.asset.json";

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

      {/* 24/7 CCOD Doctor — above provider cards */}
      <section className="py-6 px-4">
        <div className="max-w-[380px] mx-auto w-full">
          <div className="rounded-2xl border border-[#E8DDF0] bg-white/90 shadow-[0_4px_20px_rgba(45,27,78,0.06)] p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0E6F8] text-[#7A6093] text-[11px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366]/70 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                </span>
                24/7
              </span>
              <h2 className="text-[17px] font-bold text-[#2D1B4E]">{t("afterlife.ccod.title")}</h2>
            </div>

            <p className="text-[13px] text-[#7A6B8A] leading-snug mb-4">
              {t("afterlife.ccod.desc")}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-[#E8DDF0] shrink-0 bg-[#F5EEF8]">
                <img
                  src={drKhwajaAsif.url}
                  alt={t("afterlife.ccod.doctorName")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-[#2D1B4E] truncate">
                  {t("afterlife.ccod.doctorName")}
                </p>
                <p className="text-[13px] text-[#8A7A9A] truncate">
                  {t("afterlife.ccod.clinicName")}
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/6597713608"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("afterlife.ccod.whatsappAria")}
              className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white font-medium text-[14px] transition-all active:scale-[0.97] shadow-[0_2px_8px_rgba(37,211,102,0.25)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.588 5.931L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

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
