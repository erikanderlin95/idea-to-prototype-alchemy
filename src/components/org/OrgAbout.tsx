import { Network, GitBranch, HeartPulse } from "lucide-react";

export const OrgAbout = () => {
  return (
    <section className="py-10 px-4 bg-[hsl(210,35%,96%)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-2.5">
            <h2 className="text-xl md:text-2xl font-bold text-[hsl(210,50%,18%)] tracking-tight">
              About the Network
            </h2>
            <p className="text-[hsl(210,15%,40%)] leading-relaxed max-w-lg text-[14px]">
              This managed healthcare network supports a single patient intake and follow-up structure, helping direct each case to the right care pathway with clearer coordination and less operational friction.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
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
  <div className="group rounded-xl bg-white border border-[hsl(210,25%,90%)] p-3.5 text-center space-y-2 shadow-[0_2px_10px_hsl(210,40%,85%,0.3)] hover:shadow-[0_4px_16px_hsl(210,40%,80%,0.4)] hover:-translate-y-0.5 transition-all duration-300">
    <div className="mx-auto w-9 h-9 rounded-lg bg-[hsl(178,45%,92%)] flex items-center justify-center text-[hsl(178,55%,32%)] group-hover:bg-[hsl(178,45%,88%)] transition-colors">
      {icon}
    </div>
    <p className="text-xs font-semibold text-[hsl(210,50%,18%)] leading-snug">{label}</p>
  </div>
);
