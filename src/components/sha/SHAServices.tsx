import { Stethoscope, HeartPulse, ShieldCheck, Activity, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SHAServices = () => {
  const { t } = useLanguage();

  const SERVICES = [
    { icon: Stethoscope, labelKey: "sha.generalPractice" },
    { icon: HeartPulse, labelKey: "sha.chronicDisease" },
    { icon: ShieldCheck, labelKey: "sha.specialistReferral" },
    { icon: Activity, labelKey: "sha.rehabilitation" },
    { icon: Brain, labelKey: "sha.mentalWellness" },
  ];

  return (
    <section id="sha-services" className="py-6 px-4">
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
            {t("sha.availableCareAreas")}
          </p>
          <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight mt-0.5">
            {t("sha.carePathways")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {SERVICES.map((s) => (
            <div
              key={s.labelKey}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#DCE8EF] shadow-[0_1px_4px_rgba(18,56,91,0.05)] hover:shadow-[0_3px_12px_rgba(74,127,193,0.1)] hover:border-[#4A7FC1]/30 transition-all duration-200 cursor-default"
            >
              <div className="w-7 h-7 rounded-md bg-[#E8EFF8] flex items-center justify-center">
                <s.icon className="h-4 w-4 text-[#4A7FC1]" />
              </div>
              <span className="text-[15px] font-semibold text-[#12385B]">{t(s.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};