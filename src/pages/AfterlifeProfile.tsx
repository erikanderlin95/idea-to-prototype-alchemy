import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import { Heart, Flower2, Shield, Users, ClipboardList, UserCheck, MessageCircle, ChevronRight, Check, X } from "lucide-react";

const AfterlifeProfile = () => {
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
                <span className="text-[15px] font-semibold text-[#5F6F7E] uppercase tracking-widest">After Life Services</span>
              </div>

              <h1 className="text-[2.75rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold text-[#12385B] leading-[1.1] tracking-tight">
                Nirvana
              </h1>

              <p className="text-[19px] text-[#5F6F7E] leading-relaxed max-w-lg">
                Comprehensive memorial planning, bereavement support, and dignified afterlife services for families.
              </p>

              <div className="flex items-center gap-0 pt-1">
                <div className="flex items-center gap-2 rounded-lg bg-[#F0E6F8] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <ClipboardList className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">Reach Out</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B5CB8]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#F0E6F8] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">We Guide You</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B5CB8]/40 mx-1 flex-shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-[#F0E6F8] px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CB8]/20 flex items-center justify-center text-[#8B5CB8]">
                    <MessageCircle className="h-3 w-3" />
                  </div>
                  <span className="text-[15px] font-bold text-[#12385B]">We Support</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white border border-[#D4BFE8] shadow-[0_8px_32px_rgba(139,92,184,0.12)] overflow-hidden">
                <div className="px-5 py-3 bg-[#F6F0FA] border-b border-[#D4BFE8]">
                  <span className="text-[15px] font-bold text-[#12385B] uppercase tracking-widest">Services</span>
                </div>
                <div className="p-3 space-y-0.5">
                  <CapabilityChip icon={<Flower2 className="h-4 w-4" />} label="Memorial Services" />
                  <CapabilityChip icon={<Shield className="h-4 w-4" />} label="Pre-Planning" />
                  <CapabilityChip icon={<Heart className="h-4 w-4" />} label="Bereavement Support" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Journey */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
                How It Works
              </h2>
              <div className="space-y-2.5">
                <JourneyStep icon={<ClipboardList className="h-4 w-4" />} text="Reach out with your needs or enquiry" />
                <JourneyStep icon={<UserCheck className="h-4 w-4" />} text="Get guided through available options" />
                <JourneyStep icon={<MessageCircle className="h-4 w-4" />} text="Continuous support throughout the process" />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B7D8E]">
                Compassionate guidance every step of the way. No pressure — just support when you need it.
              </p>
            </div>

            <div className="rounded-xl bg-white border border-[#D4BFE8] shadow-[0_4px_16px_rgba(139,92,184,0.08)] p-4 space-y-2.5 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#D4BFE8]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(0,50%,65%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(45,60%,60%)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(155,45%,55%)]" />
                  <span className="text-[14px] text-[#5F6F7E] ml-2 font-mono">service-enquiry</span>
                </div>
                <span className="text-[12px] text-[#5F6F7E]/60 italic">Example enquiry</span>
              </div>
              <div className="space-y-2 opacity-80">
                <FakeField label="Service Type" value="Memorial Planning" />
                <FakeField label="Preferred Arrangement" value="Traditional / Modern" />
                <FakeField label="Timeline" value="Flexible" />
                <FakeField label="Contact" value="+65 ●●●● ●●48" />
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
                Why Nirvana
              </h2>
              <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
                End-of-life planning deserves dignity, compassion, and professional guidance.
              </p>
              <p className="text-[18px] text-[#12385B] font-medium">What sets us apart:</p>
              <ul className="space-y-1.5 pl-1">
                {["Established & trusted provider", "Comprehensive service range", "Family-centred approach"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[17px] text-[#12385B]">
                    <Check className="h-4 w-4 text-[#8B5CB8] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
                Service Comparison
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#D4BFE8] bg-white p-3.5 space-y-2">
                  <h3 className="text-[16px] font-bold text-[#5F6F7E]">Without Guidance</h3>
                  <ul className="space-y-1">
                    {["Overwhelming options", "No clear process", "Emotional burden", "Last-minute decisions"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#5F6F7E]">
                        <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#8B5CB8]/20 bg-[#F0E6F8] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(139,92,184,0.1)]">
                  <h3 className="text-[16px] font-bold text-[#12385B]">Nirvana Model</h3>
                  <ul className="space-y-1">
                    {["Guided planning", "Clear process", "Emotional support", "Advance arrangements"].map((item) => (
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

      {/* Services */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              Available Services
            </p>
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight mt-0.5">
              Service Areas
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { icon: Flower2, label: "Memorial Services" },
              { icon: Shield, label: "Pre-Planning" },
              { icon: Heart, label: "Bereavement Support" },
              { icon: Users, label: "Family Counselling" },
            ].map((s) => (
              <div key={s.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#D4BFE8] shadow-[0_1px_4px_rgba(139,92,184,0.05)] hover:shadow-[0_3px_12px_rgba(139,92,184,0.1)] hover:border-[#8B5CB8]/30 transition-all duration-200 cursor-default">
                <div className="w-7 h-7 rounded-md bg-[#F0E6F8] flex items-center justify-center">
                  <s.icon className="h-4 w-4 text-[#8B5CB8]" />
                </div>
                <span className="text-[15px] font-semibold text-[#12385B]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ManagedCareModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        clinicName="Nirvana"
        source="organization_profile"
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
