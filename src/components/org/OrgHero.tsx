import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Network, Stethoscope, Shield, ClipboardList, UserCheck, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrgHeroProps {
  onStartIntake?: () => void;
}

export const OrgHero = ({ onStartIntake }: OrgHeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="pt-24 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F4F8FB]" />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-3 space-y-3">
            <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#DCE8EF]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#12385B] to-[#1a4a72] flex items-center justify-center shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">{t("org.subtitle")}</span>
            </div>

            <h1 className="text-[2.75rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
              {t("org.name")}
            </h1>

            <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
              {t("org.heroDesc")}
            </p>

            <p className="text-[18px] font-bold text-[#12385B]">
              {t("org.heroSubline")}
            </p>


            <div className="flex items-center gap-0 pt-1 flex-wrap">
              <div className="flex items-center gap-2 rounded-lg bg-[#E6F7FA] px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#18B7C9]/20 flex items-center justify-center text-[#18B7C9]">
                  <ClipboardList className="h-3 w-3" />
                </div>
                <span className="text-[15px] font-bold text-[#12385B]">{t("org.oneEntry")}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#18B7C9]/40 mx-1 flex-shrink-0" />
              <div className="flex items-center gap-2 rounded-lg bg-[#E6F7FA] px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#18B7C9]/20 flex items-center justify-center text-[#18B7C9]">
                  <UserCheck className="h-3 w-3" />
                </div>
                <span className="text-[15px] font-bold text-[#12385B]">{t("org.weMatchYou")}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#18B7C9]/40 mx-1 flex-shrink-0" />
              <div className="flex items-center gap-2 rounded-lg bg-[#E6F7FA] px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#18B7C9]/20 flex items-center justify-center text-[#18B7C9]">
                  <MessageCircle className="h-3 w-3" />
                </div>
                <span className="text-[15px] font-bold text-[#12385B]">{t("org.weFollowUp")}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-[#DCE8EF] shadow-[0_8px_32px_rgba(18,56,91,0.12)] overflow-hidden">
              <div className="px-5 py-3 bg-[#F0F5FA] border-b border-[#DCE8EF]">
                <span className="text-[15px] font-bold text-[#12385B] uppercase tracking-widest">{t("org.networkCapabilities")}</span>
              </div>

              <div className="p-3 space-y-0.5">
                <CapabilityChip icon={<Network className="h-4 w-4" />} label={t("org.clinicNetwork")} />
                <CapabilityChip icon={<Stethoscope className="h-4 w-4" />} label={t("org.specialistAccess")} />
                <CapabilityChip icon={<Shield className="h-4 w-4" />} label={t("org.coverageSupport")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#E6F7FA] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[#E6F7FA] flex items-center justify-center text-[#18B7C9] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-semibold text-[#12385B] leading-tight">{label}</p>
  </div>
);
