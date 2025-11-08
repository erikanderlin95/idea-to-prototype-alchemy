import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import { QueueIcon, AppointmentsIcon, ChatbotIcon, AnalyticsIcon } from "@/components/icons/FeatureIcons";

export const QuickGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-20 left-4 z-40">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          size="sm"
          variant="secondary"
          className="rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in hover:scale-105 flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-xs font-semibold">Quick Guide</span>
        </Button>
      ) : (
        <div className="bg-card border-2 border-primary/20 rounded-lg shadow-2xl p-3 animate-scale-in w-52">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold">Quick Links</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <a
              href="/"
              className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-all text-xs"
            >
              <QueueIcon size="sm" />
              <span>Join Queue</span>
            </a>
            <a
              href="/appointments"
              className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-all text-xs"
            >
              <AppointmentsIcon size="sm" />
              <span>Appointments</span>
            </a>
            <a
              href="/chatbot"
              className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-all text-xs"
            >
              <ChatbotIcon size="sm" />
              <span>Health Assistant</span>
            </a>
            <a
              href="/analytics"
              className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-all text-xs"
            >
              <AnalyticsIcon size="sm" />
              <span>Analytics</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
