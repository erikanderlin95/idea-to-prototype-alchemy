import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2, HeartHandshake, Stethoscope, Mic, Sparkles, Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "marketplace", label: "Browse Clinics", icon: Building2, type: "scroll" as const },
  { id: "managed-care", label: "Request Managed Care", icon: HeartHandshake, type: "scroll" as const },
  { id: "wellness-talks", label: "Wellness Talks", icon: Mic, type: "scroll" as const },
  { id: "other-providers", label: "Other Providers", icon: Sparkles, type: "scroll" as const },
  { id: "for-clinics", label: "For Clinics", icon: Stethoscope, type: "scroll" as const },
];

const FIRST_VISIT_KEY = "clynicq_sidebar_hint_shown";

export const SectionSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // First-visit auto-expand hint
  useEffect(() => {
    const seen = localStorage.getItem(FIRST_VISIT_KEY);
    if (!seen) {
      const openTimer = setTimeout(() => setOpen(true), 1500);
      const closeTimer = setTimeout(() => {
        setOpen(false);
        localStorage.setItem(FIRST_VISIT_KEY, "1");
      }, 4500);
      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    }
  }, []);

  // Subtle periodic nudge animation
  useEffect(() => {
    const interval = setInterval(() => {
      setNudge(true);
      setTimeout(() => setNudge(false), 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (item: typeof sections[number]) => {
    setOpen(false);
    if ((item.type as string) === "route") {
      navigate(item.id);
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Explore sections"
          className={cn(
            "fixed top-1/2 -translate-y-1/2 right-0 z-40 group",
            "flex flex-col items-center gap-2",
            "py-4 pl-3 pr-2.5",
            "rounded-l-2xl rounded-r-none",
            "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground",
            "shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.55),0_2px_8px_rgba(0,0,0,0.12)]",
            "ring-1 ring-primary-foreground/15",
            "transition-all duration-300 ease-out",
            "hover:pl-4 hover:pr-3 hover:shadow-[0_12px_32px_-6px_hsl(var(--primary)/0.7)]",
            "active:scale-[0.97]",
            "min-h-[120px] min-w-[44px]",
            nudge && "animate-[sidebar-nudge_1.2s_ease-in-out]"
          )}
          style={{
            animation: nudge ? "sidebar-nudge 1.2s ease-in-out" : undefined,
          }}
        >
          {/* Pulse halo */}
          <span className="pointer-events-none absolute inset-0 rounded-l-2xl bg-primary/40 opacity-0 group-hover:opacity-0 animate-[sidebar-pulse_2.8s_ease-in-out_infinite]" />

          <Menu className="h-5 w-5 relative z-10" strokeWidth={2.5} />
          <span
            className="text-[12px] font-semibold tracking-wider uppercase relative z-10 leading-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Explore
          </span>
          <ChevronLeft className="h-3.5 w-3.5 relative z-10 opacity-80 animate-[sidebar-arrow_2s_ease-in-out_infinite]" strokeWidth={2.5} />

          <style>{`
            @keyframes sidebar-pulse {
              0%, 100% { opacity: 0; transform: scale(1); }
              50% { opacity: 0.35; transform: scale(1.08); }
            }
            @keyframes sidebar-nudge {
              0%, 100% { transform: translate(0, -50%); }
              30% { transform: translate(-8px, -50%); }
              60% { transform: translate(0, -50%); }
            }
            @keyframes sidebar-arrow {
              0%, 100% { transform: translateX(0); opacity: 0.7; }
              50% { transform: translateX(-3px); opacity: 1; }
            }
          `}</style>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="px-5 pt-5 pb-3 border-b">
          <SheetTitle className="text-base">Jump to section</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => handleClick(s)}
                className="flex items-center gap-3 px-3 py-3.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted active:bg-muted/70 transition-colors text-left"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
