import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Bell, BarChart3, MessageCircle, Zap, Database, Webhook, Shield, Settings } from "lucide-react";
import { ChatbotIcon } from "@/components/icons/FeatureIcons";

export const MyClynicQStaffPanel = () => {
  return (
    <Card className="relative p-8 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 border-2 border-primary/20 shadow-[0_8px_32px_hsl(var(--primary)/0.15)]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,hsl(var(--primary)/0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,hsl(var(--accent)/0.08),transparent_70%)] pointer-events-none" />
      
      <div className="space-y-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChatbotIcon size="md" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">
                  My<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ClynicQ</span> Plugin
                </h3>
                <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  Phase 2
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Conversational AI for automated patient engagement
              </p>
            </div>
          </div>
          <Button variant="outline" className="border-primary/30 hover:bg-primary/5" disabled>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              Capabilities
            </h4>
            <div className="space-y-3">
              <CapabilityItem
                icon={<Calendar className="h-4 w-4" />}
                title="Smart Booking"
                description="Handle appointments, rescheduling, and FAQs"
              />
              <CapabilityItem
                icon={<Bell className="h-4 w-4" />}
                title="Automated Reminders"
                description="Post-booking, pre-visit, and follow-up messages"
              />
              <CapabilityItem
                icon={<MessageSquare className="h-4 w-4" />}
                title="24/7 Chat Support"
                description="Instant responses via WhatsApp, SMS, or web"
              />
              <CapabilityItem
                icon={<BarChart3 className="h-4 w-4" />}
                title="Queue Notifications"
                description="Real-time position updates for patients"
              />
            </div>
          </div>

          {/* Integration Points */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                <Database className="h-4 w-4 text-primary" />
              </div>
              Integration Points
            </h4>
            <div className="p-4 rounded-lg bg-gradient-to-br from-background to-secondary/30 border border-primary/20 shadow-inner space-y-3">
              <IntegrationItem
                icon={<Database className="h-3 w-3" />}
                module="Appointments Table"
                description="Booking, rescheduling, cancellations"
              />
              <IntegrationItem
                icon={<Database className="h-3 w-3" />}
                module="Queue Entries"
                description="Real-time position notifications"
              />
              <IntegrationItem
                icon={<Database className="h-3 w-3" />}
                module="Profiles"
                description="Patient info & preferences"
              />
              <IntegrationItem
                icon={<Webhook className="h-3 w-3" />}
                module="Webhooks"
                description="Event triggers & sync"
              />
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-[#25D366]/5 to-background border border-[#25D366]/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-md bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-3 w-3 text-[#25D366]" />
              </div>
              <h5 className="font-semibold text-sm">Channels</h5>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs bg-[#25D366]/5 border-[#25D366]/20 hover:bg-[#25D366]/10 transition-colors">WhatsApp</Badge>
              <Badge variant="outline" className="text-xs hover:bg-secondary/50 transition-colors">SMS</Badge>
              <Badge variant="outline" className="text-xs hover:bg-secondary/50 transition-colors">Web Chat</Badge>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-background border border-primary/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="h-3 w-3 text-primary" />
              </div>
              <h5 className="font-semibold text-sm">Data Compliance</h5>
            </div>
            <p className="text-xs text-muted-foreground">
              PDPA-compliant minimal storage
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-accent/5 to-background border border-accent/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 rounded-md bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Webhook className="h-3 w-3 text-accent" />
              </div>
              <h5 className="font-semibold text-sm">Event Triggers</h5>
            </div>
            <p className="text-xs text-muted-foreground">
              Appointment & queue webhooks
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground flex-1">
              <strong className="text-foreground">Status:</strong> Architecture documented. Ready for Phase 2 deployment.
              See <code className="text-xs bg-background/80 px-2 py-1 rounded border border-border">docs/MyClynicQ-Integration.md</code> for complete integration specifications.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CapabilityItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-3 group cursor-default">
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 rounded-md blur-sm group-hover:blur-md transition-all" />
      <div className="relative h-7 w-7 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <div className="text-primary">
          {icon}
        </div>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm group-hover:text-primary transition-colors">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const IntegrationItem = ({ 
  icon, 
  module, 
  description 
}: { 
  icon: React.ReactNode; 
  module: string; 
  description: string;
}) => (
  <div className="flex items-start gap-2 group cursor-default">
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 rounded blur-sm group-hover:blur transition-all" />
      <div className="relative h-5 w-5 rounded bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
        <div className="text-primary text-xs">
          {icon}
        </div>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium group-hover:text-primary transition-colors">{module}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);
