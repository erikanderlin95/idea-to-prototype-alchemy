import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Users, MessageCircle,
  ChevronRight, Heart, Lightbulb, HandHeart, ShieldCheck, BookOpen, Phone,
} from "lucide-react";

import cflLogo from "@/assets/caring-for-life-logo.jpg";
import alexYeo from "@/assets/alex-yeo.jpg";

const WHATSAPP_URL = "https://wa.me/6592305967?text=" + encodeURIComponent("Hi Alex, I'd like to learn more about Caring for Life SG programmes.");

/* Caring for Life SG palette (from official site) */
const CFL = {
  primary: "#7D8D54",       // olive green (brand)
  primaryDark: "#5F6E3E",
  accent: "#99CC00",        // lime accent
  ribbonTeal: "#5BC4D1",
  ribbonPurple: "#5E4FA2",
  bgSoft: "#F4F5EC",
  bgSofter: "#FAFBF4",
  border: "#D8DCC2",
  text: "#2F3A20",
  textMuted: "#6B7359",
};

const CaringForLifeProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, #ffffff, #ffffff, ${CFL.bgSoft})` }} />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 space-y-3">
              <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-1.5 pr-4 py-1 shadow-sm" style={{ boxShadow: `0 0 0 1px ${CFL.border}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ background: `linear-gradient(135deg, ${CFL.primary}, ${CFL.primaryDark})` }}>
                  <Heart className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[11px] md:text-[15px] font-semibold uppercase tracking-widest" style={{ color: CFL.textMuted }}>
                  Mental Health & Social Support
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img src={cflLogo} alt="Caring for Life SG logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl object-cover shadow-sm" style={{ boxShadow: `0 0 0 1px ${CFL.border}` }} />
                <h1 className="text-[2rem] md:text-[3.1rem] lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight" style={{ color: CFL.text }}>
                  Caring for Life SG
                </h1>
              </div>

              <div className="flex items-center gap-0 pt-1 flex-wrap gap-y-1.5">
                <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: CFL.bgSoft }}>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center" style={{ background: `${CFL.primary}33`, color: CFL.primaryDark }}>
                    <ShieldCheck className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold" style={{ color: CFL.text }}>Training &amp; Intervention</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 mx-0.5 md:mx-1 flex-shrink-0" style={{ color: `${CFL.primary}66` }} />
                <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: CFL.bgSoft }}>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center" style={{ background: `${CFL.primary}33`, color: CFL.primaryDark }}>
                    <HandHeart className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-bold" style={{ color: CFL.text }}>Support &amp; Outreach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + Pillars */}
      <section className="py-6 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-2 items-stretch">
            {/* About box */}
            <div className="rounded-3xl bg-white overflow-hidden flex flex-col" style={{ border: `1px solid ${CFL.border}`, boxShadow: `0 8px 32px ${CFL.primary}22` }}>
              <div className="px-4 py-3" style={{ background: `linear-gradient(135deg, ${CFL.bgSoft}, ${CFL.bgSofter})`, boxShadow: `0 1px 3px ${CFL.primary}14` }}>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-extrabold tracking-tight leading-snug text-left" style={{ color: CFL.text }}>
                  Suicide Prevention Is Everyone's Business
                </h3>
                <p className="text-[13px] md:text-[14px] mt-1 leading-tight text-left" style={{ color: CFL.textMuted }}>
                  A Singapore charity promoting understanding and a network-based approach to saving lives and building resilience.
                </p>
              </div>
              <div className="px-2.5 py-1 grid grid-cols-2 gap-0 flex-1 items-center">
                <div className="py-1 px-1" style={{ borderRight: `1px solid ${CFL.border}80`, borderBottom: `1px solid ${CFL.border}80` }}>
                  <TrustStat value="Advocacy" label="Building awareness and reducing stigma around mental health" />
                </div>
                <div className="py-1 px-1" style={{ borderBottom: `1px solid ${CFL.border}80` }}>
                  <TrustStat value="Training" label="Equipping people and organisations with practical intervention knowledge and response skills" />
                </div>
                <div className="py-1 px-1" style={{ borderRight: `1px solid ${CFL.border}80` }}>
                  <TrustStat value="Education" label="Delivering talks and programmes that encourage early help-seeking and understanding" />
                </div>
                <div className="py-1 px-1">
                  <TrustStat value="Resilience" label="Connecting individuals with support networks and resources that strengthen long-term wellbeing" />
                </div>
              </div>
            </div>

            {/* About text panel */}
            <div className="rounded-3xl p-5 md:p-6 flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${CFL.primary}, ${CFL.primaryDark})` }}>
              <p className="text-[15px] md:text-[17px] text-white leading-relaxed font-medium">
                Caring for Life is a Singapore charity dedicated to strengthening mental wellness through suicide prevention, public education, advocacy, and community-based support that builds resilience and encourages early intervention.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-white/15 text-white backdrop-blur-sm">Mental Wellness</span>
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-white/15 text-white backdrop-blur-sm">Crisis Prevention</span>
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-white/15 text-white backdrop-blur-sm">Public Education</span>
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-white/15 text-white backdrop-blur-sm">Support Referrals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-6 px-3" style={{ background: CFL.bgSofter }}>
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold tracking-tight" style={{ color: CFL.text }}>
              What We Offer
            </h2>
            <p className="text-[14px] md:text-[15px] max-w-2xl mx-auto" style={{ color: CFL.textMuted }}>
              Training, education, and resources that build resilience and strengthen wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {serviceCards.map((s) => (
              <div
                key={s.title}
                className="rounded-xl bg-white p-3.5 flex items-start gap-3 transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `1px solid ${CFL.border}`, boxShadow: `0 1px 4px ${CFL.primary}0a` }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `linear-gradient(135deg, ${CFL.bgSoft}, ${CFL.bgSofter})` }}>
                  <s.icon className="h-4 w-4" style={{ color: CFL.primaryDark }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold leading-snug" style={{ color: CFL.text }}>{s.title}</h3>
                  <p className="text-[12px] leading-snug mt-0.5" style={{ color: CFL.textMuted }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead / Connect block */}
      <section className="py-6 px-4" style={{ background: CFL.bgSoft }}>
        <div className="max-w-5xl mx-auto space-y-1 text-center">
          <p className="text-[15px] md:text-[17px] font-bold uppercase tracking-widest" style={{ color: CFL.primaryDark }}>
            Your Partner Contact
          </p>

          <div className="pt-3 flex justify-center">
            <div className="group rounded-2xl bg-white p-5 transition-all duration-300 flex flex-col items-center text-center w-full max-w-md" style={{ border: `1px solid ${CFL.border}`, boxShadow: `0 2px 8px ${CFL.primary}10` }}>
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2.5 bg-white" style={{ boxShadow: `0 0 0 2px ${CFL.primary}33` }}>
                <img src={alexYeo} alt="Alex Yeo" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-[16px] font-semibold leading-tight" style={{ color: CFL.text }}>Alex Yeo</h3>
              <p className="text-[14px] mt-0.5" style={{ color: CFL.textMuted }}>Executive Director &amp; Founding Member</p>
              <p className="text-[13px] mt-2 leading-relaxed text-left" style={{ color: CFL.textMuted }}>
                Alex is a founding member of Caring for Life (CFL) and currently serves as its Executive Director. A dedicated Mental Health Advocate since 2015, he is passionate about developing innovative community-based approaches that strengthen Singapore's mental health ecosystem.
              </p>
              <p className="text-[13px] mt-2 leading-relaxed text-left" style={{ color: CFL.textMuted }}>
                His experience spans both the public and non-profit sectors, including serving on the National Council of Social Service (NCSS) mental health team, co-founding the Mental Connect directory, and leading suicide prevention initiatives through Caring for Life.
              </p>

              <div className="w-full mt-3 flex flex-wrap justify-center gap-1.5">
                {qualifications.map((q) => (
                  <span key={q} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white" style={{ color: CFL.primaryDark, border: `1px solid ${CFL.border}` }}>
                    {q}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: `${CFL.primary}26`, color: CFL.primaryDark }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: CFL.primary }} />
                  Active
                </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-7 px-3.5 text-[14px] rounded-full text-white active:scale-[0.96] transition-all shadow-sm gap-1 font-medium"
                  style={{ background: CFL.primary }}
                >
                  <MessageCircle className="h-3 w-3" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const serviceCards = [
  { icon: ShieldCheck, title: "Intervention Training", desc: "Equipping individuals and groups to recognise risk and respond safely." },
  { icon: BookOpen, title: "Public Education Talks", desc: "Destigmatising mental wellness and encouraging help-seeking." },
  { icon: Phone, title: "Resource Referrals", desc: "Connecting people to appropriate support across the community." },
  { icon: Users, title: "Peer Programmes", desc: "Building a resilient, caring network around mental wellness." },
  { icon: Heart, title: "Advocacy", desc: "Promoting greater understanding of prevention in Singapore." },
  { icon: Lightbulb, title: "Workshops & Resources", desc: "Practical tools that strengthen resilience." },
];

const qualifications = [
  "Master of Management",
  "Graduate Diploma in Non-profit Management",
  "Red Cross PFA-Advance Certified",
  "ASIST Certified",
  "ACLP Certified",
];

const TrustStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-[20px] md:text-[24px] font-extrabold tracking-tight" style={{ color: CFL.primaryDark }}>{value}</p>
    <p className="text-[10px] font-medium mt-1 uppercase tracking-wide" style={{ color: CFL.textMuted }}>{label}</p>
  </div>
);

export default CaringForLifeProfile;
