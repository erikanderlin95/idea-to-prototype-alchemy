import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceIntakeModal } from "@/components/ServiceIntakeModal";
import { Mic, Presentation, Award, Users, ClipboardList, UserCheck, MessageCircle, ChevronRight, Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SpeakerProfile = () => {
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#FDF6EE]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 space-y-3">
              <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#E8D5B5]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4860A] to-[#B8720A] flex items-center justify-center shadow-sm">
                  <Mic className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">Healthcare Speaker & Trainer</span>
              </div>

              <h1 className="text-[2.75rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                Ouch Pte Ltd
              </h1>

              <p className="text-[19px] text-[#5F6F7E] leading-relaxed max-w-lg">
                Corporate health talks, TCM wellness workshops, and healthcare training — led by Hui Fang.
              </p>

              <div className="flex items-center gap-0 pt-1">
                <div className="flex items-center gap-2 rounded-lg bg-[#FDF2E0] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4860A]/20 flex items-center justify-center text-[#D4860A]">
                    <ClipboardList className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">Enquire</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#D4860A]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#FDF2E0] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4860A]/20 flex items-center justify-center text-[#D4860A]">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">We Customise</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#D4860A]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#FDF2E0] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4860A]/20 flex items-center justify-center text-[#D4860A]">
                    <MessageCircle className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">We Deliver</span>
                </div>
              </div>

              <Button
                className="mt-3 bg-gradient-to-r from-[#D4860A] to-[#B8720A] hover:from-[#B8720A] hover:to-[#9C5F08] text-white font-semibold shadow-[0_2px_8px_rgba(212,134,10,0.3)] hover:shadow-[0_4px_14px_rgba(212,134,10,0.4)]"
                onClick={() => setShowIntakeModal(true)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Enquire Now
              </Button>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white border border-[#E8D5B5] shadow-[0_8px_32px_rgba(212,134,10,0.12)] overflow-hidden">
                <div className="px-5 py-3 bg-[#FDF6EE] border-b border-[#E8D5B5]">
                  <span className="text-[15px] font-bold text-[#12385B] uppercase tracking-widest">Capabilities</span>
                </div>
                <div className="p-3 space-y-0.5">
                  <CapabilityChip icon={<Mic className="h-4 w-4" />} label="TCM Health Talks" />
                  <CapabilityChip icon={<Presentation className="h-4 w-4" />} label="B2B & B2C Workshops" />
                  <CapabilityChip icon={<Award className="h-4 w-4" />} label="Corporate Training" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Bio Section */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                About Ouch Pte Ltd
              </h2>
              <p className="text-[17px] text-[#5F6F7E] leading-relaxed">
                Ouch Pte Ltd specialises in Traditional Chinese Medicine (TCM) education and wellness training for both corporate (B2B) and consumer (B2C) audiences. Founded with a mission to make TCM knowledge accessible and practical, Ouch delivers engaging workshops, health talks, and training programmes that bridge the gap between traditional wisdom and modern wellness needs.
              </p>
              <p className="text-[17px] text-[#5F6F7E] leading-relaxed">
                From corporate wellness days to community health events, Ouch tailors every session to the audience — covering topics like stress management through TCM, acupressure self-care, dietary therapy, and holistic health maintenance.
              </p>
              <p className="text-[17px] text-[#5F6F7E] leading-relaxed">
                Whether you're a company looking to enhance employee well-being or an individual curious about TCM, Ouch provides evidence-informed, interactive learning experiences that empower participants to take charge of their health.
              </p>
            </div>

            {/* Speaker Card */}
            <div className="lg:col-span-2">
              <Card className="border-[#E8D5B5] shadow-[0_4px_16px_rgba(212,134,10,0.08)] overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FDECD2] to-[#F5D9B0] flex items-center justify-center mb-3 ring-2 ring-[#D4860A]/20">
                      <User className="h-10 w-10 text-[#D4860A]/60" />
                    </div>
                    <h3 className="text-lg font-bold text-[#12385B]">Hui Fang</h3>
                    <p className="text-[14px] text-[#5F6F7E] mb-2">Lead Speaker & TCM Educator</p>
                    <p className="text-[14px] text-[#5F6F7E] leading-relaxed mb-4">
                      Hui Fang is a certified TCM practitioner and healthcare educator with years of experience delivering corporate wellness talks and community workshops. She specialises in making TCM concepts practical and relatable for modern audiences.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                      <span className="text-[11px] font-medium text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/20 rounded-full px-2.5 py-0.5">TCM Workshops</span>
                      <span className="text-[11px] font-medium text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/20 rounded-full px-2.5 py-0.5">Corporate Wellness</span>
                      <span className="text-[11px] font-medium text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/20 rounded-full px-2.5 py-0.5">Health Education</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-[#D4860A] to-[#B8720A] hover:from-[#B8720A] hover:to-[#9C5F08] text-white font-medium text-[14px]"
                      onClick={() => setShowIntakeModal(true)}
                    >
                      <MessageCircle className="mr-1.5 h-4 w-4" />
                      Connect with Hui Fang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                How It Works
              </h2>
              <div className="space-y-2.5">
                <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text="Submit your enquiry or event details" />
                <JourneyStep icon={<UserCheck className="h-4 w-4" />} text="Get a customised programme proposal" />
                <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text="Confirm and we deliver on-site" />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B7D8E]">
                Flexible scheduling. Tailored content for your audience — from corporate teams to community groups.
              </p>
              <Button
                variant="outline"
                className="mt-2 border-[#D4860A]/30 text-[#D4860A] hover:bg-[#FDF2E0]"
                onClick={() => setShowIntakeModal(true)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Start Your Enquiry
              </Button>
            </div>

            <div className="rounded-xl bg-white border border-[#E8D5B5] shadow-[0_4px_16px_rgba(212,134,10,0.08)] p-4 space-y-2.5 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8D5B5]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                  <span className="text-[14px] text-[#5F6F7E] ml-2 font-mono">speaker-enquiry</span>
                </div>
                <span className="text-[12px] text-[#5F6F7E]/60 italic">Example enquiry</span>
              </div>
              <div className="space-y-2 opacity-80">
                <FakeField label="Event Type" value="Corporate TCM Wellness Workshop" />
                <FakeField label="Audience" value="50 employees, finance team" />
                <FakeField label="Format" value="B2B — onsite, 90 min" />
                <FakeField label="Contact" value="+65 ●●●● ●●48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-8 px-4 bg-[#FDF6EE]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                Why Ouch Pte Ltd
              </h2>
              <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
                Healthcare education needs to be engaging, evidence-based, and relevant to your audience.
              </p>
              <p className="text-[18px] text-[#12385B] font-medium">What sets us apart:</p>
              <ul className="space-y-1.5 pl-1">
                {["TCM-focused expertise", "B2B & B2C programmes", "Customised to your industry", "Interactive & engaging delivery"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[17px] text-[#12385B]">
                    <Check className="h-4 w-4 text-[#D4860A] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
                Experience Comparison
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E8D5B5] bg-white p-3.5 space-y-2">
                  <h3 className="text-[16px] font-bold text-[#5F6F7E]">Generic Talks</h3>
                  <ul className="space-y-1">
                    {["One-size-fits-all", "No clinical backing", "Passive delivery", "Low engagement"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#5F6F7E]">
                        <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#D4860A]/20 bg-[#FDF2E0] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(212,134,10,0.1)]">
                  <h3 className="text-[16px] font-bold text-[#12385B]">Ouch Model</h3>
                  <ul className="space-y-1">
                    {["TCM-customised", "Evidence-based", "Interactive workshops", "Measurable outcomes"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#D4860A]" />
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
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">Available Programmes</p>
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight mt-0.5">Service Areas</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { icon: Mic, label: "TCM Health Talks" },
              { icon: Presentation, label: "B2B Corporate Workshops" },
              { icon: Users, label: "B2C Community Sessions" },
              { icon: Award, label: "Professional Training" },
            ].map((s) => (
              <div key={s.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E8D5B5] shadow-[0_1px_4px_rgba(212,134,10,0.05)] hover:shadow-[0_3px_12px_rgba(212,134,10,0.1)] hover:border-[#D4860A]/30 transition-all duration-200 cursor-default">
                <div className="w-7 h-7 rounded-md bg-[#FDF2E0] flex items-center justify-center">
                  <s.icon className="h-4 w-4 text-[#D4860A]" />
                </div>
                <span className="text-[15px] font-semibold text-[#12385B]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#12385B]">Ready to book a session?</h2>
          <p className="text-[17px] text-[#5F6F7E]">Submit your enquiry and we'll get back to you with a customised proposal.</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#D4860A] to-[#B8720A] hover:from-[#B8720A] hover:to-[#9C5F08] text-white font-semibold shadow-[0_2px_8px_rgba(212,134,10,0.3)]"
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
        concernLabel="What are you looking for? *"
        concernPlaceholder="e.g. TCM wellness workshop for 50 employees, corporate health talk..."
        disclaimerItems={[
          "Submitting this form does not confirm a booking.",
          "Ouch Pte Ltd will contact you to discuss your requirements.",
          "Programme details and pricing will be confirmed separately.",
          "ClynicQ facilitates the connection only.",
        ]}
        icon={<Mic className="h-5 w-5 text-[#D4860A]" />}
      />

      <Footer />
    </div>
  );
};

const CapabilityChip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#FDF2E0] transition-colors duration-200">
    <div className="w-8 h-8 rounded-lg bg-[#FDF2E0] flex items-center justify-center text-[#D4860A] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-semibold text-[#12385B] leading-tight">{label}</p>
  </div>
);

const JourneyStep = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-[#FDF2E0] flex items-center justify-center text-[#D4860A] flex-shrink-0">
      {icon}
    </div>
    <p className="text-[17px] font-medium text-[#12385B]">{text}</p>
  </div>
);

const FakeField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="text-[14px] font-medium text-[#5F6F7E] uppercase tracking-wider">{label}</span>
    <div className="h-8 rounded-md bg-[#FDF6EE] border border-[#E8D5B5] flex items-center px-3">
      <span className="text-[15px] text-[#12385B]">{value}</span>
    </div>
  </div>
);

export default SpeakerProfile;
