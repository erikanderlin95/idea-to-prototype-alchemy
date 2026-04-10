import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const OrgWhyConcierge = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
              {t("org.whyConciergeTitle")}
            </h2>
            <p className="text-[17px] text-[#5F6F7E] leading-relaxed max-w-lg">
              {t("org.whyConciergeDesc")}
            </p>
            <ul className="space-y-1.5 pl-1">
              {[t("org.whyConcierge.oneIntake"), t("org.whyConcierge.guidedMatching"), t("org.whyConcierge.continuousFollowUp")].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[17px] text-[#12385B]">
                  <Check className="h-4 w-4 text-[#18B7C9] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              {t("org.careComparison")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#DCE8EF] bg-white p-3.5 space-y-2">
                <h3 className="text-[16px] font-bold text-[#5F6F7E]">{t("org.unstructured")}</h3>
                <ul className="space-y-1">
                  {[t("org.unstructured.multipleEntry"), t("org.unstructured.noProvider"), t("org.unstructured.manualCoord"), t("org.unstructured.fragmented")].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] text-[#5F6F7E]">
                      <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#18B7C9]/20 bg-[#E6F7FA] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(24,183,201,0.1)]">
                <h3 className="text-[16px] font-bold text-[#12385B]">{t("org.nanyangModel")}</h3>
                <ul className="space-y-1">
                  {[t("org.nanyang.singleEntry"), t("org.nanyang.guidedMatching"), t("org.nanyang.structuredHandoff"), t("org.nanyang.continuousCare")].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#18B7C9]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};