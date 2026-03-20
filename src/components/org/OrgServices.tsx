import { Stethoscope, HeartPulse, ShieldCheck, Activity } from "lucide-react";

const SERVICES = [
  { icon: Stethoscope, label: "General Consultation" },
  { icon: HeartPulse, label: "Chronic Care" },
  { icon: ShieldCheck, label: "Specialist Referral" },
  { icon: Activity, label: "Preventive Health" },
];

export const OrgServices = () => {
  return (
    <section id="org-services" className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight">
          Care Pathways
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {SERVICES.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl bg-white border border-[#DCE8EF] shadow-[0_2px_8px_rgba(18,56,91,0.06)] hover:shadow-[0_4px_16px_rgba(24,183,201,0.12)] hover:border-[#18B7C9]/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E6F7FA] flex items-center justify-center group-hover:bg-[#d6f2f6] transition-colors">
                <s.icon className="h-5 w-5 text-[#18B7C9]" />
              </div>
              <span className="text-sm font-semibold text-[#12385B]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
