import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronRight, HelpCircle } from "lucide-react";
import { QueueIcon, AppointmentsIcon, ChatbotIcon, AnalyticsIcon } from "@/components/icons/FeatureIcons";

interface Guide {
  title: string;
  description: string;
  action: string;
  link: string;
  icon: "queue" | "appointments" | "chatbot" | "analytics";
}

const guides: Guide[] = [
  {
    title: "Join a Queue",
    description: "Find clinics and join virtual queues",
    action: "Browse Clinics",
    link: "/",
    icon: "queue"
  },
  {
    title: "Book Appointments",
    description: "Schedule your next visit instantly",
    action: "View Appointments",
    link: "/appointments",
    icon: "appointments"
  },
  {
    title: "Health Assistant",
    description: "Chat with AI for health guidance",
    action: "Start Chatting",
    link: "/chatbot",
    icon: "chatbot"
  },
  {
    title: "View Analytics",
    description: "Track your healthcare journey",
    action: "See Insights",
    link: "/analytics",
    icon: "analytics"
  }
];

export const VirtualGuide = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-scale-in">
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl hover:scale-110 transition-transform"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-scale-in max-w-sm">
      <Card className="shadow-2xl border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Quick Guide</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDismissed(true)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              Queue • Book • Connect
            </Badge>
          </div>
          
          {guides.map((guide, index) => (
            <a
              key={index}
              href={guide.link}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="shrink-0 mt-0.5">
                {guide.icon === "queue" && <QueueIcon size="sm" />}
                {guide.icon === "appointments" && <AppointmentsIcon size="sm" />}
                {guide.icon === "chatbot" && <ChatbotIcon size="sm" />}
                {guide.icon === "analytics" && <AnalyticsIcon size="sm" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{guide.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{guide.description}</p>
                <span className="text-xs text-primary font-medium group-hover:underline">
                  {guide.action} →
                </span>
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
