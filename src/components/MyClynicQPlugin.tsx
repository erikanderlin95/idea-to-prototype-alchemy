import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, MessageSquare, CheckCircle, MessageCircle, Sparkles } from "lucide-react";
import { MyClynicQIcon } from "@/components/icons/MyClynicQIcon";

export const MyClynicQPlugin = () => {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Deep premium gradient */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #F3ECFF 0%, #EAF6FF 50%, #E6FBFF 100%)" }} />
      
      {/* Subtle radial glows */}
      <div className="absolute top-1/3 left-[15%] w-80 h-80 rounded-full bg-[#C4B5FD] opacity-[0.08] blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[15%] w-72 h-72 rounded-full bg-[#67E8F9] opacity-[0.07] blur-[90px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#667085] bg-white/60 border border-white/40 backdrop-blur-sm">
            Optional Add-On
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1B2430] tracking-tight">
            Phase 2: WhatsApp Automation
          </h2>
          <p className="text-sm text-[#667085] max-w-lg mx-auto">
            A simpler way for clinics to manage bookings, reminders, and patient updates.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-8 max-w-4xl mx-auto items-start">
          
          {/* LEFT — Primary Feature Card */}
          <div
            className="rounded-3xl p-8 md:p-10 space-y-7"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* Top row: logo + WhatsApp icon */}
            <div className="flex items-center gap-4">
              <MyClynicQIcon size="md" />
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl blur-xl" style={{ boxShadow: "0 10px 40px rgba(37, 211, 102, 0.15)" }} />
                <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1B2430]">MyClynicQ on WhatsApp</h3>
              <p className="text-sm text-[#667085] mt-1.5">Your automated clinic assistant for bookings, reminders, and updates.</p>
            </div>

            {/* Feature list */}
            <div className="space-y-4 pt-1">
              <FeatureRow icon={<Calendar className="h-4 w-4" />} label="Booking Support" />
              <FeatureRow icon={<Bell className="h-4 w-4" />} label="Smart Reminders" />
              <FeatureRow icon={<MessageSquare className="h-4 w-4" />} label="Instant Replies" />
              <FeatureRow icon={<CheckCircle className="h-4 w-4" />} label="Queue Updates" />
            </div>
          </div>

          {/* RIGHT — Compact Info Card */}
          <div
            className="rounded-3xl p-8 md:p-10 space-y-8"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
            }}
          >
            {/* How it works */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#1B2430] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#6D5EF5]" />
                How it works
              </h4>
              <div className="space-y-3">
                <StepRow number="1" text="Book on ClynicQ" />
                <StepRow number="2" text="Receive WhatsApp updates" />
                <StepRow number="3" text="Chat with MyClynicQ anytime" />
              </div>
            </div>

            {/* Channel */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#1B2430]">Channel</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#25D366]/12 text-[#128C7E] border-[#25D366]/25 hover:bg-[#25D366]/18 font-medium">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  WhatsApp
                </Badge>
                <Badge variant="secondary" className="opacity-40 font-normal">SMS (later)</Badge>
                <Badge variant="secondary" className="opacity-40 font-normal">Web Chat (later)</Badge>
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white"
                style={{ background: "linear-gradient(135deg, #6D5EF5, #33C7D8)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                Available in Phase 2 Add-On
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureRow = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3.5">
    <div className="h-9 w-9 rounded-xl bg-[#6D5EF5]/10 border border-[#6D5EF5]/15 flex items-center justify-center flex-shrink-0">
      <div className="text-[#5B4ED4]">{icon}</div>
    </div>
    <span className="text-sm font-medium text-[#1B2430]">{label}</span>
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
    <span className="text-sm text-[#667085]">{text}</span>
  </div>
);
