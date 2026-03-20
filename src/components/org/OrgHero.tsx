import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Network, GitBranch, Stethoscope, MessageCircle, ClipboardList, UserCheck, ChevronRight } from "lucide-react";

export const OrgHero = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-24 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F4F8FB]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-3 space-y-3">
            <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#DCE8EF]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#12385B] to-[#1a4a72] flex items-center justify-center shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[13px] font-semibold text-[#5F6F7E] uppercase tracking-widest">Managed Healthcare Provider</span>
            </div>

            <h1 className="text-4xl md:text-[2.75rem] lg:text-[3rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
              {t("org.name")}
            </h1>

            <p className="text-[17px] text-[#5F6F7E] leading-relaxed max-w-lg">
              Coordinated patient access across general practice, specialist care, and structured referral pathways.
            </p>

            <p className="text-base font-semibold text-[#18B7C9] tracking-wide">
              One entry point · Structured matching · Direct follow-up
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-[#DCE8EF] shadow-[0_8px_32px_rgba(18,56,91,0.12)] overflow-hidden">
              <div className="px-5 py-3 bg-[#F0F5FA] border-b border-[#DCE8EF]">
                <span className="text-[13px] font-bold text-[#12385B] uppercase tracking-widest">Network Capabilities</span>
              </div>

              <div className="p-3 space-y-0.5">
                <CapabilityRow icon={<Network className="h-4 w-4" />} label="Multi-Clinic Network" detail="Integrated provider access" />
                <CapabilityRow icon={<GitBranch className="h-4 w-4" />} label="Coordinated Patient Flow" detail="Single intake to assignment" />
                <CapabilityRow icon={<Stethoscope className="h-4 w-4" />} label="Specialist Referral Support" detail="Structured care pathways" />
                <CapabilityRow icon={<MessageCircle className="h-4 w-4" />} label="Direct WhatsApp Follow-up" detail="Immediate patient response" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityRow = ({ icon, label, detail }: { icon: React.ReactNode; label: string; detail: string }) => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#E6F7FA] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[#E6F7FA] flex items-center justify-center text-[#18B7C9] flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[15px] font-semibold text-[#12385B] leading-tight">{label}</p>
      <p className="text-[13px] text-[#5F6F7E]">{detail}</p>
    </div>
  </div>
);
