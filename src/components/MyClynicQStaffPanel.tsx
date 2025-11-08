import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Bell, BarChart3, MessageCircle, Zap, Database, Webhook, Shield } from "lucide-react";

export const MyClynicQStaffPanel = () => {
  return (
    <Card className="p-8 bg-gradient-to-br from-background to-secondary/30 border-2 border-primary/20">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">MyClynicQ Plugin</h3>
              <Badge variant="secondary">Phase 2</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Conversational AI for automated patient engagement
            </p>
          </div>
          <Button variant="outline" disabled>
            <MessageCircle className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
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
              <Database className="h-4 w-4 text-primary" />
              Integration Points
            </h4>
            <div className="p-4 rounded-lg bg-background/80 border border-border space-y-3">
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
          <div className="p-4 rounded-lg bg-background/80 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <h5 className="font-semibold text-sm">Channels</h5>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">WhatsApp</Badge>
              <Badge variant="outline" className="text-xs">SMS</Badge>
              <Badge variant="outline" className="text-xs">Web Chat</Badge>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/80 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <h5 className="font-semibold text-sm">Data Compliance</h5>
            </div>
            <p className="text-xs text-muted-foreground">
              PDPA-compliant minimal storage
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/80 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Webhook className="h-4 w-4 text-primary" />
              <h5 className="font-semibold text-sm">Event Triggers</h5>
            </div>
            <p className="text-xs text-muted-foreground">
              Appointment & queue webhooks
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Status:</strong> Architecture documented. Ready for Phase 2 deployment.
            See <code className="text-xs bg-background px-1 py-0.5 rounded">docs/MyClynicQ-Integration.md</code> for complete integration specifications.
          </p>
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
  <div className="flex gap-3">
    <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm">{title}</p>
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
  <div className="flex items-start gap-2">
    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium">{module}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);
