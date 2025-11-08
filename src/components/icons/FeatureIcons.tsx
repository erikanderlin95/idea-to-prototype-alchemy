import { ClipboardList, Calendar, BarChart3, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const QueueIcon = ({ className, size = "md" }: FeatureIconProps) => (
  <div className={cn("relative group", className)}>
    <div className={cn(
      "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110",
      sizeClasses[size]
    )}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
      <ClipboardList className={cn("text-primary-foreground relative z-10 group-hover:scale-110 transition-transform", iconSizes[size])} />
      {/* Queue Indicator Badge */}
      <div className="absolute -top-1 -right-1 z-20">
        <div className="relative flex items-center justify-center h-4 w-4 rounded-full bg-accent shadow-lg animate-pulse">
          <span className="text-[8px] font-bold text-accent-foreground">Q</span>
          <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
        </div>
      </div>
    </div>
  </div>
);

export const AppointmentsIcon = ({ className, size = "md" }: FeatureIconProps) => (
  <div className={cn("relative group", className)}>
    <div className={cn(
      "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110",
      sizeClasses[size]
    )}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
      <Calendar className={cn("text-primary-foreground relative z-10 group-hover:scale-110 transition-transform", iconSizes[size])} />
      {/* Medical Cross indicator */}
      <div className="absolute -bottom-0.5 -right-0.5 z-10">
        <div className="h-3 w-3 rounded-sm bg-accent flex items-center justify-center shadow-sm">
          <div className="relative">
            <div className="absolute h-2 w-0.5 bg-accent-foreground left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-2 h-0.5 bg-accent-foreground left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AnalyticsIcon = ({ className, size = "md" }: FeatureIconProps) => (
  <div className={cn("relative group", className)}>
    <div className={cn(
      "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110",
      sizeClasses[size]
    )}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
      <BarChart3 className={cn("text-primary-foreground relative z-10 group-hover:scale-110 transition-transform", iconSizes[size])} />
      {/* Trend indicator */}
      <div className="absolute -top-1 -right-1 z-10">
        <div className="h-3 w-3 rounded-full bg-accent flex items-center justify-center shadow-sm">
          <div className="h-1.5 w-1.5 border-t-[1.5px] border-r-[1.5px] border-accent-foreground rotate-45 -translate-y-px" />
        </div>
      </div>
    </div>
  </div>
);

export const ChatbotIcon = ({ className, size = "md" }: FeatureIconProps) => (
  <div className={cn("relative group", className)}>
    <div className={cn(
      "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110",
      sizeClasses[size]
    )}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
      <MessageSquare className={cn("text-primary-foreground relative z-10 group-hover:scale-110 transition-transform", iconSizes[size])} />
      {/* AI indicator dot */}
      <div className="absolute -top-0.5 -right-0.5 z-10">
        <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-sm animate-pulse" />
      </div>
      {/* Medical heartbeat line */}
      <div className="absolute -bottom-0.5 -left-0.5 z-10">
        <div className="h-2.5 w-2.5 rounded-sm bg-background flex items-center justify-center shadow-sm">
          <div className="h-px w-2 bg-accent" />
        </div>
      </div>
    </div>
  </div>
);
