import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceIntakeModal } from "@/components/ServiceIntakeModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Flower2, Shield, Users, ClipboardList, UserCheck, MessageCircle, ChevronRight, Check, X, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AfterlifeProfile = () => {
  const { t } = useLanguage();
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  const agents = [
    {
      name: t("afterlifeProfile.agent1.name"),
      title: t("afterlifeProfile.agent1.title"),
      bio: t("afterlifeProfile.agent1.bio"),
      tags: [t("afterlifeProfile.agent1.tag1"), t("afterlifeProfile.agent1.tag2"), t("afterlifeProfile.agent1.tag3")],
    },
    {
      name: t("afterlifeProfile.agent2.name"),
      title: t("afterlifeProfile.agent2.title"),
      bio: t("afterlifeProfile.agent2.bio"),
      tags: [t("afterlifeProfile.agent2.tag1"), t("afterlifeProfile.agent2.tag2"), t("afterlifeProfile.agent2.tag3")],
    },
    {
      name: t("afterlifeProfile.agent3.name"),
      title: t("afterlifeProfile.agent3.title"),
      bio: t("afterlifeProfile.agent3.bio"),
      tags: [t("afterlifeProfile.agent3.tag1"), t("afterlifeProfile.agent3.tag2"), t("afterlifeProfile.agent3.tag3")],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F6F0FA]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 space-y-3">
              <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#D4BFE8]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CB8] to-[#7548A0] flex items-center justify-center shadow-sm">
                  <Heart className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">{t("afterlife.badge")}</span>
              </div>

              <h1 className="text-[2.75rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                Nirvana
              </h1>

              <p className="text-[19px] text-[#5F6F7E] leading-relaxed max-w-lg">
                {t("afterlifeProfile.heroDesc")}
              </p>

              <div className="flex items-center gap-0 pt-1">
                <div className="flex items-center gap-2 rounded-lg bg-[#F0E6F8] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <ClipboardList className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">{t("afterlifeProfile.reachOut")}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B5CB8]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#F0E6F8] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">{t("afterlifeProfile.weGuideYou")}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B5CB8]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#F0E6F8] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <MessageCircle className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">{t("afterlifeProfile.weSupport")}</span>
                </div>
              </div>

              <Button
                className="mt-3 bg-gradient-to-r from-[#8B5CB8] to-[#7548A0] hover:from-[#7548A0] hover:to-[#633E8A] text-white font-semibold shadow-[0_2px_8px_rgba(139,92,184,0.3)] hover:shadow-[0_4px_14px_rgba(139,92,184,0.4)]"
                onClick={() => setShowIntakeModal(true)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                {t("afterlifeProfile.enquireNow")}
              </Button>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white border border-[#D4BFE8] shadow-[0_8px_32px_rgba(139,92,184,0.12)] overflow-hidden">
                <div className="px-5 py-3 bg-[#F6F0FA] border-b border-[#D4BFE8]">
                  <span className="text-[15px] font-bold text-[#12385B] uppercase tracking-widest">{t("afterlifeProfile.services")}</span>
                </div>
                <div className="p-3 space-y-0.5">
                  <CapabilityChip icon={<Flower2 className="h-4 w-4" />} label={t("afterlifeProfile.memorialServices")} />
                  <CapabilityChip icon={<Shield className="h-4 w-4" />} label={t("afterlifeProfile.prePlanning")} />
                  <CapabilityChip icon={<Heart className="h-4 w-4" />} label={t("afterlifeProfile.bereavementSupport")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
            {t("afterlifeProfile.aboutTitle")}
          </h2>
          <p className="text-[17px] text-[#5F6F7E] leading-relaxed max-w-3xl">{t("afterlifeProfile.aboutP1")}</p>
          <p className="text-[17px] text-[#5F6F7E] leading-relaxed max-w-3xl">{t("afterlifeProfile.aboutP2")}</p>
        </div>
      </section>

      {/* Agent Cards */}
      <section className="py-8 px-4 bg-[#F6F0FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">{t("afterlifeProfile.ourConsultants")}</p>
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight mt-0.5">
              {t("afterlifeProfile.connectWithAdvisor")}
            </h2>
            <p className="text-[16px] text-[#5F6F7E] mt-1">{t("afterlifeProfile.connectDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {agents.map((agent) => (
              <Card key={agent.name} className="group border-[#D4BFE8] shadow-[0_4px_16px_rgba(139,92,184,0.08)] hover:shadow-[0_8px_24px_rgba(139,92,184,0.15)] transition-all duration-300 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8D8F4] to-[#D4BFE8] flex items-center justify-center mb-3 ring-2 ring-[#8B5CB8]/20 group-hover:ring-[#8B5CB8]/40 transition-all">
                      <User className="h-8 w-8 text-[#8B5CB8]/60" />
                    </div>
                    <h3 className="text-[17px] font-bold text-[#12385B]">{agent.name}</h3>
                    <p className="text-[13px] text-[#5F6F7E] mb-2">{agent.title}</p>
                    <p className="text-[14px] text-[#5F6F7E] leading-relaxed mb-3">{agent.bio}</p>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                      {agent.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-medium text-[#6B4A8A] bg-[#F0E6F8] border border-[#8B5CB8]/20 rounded-full px-2.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-[#8B5CB8] to-[#7548A0] hover:from-[#7548A0] hover:to-[#633E8A] text-white font-medium text-[14px]"
                      onClick={() => setShowIntakeModal(true)}
                    >
                      <MessageCircle className="mr-1.5 h-4 w-4" />
                      {t("afterlifeProfile.connect")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                {t("afterlifeProfile.howItWorks")}
              </h2>
              <div className="space-y-2.5">
                <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text={t("afterlifeProfile.howStep1")} />
                <JourneyStep icon={<UserCheck className="h-4 w-4" />} text={t("afterlifeProfile.howStep2")} />
                <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text={t("afterlifeProfile.howStep3")} />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B7D8E]">
                {t("afterlifeProfile.howNote")}
              </p>
              <Button
                variant="outline"
                className="mt-2 border-[#8B5CB8]/30 text-[#8B5CB8] hover:bg-[#F0E6F8]"
                onClick={() => setShowIntakeModal(true)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                {t("afterlifeProfile.startEnquiry")}
              </Button>
            </div>

            <div className="rounded-xl bg-white border border-[#D4BFE8] shadow-[0_4px_16px_rgba(139,92,184,0.08)] p-4 space-y-2.5 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#D4BFE8]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                  <span className="text-[14px] text-[#5F6F7E] ml-2 font-mono">service-enquiry</span>
                </div>
                <span className="text-[12px] text-[#5F6F7E]/60 italic">{t("afterlifeProfile.exampleEnquiry")}</span>
              </div>
              <div className="space-y-2 opacity-80">
                <FakeField label={t("afterlifeProfile.fakeField.serviceType")} value={t("afterlifeProfile.fakeField.serviceTypeVal")} />
                <FakeField label={t("afterlifeProfile.fakeField.arrangement")} value={t("afterlifeProfile.fakeField.arrangementVal")} />
                <FakeField label={t("afterlifeProfile.fakeField.timeline")} value={t("afterlifeProfile.fakeField.timelineVal")} />
                <FakeField label={t("afterlifeProfile.fakeField.contact")} value="+65 ●●●● ●●48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-8 px-4 bg-[#F6F0FA]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                {t("afterlifeProfile.whyNirvana")}
              </h2>
              <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
                {t("afterlifeProfile.whyNirvanaDesc")}
              </p>
              <p className="text-[18px] text-[#12385B] font-medium">{t("afterlifeProfile.whatSetsUsApart")}</p>
              <ul className="space-y-1.5 pl-1">
                {[t("afterlifeProfile.apart1"), t("afterlifeProfile.apart2"), t("afterlifeProfile.apart3"), t("afterlifeProfile.apart4")].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[17px] text-[#12385B]">
                    <Check className="h-4 w-4 text-[#8B5CB8] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">{t("afterlifeProfile.serviceComparison")}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#D4BFE8] bg-white p-3.5 space-y-2">
                  <h3 className="text-[16px] font-bold text-[#5F6F7E]">{t("afterlifeProfile.withoutGuidance")}</h3>
                  <ul className="space-y-1">
                    {[t("afterlifeProfile.without1"), t("afterlifeProfile.without2"), t("afterlifeProfile.without3"), t("afterlifeProfile.without4")].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#5F6F7E]">
                        <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#8B5CB8]/20 bg-[#F0E6F8] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(139,92,184,0.1)]">
                  <h3 className="text-[16px] font-bold text-[#12385B]">{t("afterlifeProfile.nirvanaModel")}</h3>
                  <ul className="space-y-1">
                    {[t("afterlifeProfile.nirvana1"), t("afterlifeProfile.nirvana2"), t("afterlifeProfile.nirvana3"), t("afterlifeProfile.nirvana4")].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#8B5CB8]" />
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

      {/* Bottom CTA */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#12385B]">{t("afterlifeProfile.needGuidance")}</h2>
          <p className="text-[17px] text-[#5F6F7E]">{t("afterlifeProfile.needGuidanceDesc")}</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#8B5CB8] to-[#7548A0] hover:from-[#7548A0] hover:to-[#633E8A] text-white font-semibold shadow-[0_2px_8px_rgba(139,92,184,0.3)]"
            onClick={() => setShowIntakeModal(true)}
          >
            <ClipboardList className="mr-2 h-5 w-5" />
            {t("afterlifeProfile.enquireNow")}
          </Button>
        </div>
      </section>

      <ServiceIntakeModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        serviceName="Nirvana"
        serviceType="afterlife"
        concernLabel={t("afterlifeProfile.fakeField.serviceType") + " *"}
        concernPlaceholder={t("afterlifeProfile.fakeField.serviceTypeVal")}
        disclaimerItems={[]}
        icon={<Heart className="h-5 w-5 text-[#8B5CB8]" />}
      />

      <Footer />
    </div>
  );
};

const CapabilityChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#F0E6F8] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[#F0E6F8] flex items-center justify-center text-[#8B5CB8] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-semibold text-[#12385B] leading-tight">{label}</p>
  </div>
);

const JourneyStep = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-[#F0E6F8] flex items-center justify-center text-[#8B5CB8] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-medium text-[#12385B]">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[14px] font-medium text-[#5F6F7E] uppercase tracking-wider">{label}</span>
    <div className="h-8 rounded-md bg-[#F6F0FA] border border-[#D4BFE8] flex items-center px-3">
      <span className="text-[15px] text-[#12385B]">{value}</span>
    </div>
  </div>
);

export default AfterlifeProfile;