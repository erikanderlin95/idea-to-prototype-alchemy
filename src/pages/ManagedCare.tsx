import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OrganizationCard from "@/components/OrganizationCard";

const ManagedCare = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t("common.back") || "Back"}
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("featuredConsultants.badge")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
            {t("featuredConsultants.title")}
          </h1>
          <p className="text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
            {t("featuredConsultants.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 max-w-md mx-auto px-2 sm:px-0">
          <OrganizationCard />
        </div>
      </div>
    </main>
  );
};

export default ManagedCare;
