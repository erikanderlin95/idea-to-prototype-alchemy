import { UserCheck, Receipt, HeartPulse, Plane, ShieldAlert, FileText, Users, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  { icon: UserCheck, titleKey: "org.svc.referral", textKey: "org.svc.referralDesc" },
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
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="w-20 mx-auto border-t border-[#C8D5E0] mb-1" />
        <div className="text-center space-y-1">
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#0D2E4A] tracking-tight">
            {t("org.svc.title")}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#4A5D6E] max-w-2xl mx-auto">
            {t("org.svc.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {services.map((s) => (
            <div
              key={s.titleKey}
              className="rounded-xl bg-white border border-[#D8E4ED] p-3.5 flex items-start gap-3 shadow-[0_1px_4px_rgba(13,46,74,0.04)] hover:shadow-[0_6px_20px_rgba(14,154,171,0.1)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E6F7FA] to-[#D4F1F5] flex items-center justify-center shrink-0 mt-0.5">
                <s.icon className="h-4 w-4 text-[#0E9AAB]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-bold text-[#0D2E4A] leading-snug">{t(s.titleKey)}</h3>
                <p className="text-[12px] text-[#4A5D6E] leading-snug mt-0.5">{t(s.textKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
