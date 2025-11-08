import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClynicQIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showNotification?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-11 w-11",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const qSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const ClynicQIcon = ({ className, size = "md", showNotification = false }: ClynicQIconProps) => (
  <div className={cn("relative group", className)}>
    <div className={cn(
      "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110",
      sizeClasses[size]
    )}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 to-accent/40 blur-xl group-hover:blur-2xl transition-all" />
      
      {/* Clipboard icon background */}
      <ClipboardList className={cn("text-primary-foreground/30 relative z-10", iconSizes[size])} />
      
      {/* Prominent Q letter */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className={cn(
          "font-black bg-gradient-to-br from-white to-primary-foreground bg-clip-text text-transparent drop-shadow-lg group-hover:scale-110 transition-transform",
          qSizes[size]
        )}>
          Q
        </span>
      </div>
      
      {/* Queue Indicator Badge - Only show if there's a notification */}
      {showNotification && (
        <div className="absolute -top-1.5 -right-1.5 z-20">
          <div className="relative flex items-center justify-center h-5 w-5 rounded-full bg-accent shadow-lg animate-pulse">
            <span className="text-[10px] font-bold text-accent-foreground">Q</span>
            <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
          </div>
        </div>
      )}
      
      {/* Medical Cross indicator */}
      <div className="absolute -bottom-0.5 -left-0.5 z-10">
        <div className="h-3 w-3 rounded-sm bg-background flex items-center justify-center shadow-sm">
          <div className="relative">
            <div className="absolute h-2 w-0.5 bg-accent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-2 h-0.5 bg-accent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
