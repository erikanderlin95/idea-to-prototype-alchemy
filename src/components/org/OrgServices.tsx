import { Stethoscope, HeartPulse, ShieldCheck, Activity } from "lucide-react";

const SERVICES = [
  { icon: Stethoscope, label: "General Consultation" },
  { icon: HeartPulse, label: "Chronic Care" },
  { icon: ShieldCheck, label: "Specialist Referral" },
  { icon: Activity, label: "Preventive Health" },
];

export const OrgServices = () => {
  return (
    <section id="org-services" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Services
        </h2>

        <div className="flex flex-wrap gap-3 justify-center">
          {SERVICES.map((s) => (
            <div
              key={s.label}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 text-sm font-medium text-foreground shadow-[0_1px_4px_hsl(var(--primary)/0.04)] hover:shadow-[0_4px_16px_hsl(var(--primary)/0.1)] hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <s.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
