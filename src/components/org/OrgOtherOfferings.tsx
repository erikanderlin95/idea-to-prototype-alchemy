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
    <section className="py-6 px-4">
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-bold text-[#5F6F7E] tracking-tight">
            {t("org.otherOfferings")}
          </h2>
          <p className="text-[14px] text-[#5F6F7E]/70 mt-0.5">
            {t("org.otherOfferingsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {offerings.map((o) => (
            <div
              key={o.titleKey}
              className="rounded-xl bg-[#FAFCFD] border border-[#E8EEF2] p-3.5 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F0F5FA] flex items-center justify-center">
                  <o.icon className="h-3.5 w-3.5 text-[#5F6F7E]" />
                </div>
                <h3 className="text-[15px] font-semibold text-[#12385B]">
                  {t(o.titleKey)}
                </h3>
              </div>
              <p className="text-[13px] text-[#5F6F7E] leading-relaxed">
                {t(o.descKey)}
              </p>
              <span className="inline-flex items-center self-start mt-1 px-2.5 py-1 rounded-full bg-[#F0F5FA] text-[12px] font-medium text-[#5F6F7E] cursor-default">
                {t("org.contactCoordinator")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
