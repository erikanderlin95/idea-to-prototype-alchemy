import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HelpCircle, X, ArrowRight } from "lucide-react";
import { QueueIcon, AppointmentsIcon, ChatbotIcon, AnalyticsIcon } from "@/components/icons/FeatureIcons";

export const QuickGuide = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

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
        <Card className="shadow-2xl border-2 border-primary/20 w-80 animate-scale-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                Welcome to ClynicQ! 👋
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDismissed(true)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your digital healthcare companion. Queue, Book, and Connect with healthcare services across Singapore.
            </p>
            
            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold text-foreground mb-3">Quick Links:</p>
              
              <a
                href="/"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <QueueIcon size="sm" />
                  <span className="text-sm font-medium">Join Queue</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              
              <a
                href="/appointments"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <AppointmentsIcon size="sm" />
                  <span className="text-sm font-medium">Appointments</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              
              <a
                href="/chatbot"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <ChatbotIcon size="sm" />
                  <span className="text-sm font-medium">Health Assistant</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              
              <a
                href="/analytics"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <AnalyticsIcon size="sm" />
                  <span className="text-sm font-medium">Analytics</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-xs"
              >
                Minimize
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDismissed(true)}
                className="text-xs"
              >
                Got it!
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
