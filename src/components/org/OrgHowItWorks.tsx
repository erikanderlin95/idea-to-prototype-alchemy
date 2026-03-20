import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

const STEPS = [
  { icon: ClipboardList, title: "Submit Intake", desc: "Structured care request form" },
  { icon: UserCheck, title: "Case Matching", desc: "Assigned to the right provider" },
  { icon: MessageCircle, title: "Direct Follow-up", desc: "Continues via WhatsApp" },
];

export const OrgHowItWorks = () => {
  return (
    <section className="py-14 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          How Care Coordination Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-px bg-border -translate-y-1/2 z-0" />

          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 relative z-10 px-3">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-card border border-border/60 shadow-[0_2px_12px_hsl(var(--primary)/0.06)] flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>

              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center py-2">
                  <div className="w-px h-5 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          Single intake · Coordinated assignment · Faster response
        </p>
      </div>
    </section>
  );
};
