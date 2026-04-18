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

import ouchLogo from "@/assets/ouch-logo.jpg";
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

              <div className="flex items-center gap-3">
                <img src={ouchLogo} alt="Ouch Pte Ltd logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl object-cover shadow-sm ring-1 ring-[#F0C8A0]" />
                <h1 className="text-[2rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                  Ouch Pte Ltd
                </h1>
              </div>


              <div className="flex items-center gap-0 pt-1 flex-wrap gap-y-1.5">
                <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF3E0] px-2.5 py-1.5 md:px-3 md:py-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <Presentation className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">Corporate Wellness (talks & workshops)</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#F57C00]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF3E0] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F57C00]/20 flex items-center justify-center text-[#F57C00]">
                    <HandHeart className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">Community Wellness (caregivers & seniors)</span>
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
                  Empowering Ageing Without Pain Through Simple TCM Self-Care
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#5F6F7E] mt-1 leading-tight text-left">
                  Interactive wellness programmes for corporate and community (caregivers & seniors).
                </p>
              </div>
              <div className="px-2.5 py-1 grid grid-cols-2 gap-0 flex-1 items-center">
                <div className="border-r border-b border-[#F0C8A0]/50 py-1 px-1">
                  <TrustStat value="Practical Self-Care" label="Simple techniques for daily self-care" />
                </div>
                <div className="border-b border-[#F0C8A0]/50 py-1 px-1">
                  <TrustStat value="Interactive Learning" label="Hands-on sessions that keep participants engaged" />
                </div>
                <div className="border-r border-[#F0C8A0]/50 py-1 px-1">
                  <TrustStat value="Customised Programmes" label="Tailored to your audience and goals" />
                </div>
                <div className="py-1 px-1">
                  <TrustStat value="Proven Experience" label="Trusted across corporates, communities, and seniors" />
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
              Practical TCM self-care your people can apply immediately.
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

      {/* What We Cover (grid) */}
      <section className="py-6 px-3 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
              What We Offer
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
              Practical TCM self-care for everyday wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
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
          <p className="text-[15px] md:text-[17px] font-bold uppercase tracking-widest text-[#F57C00]">
            Your Workshop Facilitator
          </p>

          <div className="pt-3 flex justify-center">
            <div className="group rounded-2xl bg-white border border-[#F0C8A0] p-4 shadow-[0_2px_8px_rgba(245,124,0,0.06)] hover:shadow-[0_8px_24px_rgba(245,124,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center w-56">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#F57C00]/20 group-hover:ring-[#F57C00]/40 transition-all mb-2.5">
                <img src={ouchHuifang} alt="Lee Hui Fang" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#12385B] leading-tight">Lee Hui Fang</h3>
              <p className="text-[14px] text-[#5F6F7E] mt-0.5">Lead Trainer</p>
              <p className="text-[13px] text-[#5F6F7E]/70 mt-0.5 leading-tight">
                Delivering practical, hands-on TCM self-care programmes since 2006.
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
  { icon: Leaf, title: "Simple Self-Care", desc: "Practical TCM techniques anyone can apply." },
  { icon: Sparkles, title: "Immediate Results", desc: "Relieve tension, pain, and fatigue quickly." },
  { icon: HandHeart, title: "Engaging Experience", desc: "High-energy, hands-on sessions that participants enjoy." },
  { icon: Target, title: "Workplace Relevance", desc: "Designed for modern stress and digital fatigue." },
  { icon: Heart, title: "Ageing Focus", desc: "Supports healthy ageing and long-term wellbeing." },
  { icon: Award, title: "Trusted Delivery", desc: "Nearly two decades across sectors and audiences." },
];

const serviceAreaChips = [
  "Corporate Wellness", "Caregivers", "Seniors", "Self-Care Education", "Team Bonding", "Health Talks",
];

const serviceCards = [
  { icon: Presentation, title: "Live Workshops", desc: "Interactive TCM sessions for immediate self-care application." },
  { icon: Lightbulb, title: "Digital Access", desc: "Bite-sized learning for ongoing self-care practice." },
  { icon: HandHeart, title: "Wellness Kits", desc: "Simple tools to support daily self-care routines." },
  { icon: Users, title: "Corporate Programmes", desc: "Wellness solutions for teams, clients, and members." },
  { icon: Heart, title: "Caregiver & Senior Sessions", desc: "Practical support for ageing and caregiving needs." },
  { icon: Target, title: "Customised Solutions", desc: "Tailored programmes aligned to your goals." },
];

/* Shared subcomponents */

const CapabilityChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#FFF3E0] transition-colors duration-200">
    <div className="w-6 h-6 rounded-md bg-[#FFF3E0] flex items-center justify-center text-[#F57C00] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[14px] font-semibold text-[#12385B] leading-tight">{label}</p>
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
