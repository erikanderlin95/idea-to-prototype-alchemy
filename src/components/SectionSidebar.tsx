import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { Building2, HeartHandshake, Stethoscope, Mic, Sparkles, Menu, ChevronLeft, Mail, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const sections = [
  { id: "marketplace", key: "sidebar.section.browseClinics", icon: Building2, type: "scroll" as const, emoji: null as string | null, iconColor: "text-sky-600 bg-sky-50" },
  { id: "managed-care", key: "sidebar.section.managedCare", icon: HeartHandshake, type: "scroll" as const, emoji: null, iconColor: "text-rose-500 bg-rose-50" },
  { id: "wellness-talks", key: "sidebar.section.wellnessTalks", icon: Mic, type: "scroll" as const, emoji: null, iconColor: "text-violet-500 bg-violet-50" },
  { id: "other-providers", key: "sidebar.section.otherProviders", icon: Sparkles, type: "scroll" as const, emoji: null, iconColor: "text-amber-500 bg-amber-50" },
  { id: "/explore-health/bmi-calculator", key: "sidebar.section.bmiCalculator", icon: Sparkles, type: "route" as const, emoji: "📏", iconColor: "text-emerald-500 bg-emerald-50" },
  { id: "for-clinics", key: "sidebar.section.forClinics", icon: Stethoscope, type: "scroll" as const, emoji: null, iconColor: "text-teal-600 bg-teal-50" },
];

const FIRST_VISIT_KEY = "clynicq_sidebar_hint_shown";

export const SectionSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

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

  const handleClick = (item: typeof sections[number]) => {
    setOpen(false);
    if ((item.type as string) === "route") {
      navigate(item.id);
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/#${item.id}`);
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="fixed top-1/2 right-0 z-40 animate-[sidebar-bob_3s_ease-in-out_infinite]">
          <button
            aria-label={t("sidebar.explore")}
            className={cn(
              "group",
              "flex flex-col items-center gap-2",
              "py-4 pl-3 pr-2.5",
              "rounded-l-2xl rounded-r-none",
              "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground",
              "shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.55),0_2px_8px_rgba(0,0,0,0.12)]",
              "ring-1 ring-primary-foreground/15",
              "transition-all duration-300 ease-out",
              "hover:pl-4 hover:pr-3 hover:shadow-[0_12px_32px_-6px_hsl(var(--primary)/0.7)]",
              "active:scale-[0.97]",
              "min-h-[120px] min-w-[44px]"
            )}
          >
            {/* Subtle ambient glow — always on, very gentle */}
            <span className="pointer-events-none absolute inset-0 rounded-l-2xl bg-white/10 blur-md animate-[sidebar-glow_3s_ease-in-out_infinite]" />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <Menu className="h-5 w-5" strokeWidth={2.5} />
              <span
                className="text-[12px] font-semibold tracking-wider uppercase leading-none max-h-[140px] overflow-hidden text-ellipsis"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {t("sidebar.explore")}
              </span>
              <ChevronLeft className="h-3.5 w-3.5 opacity-80 animate-[sidebar-chevron_2.5s_ease-in-out_infinite]" strokeWidth={2.5} />
            </div>

            <style>{`
              @keyframes sidebar-glow {
                0%, 100% { opacity: 0.25; transform: scale(1); }
                50% { opacity: 0.45; transform: scale(1.03); }
              }
              @keyframes sidebar-bob {
                0%, 100% { transform: translateY(-50%) translateX(0); }
                50% { transform: translateY(-50%) translateX(-6px); }
              }
              @keyframes sidebar-chevron {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-2px); }
              }
            `}</style>
          </button>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 border-l border-border/50">
        <div className="relative flex flex-col h-full overflow-hidden bg-background/95 backdrop-blur-xl">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-ai-indigo/20 blur-[80px]" />

          <SheetHeader className="relative z-10 px-6 pt-8 pb-4">
            <SheetTitle className="text-2xl font-bold text-foreground">
              {t("sidebar.title")}
            </SheetTitle>
          </SheetHeader>


          <nav className="relative z-10 flex-1 px-4 space-y-2 overflow-y-auto">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleClick(s)}
                  className="group w-full flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-border/50 text-left transition-all hover:bg-muted/60 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl shrink-0", s.iconColor || "bg-primary/10 text-primary")}>
                    {s.emoji ? <span className="text-base leading-none">{s.emoji}</span> : <Icon className="h-4 w-4" />}
                  </span>
                    <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground break-words leading-snug">
                      {t(s.key)}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              );
            })}
          </nav>

          {/* Contact footer */}
          <div className="relative z-10 p-6 bg-muted/30 border-t border-border/50 mt-auto">
            <p className="text-sm font-semibold text-foreground mb-1">
              {t("sidebar.contactUs")}
            </p>
            <a
              href="mailto:hello@ealvon.com"
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              hello@ealvon.com
            </a>
            <div className="mt-6 h-1 w-12 bg-primary rounded-full" />
          </div>



        </div>
      </SheetContent>
    </Sheet>
  );
};
