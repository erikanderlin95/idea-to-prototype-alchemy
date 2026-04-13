import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceIntakeModal } from "@/components/ServiceIntakeModal";
import {
  Heart, Flower2, Shield, Users, ClipboardList, UserCheck, MessageCircle,
  ChevronRight, MapPin, Clock, Phone, User, Sparkles, HandHeart, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import nirvanaLogo from "@/assets/nirvana-logo.jpg";

const AfterlifeProfile = () => {
  const { t } = useLanguage();
  const [showIntakeModal, setShowIntakeModal] = useState(false);

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
                <span className="text-[11px] md:text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">{t("afterlife.badge")}</span>
              </div>

              <div className="flex items-center gap-3">
                <img src={nirvanaLogo} alt="Nirvana Joyful Life logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl object-cover shadow-sm ring-1 ring-[#D4BFE8]" />
                <h1 className="text-[2rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                  Nirvana Joyful Life
                </h1>
              </div>

              <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
                {t("afterlifeProfile.heroDesc")}
              </p>

              <div className="flex items-center gap-0 pt-1 flex-wrap gap-y-1.5">
                <div className="flex items-center gap-1.5 rounded-lg bg-[#F0E6F8] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <Flower2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">Columbarium Niche</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CB8]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#F0E6F8] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <Shield className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">Ancestral Tablet</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CB8]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#F0E6F8] px-2.5 py-1.5 md:px-3 md:py-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <Heart className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#12385B]">Funeral Service Package</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility + Info */}
      <section className="py-6 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-2 items-stretch">
            {/* Stats box */}
            <div className="rounded-3xl bg-white border border-[#D4BFE8] shadow-[0_8px_32px_rgba(139,92,184,0.14)] overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-gradient-to-br from-[#E8D8F4] to-[#F6F0FA] shadow-[0_1px_3px_rgba(139,92,184,0.08)]">
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-extrabold text-[#12385B] tracking-tight leading-snug text-left">
                  Compassionate End-of-Life Services
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#5F6F7E] mt-1 leading-tight text-left">
                  Authorised agency providing dignified memorial, columbarium, and funeral services.
                </p>
              </div>
              <div className="px-2.5 py-1 grid grid-cols-2 gap-0 flex-1 items-center">
                <div className="border-r border-b border-[#D4BFE8]/50 py-1 px-1">
                  <TrustStat value="Authorised" label="Nirvana Memorial Agency" />
                </div>
                <div className="border-b border-[#D4BFE8]/50 py-1 px-1">
                  <TrustStat value="Joyful Life" label="Agency 613" />
                </div>
                <div className="border-r border-[#D4BFE8]/50 py-1 px-1">
                  <TrustStat value="Full Service" label="Columbarium · Tablet · Funeral" />
                </div>
                <div className="py-1 px-1">
                  <TrustStat value="Compassionate" label="Personalised guidance & care" />
                </div>
              </div>
            </div>

            {/* Clinic details card */}
            <div className="rounded-3xl bg-white border border-[#D4BFE8] shadow-[0_4px_16px_rgba(139,92,184,0.08)] p-5 space-y-3 flex flex-col justify-center">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0E6F8] flex items-center justify-center text-[#8B5CB8] shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#5F6F7E] uppercase tracking-wider">Address</p>
                  <p className="text-[15px] text-[#12385B] font-medium">950 Old Choa Chu Kang Road S699816</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0E6F8] flex items-center justify-center text-[#8B5CB8] shrink-0 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#5F6F7E] uppercase tracking-wider">Operating Hours</p>
                  <p className="text-[15px] text-[#12385B] font-medium">8.30am – 5pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0E6F8] flex items-center justify-center text-[#8B5CB8] shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#5F6F7E] uppercase tracking-wider">Contact Person</p>
                  <p className="text-[15px] text-[#12385B] font-medium">Pan Lina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Nirvana */}
      <section className="py-6 pb-3 px-3 bg-[#F6F0FA]">
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
              {t("afterlifeProfile.whyNirvana")}
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
              {t("afterlifeProfile.whyNirvanaDesc")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {whyChooseCards.map((b) => (
              <div
                key={b.title}
                className="rounded-xl bg-white border border-[#D4BFE8] p-3 flex flex-col gap-1 shadow-[0_1px_4px_rgba(139,92,184,0.04)] hover:shadow-[0_4px_16px_rgba(139,92,184,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-1.5">
                  <b.icon className="h-4 w-4 text-[#8B5CB8] shrink-0" />
                  <h3 className="text-[13px] font-bold text-[#12385B]">{b.title}</h3>
                </div>
                <p className="text-[12px] text-[#5F6F7E] leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered (grid) */}
      <section className="py-6 px-3 bg-[#FAF5FF]">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
              Services Offered
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#5F6F7E] max-w-2xl mx-auto">
              Comprehensive memorial and funeral services for your peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {serviceCards.map((s) => (
              <div
                key={s.title}
                className="rounded-xl bg-white border border-[#D4BFE8] p-3.5 flex items-start gap-3 shadow-[0_1px_4px_rgba(139,92,184,0.04)] hover:shadow-[0_6px_20px_rgba(139,92,184,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F6F0FA] to-[#E8D8F4] flex items-center justify-center shrink-0 mt-0.5">
                  <s.icon className="h-4 w-4 text-[#8B5CB8]" />
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

      {/* Contact Person */}
      <section className="py-6 px-4 bg-[#F6F0FA]">
        <div className="max-w-5xl mx-auto space-y-1 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
            Your Dedicated Advisor
          </p>
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#12385B] tracking-tight">
            Contact Person
          </h2>

          <div className="pt-3 flex justify-center">
            <div className="group rounded-2xl bg-white border border-[#D4BFE8] p-4 shadow-[0_2px_8px_rgba(139,92,184,0.06)] hover:shadow-[0_8px_24px_rgba(139,92,184,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center w-56">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8D8F4] to-[#D4BFE8] flex items-center justify-center ring-2 ring-[#8B5CB8]/20 group-hover:ring-[#8B5CB8]/40 transition-all mb-2.5">
                <User className="h-8 w-8 text-[#8B5CB8]/60" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#12385B] leading-tight">Pan Lina</h3>
              <p className="text-[14px] text-[#5F6F7E] mt-0.5">Afterlife Services Advisor</p>
              <p className="text-[13px] text-[#5F6F7E]/70 mt-0.5 leading-tight">
                Providing compassionate guidance for memorial and funeral arrangements.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#F0E6F8] text-[12px] font-semibold text-[#6B4A8A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CB8]" />
                  Active
                </span>
                <Button
                  size="sm"
                  className="h-7 px-3.5 text-[14px] rounded-full bg-[#8B5CB8] hover:bg-[#7548A0] text-white active:scale-[0.96] transition-all shadow-sm gap-1"
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
        serviceName="Nirvana Joyful Life"
        serviceType="afterlife"
        concernLabel="Service Type *"
        concernPlaceholder="e.g. Columbarium Niche, Funeral Service Package"
        disclaimerItems={["Submitting this form does not confirm a booking."]}
        icon={<Heart className="h-5 w-5 text-[#8B5CB8]" />}
      />

      <Footer />
    </div>
  );
};

/* Data */

const whyChooseCards = [
  { icon: Heart, title: "Compassionate Care", desc: "Every family receives personalised, empathetic guidance through difficult times." },
  { icon: Shield, title: "Authorised Agency", desc: "Official Nirvana Memorial authorised agency — Joyful Life 613." },
  { icon: Target, title: "Comprehensive Services", desc: "From columbarium niches to full funeral packages, all under one roof." },
  { icon: Sparkles, title: "Dignified Arrangements", desc: "Respectful and meaningful memorial services honouring your loved ones." },
  { icon: HandHeart, title: "Family-First Approach", desc: "We walk alongside families, handling every detail with care." },
  { icon: Users, title: "Trusted Guidance", desc: "Experienced advisors who understand cultural and religious traditions." },
];

const serviceCards = [
  { icon: Flower2, title: "Columbarium Niche", desc: "Premium niches at Nirvana Memorial Garden for a peaceful resting place." },
  { icon: Shield, title: "Ancestral Tablet", desc: "Sacred ancestral tablets for honouring and remembering loved ones." },
  { icon: Heart, title: "Funeral Service Package", desc: "Complete funeral arrangements with dignity, respect, and cultural sensitivity." },
  { icon: Users, title: "Pre-Planning Services", desc: "Plan ahead to ease the burden on your family during difficult times." },
  { icon: HandHeart, title: "Bereavement Support", desc: "Compassionate support and guidance for families navigating grief." },
  { icon: ClipboardList, title: "Personalised Arrangements", desc: "Customised services tailored to your family's wishes and traditions." },
];

/* Shared subcomponents */

const TrustStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-[20px] md:text-[24px] font-extrabold text-[#8B5CB8] tracking-tight">{value}</p>
    <p className="text-[10px] text-[#5F6F7E] font-medium mt-1 uppercase tracking-wide">{label}</p>
  </div>
);

export default AfterlifeProfile;
