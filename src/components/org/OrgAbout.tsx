import { Network, GitBranch, HeartPulse } from "lucide-react";

export const OrgAbout = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Copy */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              About Nanyang Medical Group
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              Nanyang Medical Group operates as a structured healthcare network,
              coordinating patient journeys across multiple providers through a
              single intake and follow-up system.
            </p>
          </div>

          {/* Right — Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
  <div className="group rounded-xl bg-card border border-border/50 p-5 text-center space-y-3 shadow-[0_2px_8px_hsl(var(--primary)/0.04)] hover:shadow-[0_4px_16px_hsl(var(--primary)/0.08)] hover:-translate-y-0.5 transition-all duration-300">
    <div className="mx-auto w-10 h-10 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary group-hover:bg-primary/[0.12] transition-colors">
      {icon}
    </div>
    <p className="text-sm font-semibold text-foreground leading-snug">{label}</p>
  </div>
);
