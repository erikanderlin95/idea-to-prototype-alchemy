import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

export const OrgCareJourney = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
              Patient Intake Flow
            </h2>

            <div className="space-y-2.5">
              <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text="Submit your condition or concern" />
              <JourneyStep icon={<UserCheck className="h-4 w-4" />} text="Get matched to the right provider" />
              <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text="Continue instantly via WhatsApp" />
            </div>

            <div className="mt-4 space-y-0.5">
              <p className="text-[15px] leading-relaxed text-[#6B7D8E]">
                No app needed. You'll be connected via WhatsApp after submission.
              </p>
              <p className="text-[15px] leading-relaxed text-[#6B7D8E]">
                No additional fees — you pay the clinic directly.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-[#DCE8EF] shadow-[0_4px_16px_rgba(18,56,91,0.08)] p-4 space-y-2.5 relative">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE8EF]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                <span className="text-[14px] text-[#5F6F7E] ml-2 font-mono">care-intake</span>
              </div>
              <span className="text-[12px] text-[#5F6F7E]/60 italic">Example intake preview</span>
            </div>

            <div className="space-y-2 opacity-80">
              <FakeField label="Condition / Concern" value="Chronic back pain management" />
              <FakeField label="Preferred Location" value="Central / East" />
              <FakeField label="Urgency" value="Soon" />
              <FakeField label="Contact" value="+65 ●●●● ●●48" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyStep = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-[#E6F7FA] flex items-center justify-center text-[#18B7C9] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-medium text-[#12385B]">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[14px] font-medium text-[#5F6F7E] uppercase tracking-wider">{label}</span>
    <div className="h-8 rounded-md bg-[#F4F8FB] border border-[#DCE8EF] flex items-center px-3">
      <span className="text-[15px] text-[#12385B]">{value}</span>
    </div>
  </div>
);
