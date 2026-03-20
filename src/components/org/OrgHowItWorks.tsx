import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

const STEPS = [
  { icon: ClipboardList, title: "Submit Intake", desc: "Complete a structured care request form." },
  { icon: UserCheck, title: "Case Assignment", desc: "Matched to the right provider instantly." },
  { icon: MessageCircle, title: "Direct Follow-up", desc: "Continue via WhatsApp — no delays." },
];

export const OrgHowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          How It Works
        </h2>

        {/* Connected flow */}
        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-px bg-border -translate-y-1/2 z-0" />

          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 relative z-10 px-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border/60 shadow-[0_2px_12px_hsl(var(--primary)/0.06)] flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>

              {/* Mobile connector */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center py-3">
                  <div className="w-px h-6 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          No fragmented systems. One continuous workflow.
        </p>
      </div>
    </section>
  );
};
