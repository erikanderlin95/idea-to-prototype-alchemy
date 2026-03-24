import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, MessageSquare, CheckCircle, MessageCircle, Sparkles } from "lucide-react";

export const MyClynicQPlugin = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #F6F1FF 0%, #EEF7FF 50%, #EAFBFF 100%)" }} />
      
      {/* Subtle glow accents */}
      <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-[#C4B5FD] opacity-[0.07] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-64 h-64 rounded-full bg-[#67E8F9] opacity-[0.06] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#A7F3D0] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-[#667085] bg-white/60 border border-white/50">
            Optional Add-On
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1B2430]">
            Phase 2: WhatsApp Automation
          </h2>
          <p className="text-sm text-[#667085]">
            A simpler way for clinics to manage bookings, reminders, and patient updates.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* LEFT — Hero Card */}
          <div className="rounded-3xl bg-white/60 border border-white/50 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 space-y-6">
            {/* WhatsApp icon with glow */}
            <div className="relative w-fit">
              <div className="absolute inset-0 bg-[#25D366]/20 rounded-2xl blur-xl" />
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1B2430]">Chat on WhatsApp</h3>
              <p className="text-sm text-[#667085] mt-1">Automated support for appointments, reminders, and queue updates.</p>
            </div>

            {/* Compact feature list */}
            <div className="space-y-3 pt-2">
              <FeatureRow icon={<Calendar className="h-4 w-4" />} label="Booking Support" />
              <FeatureRow icon={<Bell className="h-4 w-4" />} label="Smart Reminders" />
              <FeatureRow icon={<MessageSquare className="h-4 w-4" />} label="Instant Replies" />
              <FeatureRow icon={<CheckCircle className="h-4 w-4" />} label="Queue Updates" />
            </div>
          </div>

          {/* RIGHT — Compact Info Card */}
          <div className="rounded-3xl bg-white/60 border border-white/50 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 space-y-8">
            
            {/* How it works */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#1B2430] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#6D5EF5]" />
                How it works
              </h4>
              <div className="space-y-2.5">
                <StepRow number="1" text="Book on ClynicQ" />
                <StepRow number="2" text="Receive WhatsApp updates" />
                <StepRow number="3" text="Continue support via chat" />
              </div>
            </div>

            {/* Channel */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#1B2430]">Channel</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#25D366]/10 text-[#128C7E] border-[#25D366]/30 hover:bg-[#25D366]/15">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  WhatsApp
                </Badge>
                <Badge variant="secondary" className="opacity-50">SMS (later)</Badge>
                <Badge variant="secondary" className="opacity-50">Web Chat (later)</Badge>
              </div>
            </div>

            {/* Status */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[#6D5EF5]/10 text-[#6D5EF5] border border-[#6D5EF5]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6D5EF5] animate-pulse" />
                Available in Phase 2
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureRow = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-lg bg-[#6D5EF5]/8 border border-[#6D5EF5]/15 flex items-center justify-center text-[#6D5EF5] flex-shrink-0">
      {icon}
    </div>
    <span className="text-sm font-medium text-[#1B2430]">{label}</span>
  </div>
);

const StepRow = ({ number, text }: { number: string; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#33C7D8] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
      {number}
    </div>
    <span className="text-sm text-[#667085]">{text}</span>
  </div>
);
