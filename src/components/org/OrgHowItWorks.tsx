import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

const STEPS = [
  { icon: ClipboardList, title: "Submit Intake", desc: "Structured care request form" },
  { icon: UserCheck, title: "Case Matching", desc: "Assigned to the right provider" },
  { icon: MessageCircle, title: "Direct Follow-up", desc: "Continues via WhatsApp" },
];

export const OrgHowItWorks = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-[hsl(210,50%,18%)] tracking-tight">
          How Care Coordination Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          {/* Teal connector line */}
          <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[hsl(178,45%,80%)] via-[hsl(178,50%,65%)] to-[hsl(178,45%,80%)] z-0" />

          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 relative z-10 px-3">
              <div className="flex flex-col items-center text-center space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-[hsl(178,45%,92%)] border-2 border-[hsl(178,50%,75%)] flex items-center justify-center shadow-sm">
                  <step.icon className="h-5 w-5 text-[hsl(178,55%,32%)]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-[hsl(210,50%,18%)]">{step.title}</h3>
                  <p className="text-xs text-[hsl(210,15%,50%)]">{step.desc}</p>
                </div>
              </div>

              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center py-1.5">
                  <div className="w-[2px] h-4 bg-[hsl(178,45%,75%)]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-[hsl(210,15%,45%)]">
          One intake · Coordinated matching · Direct follow-up
        </p>
      </div>
    </section>
  );
};
