import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";

export const OrgCareJourney = () => {
  return (
    <section className="py-14 px-4 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — Steps */}
          <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Patient Intake Flow
            </h2>

            <div className="space-y-4">
              <JourneyStep
                icon={<ClipboardList className="h-4 w-4" />}
                text="Submit your condition or concern"
              />
              <JourneyStep
                icon={<UserCheck className="h-4 w-4" />}
                text="Get matched to the right provider"
              />
              <JourneyStep
                icon={<MessageCircle className="h-4 w-4" />}
                text="Continue instantly via WhatsApp"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              No app download. No waiting. Direct response.
            </p>
          </div>

          {/* Right — Intake preview card */}
          <div className="rounded-2xl bg-card border border-border/60 shadow-[0_8px_32px_hsl(var(--primary)/0.06)] p-5 space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <div className="w-2 h-2 rounded-full bg-destructive/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">care-intake</span>
            </div>

            <div className="space-y-2.5">
              <FakeField label="Condition / Concern" value="Chronic back pain management" />
              <FakeField label="Preferred Location" value="Central / East" />
              <FakeField label="Urgency" value="Soon" />
              <FakeField label="Contact" value="+65 ●●●● ●●48" />
            </div>

            <div className="pt-1">
              <div className="w-full h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">Submit Request</span>
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
    <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <p className="text-sm font-medium text-foreground">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    <div className="h-7 rounded-md bg-muted/50 border border-border/40 flex items-center px-3">
      <span className="text-xs text-foreground/70">{value}</span>
    </div>
  </div>
);
