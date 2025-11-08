import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Bell, CheckCircle, MessageCircle } from "lucide-react";

export const MyClynicQPlugin = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">Coming Soon</Badge>
            <h2 className="text-3xl md:text-5xl font-bold">MyClynicQ Chatbot</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Never miss an appointment with automated reminders and instant support on WhatsApp
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-background to-secondary/30 border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left side - Benefits */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Chat on WhatsApp</h3>
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
                  <div className="p-6 rounded-lg bg-background/80 border border-border space-y-4">
                    <h4 className="font-semibold text-lg">How It Works</h4>
                    
                    <div className="space-y-4">
                      <StepItem number="1" text="Book an appointment on ClynicQ" />
                      <StepItem number="2" text="Get a confirmation message on WhatsApp" />
                      <StepItem number="3" text="Receive reminders before your visit" />
                      <StepItem number="4" text="Chat with MyClynicQ anytime for help" />
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                    <h4 className="font-semibold">Available Channels</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Badge>
                      <Badge variant="secondary">SMS</Badge>
                      <Badge variant="secondary">Web Chat</Badge>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline" disabled>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Stay connected with your healthcare journey. MyClynicQ keeps you informed and makes managing appointments effortless.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex gap-3">
    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StepItem = ({ number, text }: { number: string; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
      {number}
    </div>
    <p className="text-sm">{text}</p>
  </div>
);
