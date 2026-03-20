import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

const STEPS = [
  { icon: ClipboardList, title: "Submit Intake", desc: "Structured care request form" },
  { icon: UserCheck, title: "Case Matching", desc: "Assigned to the right provider" },
  { icon: MessageCircle, title: "Follow-up via WhatsApp", desc: "Immediate patient response" },
];

export const OrgHowItWorks = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-5">
        <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight">
          How Care Coordination Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[#18B7C9]/30 via-[#18B7C9] to-[#18B7C9]/30 z-0" />

          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 relative z-10 px-3">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#E6F7FA] border-2 border-[#18B7C9]/30 flex items-center justify-center shadow-sm">
                  <step.icon className="h-5 w-5 text-[#18B7C9]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-[#12385B]">{step.title}</h3>
                  <p className="text-sm text-[#5F6F7E]">{step.desc}</p>
                </div>
              </div>

              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center py-1.5">
                  <div className="w-[2px] h-4 bg-[#18B7C9]/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
