import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Bell, CheckCircle, MessageCircle, Sparkles } from "lucide-react";
import { MyClynicQIcon } from "@/components/icons/MyClynicQIcon";

export const MyClynicQPlugin = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background decorations with AI gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-ai-purple/10 via-ai-blue/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--ai-cyan)/0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(var(--ai-violet)/0.12),transparent_40%)]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="space-y-10">
          <div className="text-center mb-10 animate-fade-in">
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-ai-purple/15 to-ai-cyan/15 border-ai-purple/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-3">
              <MyClynicQIcon size="lg" />
              <h2 className="text-3xl md:text-5xl font-bold">
                My<span className="bg-gradient-to-r from-ai-purple to-ai-cyan bg-clip-text text-transparent">ClynicQ</span>
              </h2>
            </div>
            <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
              Never miss an appointment with automated reminders and instant support on WhatsApp
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-scale-in">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-ai-purple/5 via-ai-blue/5 to-ai-cyan/5 border-2 border-ai-purple/20 hover:border-ai-blue/40 shadow-[0_8px_32px_hsl(var(--ai-purple)/0.15)] hover:shadow-[0_12px_40px_hsl(var(--ai-blue)/0.2)] transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left side - Benefits */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        Chat on WhatsApp
                      </h3>
                      <p className="text-sm text-muted-foreground">Your health assistant, always available</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <BenefitItem
                      icon={<Calendar className="h-5 w-5" />}
                      title="Easy Booking"
                      description="Book, reschedule, or cancel appointments via chat"
                    />
                    <BenefitItem
                      icon={<Bell className="h-5 w-5" />}
                      title="Smart Reminders"
                      description="Get timely reminders so you never miss a visit"
                    />
                    <BenefitItem
                      icon={<MessageSquare className="h-5 w-5" />}
                      title="Instant Answers"
                      description="Ask questions about your appointment or clinic anytime"
                    />
                    <BenefitItem
                      icon={<CheckCircle className="h-5 w-5" />}
                      title="Queue Updates"
                      description="Know your queue position without calling the clinic"
                    />
                  </div>
                </div>

                {/* Right side - How it works */}
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-gradient-to-br from-ai-blue/8 to-ai-indigo/5 border border-ai-blue/20 shadow-[0_4px_16px_hsl(var(--ai-blue)/0.1)] space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-ai-purple/15 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-ai-purple" />
                      </div>
                      How It Works
                    </h4>
                    
                    <div className="space-y-4">
                      <StepItem number="1" text="Book an appointment on ClynicQ" />
                      <StepItem number="2" text="Get a confirmation message on WhatsApp" />
                      <StepItem number="3" text="Receive reminders before your visit" />
                      <StepItem number="4" text="Chat with MyClynicQ anytime for help" />
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-br from-ai-cyan/10 via-ai-blue/5 to-ai-violet/5 border border-ai-cyan/30 shadow-inner space-y-3">
                    <h4 className="font-semibold">Available Channels</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-[#25D366]/15 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Badge>
                      <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors">SMS</Badge>
                      <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors">Web Chat</Badge>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-ai-purple to-ai-cyan hover:opacity-90 transition-opacity shadow-lg" 
                    disabled
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-purple/5 border border-ai-purple/20">
              <div className="h-2 w-2 rounded-full bg-ai-purple animate-pulse" />
              <p className="text-sm text-muted-foreground">
                Stay connected with your healthcare journey. MyClynicQ keeps you informed and makes managing appointments effortless.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex gap-3 group cursor-default">
    <div className="relative">
      <div className="absolute inset-0 bg-ai-blue/20 rounded-md blur-sm group-hover:blur-md transition-all" />
      <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-ai-blue/20 to-ai-cyan/20 border border-ai-blue/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <div className="text-ai-blue">
          {icon}
        </div>
      </div>
    </div>
    <div>
      <p className="font-medium text-sm group-hover:text-ai-blue transition-colors">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StepItem = ({ number, text }: { number: string; text: string }) => (
  <div className="flex items-center gap-3 group cursor-default">
    <div className="relative">
      <div className="absolute inset-0 bg-ai-purple/30 rounded-full blur-sm group-hover:blur-md transition-all" />
      <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-ai-purple to-ai-cyan text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
        {number}
      </div>
    </div>
    <p className="text-sm group-hover:text-foreground/90 transition-colors">{text}</p>
  </div>
);
