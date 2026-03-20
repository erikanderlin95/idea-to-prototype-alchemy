import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

export const OrgCareJourney = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-[hsl(210,50%,18%)] tracking-tight">
              Patient Intake Flow
            </h2>

            <div className="space-y-3">
              <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text="Submit your condition or concern" />
              <JourneyStep icon={<UserCheck className="h-4 w-4" />} text="Get matched to the right provider" />
              <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text="Continue instantly via WhatsApp" />
            </div>

            <p className="text-[13px] text-[hsl(210,15%,45%)]">
              No app download. No fragmented handoff. Faster patient response.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-[hsl(210,25%,88%)] shadow-[0_4px_20px_hsl(210,40%,85%,0.3)] p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[hsl(210,25%,92%)]">
              <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
              <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
              <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
              <span className="text-[10px] text-[hsl(210,15%,55%)] ml-2 font-mono">care-intake</span>
            </div>

            <div className="space-y-2">
              <FakeField label="Condition / Concern" value="Chronic back pain management" />
              <FakeField label="Preferred Location" value="Central / East" />
              <FakeField label="Urgency" value="Soon" />
              <FakeField label="Contact" value="+65 ●●●● ●●48" />
            </div>

            <div className="pt-1">
              <div className="w-full h-7 rounded-md bg-[hsl(210,25%,94%)] flex items-center justify-center">
                <span className="text-[11px] font-medium text-[hsl(210,15%,55%)]">Submit Request</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyStep = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-[hsl(178,45%,92%)] flex items-center justify-center text-[hsl(178,55%,32%)] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[13px] font-medium text-[hsl(210,40%,25%)]">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[10px] font-medium text-[hsl(210,15%,50%)] uppercase tracking-wider">{label}</span>
    <div className="h-7 rounded-md bg-[hsl(210,30%,97%)] border border-[hsl(210,25%,92%)] flex items-center px-3">
      <span className="text-xs text-[hsl(210,20%,40%)]">{value}</span>
    </div>
  </div>
);
