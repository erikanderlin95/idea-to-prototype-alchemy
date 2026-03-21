import { Building2, Network, Stethoscope, Shield, ClipboardList, UserCheck, MessageCircle, ChevronRight } from "lucide-react";
import { HeartPulse } from "lucide-react";

export const SHAHero = () => {
  return (
    <section className="pt-24 pb-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F4F8FB]" />
      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-3 space-y-3">
            <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#DCE8EF]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C5282] to-[#4A7FC1] flex items-center justify-center shadow-sm">
                <HeartPulse className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">Managed Healthcare Provider</span>
            </div>

            <h1 className="text-[2.75rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
              Singapore HealthCare Alliance
            </h1>

            <p className="text-[19px] text-[#5F6F7E] leading-relaxed max-w-lg">
              Access specialist care across Singapore, coordinated through our medical network.
            </p>

            <div className="flex items-center gap-0 pt-1">
              <div className="flex items-center gap-2 rounded-lg bg-[#E8EFF8] px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#4A7FC1]/20 flex items-center justify-center text-[#4A7FC1]">
                  <ClipboardList className="h-3 w-3" />
                </div>
                <span className="text-[15px] font-bold text-[#12385B]">One Request</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#4A7FC1]/40 mx-1 flex-shrink-0" />
              <div className="flex items-center gap-2 rounded-lg bg-[#E8EFF8] px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#4A7FC1]/20 flex items-center justify-center text-[#4A7FC1]">
                  <UserCheck className="h-3 w-3" />
                </div>
                <span className="text-[15px] font-bold text-[#12385B]">We Assess</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#4A7FC1]/40 mx-1 flex-shrink-0" />
              <div className="flex items-center gap-2 rounded-lg bg-[#E8EFF8] px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#4A7FC1]/20 flex items-center justify-center text-[#4A7FC1]">
                  <MessageCircle className="h-3 w-3" />
                </div>
                <span className="text-[15px] font-bold text-[#12385B]">Care Begins</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-[#DCE8EF] shadow-[0_8px_32px_rgba(18,56,91,0.12)] overflow-hidden">
              <div className="px-5 py-3 bg-[#EDF2F9] border-b border-[#DCE8EF]">
                <span className="text-[15px] font-bold text-[#12385B] uppercase tracking-widest">Network Capabilities</span>
              </div>
              <div className="p-3 space-y-0.5">
                <CapabilityChip icon={<Network className="h-4 w-4" />} label="Multi-Site Network" />
                <CapabilityChip icon={<Stethoscope className="h-4 w-4" />} label="Specialist Access" />
                <CapabilityChip icon={<Shield className="h-4 w-4" />} label="Allied Health Services" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#E8EFF8] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[#E8EFF8] flex items-center justify-center text-[#4A7FC1] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-semibold text-[#12385B] leading-tight">{label}</p>
  </div>
);
