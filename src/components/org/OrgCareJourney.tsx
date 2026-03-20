import { Button } from "@/components/ui/button";
import { ClipboardList, UserCheck, MessageCircle, ArrowRight } from "lucide-react";

interface Props {
  onStart: () => void;
}

export const OrgCareJourney = ({ onStart }: Props) => {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Start Your Care Journey
            </h2>

            <div className="space-y-5">
              <JourneyStep
                num="1"
                icon={<ClipboardList className="h-4 w-4" />}
                text="Submit your condition"
              />
              <JourneyStep
                num="2"
                icon={<UserCheck className="h-4 w-4" />}
                text="Get matched to the right provider"
              />
              <JourneyStep
                num="3"
                icon={<MessageCircle className="h-4 w-4" />}
                text="Continue instantly via WhatsApp"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              No app download. No waiting. Direct response.
            </p>

            <Button
              size="lg"
              onClick={onStart}
              className="shadow-[0_4px_16px_hsl(var(--primary)/0.2)] active:scale-[0.97] transition-all"
            >
              Start Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right — Intake preview card */}
          <div className="rounded-2xl bg-card border border-border/60 shadow-[0_8px_32px_hsl(var(--primary)/0.06)] p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">care-intake</span>
            </div>

            {/* Fake form fields */}
            <div className="space-y-3">
              <FakeField label="Condition / Concern" value="Chronic back pain management" />
              <FakeField label="Preferred Location" value="Central / East" />
              <FakeField label="Urgency" value="Soon" />
              <FakeField label="Contact" value="+65 ●●●● ●●48" />
            </div>

            <div className="pt-2">
              <div className="w-full h-9 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">Submit Request</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyStep = ({ num, icon, text }: { num: string; icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <p className="text-sm font-medium text-foreground">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    <div className="h-8 rounded-md bg-muted/50 border border-border/40 flex items-center px-3">
      <span className="text-xs text-foreground/70">{value}</span>
    </div>
  </div>
);
