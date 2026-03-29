import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import OrganizationCard from "@/components/OrganizationCard";
import SHACard from "@/components/SHACard";

export const FeaturedConsultants = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("featuredConsultants.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
            {t("featuredConsultants.title")}
          </h2>
          <p className="text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
            {t("featuredConsultants.subtitle")}
          </p>
        </div>

        {/* Organization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto px-2 sm:px-0">
          <OrganizationCard />
          <SHACard />
        </div>
      </div>
    </section>
  );
};
