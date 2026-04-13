import { Stethoscope, Languages, DollarSign, UserCheck, Clock, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const benefits = [
  { icon: Stethoscope, titleKey: "org.why.directAccess", textKey: "org.why.directAccessDesc" },
  { icon: Languages, titleKey: "org.why.multilingual", textKey: "org.why.multilingualDesc" },
  { icon: DollarSign, titleKey: "org.why.pricing", textKey: "org.why.pricingDesc" },
  { icon: UserCheck, titleKey: "org.why.caseManager", textKey: "org.why.caseManagerDesc" },
  { icon: Clock, titleKey: "org.why.availability", textKey: "org.why.availabilityDesc" },
  { icon: Zap, titleKey: "org.why.turnaround", textKey: "org.why.turnaroundDesc" },
];

const specialties = [
  "Cardiology", "Neurology", "Orthopaedics", "Gastroenterology",
  "Thoracic Surgery", "Urology", "Endocrinology", "Rheumatology",
  "General Surgery", "ENT", "Aesthetics", "Internal Medicine",
  "Oncology", "Ophthalmology",
];

export const OrgWhyConcierge = () => {
  const { t } = useLanguage();

  return (
    <section className="py-6 pb-3 px-3 bg-[#EDF3F8]">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#0D2E4A] tracking-tight">
            {t("org.why.title")}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#4A5D6E] max-w-2xl mx-auto">
            {t("org.why.subtitle")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {benefits.map((b) => (
            <div
              key={b.titleKey}
              className="rounded-xl bg-white border border-[#D8E4ED] p-3 flex flex-col gap-1 shadow-[0_1px_4px_rgba(13,46,74,0.04)] hover:shadow-[0_4px_16px_rgba(14,154,171,0.1)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-1.5">
                <b.icon className="h-4 w-4 text-[#0E9AAB] shrink-0" />
                <h3 className="text-[13px] font-bold text-[#0D2E4A]">{t(b.titleKey)}</h3>
              </div>
              <p className="text-[12px] text-[#4A5D6E] leading-snug">{t(b.textKey)}</p>
            </div>
          ))}
        </div>

        {/* Specialist Coverage */}
        <div className="text-center space-y-2">
          <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#0D2E4A] tracking-tight">
            {t("org.why.coverageTitle")}
          </h3>
          <p className="text-[14px] md:text-[15px] text-[#4A5D6E] max-w-2xl mx-auto">
            {t("org.why.coverageDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto pt-1">
            {specialties.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full bg-white border border-[#D0DCE6] text-[13px] text-[#0D2E4A] font-medium shadow-[0_1px_3px_rgba(13,46,74,0.04)] hover:border-[#0E9AAB]/30 hover:shadow-[0_2px_8px_rgba(14,154,171,0.08)] transition-all duration-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
