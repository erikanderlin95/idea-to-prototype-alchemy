import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

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

        {/* CTA — I Need Help */}
        <div className="max-w-md mx-auto px-2 sm:px-0 flex justify-center">
          <Button
            className="w-[80%] sm:w-[70%] h-12 justify-center gap-2 rounded-full bg-gradient-to-r from-[#0E9AAB] via-[#0C8A99] to-[#0E9AAB] hover:from-[#0B8797] hover:via-[#097A88] hover:to-[#0B8797] text-white font-bold text-base tracking-wide shadow-[0_6px_20px_rgba(14,154,171,0.45)] hover:shadow-[0_10px_28px_rgba(14,154,171,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97] ring-2 ring-white/30"
            onClick={() => navigate("/organization/nymg")}
          >
            <HelpCircle className="h-5 w-5 shrink-0" />
            {t("featuredConsultants.viewManagedCare") || "I Need Help"}
          </Button>
        </div>
      </div>
    </section>
  );
};
