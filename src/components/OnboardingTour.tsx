import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  spotlight?: boolean;
}

const tourSteps: TourStep[] = [
  {
    target: ".onboarding-logo",
    title: "Welcome to ClynicQ! 👋",
    description: "Your smart healthcare queue management system. The 'Q' badge represents our real-time queue feature - join virtual queues and track wait times instantly!",
    position: "bottom",
    spotlight: true,
  },
  {
    target: ".onboarding-clinics",
    title: "Browse Clinics 🏥",
    description: "Find GP, TCM, and wellness clinics near you. See real-time queue information and make informed decisions about when to visit.",
    position: "top",
    spotlight: true,
  },
  {
    target: ".onboarding-join-queue",
    title: "Join Virtual Queues 🎫",
    description: "Skip the physical wait! Join queues remotely and get notified when it's almost your turn. No more sitting in crowded waiting rooms.",
    position: "top",
    spotlight: true,
  },
  {
    target: ".onboarding-stats",
    title: "Real-Time Updates ⚡",
    description: "Track live queue positions, estimated wait times, and clinic availability. Everything updates in real-time so you're always informed.",
    position: "top",
    spotlight: true,
  },
  {
    target: ".onboarding-nav",
    title: "Quick Navigation 🧭",
    description: "Access your appointments, health assistant chatbot, analytics, and more from the navigation menu.",
    position: "bottom",
    spotlight: true,
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
      updateTargetPosition();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    updateTargetPosition();
    window.addEventListener("resize", updateTargetPosition);
    return () => window.removeEventListener("resize", updateTargetPosition);
  }, [currentStep]);

  const updateTargetPosition = () => {
    const step = tourSteps[currentStep];
    const element = document.querySelector(step.target);
    if (element) {
      setTargetRect(element.getBoundingClientRect());
    }
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible || !targetRect) {
    return null;
  }

  const step = tourSteps[currentStep];
  const spotlightPadding = 16;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const tooltipWidth = 320;
    const tooltipOffset = 20;
    
    switch (step.position) {
      case "bottom":
        return {
          top: targetRect.bottom + tooltipOffset,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        };
      case "top":
        return {
          bottom: window.innerHeight - targetRect.top + tooltipOffset,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        };
      case "left":
        return {
          top: targetRect.top + targetRect.height / 2,
          right: window.innerWidth - targetRect.left + tooltipOffset,
        };
      case "right":
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.right + tooltipOffset,
        };
      default:
        return { top: targetRect.bottom + tooltipOffset, left: targetRect.left };
    }
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Overlay with spotlight effect */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-all duration-300">
        {step.spotlight && (
          <>
            {/* Spotlight circle */}
            <div
              className="absolute transition-all duration-500 ease-out"
              style={{
                top: targetRect.top - spotlightPadding,
                left: targetRect.left - spotlightPadding,
                width: targetRect.width + spotlightPadding * 2,
                height: targetRect.height + spotlightPadding * 2,
                borderRadius: "1rem",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 40px rgba(79, 209, 197, 0.4) inset",
                pointerEvents: "none",
              }}
            />
            {/* Animated ring around spotlight */}
            <div
              className="absolute transition-all duration-500 ease-out animate-pulse"
              style={{
                top: targetRect.top - spotlightPadding - 4,
                left: targetRect.left - spotlightPadding - 4,
                width: targetRect.width + spotlightPadding * 2 + 8,
                height: targetRect.height + spotlightPadding * 2 + 8,
                borderRadius: "1rem",
                border: "3px solid hsl(var(--accent))",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </div>

      {/* Tooltip Card */}
      <Card
        className={cn(
          "fixed w-80 shadow-2xl border-2 animate-scale-in",
          "bg-card/95 backdrop-blur-md"
        )}
        style={{
          ...tooltipPosition,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <CardDescription className="mt-1.5 text-sm leading-relaxed">
                {step.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mt-1 -mr-1"
              onClick={handleSkip}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentStep
                    ? "w-8 bg-primary"
                    : index < currentStep
                    ? "w-1.5 bg-primary/50"
                    : "w-1.5 bg-muted"
                )}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip Tour
            </Button>

            <Button
              size="sm"
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Step {currentStep + 1} of {tourSteps.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
