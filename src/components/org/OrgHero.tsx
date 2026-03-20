import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Network, GitBranch, Stethoscope, MessageCircle } from "lucide-react";

export const OrgHero = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-28 pb-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Left — 60% */}
          <div className="lg:col-span-3 space-y-5">
            <div className="inline-flex items-center gap-3 bg-card rounded-full pl-1.5 pr-5 py-1.5 shadow-[0_2px_12px_hsl(var(--primary)/0.08)] ring-1 ring-border/60">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <Building2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Managed Healthcare Provider</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.1] tracking-tight">
              {t("org.name")}
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Structured care coordination across general practice, specialist services, and guided patient pathways.
            </p>

            <p className="text-sm font-semibold text-primary tracking-wide">
              One entry point · Structured matching · Direct follow-up
            </p>
          </div>

          {/* Right — Strategic capability panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-card border border-border/60 shadow-[0_8px_32px_hsl(var(--primary)/0.07)] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border/40 bg-muted/30">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Network Capabilities</span>
              </div>

              <div className="p-4 space-y-2.5">
                <CapabilityRow
                  icon={<Network className="h-4 w-4" />}
                  label="Multi-Clinic Network"
                  detail="Integrated provider access"
                />
                <CapabilityRow
                  icon={<GitBranch className="h-4 w-4" />}
                  label="Coordinated Patient Flow"
                  detail="Single intake to assignment"
                />
                <CapabilityRow
                  icon={<Stethoscope className="h-4 w-4" />}
                  label="Specialist Referral Support"
                  detail="Structured care pathways"
                />
                <CapabilityRow
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="Direct WhatsApp Follow-up"
                  detail="Immediate patient response"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityRow = ({ icon, label, detail }: { icon: React.ReactNode; label: string; detail: string }) => (
  <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-muted/20 border border-border/30 hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-200">
    <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-foreground leading-tight">{label}</p>
      <p className="text-[11px] text-muted-foreground">{detail}</p>
    </div>
  </div>
);
