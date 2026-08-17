import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";

export const FeaturedConsultants = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="managed-care" className="py-6 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
            {t("featuredConsultants.title")}
          </h2>
        </div>

        {/* CTA — prominent I Need Help button */}
        <div className="max-w-md mx-auto px-4 sm:px-0 flex justify-center">
          <Button
            className="relative w-full sm:w-[85%] h-12 sm:h-14 justify-center gap-2.5 bg-gradient-to-r from-[#0E9AAB] to-[#0C8A99] hover:from-[#0B8797] hover:to-[#097A88] text-white font-bold text-[15px] sm:text-[16px] tracking-wide shadow-[0_4px_18px_rgba(14,154,171,0.45)] hover:shadow-[0_6px_24px_rgba(14,154,171,0.55)] transition-all hover:scale-[1.02] active:scale-[0.97] overflow-hidden"
            onClick={() => navigate("/organization/nymg")}
          >
            {/* subtle pulse ring */}
            <span className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-white/30 animate-ping opacity-25" />
            <HelpCircle className="h-5 w-5 relative z-10" strokeWidth={2.5} />
            <span className="relative z-10">{t("featuredConsultants.viewManagedCare") || "I Need Help"}</span>
            <MessageCircle className="h-4 w-4 relative z-10 opacity-90" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
};
