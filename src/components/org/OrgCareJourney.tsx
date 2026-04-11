import { ClipboardList, UserCheck, MessageCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const OrgCareJourney = () => {
  const { t } = useLanguage();

  return (
    <section className="py-6 px-4 bg-[#E8F5F7]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] gap-3 md:gap-2 items-start">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#0D2E4A] tracking-tight">
              {t("org.intakeFlowTitle")}
            </h2>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D4F1F5] border border-[#0E9AAB]/15">
              <Clock className="h-3 w-3 text-[#0E9AAB]" />
              <span className="text-[13px] font-semibold text-[#0D2E4A]">{t("org.intakeTimeCue")}</span>
            </div>

            <div className="space-y-2.5">
              <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text={t("org.intakeStep1")} />
              <JourneyStep icon={<UserCheck className="h-4 w-4" />} text={t("org.intakeStep2")} />
              <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text={t("org.intakeStep3")} />
            </div>

            <p className="mt-2 text-[15px] leading-relaxed text-[#4A5D6E]">
              {t("org.intakeNote")}
            </p>
          </div>

          <div className="rounded-xl bg-white border-2 border-[#D0DCE6] shadow-[0_4px_20px_rgba(13,46,74,0.1)] p-4 space-y-2.5 relative">
            <div className="flex items-center justify-between pb-2 border-b border-[#D0DCE6]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                <span className="text-[14px] text-[#4A5D6E] ml-2 font-mono">care-intake</span>
              </div>
              <span className="text-[12px] text-[#4A5D6E]/60 italic">{t("org.exampleIntakePreview")}</span>
            </div>

            <div className="space-y-2">
              <FakeField label={t("org.fakeField.condition")} value={t("org.fakeField.conditionVal")} />
              <FakeField label={t("org.fakeField.location")} value={t("org.fakeField.locationVal")} />
              <FakeField label={t("org.fakeField.urgency")} value={t("org.fakeField.urgencyVal")} />
              <FakeField label={t("org.fakeField.contact")} value="+65 ●●●● ●●48" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyStep = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-[#D4F1F5] flex items-center justify-center text-[#0E9AAB] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-medium text-[#0D2E4A]">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[14px] font-medium text-[#4A5D6E] uppercase tracking-wider">{label}</span>
    <div className="h-8 rounded-md bg-[#F4F8FB] border border-[#D0DCE6] flex items-center px-3">
      <span className="text-[15px] text-[#0D2E4A]">{value}</span>
    </div>
  </div>
);
