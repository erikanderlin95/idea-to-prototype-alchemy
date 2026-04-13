import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, ClipboardList, UserCheck, MessageCircle, ChevronRight } from "lucide-react";
import healthcareConsultation from "@/assets/nymg-photo1.jpg";
import healthcareClinic from "@/assets/nymg-photo2.jpg";
import healthcareCoordination from "@/assets/nymg-photo3.jpg";
import healthcarePatient from "@/assets/nymg-photo4.jpg";

interface OrgHeroProps {
  onStartIntake?: () => void;
}

export const OrgHero = ({ onStartIntake }: OrgHeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="pt-24 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#EDF3F8]" />

      <div className="max-w-5xl mx-auto relative space-y-6">
        {/* Hero text - full width */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#DCE8EF]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#12385B] to-[#1a4a72] flex items-center justify-center shadow-sm">
              <Building2 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-[11px] md:text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">{t("org.subtitle")}</span>
          </div>

          <h1 className="text-[2rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#0D2E4A] leading-[1.1] tracking-tight">
            {t("org.name")}
          </h1>

          <p className="text-[18px] text-[#4A5D6E] leading-relaxed max-w-lg">
            {t("org.heroDesc")}
          </p>

          <p className="text-[18px] font-bold text-[#0D2E4A]">
            {t("org.heroSubline")}
          </p>

          <div className="flex items-center gap-0 pt-1 flex-wrap gap-y-1.5">
            <div className="flex items-center gap-1.5 rounded-lg bg-[#E6F7FA] px-2.5 py-1.5 md:px-3 md:py-2 hover:bg-[#D4F1F5] transition-colors duration-200">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#18B7C9]/25 flex items-center justify-center text-[#0E9AAB]">
                <ClipboardList className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </div>
              <span className="text-[13px] md:text-[15px] font-bold text-[#0D2E4A]">{t("org.oneEntry")}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#0E9AAB]/50 mx-0.5 md:mx-1 flex-shrink-0" />
            <div className="flex items-center gap-1.5 rounded-lg bg-[#E6F7FA] px-2.5 py-1.5 md:px-3 md:py-2 hover:bg-[#D4F1F5] transition-colors duration-200">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#18B7C9]/25 flex items-center justify-center text-[#0E9AAB]">
                <UserCheck className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </div>
              <span className="text-[13px] md:text-[15px] font-bold text-[#0D2E4A]">{t("org.weMatchYou")}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#0E9AAB]/50 mx-0.5 md:mx-1 flex-shrink-0" />
            <div className="flex items-center gap-1.5 rounded-lg bg-[#E6F7FA] px-2.5 py-1.5 md:px-3 md:py-2 hover:bg-[#D4F1F5] transition-colors duration-200">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#18B7C9]/25 flex items-center justify-center text-[#0E9AAB]">
                <MessageCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </div>
              <span className="text-[13px] md:text-[15px] font-bold text-[#0D2E4A]">{t("org.weFollowUp")}</span>
            </div>
          </div>
        </div>

        {/* Trust + Photos row - stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 items-stretch">
          {/* Stats box */}
          <div className="rounded-2xl bg-white border border-[#D0DCE6] shadow-[0_8px_32px_rgba(18,56,91,0.14)] overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-gradient-to-br from-[#C8D8E8] to-[#DDE8F2] shadow-[0_1px_3px_rgba(18,56,91,0.08)]">
              <h3 className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-[#0D2E4A] tracking-tight leading-snug text-left">Your Trusted Guide to Private Healthcare in Singapore</h3>
              <p className="text-[12px] md:text-[13px] text-[#4A5D6E] mt-1 leading-tight text-left">Access trusted clinics, coordinated care, and seamless referrals — all in one place.</p>
            </div>
            <div className="px-2.5 py-1 grid grid-cols-2 gap-0 flex-1 items-center">
              <div className="border-r border-b border-[#D0DCE6]/50 py-1 px-1">
                <TrustStat value="10,000+" label="Patients Assisted" />
              </div>
              <div className="border-b border-[#D0DCE6]/50 py-1 px-1">
                <TrustStat value="100+" label="Specialist Partners" />
              </div>
              <div className="border-r border-[#D0DCE6]/50 py-1 px-1">
                <TrustStat value="24/7" label="Round-the-clock Assistance" />
              </div>
              <div className="py-1 px-1">
                <TrustStat value="4.9 ★" label="Patient Rating" />
              </div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            <div className="relative overflow-hidden rounded-xl">
              <img src={healthcareConsultation} alt="Doctor consultation" className="w-full h-full object-cover aspect-[4/3] lg:aspect-[3/4] contrast-[1.05] saturate-[1.1]" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-[#12385B]/5 mix-blend-multiply" />
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img src={healthcareClinic} alt="Modern clinic interior" className="w-full h-full object-cover aspect-[4/3] lg:aspect-[3/4] contrast-[1.05] saturate-[1.1]" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-[#12385B]/5 mix-blend-multiply" />
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img src={healthcareCoordination} alt="Care coordination" className="w-full h-full object-cover object-top aspect-[4/3] lg:aspect-[3/4] contrast-[1.05] saturate-[1.1]" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-[#12385B]/5 mix-blend-multiply" />
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img src={healthcarePatient} alt="Patient care" className="w-full h-full object-cover aspect-[4/3] lg:aspect-[3/4] contrast-[1.05] saturate-[1.1]" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-[#12385B]/5 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-[22px] font-extrabold text-[#0E9AAB] tracking-tight">{value}</p>
    <p className="text-[10px] text-[#4A5D6E] font-medium mt-1 uppercase tracking-wide">{label}</p>
  </div>
);
