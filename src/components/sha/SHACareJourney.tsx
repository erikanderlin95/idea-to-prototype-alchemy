import { ClipboardList, UserCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SHACareJourneyProps {
  onStartIntake: () => void;
}

export const SHACareJourney = ({ onStartIntake }: SHACareJourneyProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
              {t("sha.findSpecialist")}
            </h2>
            <p className="text-[17px] text-[#5F6F7E] leading-relaxed max-w-lg">
              {t("sha.findSpecialistDesc")}
            </p>

            <div className="space-y-2.5">
              <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text={t("sha.journeyStep1")} />
              <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text={t("sha.journeyStep2")} />
              <JourneyStep icon={<UserCheck className="h-4 w-4" />} text={t("sha.journeyStep3")} />
            </div>

            <div className="pt-3">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-[16px] font-semibold rounded-xl bg-gradient-to-r from-[#4A7FC1] to-[#3A6BAD] hover:from-[#3D6EA3] hover:to-[#325D96] text-white shadow-[0_4px_16px_rgba(74,127,193,0.35)] hover:shadow-[0_6px_24px_rgba(74,127,193,0.45)] transition-all active:scale-[0.97] hover:-translate-y-0.5"
                onClick={onStartIntake}
              >
                {t("sha.startWithDr")}
              </Button>
              <p className="text-[13px] text-[#6B7D8E] mt-2">{t("sha.noAppNeeded")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[14px] text-[#5F6F7E] leading-relaxed">
              {t("sha.intakeDesc")}
            </p>
            <div className="rounded-xl bg-white border border-[#DCE8EF] shadow-[0_4px_16px_rgba(18,56,91,0.08)] p-4 space-y-2.5 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE8EF]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                  <span className="text-[14px] text-[#5F6F7E] ml-2 font-mono">care-intake</span>
                </div>
                <span className="text-[12px] text-[#5F6F7E]/60 italic">{t("sha.exampleIntakePreview")}</span>
              </div>

              <div className="space-y-2 opacity-80">
                <FakeField label={t("sha.fakeField.condition")} value={t("sha.fakeField.conditionVal")} />
                <FakeField label={t("sha.fakeField.location")} value={t("sha.fakeField.locationVal")} />
                <FakeField label={t("sha.fakeField.urgency")} value={t("sha.fakeField.urgencyVal")} />
                <FakeField label={t("sha.fakeField.contact")} value="+65 ●●●● ●●12" />
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
    <div className="w-7 h-7 rounded-lg bg-[#E8EFF8] flex items-center justify-center text-[#4A7FC1] flex-shrink-0">
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