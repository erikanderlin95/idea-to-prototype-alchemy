import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, CheckCircle, Sparkles, Radio, CalendarCheck } from "lucide-react";
import { MyClynicQIcon } from "@/components/icons/MyClynicQIcon";

export const MyClynicQPlugin = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #F3ECFF 0%, #EAF6FF 50%, #E6FBFF 100%)" }} />
      <div className="absolute top-1/3 left-[15%] w-80 h-80 rounded-full bg-[#C4B5FD] opacity-[0.07] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[15%] w-72 h-72 rounded-full bg-[#67E8F9] opacity-[0.06] blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#667085] bg-white/60 border border-white/40 backdrop-blur-sm">
            Optional Add-On
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1B2430] tracking-tight">
            Phase 2: WhatsApp Automation
          </h2>
          <p className="text-sm text-[#555E6C] max-w-xl mx-auto">
            Automated updates, reminders, and communication to support both patients and clinic teams.
          </p>
        </div>

        {/* 2-Column */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 max-w-4xl mx-auto items-start">

          {/* LEFT — Experience Card */}
          <div
            className="rounded-3xl p-8 md:p-10 space-y-8"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 14px 44px rgba(0,0,0,0.07)",
            }}
          >
            {/* Logo only — no WhatsApp icon */}
            <MyClynicQIcon size="md" />

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1B2430]"><span>My</span><span className="bg-gradient-to-r from-[#954BED] via-[#4993ED] to-[#1AB2EA] bg-clip-text text-transparent">Clynic</span><span className="bg-gradient-to-r from-[#1AB2EA] to-[#26C3EC] bg-clip-text text-transparent">Q</span> on WhatsApp</h3>
              <p className="text-sm text-[#555E6C] mt-2 leading-relaxed">
                Stay updated on appointments, queue progress, and clinic communication — without needing to call or follow up.
              </p>
            </div>

            {/* Feature Blocks */}
            <div className="space-y-5 pt-1">
              <FeatureBlock
                icon={<Radio className="h-4 w-4" />}
                title="Queue Updates & Alerts"
                desc="Get notified about your queue position, number ahead, and any delays."
              />
              <FeatureBlock
                icon={<CalendarCheck className="h-4 w-4" />}
                title="Booking Confirmations & Reminders"
                desc="Receive confirmations and reminders for upcoming visits."
              />
              <FeatureBlock
                icon={<MessageSquare className="h-4 w-4" />}
                title="Simple Actions via Chat"
                desc="Check-in, cancel, or contact the clinic directly through WhatsApp."
              />
              <FeatureBlock
                icon={<Bell className="h-4 w-4" />}
                title="Clinic Updates"
                desc="Receive important announcements, changes, or delay notifications."
              />
            </div>
          </div>

          {/* RIGHT — Structure Card */}
          <div
            className="rounded-3xl p-8 md:p-10 space-y-9"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
            }}
          >
            {/* How it works */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#1B2430] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#6D5EF5]" />
                How it works
              </h4>
              <div className="space-y-3.5">
                <StepRow number="1" text="Book or join queue through ClynicQ" />
                <StepRow number="2" text="MyClynicQ sends updates via WhatsApp" />
                <StepRow number="3" text="Stay informed without manual follow-up" />
              </div>
            </div>

            {/* Channel */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#1B2430]">Channel</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#25D366]/12 text-[#128C7E] border-[#25D366]/25 hover:bg-[#25D366]/18 font-medium">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  WhatsApp
                </Badge>
                <Badge variant="secondary" className="opacity-35 font-normal">SMS (later)</Badge>
                <Badge variant="secondary" className="opacity-35 font-normal">Web Chat (later)</Badge>
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white"
                style={{ background: "linear-gradient(135deg, #6D5EF5, #33C7D8)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                Available in Phase 2
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureBlock = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex gap-3.5">
    <div className="h-9 w-9 rounded-xl bg-[#6D5EF5]/10 border border-[#6D5EF5]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
      <div className="text-[#5B4ED4]">{icon}</div>
    </div>
    <div>
      <span className="text-[13px] font-semibold text-[#1B2430] block">{title}</span>
      <span className="text-xs text-[#555E6C] leading-relaxed block mt-0.5">{desc}</span>
    </div>
  </div>
);

const StepRow = ({ number, text }: { number: string; text: string }) => (
  <div className="flex items-center gap-3.5">
    <div
      className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
      style={{ background: "linear-gradient(135deg, #6D5EF5, #33C7D8)" }}
    >
      {number}
    </div>
    <span className="text-sm text-[#555E6C]">{text}</span>
  </div>
);
