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
    description: "Queue • Book • Connect with healthcare services across Singapore.",
    position: "bottom",
    spotlight: true,
  },
  {
    target: ".onboarding-clinics",
    title: "Browse & Join Queues 🏥",
    description: "Find clinics, check real-time queues, and join virtually from anywhere.",
    position: "top",
    spotlight: true,
  },
  {
    target: ".onboarding-nav",
    title: "Quick Access 🧭",
    description: "Use the menu to access appointments, health assistant, and analytics.",
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
    const tooltipWidth = 280;
    const tooltipOffset = 16;
    
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
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] transition-all duration-300">
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
                borderRadius: "0.75rem",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 30px rgba(79, 209, 197, 0.3) inset",
                pointerEvents: "none",
              }}
            />
            {/* Animated ring around spotlight */}
            <div
              className="absolute transition-all duration-500 ease-out animate-pulse"
              style={{
                top: targetRect.top - spotlightPadding - 3,
                left: targetRect.left - spotlightPadding - 3,
                width: targetRect.width + spotlightPadding * 2 + 6,
                height: targetRect.height + spotlightPadding * 2 + 6,
                borderRadius: "0.75rem",
                border: "2px solid hsl(var(--primary))",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </div>

      {/* Tooltip Card */}
      <Card
        className={cn(
          "fixed w-72 shadow-2xl border-2 animate-scale-in",
          "bg-card/95 backdrop-blur-md"
        )}
        style={{
          ...tooltipPosition,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-base">{step.title}</CardTitle>
              <CardDescription className="mt-1 text-xs leading-relaxed">
                {step.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 -mt-1 -mr-1"
              onClick={handleSkip}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-2 pt-2">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentStep
                    ? "w-6 bg-primary"
                    : index < currentStep
                    ? "w-1.5 bg-primary/50"
                    : "w-1.5 bg-muted"
                )}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="flex-1 h-8 text-xs"
              >
                <ChevronLeft className="h-3 w-3 mr-1" />
                Back
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="flex-1 h-8 text-xs"
            >
              Skip
            </Button>

            <Button
              size="sm"
              onClick={handleNext}
              className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
            >
              {currentStep === tourSteps.length - 1 ? "Got it!" : "Next"}
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          <p className="text-[10px] text-center text-muted-foreground pt-1">
            {currentStep + 1} of {tourSteps.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
