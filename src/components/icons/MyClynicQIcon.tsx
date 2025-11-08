import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MyClynicQIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const iconSizes = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const qSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
};

export const MyClynicQIcon = ({ className, size = "md" }: MyClynicQIconProps) => (
  <div className={cn("relative group", className)}>
    <div className={cn(
      "relative rounded-2xl bg-gradient-to-br from-ai-purple via-ai-blue to-ai-cyan flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105",
      sizeClasses[size]
    )}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ai-purple/40 to-ai-cyan/40 blur-lg group-hover:blur-xl transition-all" />
      
      {/* Chat bubble icon background */}
      <MessageCircle className={cn("text-primary-foreground/30 relative z-10", iconSizes[size])} />
      
      {/* Prominent Q letter */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className={cn(
          "font-black tracking-tighter bg-gradient-to-br from-white via-white to-ai-cyan/90 bg-clip-text text-transparent drop-shadow-lg group-hover:scale-110 transition-transform",
          qSizes[size]
        )}>
          Q
        </span>
      </div>
      
      {/* Medical pulse indicator */}
      <div className="absolute -top-1 -right-1 z-20">
        <div className="relative flex items-center justify-center h-5 w-5 rounded-full bg-[#25D366] shadow-lg animate-pulse">
          <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
          <div className="relative h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
      
      {/* AI sparkle indicator */}
      <div className="absolute -bottom-1 -left-1 z-20">
        <div className="h-4 w-4 rounded-md bg-gradient-to-br from-ai-cyan to-ai-violet flex items-center justify-center shadow-md">
          <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);
