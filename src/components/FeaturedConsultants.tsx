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
        <div className="flex justify-center">
          <Button
            className="h-10 px-6 justify-center gap-2 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC5A0A] text-white font-semibold text-sm tracking-wide shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_18px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
            onClick={() => navigate("/organization/nymg")}
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            {t("featuredConsultants.viewManagedCare") || "I Need Help"}
          </Button>
        </div>
      </div>
    </section>
  );
};
