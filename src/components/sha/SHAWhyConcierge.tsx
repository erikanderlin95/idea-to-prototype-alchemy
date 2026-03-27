import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SHAWhyConcierge = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
              {t("sha.specialistDisciplines")}
            </h2>
            <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
              {t("sha.specialistDesc")}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              {t("sha.keyProcedures")}
            </p>
            <ul className="space-y-1.5 pl-1">
              {[
                t("sha.procedure1"),
                t("sha.procedure2"),
                t("sha.procedure3"),
                t("sha.procedure4"),
                t("sha.procedure5"),
                t("sha.procedure6"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#4A7FC1]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};