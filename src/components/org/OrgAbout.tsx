import { Network, GitBranch, HeartPulse } from "lucide-react";

export const OrgAbout = () => {
  return (
    <section className="py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              About the Network
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg text-[15px]">
              This managed healthcare network coordinates patient journeys through a single intake and follow-up structure, helping direct patients to the right care pathway with less friction and clearer handoff.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MetricCard icon={<Network className="h-5 w-5" />} label="Multi-Clinic Network" />
            <MetricCard icon={<GitBranch className="h-5 w-5" />} label="Coordinated Patient Flow" />
            <MetricCard icon={<HeartPulse className="h-5 w-5" />} label="Integrated Care Delivery" />
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="group rounded-xl bg-card border border-border/50 p-4 text-center space-y-2.5 shadow-[0_2px_8px_hsl(var(--primary)/0.04)] hover:shadow-[0_4px_16px_hsl(var(--primary)/0.08)] hover:-translate-y-0.5 transition-all duration-300">
    <div className="mx-auto w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary group-hover:bg-primary/[0.12] transition-colors">
      {icon}
    </div>
    <p className="text-xs font-semibold text-foreground leading-snug">{label}</p>
  </div>
);
