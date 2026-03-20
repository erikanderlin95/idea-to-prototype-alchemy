import { Stethoscope, HeartPulse, ShieldCheck, Activity } from "lucide-react";

const SERVICES = [
  { icon: Stethoscope, label: "General Consultation" },
  { icon: HeartPulse, label: "Chronic Care" },
  { icon: ShieldCheck, label: "Specialist Referral" },
  { icon: Activity, label: "Preventive Health" },
];

export const OrgServices = () => {
  return (
    <section id="org-services" className="py-6 px-4">
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
            Available Care Areas
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-[#12385B] tracking-tight mt-0.5">
            Care Pathways
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {SERVICES.map((s) => (
            <div
              key={s.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#DCE8EF] shadow-[0_1px_4px_rgba(18,56,91,0.05)] hover:shadow-[0_3px_12px_rgba(24,183,201,0.1)] hover:border-[#18B7C9]/30 transition-all duration-200 cursor-default"
            >
              <div className="w-7 h-7 rounded-md bg-[#E6F7FA] flex items-center justify-center">
                <s.icon className="h-4 w-4 text-[#18B7C9]" />
              </div>
              <span className="text-[13px] font-semibold text-[#12385B]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
