import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export const FeaturedConsultants = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="managed-care" className="py-2 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* CTA — I Need Help */}
        <div className="flex justify-center">
          <Button
            className="h-10 px-6 justify-center gap-2 rounded-full bg-[#C65D16] hover:bg-[#B04F0F] text-white font-semibold text-sm tracking-wide shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 active:scale-[0.97]"
            onClick={() => navigate("/organization/nymg")}
          >
            <HelpCircle className="h-4 w-4 shrink-0 text-white" />
            {t("featuredConsultants.viewManagedCare") || "I Need Help"}
          </Button>
        </div>
      </div>
    </section>
  );
};
