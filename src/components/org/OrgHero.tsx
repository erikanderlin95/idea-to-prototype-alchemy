import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, ClipboardList, UserCheck, MessageCircle, ChevronRight } from "lucide-react";
import healthcareConsultation from "@/assets/healthcare-consultation.jpg";
import healthcareClinic from "@/assets/healthcare-clinic.jpg";
import healthcareCoordination from "@/assets/healthcare-coordination.jpg";
import healthcarePatient from "@/assets/healthcare-patient.jpg";

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
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-2 items-stretch">
              {/* Stats box - left */}
              <div className="rounded-3xl bg-gradient-to-br from-[#F6F9FC] to-[#EDF3F8] border border-[#DCE8EF] shadow-[0_8px_32px_rgba(18,56,91,0.12)] overflow-hidden flex flex-col">
                <div className="px-4 py-3.5 bg-gradient-to-br from-[#E0EAF3] to-[#EDF3F8] border-b border-[#D0DCE6]">
                  <h3 className="text-[17px] md:text-lg font-bold text-[#12385B] tracking-tight leading-snug text-left">Your Trusted Guide to Private Healthcare in Singapore</h3>
                  <p className="text-[11px] md:text-[12px] text-[#5F6F7E] mt-1 leading-tight text-left">Access trusted clinics, coordinated care, and seamless referrals — all in one place.</p>
                </div>
                <div className="p-2.5 grid grid-cols-2 gap-0 flex-1 items-center">
                  <div className="border-r border-b border-[#DCE8EF]/60 py-2 px-1">
                    <TrustStat value="10,000+" label="Patients Assisted" />
                  </div>
                  <div className="border-b border-[#DCE8EF]/60 py-2 px-1">
                    <TrustStat value="100+" label="Specialist Partners" />
                  </div>
                  <div className="border-r border-[#DCE8EF]/60 py-2 px-1">
                    <TrustStat value="24/7" label="Concierge Support" />
                  </div>
                  <div className="py-2 px-1">
                    <TrustStat value="4.9 ★" label="Patient Rating" />
                  </div>
                </div>
              </div>

              {/* Photo grid - right */}
              <div className="grid grid-cols-2 gap-1.5 rounded-3xl overflow-hidden">
                <div className="relative overflow-hidden rounded-xl">
                  <img src={healthcareConsultation} alt="Doctor consultation" className="w-full h-full object-cover aspect-square" loading="lazy" width={640} height={640} />
                  <div className="absolute inset-0 bg-[#12385B]/10 mix-blend-multiply" />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img src={healthcareClinic} alt="Modern clinic interior" className="w-full h-full object-cover aspect-square" loading="lazy" width={640} height={640} />
                  <div className="absolute inset-0 bg-[#12385B]/10 mix-blend-multiply" />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img src={healthcareCoordination} alt="Care coordination" className="w-full h-full object-cover aspect-square" loading="lazy" width={640} height={640} />
                  <div className="absolute inset-0 bg-[#12385B]/10 mix-blend-multiply" />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img src={healthcarePatient} alt="Patient care" className="w-full h-full object-cover aspect-square" loading="lazy" width={640} height={640} />
                  <div className="absolute inset-0 bg-[#12385B]/10 mix-blend-multiply" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-[#12385B]">{value}</p>
    <p className="text-[11px] text-[#5F6F7E] font-medium mt-0.5">{label}</p>
  </div>
);
