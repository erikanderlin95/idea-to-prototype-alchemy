import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export const FeaturedConsultants = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="managed-care" className="py-6 md:py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* CTA — I Need Help */}
        <div className="flex justify-center">
          <Button
            className="h-10 w-48 px-6 justify-center gap-2 rounded-lg bg-[#F59E0B] hover:bg-[#E08E09] text-[#1F2937] font-semibold text-sm tracking-wide shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-[0.97]"
            onClick={() => navigate("/organization/nymg")}
          >
            <HelpCircle className="h-4 w-4 shrink-0 text-[#1F2937]" />
            {t("featuredConsultants.viewManagedCare") || "I Need Help"}
          </Button>
        </div>
      </div>
    </section>
  );
};
