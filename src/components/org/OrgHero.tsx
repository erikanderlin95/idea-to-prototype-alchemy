import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Network, GitBranch, Stethoscope, MessageCircle } from "lucide-react";

export const OrgHero = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-24 pb-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,40%,96%)] via-[hsl(210,30%,98%)] to-[hsl(185,30%,96%)]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 space-y-4">
            <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[hsl(210,25%,88%)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(210,55%,25%)] to-[hsl(210,50%,35%)] flex items-center justify-center shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-[hsl(210,20%,45%)] uppercase tracking-widest">Managed Healthcare Provider</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[hsl(210,50%,18%)] leading-[1.1] tracking-tight">
              {t("org.name")}
            </h1>

            <p className="text-[15px] text-[hsl(210,15%,40%)] leading-relaxed max-w-lg">
              Coordinated patient access across general practice, specialist care, and structured referral pathways.
            </p>

            <p className="text-sm font-semibold text-[hsl(178,55%,35%)] tracking-wide">
              One entry point · Structured matching · Direct follow-up
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-[hsl(210,25%,88%)] shadow-[0_6px_28px_hsl(210,40%,80%,0.35)] overflow-hidden">
              <div className="px-5 py-3 bg-gradient-to-r from-[hsl(210,50%,20%)] to-[hsl(210,45%,28%)]">
                <span className="text-[11px] font-bold text-[hsl(210,30%,80%)] uppercase tracking-widest">Network Capabilities</span>
              </div>

              <div className="p-3.5 space-y-1.5">
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
  <div className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 hover:bg-[hsl(185,30%,97%)] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[hsl(178,45%,92%)] flex items-center justify-center text-[hsl(178,55%,32%)] flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[13px] font-semibold text-[hsl(210,50%,18%)] leading-tight">{label}</p>
      <p className="text-[11px] text-[hsl(210,15%,50%)]">{detail}</p>
    </div>
  </div>
);
