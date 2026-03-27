import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceIntakeModal } from "@/components/ServiceIntakeModal";
import { Mic, Presentation, Award, Users, ClipboardList, UserCheck, MessageCircle, ChevronRight, Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SpeakerProfile = () => {
  const { t } = useLanguage();
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#FFF5EB]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 space-y-3">
              <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#F0C8A0]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F57C00] to-[#E65100] flex items-center justify-center shadow-sm">
                  <Mic className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">{t("speakerProfile.badge")}</span>
              </div>

              <h1 className="text-[2.75rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                Ouch Pte Ltd
              </h1>

              <p className="text-[19px] text-[#5F6F7E] leading-relaxed max-w-lg">
                {t("speakerProfile.heroDesc")}
              </p>

              <div className="flex items-center gap-0 pt-1">
                <div className="flex items-center gap-2 rounded-lg bg-[#FFF3E0] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <ClipboardList className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">{t("speakerProfile.enquire")}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#F57C00]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#FFF3E0] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">{t("speakerProfile.weCustomise")}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#F57C00]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#FFF3E0] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <MessageCircle className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">{t("speakerProfile.weDeliver")}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white border border-[#F0C8A0] shadow-[0_8px_32px_rgba(245,124,0,0.12)] overflow-hidden">
                <div className="px-5 py-3 bg-[#FFF5EB] border-b border-[#F0C8A0]">
                  <span className="text-[15px] font-bold text-[#12385B] uppercase tracking-widest">{t("speakerProfile.capabilities")}</span>
                </div>
                <div className="p-3 space-y-0.5">
                  <CapabilityChip icon={<Mic className="h-4 w-4" />} label={t("speakerProfile.tcmHealthTalks")} />
                  <CapabilityChip icon={<Presentation className="h-4 w-4" />} label={t("speakerProfile.b2bWorkshops")} />
                  <CapabilityChip icon={<Award className="h-4 w-4" />} label={t("speakerProfile.corporateTraining")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Bio Section */}
      <section className="py-2 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                {t("speakerProfile.aboutUs")}
              </h2>
              <p className="text-[17px] text-[#5F6F7E] leading-relaxed">
                {t("speakerProfile.aboutDesc")}
              </p>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-[#F0C8A0] shadow-[0_4px_16px_rgba(245,124,0,0.08)] overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80] flex items-center justify-center mb-3 ring-2 ring-[#F57C00]/20">
                      <User className="h-10 w-10 text-[#F57C00]/60" />
                    </div>
                    <h3 className="text-lg font-bold text-[#12385B]">Hui Fang</h3>
                    <p className="text-[14px] text-[#5F6F7E] mb-2">{t("speakerProfile.leadSpeaker")}</p>
                    <p className="text-[14px] text-[#5F6F7E] leading-relaxed mb-4">
                      {t("speakerProfile.huiFangBio")}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                      <span className="text-[11px] font-medium text-[#E65100] bg-[#FFF3E0] border border-[#F57C00]/20 rounded-full px-2.5 py-0.5">{t("speakerProfile.tcmWorkshopsTag")}</span>
                      <span className="text-[11px] font-medium text-[#E65100] bg-[#FFF3E0] border border-[#F57C00]/20 rounded-full px-2.5 py-0.5">{t("speakerProfile.corporateWellnessTag")}</span>
                      <span className="text-[11px] font-medium text-[#E65100] bg-[#FFF3E0] border border-[#F57C00]/20 rounded-full px-2.5 py-0.5">{t("speakerProfile.healthEducationTag")}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-[#F57C00] to-[#E65100] hover:from-[#E65100] hover:to-[#D84315] text-white font-medium text-[14px]"
                      onClick={() => setShowIntakeModal(true)}
                    >
                      <MessageCircle className="mr-1.5 h-4 w-4" />
                      {t("speakerProfile.connectWithHuiFang")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-2 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                {t("speakerProfile.howItWorks")}
              </h2>
              <div className="space-y-2.5">
                <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text={t("speakerProfile.step1")} />
                <JourneyStep icon={<UserCheck className="h-4 w-4" />} text={t("speakerProfile.step2")} />
                <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text={t("speakerProfile.step3")} />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B7D8E]">
                {t("speakerProfile.flexibility")}
              </p>
            </div>

            <div className="rounded-xl bg-white border border-[#F0C8A0] shadow-[0_4px_16px_rgba(245,124,0,0.08)] p-4 space-y-2.5 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0C8A0]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                  <span className="text-[14px] text-[#5F6F7E] ml-2 font-mono">speaker-enquiry</span>
                </div>
                <span className="text-[12px] text-[#5F6F7E]/60 italic">{t("speakerProfile.exampleEnquiry")}</span>
              </div>
              <div className="space-y-2 opacity-80">
                <FakeField label={t("speakerProfile.fakeField.eventType")} value={t("speakerProfile.fakeField.eventTypeVal")} />
                <FakeField label={t("speakerProfile.fakeField.audience")} value={t("speakerProfile.fakeField.audienceVal")} />
                <FakeField label={t("speakerProfile.fakeField.format")} value={t("speakerProfile.fakeField.formatVal")} />
                <FakeField label={t("speakerProfile.fakeField.contact")} value="+65 ●●●● ●●48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-8 px-4 bg-[#FFF5EB]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                {t("speakerProfile.whyOuch")}
              </h2>
              <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
                {t("speakerProfile.whyOuchDesc")}
              </p>
              <p className="text-[18px] text-[#12385B] font-medium">{t("speakerProfile.whatSetsUsApart")}</p>
              <ul className="space-y-1.5 pl-1">
                {[t("speakerProfile.apart1"), t("speakerProfile.apart2"), t("speakerProfile.apart3"), t("speakerProfile.apart4")].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[17px] text-[#12385B]">
                    <Check className="h-4 w-4 text-[#F57C00] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
                {t("speakerProfile.experienceComparison")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#F0C8A0] bg-white p-3.5 space-y-2">
                  <h3 className="text-[16px] font-bold text-[#5F6F7E]">{t("speakerProfile.genericTalks")}</h3>
                  <ul className="space-y-1">
                    {[t("speakerProfile.generic1"), t("speakerProfile.generic2"), t("speakerProfile.generic3"), t("speakerProfile.generic4")].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#5F6F7E]">
                        <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#F57C00]/20 bg-[#FFF3E0] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(245,124,0,0.1)]">
                  <h3 className="text-[16px] font-bold text-[#12385B]">{t("speakerProfile.ouchModel")}</h3>
                  <ul className="space-y-1">
                    {[t("speakerProfile.ouch1"), t("speakerProfile.ouch2"), t("speakerProfile.ouch3"), t("speakerProfile.ouch4")].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#F57C00]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">{t("speakerProfile.availableProgrammes")}</p>
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight mt-0.5">{t("speakerProfile.serviceAreas")}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { icon: Mic, labelKey: "speakerProfile.tcmHealthTalks" },
              { icon: Presentation, labelKey: "speakerProfile.b2bCorporateWorkshops" },
              { icon: Users, labelKey: "speakerProfile.b2cCommunitySessions" },
              { icon: Award, labelKey: "speakerProfile.professionalTraining" },
            ].map((s) => (
              <div key={s.labelKey} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#F0C8A0] shadow-[0_1px_4px_rgba(245,124,0,0.05)] hover:shadow-[0_3px_12px_rgba(245,124,0,0.1)] hover:border-[#F57C00]/30 transition-all duration-200 cursor-default">
                <div className="w-7 h-7 rounded-md bg-[#FFF3E0] flex items-center justify-center">
                  <s.icon className="h-4 w-4 text-[#F57C00]" />
                </div>
                <span className="text-[15px] font-semibold text-[#12385B]">{t(s.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#12385B]">{t("speakerProfile.readyToBook")}</h2>
          <p className="text-[17px] text-[#5F6F7E]">{t("speakerProfile.readyToBookDesc")}</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#F57C00] to-[#E65100] hover:from-[#E65100] hover:to-[#D84315] text-white font-semibold shadow-[0_2px_8px_rgba(245,124,0,0.3)]"
            onClick={() => setShowIntakeModal(true)}
          >
            <ClipboardList className="mr-2 h-5 w-5" />
            {t("speakerProfile.enquireNow")}
          </Button>
        </div>
      </section>

      <ServiceIntakeModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        serviceName="Ouch Pte Ltd"
        serviceType="speaker"
        concernLabel={t("speakerProfile.fakeField.eventType") + " *"}
        concernPlaceholder={t("speakerProfile.fakeField.eventTypeVal")}
        disclaimerItems={[
          t("serviceIntake.fillRequired") === "serviceIntake.fillRequired" ? "Submitting this form does not confirm a booking." : "提交此表格不代表确认预约。",
        ]}
        icon={<Mic className="h-5 w-5 text-[#F57C00]" />}
      />

      <Footer />
    </div>
  );
};

const CapabilityChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#FFF3E0] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[#FFF3E0] flex items-center justify-center text-[#F57C00] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-semibold text-[#12385B] leading-tight">{label}</p>
  </div>
);

const JourneyStep = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-[#FFF3E0] flex items-center justify-center text-[#F57C00] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-medium text-[#12385B]">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[14px] font-medium text-[#5F6F7E] uppercase tracking-wider">{label}</span>
    <div className="h-8 rounded-md bg-[#FFF5EB] border border-[#F0C8A0] flex items-center px-3">
      <span className="text-[15px] text-[#12385B]">{value}</span>
    </div>
  </div>
);

export default SpeakerProfile;