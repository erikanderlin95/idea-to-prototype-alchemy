import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceIntakeModal } from "@/components/ServiceIntakeModal";
import {
  Heart, Flower2, Shield, Users, ClipboardList, UserCheck, MessageCircle,
  ChevronRight, MapPin, Clock, Phone, User, Sparkles, HandHeart, Target,
  CreditCard, Building2, Package, Calendar
} from "lucide-react";

import nvGraceImg from "@/assets/nv-grace.jpg";
import nvLongevityImg from "@/assets/nv-longevity.jpg";
import nvSupremeImg from "@/assets/nv-supreme.jpg";
import nvLegacyImg from "@/assets/nv-legacy-pkg.jpg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import nirvanaLogo from "@/assets/nirvana-logo.jpg";
import nirvanaFuneral from "@/assets/nirvana-funeral.jpg";
import nirvanaPedestals from "@/assets/nirvana-pedestals.jpg";
import nirvanaLegacy from "@/assets/nirvana-legacy.jpg";
import nirvanaBanner from "@/assets/nirvana-banner.jpg";

const AfterlifeProfile = () => {
  const { t } = useLanguage();
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBFE]">
      <Navbar />

      {/* Hero — soft lavender with gentle radial glow */}
      <section className="pt-24 pb-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7FC] via-[#F5EEF8] to-[#EDE4F5]" />
        {/* Subtle warm glow */}
        <div className="absolute top-8 right-1/4 w-40 h-40 bg-gradient-to-br from-[#C9A84C]/6 to-transparent rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 space-y-3">
              <div className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-sm rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#DDD0EA]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8A0CE] to-[#9B7DB8] flex items-center justify-center shadow-sm">
                  <Heart className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[11px] md:text-[15px] font-semibold text-[#8A7A9A] uppercase tracking-widest">{t("afterlife.badge")}</span>
              </div>

              <div className="flex items-center gap-3">
                <img src={nirvanaLogo} alt="Nirvana Joyful Life logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl object-cover shadow-sm ring-1 ring-[#C9A84C]/20" />
                <h1 className="text-[2rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#2D1B4E] leading-[1.1] tracking-tight">
                  Nirvana Joyful Life
                </h1>
              </div>

              <p className="text-[18px] text-[#7A6B8A] leading-relaxed max-w-lg">
                Guided by a "Caring for Life" philosophy, Nirvana provides compassionate, seamless support during life's most tender moments. Every service is a heartfelt tribute — a lasting reflection of love, legacy, and the bond between generations.
              </p>

              <div className="flex items-center gap-0 pt-1 flex-wrap gap-y-1.5">
                <div className="flex items-center gap-1.5 rounded-lg bg-[#F0E6F8]/60 px-2.5 py-1.5 md:px-3 md:py-2 border border-[#E8DDF0]/40">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#9B7DB8]/15 flex items-center justify-center text-[#9B7DB8]">
                    <Flower2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#2D1B4E]">Columbarium Niche</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#C9A84C]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#F0E6F8]/60 px-2.5 py-1.5 md:px-3 md:py-2 border border-[#E8DDF0]/40">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#9B7DB8]/15 flex items-center justify-center text-[#9B7DB8]">
                    <Shield className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#2D1B4E]">Ancestral Tablet</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#C9A84C]/40 mx-0.5 md:mx-1 flex-shrink-0" />
                <div className="flex items-center gap-1.5 rounded-lg bg-[#F0E6F8]/60 px-2.5 py-1.5 md:px-3 md:py-2 border border-[#E8DDF0]/40">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#9B7DB8]/15 flex items-center justify-center text-[#9B7DB8]">
                    <Heart className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold text-[#2D1B4E]">Funeral Service Package</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility + Info */}
      <section className="py-6 px-4 bg-[#FDFBFE]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-2 items-stretch">
            {/* Stats box */}
            <div className="rounded-3xl bg-white border border-[#DDD0EA] shadow-[0_8px_32px_rgba(45,27,78,0.08)] overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-gradient-to-br from-[#EDE4F5] to-[#F5EEF8] shadow-[0_1px_3px_rgba(155,125,184,0.06)]">
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-extrabold text-[#2D1B4E] tracking-tight leading-snug text-left">
                  Caring For Life
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#7A6B8A] mt-1 leading-tight text-left">
                  Authorised Nirvana Memorial agency — compassionate bereavement care with over three decades of experience.
                </p>
              </div>
              <div className="px-2.5 py-1 grid grid-cols-2 gap-0 flex-1 items-center">
                <div className="border-r border-b border-[#E8DDF0]/50 py-1 px-1">
                  <TrustStat value="0% Interest" label="Low downpayment options" />
                </div>
                <div className="border-b border-[#E8DDF0]/50 py-1 px-1">
                  <TrustStat value="Modern" label="Facilities & expert services" />
                </div>
                <div className="border-r border-[#E8DDF0]/50 py-1 px-1">
                  <TrustStat value="All-in-One" label="Funeral packages" />
                </div>
                <div className="py-1 px-1">
                  <TrustStat value="99-Year" label="Lease, extend till 2098" />
                </div>
              </div>

              {/* Address & Hours */}
              <div className="px-4 py-2.5 border-t border-[#E8DDF0]/50 space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#9B7DB8] shrink-0" />
                  <p className="text-[13px] text-[#2D1B4E] font-medium">950 Old Choa Chu Kang Road S699816</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#9B7DB8] shrink-0" />
                  <p className="text-[13px] text-[#2D1B4E] font-medium">8.30am – 5pm</p>
                </div>
              </div>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-1.5 rounded-3xl overflow-hidden">
              <div className="relative overflow-hidden rounded-xl">
                <img src={nirvanaBanner} alt="Nirvana Memorial Garden" className="w-full h-full object-cover object-center aspect-[4/3]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B4E]/8 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img src={nirvanaFuneral} alt="Funeral services" className="w-full h-full object-cover object-center aspect-[4/3]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B4E]/8 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img src={nirvanaPedestals} alt="Ancestral pedestals" className="w-full h-full object-cover object-center aspect-[4/3]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B4E]/8 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img src={nirvanaLegacy} alt="Legacy of love services" className="w-full h-full object-cover object-center aspect-[4/3]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B4E]/8 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-8 pb-5 px-3 bg-gradient-to-b from-[#F5EEF8] to-[#FAF7FC]">
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#2D1B4E] tracking-tight">
              Why Choose Nirvana?
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#7A6B8A] max-w-2xl mx-auto">
              Upholding core values of Love, Integrity, Focus, and Empathy (LIFE).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {whyChooseCards.map((b) => (
              <div
                key={b.title}
                className="rounded-xl bg-white/80 backdrop-blur-sm border border-[#DDD0EA] p-3 flex flex-col gap-1 shadow-[0_1px_4px_rgba(45,27,78,0.03)] hover:shadow-[0_4px_16px_rgba(155,125,184,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-1.5">
                  <b.icon className="h-4 w-4 text-[#9B7DB8] shrink-0" />
                  <h3 className="text-[13px] font-bold text-[#2D1B4E]">{b.title}</h3>
                </div>
                <p className="text-[12px] text-[#8A7A9A] leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-8 px-3 bg-[#FDFBFE]">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#2D1B4E] tracking-tight">
              Services Offered
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#7A6B8A] max-w-2xl mx-auto">
              Comprehensive memorial and funeral services — transparent pricing, personalised care.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {serviceCards.map((s) => (
              <div
                key={s.title}
                className="rounded-xl bg-white border border-[#DDD0EA] p-3.5 flex items-start gap-3 shadow-[0_1px_4px_rgba(45,27,78,0.03)] hover:shadow-[0_6px_20px_rgba(155,125,184,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5EEF8] to-[#EDE4F5] flex items-center justify-center shrink-0 mt-0.5">
                  <s.icon className="h-4 w-4 text-[#9B7DB8]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-[#2D1B4E] leading-snug">{s.title}</h3>
                  <p className="text-[12px] text-[#8A7A9A] leading-snug mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-founder Quote */}
      <section className="py-8 px-4 bg-gradient-to-b from-[#FAF7FC] to-[#F5EEF8]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-[#F5EEF8] to-[#EDE4F5] border border-[#DDD0EA] p-5 md:p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EDE4F5] to-[#DDD0EA] flex items-center justify-center mx-auto ring-2 ring-[#C9A84C]/15">
              <User className="h-7 w-7 text-[#9B7DB8]/60" />
            </div>
            <blockquote className="text-[16px] md:text-[18px] text-[#2D1B4E] font-medium italic leading-relaxed max-w-2xl mx-auto">
              "We're here to empower you to honour your loved ones with dignity, ensuring a lasting tribute that reflects their legacy."
            </blockquote>
            <div className="text-center">
              <p className="text-[15px] font-semibold text-[#2D1B4E]">Lina Pan</p>
              <p className="text-[13px] text-[#8A7A9A]">Co-founder & Managing Director (Certified Thanatologist)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funeral Service Packages */}
      <section className="py-8 px-4 bg-[#FDFBFE]">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <p className="text-[13px] md:text-[14px] text-[#C9A84C] italic font-medium">Nirvana Funeral Service Packages</p>
            <h2 className="text-[1.5rem] md:text-[2rem] font-bold text-[#2D1B4E] tracking-tight">
              Tailor Your Tribute
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#7A6B8A] max-w-2xl mx-auto">
              Peace of Mind in Your Time of Need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {funeralPackages.map((pkg) => (
              <div key={pkg.name} className="rounded-xl bg-white border border-[#DDD0EA] overflow-hidden text-center shadow-[0_1px_4px_rgba(45,27,78,0.03)] hover:shadow-[0_4px_16px_rgba(155,125,184,0.1)] hover:-translate-y-0.5 transition-all duration-200">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2.5">
                  <p className="text-[13px] font-bold text-[#2D1B4E]">{pkg.name} {pkg.chinese}</p>
                  <p className="text-[18px] font-extrabold text-[#9B7DB8] mt-1">{pkg.price}</p>
                  <p className="text-[10px] text-[#8A7A9A]">(inclusive of GST)</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              className="bg-gradient-to-r from-[#9B7DB8] to-[#8A6BAA] hover:from-[#8A6BAA] hover:to-[#7A5B9A] text-white font-semibold shadow-[0_2px_8px_rgba(155,125,184,0.25)]"
              onClick={() => setShowIntakeModal(true)}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Enquire About Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 px-4 bg-gradient-to-b from-[#F5EEF8] to-[#FAF7FC]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#2D1B4E]">{t("afterlifeProfile.needGuidance")}</h2>
          <p className="text-[17px] text-[#7A6B8A]">
            By pre-planning, you can alleviate financial stress, choose your preferences in advance, and offer peace of mind to your loved ones.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#9B7DB8] to-[#8A6BAA] hover:from-[#8A6BAA] hover:to-[#7A5B9A] text-white font-semibold shadow-[0_2px_8px_rgba(155,125,184,0.25)]"
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
        icon={<Heart className="h-5 w-5 text-[#9B7DB8]" />}
      />

      <Footer />
    </div>
  );
};

/* Data */

const whyChooseCards = [
  { icon: CreditCard, title: "0% Interest & Low Downpayment", desc: "Honour your loved ones with ease through 0% instalments and low downpayment options." },
  { icon: Building2, title: "Modern Facilities", desc: "Our modern facilities and compassionate services ensure a peaceful, respectful experience." },
  { icon: Package, title: "All-in-One Packages", desc: "All-inclusive funeral packages providing a seamless, supportive experience from planning to execution." },
  { icon: Calendar, title: "99-Year Lease", desc: "Peace of mind with a 99-year lease extending till 2098 for a lasting tribute." },
  { icon: HandHeart, title: "Caring for Life Philosophy", desc: "Upholding core values of Love, Integrity, Focus, and Empathy (LIFE) in everything we do." },
  { icon: Users, title: "All Faiths & Beliefs", desc: "Services tailored to suit all faiths and beliefs, preserving rich cultural heritage." },
];

const serviceCards = [
  { icon: Heart, title: "Funeral Service Packages", desc: "Customisable pre-arranged funeral plans for all budgets and faiths, supported by our professional team." },
  { icon: Flower2, title: "Columbarium Niche", desc: "Uniquely designed, spacious compartments at Nirvana Memorial Garden blending tradition and modernity." },
  { icon: Shield, title: "Ancestral Tablet & Pedestals", desc: "Prestigious pedestals on sanctified altars dedicated to deities and enlightened beings." },
  { icon: Sparkles, title: "Journey with Love", desc: "Asia's first signature spa treatment for the departed — a dignified, compassionate farewell." },
  { icon: Target, title: "Pre-Planning Services", desc: "Lock in today's prices and plan ahead to ease the burden on your family." },
  { icon: ClipboardList, title: "Personalised Arrangements", desc: "Customised services tailored to your family's wishes, cultural and religious traditions." },
];

const funeralPackages = [
  { name: "NV Grace", chinese: "富贵恩典", price: "$16,132", img: nvGraceImg },
  { name: "NV Longevity", chinese: "富贵安康", price: "$17,222", img: nvLongevityImg },
  { name: "NV Supreme", chinese: "富贵满堂", price: "$27,032", img: nvSupremeImg },
  { name: "NV Legacy", chinese: "富贵传承", price: "$29,212", img: nvLegacyImg },
];

/* Shared subcomponents */

const TrustStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-[20px] md:text-[24px] font-extrabold text-[#9B7DB8] tracking-tight">{value}</p>
    <p className="text-[10px] text-[#8A7A9A] font-medium mt-1 uppercase tracking-wide">{label}</p>
  </div>
);

export default AfterlifeProfile;