import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceIntakeModal } from "@/components/ServiceIntakeModal";
import {
  Mic, Presentation, Award, Users, ClipboardList, UserCheck, MessageCircle,
  ChevronRight, Leaf, Heart, Lightbulb, Target, Sparkles, HandHeart, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import ouchWorkshopRaffles from "@/assets/ouch-workshop-raffles.jpg";
import ouchTeamPwc from "@/assets/ouch-team-pwc.jpg";
import ouchSeniors from "@/assets/ouch-seniors.jpg";
import ouchEnergizer from "@/assets/ouch-energizer.jpg";
import ouchHuifang from "@/assets/ouch-huifang.jpg";

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
                <span className="text-[11px] md:text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">{t("speakerProfile.badge")}</span>
              </div>

              <h1 className="text-[2rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                Ouch Pte Ltd
              </h1>

              <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
                {t("speakerProfile.heroDesc")}
              </p>

              <div className="flex items-center gap-0 pt-1 flex-wrap gap-y-1.5">
                <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF3E0] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <ClipboardList className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">{t("speakerProfile.enquire")}</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#F57C00]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF3E0] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <UserCheck className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">{t("speakerProfile.weCustomise")}</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#F57C00]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF3E0] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <MessageCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">{t("speakerProfile.weDeliver")}</span>
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

      {/* Credibility + Photos (NYMG "Your Trusted Guide" equivalent) */}
      <section className="py-6 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-2 items-stretch">
            {/* Stats box */}
            <div className="rounded-3xl bg-white border border-[#F0C8A0] shadow-[0_8px_32px_rgba(245,124,0,0.14)] overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-gradient-to-br from-[#FFE0B2] to-[#FFF3E0] shadow-[0_1px_3px_rgba(245,124,0,0.08)]">
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-extrabold text-[#12385B] tracking-tight leading-snug text-left">
                  Empowering Wellness Through TCM Self-Care
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#5F6F7E] mt-1 leading-tight text-left">
                  Interactive workshops, corporate wellness, and community health programmes — since 2006.
                </p>
              </div>
              <div className="px-2.5 py-1 grid grid-cols-2 gap-0 flex-1 items-center">
                <div className="border-r border-b border-[#F0C8A0]/50 py-1 px-1">
                  <TrustStat value="Since 2006" label="Delivering TCM self-care programmes" />
                </div>
                <div className="border-b border-[#F0C8A0]/50 py-1 px-1">
                  <TrustStat value="Corporate" label="& Community Clients" />
                </div>
                <div className="border-r border-[#F0C8A0]/50 py-1 px-1">
                  <TrustStat value="Customised" label="Tailored to audience & objectives" />
                </div>
                <div className="py-1 px-1">
                  <TrustStat value="Interactive" label="Hands-on, engaging delivery" />
                </div>
              </div>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-1.5 rounded-3xl overflow-hidden">
              <div className="relative overflow-hidden rounded-xl">
                <img src={ouchWorkshopRaffles} alt="Corporate workshop at Raffles Quay" className="w-full h-full object-cover object-top aspect-[4/3] contrast-[1.05] saturate-[1.1]" loading="lazy" />
                <div className="absolute inset-0 bg-[#5F3A00]/5 mix-blend-multiply" />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img src={ouchTeamPwc} alt="Team bonding with PwC" className="w-full h-full object-cover object-top aspect-[4/3] contrast-[1.05] saturate-[1.1]" loading="lazy" />
                <div className="absolute inset-0 bg-[#5F3A00]/5 mix-blend-multiply" />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img src={ouchSeniors} alt="Seniors wellness session" className="w-full h-full object-cover object-top aspect-[4/3] contrast-[1.05] saturate-[1.1]" loading="lazy" />
                <div className="absolute inset-0 bg-[#5F3A00]/5 mix-blend-multiply" />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img src={ouchEnergizer} alt="Energizer breaks session" className="w-full h-full object-cover object-center aspect-[4/3] contrast-[1.05] saturate-[1.1]" loading="lazy" />
                <div className="absolute inset-0 bg-[#5F3A00]/5 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ouch */}
      <section className="py-6 pb-3 px-3 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
              Why Choose Ouch Pte Ltd?
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
              Practical TCM self-care, delivered with energy and expertise.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {whyChooseCards.map((b) => (
              <div
                key={b.title}
                className="rounded-xl bg-white border border-[#F0C8A0] p-3 flex flex-col gap-1 shadow-[0_1px_4px_rgba(245,124,0,0.04)] hover:shadow-[0_4px_16px_rgba(245,124,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-1.5">
                  <b.icon className="h-4 w-4 text-[#F57C00] shrink-0" />
                  <h3 className="text-[13px] font-bold text-[#12385B]">{b.title}</h3>
                </div>
                <p className="text-[12px] text-[#5F6F7E] leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas (chips) */}
      <section className="py-6 px-4 bg-[#FFFAF5]">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">What We Cover</p>
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight mt-0.5">Service Areas</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {serviceAreaChips.map((chip) => (
              <div key={chip} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#F0C8A0] shadow-[0_1px_4px_rgba(245,124,0,0.05)] hover:shadow-[0_3px_12px_rgba(245,124,0,0.1)] hover:border-[#F57C00]/30 transition-all duration-200 cursor-default">
                <span className="text-[15px] font-semibold text-[#12385B]">{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services (grid) */}
      <section className="pt-3 pb-6 px-3 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="w-20 mx-auto border-t border-[#F0C8A0] mb-1" />
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
              Our Services
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
              Programmes designed to educate, engage, and empower.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {serviceCards.map((s) => (
              <div
                key={s.title}
                className="rounded-xl bg-white border border-[#F0C8A0] p-3.5 flex items-start gap-3 shadow-[0_1px_4px_rgba(245,124,0,0.04)] hover:shadow-[0_6px_20px_rgba(245,124,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] flex items-center justify-center shrink-0 mt-0.5">
                  <s.icon className="h-4 w-4 text-[#F57C00]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-[#12385B] leading-snug">{s.title}</h3>
                  <p className="text-[12px] text-[#5F6F7E] leading-snug mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Speaker */}
      <section className="py-6 px-4 bg-[#FEF6EE]">
        <div className="max-w-5xl mx-auto space-y-1 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
            Your Workshop Facilitator
          </p>
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
            Lead Speaker
          </h2>

          <div className="pt-3 flex justify-center">
            <div className="group rounded-2xl bg-white border border-[#F0C8A0] p-4 shadow-[0_2px_8px_rgba(245,124,0,0.06)] hover:shadow-[0_8px_24px_rgba(245,124,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center w-56">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#F57C00]/20 group-hover:ring-[#F57C00]/40 transition-all mb-2.5">
                <img src={ouchHuifang} alt="Hui Fang" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#12385B] leading-tight">Hui Fang</h3>
              <p className="text-[14px] text-[#5F6F7E] mt-0.5">Lead Speaker & TCM Educator</p>
              <p className="text-[13px] text-[#5F6F7E]/70 mt-0.5 leading-tight">
                Delivering practical TCM self-care through engaging workshops.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[hsl(30,80%,93%)] text-[12px] font-semibold text-[hsl(30,70%,30%)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]" />
                  Active
                </span>
                <Button
                  size="sm"
                  className="h-7 px-3.5 text-[14px] rounded-full bg-[#F57C00] hover:bg-[#E65100] text-white active:scale-[0.96] transition-all shadow-sm gap-1"
                  onClick={() => setShowIntakeModal(true)}
                >
                  <MessageCircle className="h-3 w-3" />
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#12385B]">Ready to plan your session?</h2>
          <p className="text-[17px] text-[#5F6F7E]">Share your requirements and receive a customised proposal.</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#F57C00] to-[#E65100] hover:from-[#E65100] hover:to-[#D84315] text-white font-semibold shadow-[0_2px_8px_rgba(245,124,0,0.3)]"
            onClick={() => setShowIntakeModal(true)}
          >
            <ClipboardList className="mr-2 h-5 w-5" />
            Enquire Now
          </Button>
        </div>
      </section>

      <ServiceIntakeModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        serviceName="Ouch Pte Ltd"
        serviceType="speaker"
        concernLabel="Workshop / Event Type *"
        concernPlaceholder="e.g. Corporate Wellness, TCM Health Talk"
        disclaimerItems={["Submitting this form does not confirm a booking."]}
        icon={<Mic className="h-5 w-5 text-[#F57C00]" />}
      />

      <Footer />
    </div>
  );
};

/* Data */

const whyChooseCards = [
  { icon: Leaf, title: "TCM Self-Care Expertise", desc: "Rooted in Traditional Chinese Medicine principles for practical daily wellness." },
  { icon: Award, title: "Corporate & Community Experience", desc: "Trusted by leading organisations and community groups since 2006." },
  { icon: Target, title: "Customised Programmes", desc: "Every session is tailored to your audience, goals, and setting." },
  { icon: Sparkles, title: "Interactive Delivery", desc: "Hands-on, high-energy sessions that keep participants engaged." },
  { icon: Lightbulb, title: "Evidence-Based & Practical", desc: "Techniques grounded in research and immediately applicable." },
  { icon: HandHeart, title: "Engaging, Hands-On Sessions", desc: "Participants leave with actionable self-care skills they can use right away." },
];

const serviceAreaChips = [
  "Corporate Wellness", "Caregivers", "Seniors", "Self-Care Education", "Team Bonding", "Health Talks",
];

const serviceCards = [
  { icon: Presentation, title: "Corporate Wellness Programmes", desc: "On-site sessions designed for workplace health and productivity." },
  { icon: Mic, title: "TCM Health Talks", desc: "Engaging talks on TCM self-care, prevention, and daily wellness." },
  { icon: Users, title: "Team Bonding Workshops", desc: "Fun, interactive workshops that build team spirit through wellness." },
  { icon: Heart, title: "Caregiver Support Sessions", desc: "Practical self-care techniques for caregivers managing stress and fatigue." },
  { icon: HandHeart, title: "Senior Wellness Workshops", desc: "Gentle, accessible TCM self-care for healthy ageing." },
  { icon: Target, title: "Custom Programme Design", desc: "Bespoke programmes tailored to your organisation's specific needs." },
];

/* Shared subcomponents */

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
    <div className="w-7 h-7 rounded-lg bg-[#FFE0B2] flex items-center justify-center text-[#F57C00] flex-shrink-0">
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

const TrustStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-[20px] md:text-[24px] font-extrabold text-[#F57C00] tracking-tight">{value}</p>
    <p className="text-[10px] text-[#5F6F7E] font-medium mt-1 uppercase tracking-wide">{label}</p>
  </div>
);

export default SpeakerProfile;
