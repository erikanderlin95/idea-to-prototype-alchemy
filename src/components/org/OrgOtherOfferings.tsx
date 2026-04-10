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
    <section className="py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#12385B] tracking-tight">
            {t("org.otherOfferings")}
          </h2>
          <p className="text-[15px] text-[#5F6F7E] mt-0.5">
            {t("org.otherOfferingsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {offerings.map((o) => (
            <div
              key={o.titleKey}
              className="rounded-xl bg-white border border-[#DCE8EF] shadow-[0_1px_4px_rgba(18,56,91,0.05)] p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F0F5FA] flex items-center justify-center">
                  <o.icon className="h-4 w-4 text-[#5F6F7E]" />
                </div>
                <h3 className="text-[16px] font-semibold text-[#12385B]">
                  {t(o.titleKey)}
                </h3>
              </div>
              <p className="text-[14px] text-[#5F6F7E] leading-relaxed">
                {t(o.descKey)}
              </p>
              <span className="inline-flex items-center self-start mt-1 px-3 py-1.5 rounded-full bg-[#F0F5FA] text-[13px] font-medium text-[#5F6F7E] cursor-default">
                {t("org.contactCoordinator")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
