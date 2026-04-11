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
    <section className="py-6 px-3 bg-[#F4F8FB]">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
            {t("org.why.title")}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
            {t("org.why.subtitle")}
          </p>
        </div>

        {/* Benefits Grid - full width, 3 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {benefits.map((b) => (
            <div
              key={b.titleKey}
              className="rounded-xl bg-white border border-[#E8EEF3] p-3 flex flex-col gap-1"
            >
              <div className="flex items-center gap-1.5">
                <b.icon className="h-4 w-4 text-[#18B7C9] shrink-0" />
                <h3 className="text-[13px] font-bold text-[#12385B]">{t(b.titleKey)}</h3>
              </div>
              <p className="text-[12px] text-[#5F6F7E] leading-snug">{t(b.textKey)}</p>
            </div>
          ))}
        </div>

        {/* Specialist Coverage */}
        <div className="text-center space-y-2">
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#12385B]">
            {t("org.why.coverageTitle")}
          </h3>
          <p className="text-[12px] text-[#5F6F7E] max-w-2xl mx-auto">
            {t("org.why.coverageDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto">
            {specialties.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full bg-white border border-[#DCE8EF] text-[11px] text-[#12385B] font-medium"
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