import { Mic, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const OrgOtherOfferings = () => {
  const { t } = useLanguage();

  const offerings = [
    {
      icon: Mic,
      titleKey: "org.offering.talks.title",
      descKey: "org.offering.talks.desc",
    },
    {
      icon: MapPin,
      titleKey: "org.offering.space.title",
      descKey: "org.offering.space.desc",
    },
  ];

  return (
    <section className="py-6 px-4 bg-white">
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="text-center space-y-1">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#4A5D6E]">
            {t("org.otherOfferingsSubtitle")}
          </p>
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#0D2E4A] tracking-tight">
            Additional Services Available Within the Network
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {offerings.map((o) => (
            <div
              key={o.titleKey}
              className="rounded-xl bg-[#F8FAFB] border border-[#D8E4ED] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_4px_rgba(13,46,74,0.04)] hover:shadow-[0_4px_16px_rgba(14,154,171,0.08)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E6F7FA] to-[#D4F1F5] flex items-center justify-center">
                  <o.icon className="h-3.5 w-3.5 text-[#0E9AAB]" />
                </div>
                <h3 className="text-[15px] font-semibold text-[#0D2E4A]">
                  {t(o.titleKey)}
                </h3>
              </div>
              <p className="text-[13px] text-[#4A5D6E] leading-relaxed">
                {t(o.descKey)}
              </p>
              <span className="inline-flex items-center self-start mt-1 px-2.5 py-1 rounded-full bg-[#EDF3F8] text-[12px] font-medium text-[#4A5D6E] cursor-default hover:bg-[#E0EBF3] transition-colors">
                {t("org.contactCoordinator")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
