import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock } from "lucide-react";

const SeniorDayCarePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-16 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EEF8] via-[#FAF7FC] to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#E8D5F5]/40 via-transparent to-transparent rounded-full blur-3xl" />

        <div className="max-w-2xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0E6F8]/60 text-[#9B7DB8] mb-3 border border-[#E0D0ED]/50 backdrop-blur-sm">
            <span className="text-base">🧓</span>
            <span className="text-sm font-medium tracking-wide">ClynicQ Partners</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-3 tracking-tight">
            {t("sidebar.section.seniorDayCare")}
          </h1>
          <p className="text-[16px] md:text-lg text-[#7A6B8A] max-w-xl mx-auto leading-relaxed">
            Day care services, senior activities and respite support for older adults and caregivers — coming soon.
          </p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-[380px] mx-auto w-full">
          <div className="rounded-lg border border-[#E8DDF0] bg-white/90 shadow-[0_4px_20px_rgba(45,27,78,0.06)] p-6 text-center overflow-hidden">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#F0E6F8] text-[#9B7DB8] mb-3">
              <Clock className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-[#2D1B4E] mb-1">Coming Soon</h2>
            <p className="text-[13px] text-[#7A6B8A] leading-snug">
              We are working with senior day care providers to list their services on ClynicQ. Check back soon.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeniorDayCarePage;
