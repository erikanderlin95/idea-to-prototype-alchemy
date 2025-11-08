import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Bell, BarChart3, MessageCircle, Zap } from "lucide-react";

export const MyClynicQPlugin = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">Phase 2 Plugin</Badge>
            <h2 className="text-3xl md:text-5xl font-bold">MyClynicQ Chatbot</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Automated patient engagement through WhatsApp, SMS, and embedded chat
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-background to-secondary/30 border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left side - Features */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Conversational AI</h3>
                      <p className="text-sm text-muted-foreground">Powered by intelligent automation</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FeatureItem
                      icon={<Calendar className="h-5 w-5" />}
                      title="Smart Booking"
                      description="Handle appointments, rescheduling, and FAQs through chat"
                    />
                    <FeatureItem
                      icon={<Bell className="h-5 w-5" />}
                      title="Automated Reminders"
                      description="Send appointment reminders and follow-up surveys"
                    />
                    <FeatureItem
                      icon={<MessageSquare className="h-5 w-5" />}
                      title="24/7 Support"
                      description="Instant responses to patient queries anytime"
                    />
                    <FeatureItem
                      icon={<BarChart3 className="h-5 w-5" />}
                      title="Queue Status"
                      description="Real-time queue updates via WhatsApp"
                    />
                  </div>
                </div>

                {/* Right side - Integration Info */}
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-background/80 border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">Integration Points</h4>
                      <Badge variant="outline" className="bg-accent/10">
                        <Zap className="h-3 w-3 mr-1" />
                        Seamless
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <IntegrationPoint module="Queue Module" status="Connected" />
                      <IntegrationPoint module="Booking Module" status="Connected" />
                      <IntegrationPoint module="Connect Module" status="Connected" />
                      <IntegrationPoint module="Appointment Sync" status="Via Webhooks" />
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                    <h4 className="font-semibold">Channel Support</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Badge>
                      <Badge variant="secondary">SMS</Badge>
                      <Badge variant="secondary">Web Chat</Badge>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-muted/50 border border-border">
                    <h4 className="font-semibold mb-2">Data Compliance</h4>
                    <p className="text-sm text-muted-foreground">
                      PDPA-compliant storage: name, mobile, visit type, and appointment date only
                    </p>
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
              MyClynicQ extends ClynicQ's patient engagement capabilities through conversational AI, 
              enabling automated post-booking care and reducing no-shows through smart reminders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
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

const IntegrationPoint = ({ module, status }: { module: string; status: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-muted-foreground">{module}</span>
    <span className="text-xs font-medium text-primary">{status}</span>
  </div>
);
