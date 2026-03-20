import { Stethoscope, HeartPulse, ShieldCheck, Activity } from "lucide-react";

const SERVICES = [
  { icon: Stethoscope, label: "General Consultation" },
  { icon: HeartPulse, label: "Chronic Care" },
  { icon: ShieldCheck, label: "Specialist Referral" },
  { icon: Activity, label: "Preventive Health" },
];

export const OrgServices = () => {
  return (
    <section id="org-services" className="py-10 px-4 bg-[hsl(210,35%,96%)]">
      <div className="max-w-4xl mx-auto text-center space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-[hsl(210,50%,18%)] tracking-tight">
          Care Pathways
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {SERVICES.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-[hsl(210,25%,90%)] shadow-[0_2px_10px_hsl(210,40%,85%,0.25)] hover:shadow-[0_4px_16px_hsl(178,40%,70%,0.25)] hover:border-[hsl(178,40%,70%)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-[hsl(178,45%,92%)] flex items-center justify-center group-hover:bg-[hsl(178,45%,88%)] transition-colors">
                <s.icon className="h-5 w-5 text-[hsl(178,55%,32%)]" />
              </div>
              <span className="text-xs font-semibold text-[hsl(210,50%,18%)]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
