import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Building2, ClipboardList, ArrowRight, CheckCircle2, UserCheck, MessageCircle } from "lucide-react";

interface OrgHeroProps {
  onStartConsultation: () => void;
  onViewServices: () => void;
}

export const OrgHero = ({ onStartConsultation, onViewServices }: OrgHeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="pt-28 pb-20 px-4 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left — 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Logo badge */}
            <div className="inline-flex items-center gap-3 bg-card rounded-full pl-1.5 pr-5 py-1.5 shadow-[0_2px_12px_hsl(var(--primary)/0.08)] ring-1 ring-border/60">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground tracking-wide">Nanyang Medical Group</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.1] tracking-tight">
              {t("org.name")}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Coordinated healthcare ecosystem across general practice, specialist care, and patient pathways.
            </p>

            {/* Power line */}
            <p className="text-sm font-semibold text-primary tracking-wide uppercase">
              One entry point · Structured care · Faster outcomes
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                onClick={onStartConsultation}
                className="shadow-[0_4px_16px_hsl(var(--primary)/0.2)] hover:shadow-[0_6px_24px_hsl(var(--primary)/0.3)] active:scale-[0.97] transition-all duration-200"
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                Start Consultation
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={onViewServices}
                className="text-muted-foreground hover:text-foreground"
              >
                Explore Care Pathways
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right — System visualization panel */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl bg-card border border-border/60 shadow-[0_8px_32px_hsl(var(--primary)/0.06)] p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Live Coordination Flow</span>
              </div>

              {/* Flow steps */}
              <div className="space-y-3">
                <FlowStep
                  icon={<CheckCircle2 className="h-4 w-4 text-accent" />}
                  label="Intake Submitted"
                  time="2 min ago"
                  status="complete"
                />
                <div className="ml-4 w-px h-3 bg-border" />
                <FlowStep
                  icon={<UserCheck className="h-4 w-4 text-primary" />}
                  label="Case Assigned"
                  time="Just now"
                  status="active"
                />
                <div className="ml-4 w-px h-3 bg-border" />
                <FlowStep
                  icon={<MessageCircle className="h-4 w-4 text-muted-foreground/50" />}
                  label="Follow-up Active"
                  time="Pending"
                  status="pending"
                />
              </div>

              {/* Subtle overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent rounded-b-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FlowStep = ({ icon, label, time, status }: { icon: React.ReactNode; label: string; time: string; status: "complete" | "active" | "pending" }) => (
  <div className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
    status === "active"
      ? "bg-primary/[0.06] ring-1 ring-primary/20"
      : status === "complete"
      ? "bg-accent/[0.04]"
      : "bg-muted/30"
  }`}>
    {icon}
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium ${status === "pending" ? "text-muted-foreground/50" : "text-foreground"}`}>{label}</p>
    </div>
    <span className={`text-xs ${status === "pending" ? "text-muted-foreground/40" : "text-muted-foreground"}`}>{time}</span>
  </div>
);
