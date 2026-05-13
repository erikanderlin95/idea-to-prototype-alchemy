import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2, HeartHandshake, Stethoscope, Mic, Sparkles, LayoutList } from "lucide-react";

const sections = [
  { id: "marketplace", label: "Browse Clinics", icon: Building2, type: "scroll" as const },
  { id: "managed-care", label: "Request Managed Care", icon: HeartHandshake, type: "scroll" as const },
  { id: "for-clinics", label: "For Clinics", icon: Stethoscope, type: "scroll" as const },
  { id: "wellness-talks", label: "Wellness Talks", icon: Mic, type: "scroll" as const },
  { id: "other-providers", label: "Other Providers", icon: Sparkles, type: "scroll" as const },
];

export const SectionSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
        <Button
          className="fixed top-1/2 -translate-y-1/2 right-0 z-40 h-auto py-3 px-2 rounded-l-xl rounded-r-none shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:px-3 transition-all flex flex-col items-center gap-1.5 border-2 border-r-0 border-primary-foreground/20"
          aria-label="Open sections menu"
        >
          <LayoutList className="h-4 w-4" />
          <span
            className="text-[11px] font-semibold tracking-wider uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Sections
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
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
                className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
