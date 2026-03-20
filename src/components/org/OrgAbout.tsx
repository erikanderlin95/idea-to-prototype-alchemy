import { Network, GitBranch, HeartPulse } from "lucide-react";

export const OrgAbout = () => {
  return (
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight">
              About the Network
            </h2>
            <p className="text-[#5F6F7E] leading-relaxed max-w-lg text-[16px]">
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
  <div className="group rounded-xl bg-white border border-[#DCE8EF] p-3.5 text-center space-y-2 shadow-[0_2px_8px_rgba(18,56,91,0.06)] hover:shadow-[0_4px_16px_rgba(18,56,91,0.1)] hover:-translate-y-0.5 transition-all duration-300">
    <div className="mx-auto w-9 h-9 rounded-lg bg-[#E6F7FA] flex items-center justify-center text-[#18B7C9] group-hover:bg-[#d6f2f6] transition-colors">
      {icon}
    </div>
    <p className="text-sm font-semibold text-[#12385B] leading-snug">{label}</p>
  </div>
);
