import { UserCheck, CalendarClock, Receipt, HeartPulse, Plane, ShieldAlert, FileText, Users, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  { icon: UserCheck, titleKey: "org.svc.referral", textKey: "org.svc.referralDesc" },
  { icon: CalendarClock, titleKey: "org.svc.booking", textKey: "org.svc.bookingDesc" },
  { icon: Receipt, titleKey: "org.svc.insurance", textKey: "org.svc.insuranceDesc" },
  { icon: HeartPulse, titleKey: "org.svc.screening", textKey: "org.svc.screeningDesc" },
  { icon: Plane, titleKey: "org.svc.travel", textKey: "org.svc.travelDesc" },
  { icon: ShieldAlert, titleKey: "org.svc.evacuation", textKey: "org.svc.evacuationDesc" },
  { icon: FileText, titleKey: "org.svc.results", textKey: "org.svc.resultsDesc" },
  { icon: Users, titleKey: "org.svc.secondOpinion", textKey: "org.svc.secondOpinionDesc" },
  { icon: Activity, titleKey: "org.svc.postOp", textKey: "org.svc.postOpDesc" },
];

export const OrgServicesGrid = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-3 pb-6 px-3 bg-[#F4F8FB]">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="w-20 mx-auto border-t border-[#DCE8EF] mb-1" />
        <div className="text-center space-y-1">
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
            {t("org.svc.title")}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
            {t("org.svc.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {services.map((s) => (
            <div
              key={s.titleKey}
              className="rounded-xl bg-[#FAFCFD] border border-[#E8EEF3] p-3.5 flex items-start gap-3 hover:shadow-[0_3px_12px_rgba(24,183,201,0.08)] hover:border-[#18B7C9]/25 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E6F7FA] flex items-center justify-center shrink-0 mt-0.5">
                <s.icon className="h-4 w-4 text-[#18B7C9]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-bold text-[#12385B] leading-snug">{t(s.titleKey)}</h3>
                <p className="text-[12px] text-[#5F6F7E] leading-snug mt-0.5">{t(s.textKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
