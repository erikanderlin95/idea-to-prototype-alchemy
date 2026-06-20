import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FeaturedConsultants = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="managed-care" className="py-6 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-3">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("featuredConsultants.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
            {t("featuredConsultants.title")}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
            {t("featuredConsultants.subtitle")}
          </p>
        </div>

        {/* CTA — same styling as NYMG "Request Managed Care" button */}
        <div className="max-w-md mx-auto px-2 sm:px-0">
          <Button
            className="w-full h-9 bg-gradient-to-r from-[#0E9AAB] to-[#0C8A99] hover:from-[#0B8797] hover:to-[#097A88] text-white font-bold text-[14px] tracking-wide shadow-[0_3px_12px_rgba(14,154,171,0.35)] hover:shadow-[0_5px_18px_rgba(14,154,171,0.45)] transition-all active:scale-[0.97]"
            onClick={() => navigate("/managed-care")}
          >
            {t("featuredConsultants.viewManagedCare") || "View Managed Care"}
            <ArrowRight className="ml-1 h-4 w-4" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
};
