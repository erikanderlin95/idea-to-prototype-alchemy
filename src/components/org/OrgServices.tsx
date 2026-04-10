import { Stethoscope, HeartPulse, ShieldCheck, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const OrgServices = () => {
  const { t } = useLanguage();

  const SERVICES = [
    { icon: Stethoscope, labelKey: "org.service.general" },
    { icon: HeartPulse, labelKey: "org.service.chronic" },
    { icon: ShieldCheck, labelKey: "org.service.specialist" },
    { icon: Activity, labelKey: "org.service.preventive" },
  ];

  return (
    <section id="org-services" className="py-6 px-4 bg-[#FAFCFD]">
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
            {t("org.availableCareAreas")}
          </p>
          <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight mt-0.5">
            {t("org.carePathways")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {SERVICES.map((s) => (
            <div
              key={s.labelKey}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#DCE8EF] shadow-[0_1px_6px_rgba(18,56,91,0.06)] hover:shadow-[0_3px_12px_rgba(24,183,201,0.1)] hover:border-[#18B7C9]/30 transition-all duration-200 cursor-default"
            >
              <div className="w-7 h-7 rounded-md bg-[#E6F7FA] flex items-center justify-center">
                <s.icon className="h-4 w-4 text-[#18B7C9]" />
              </div>
              <span className="text-[15px] font-semibold text-[#12385B]">{t(s.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
