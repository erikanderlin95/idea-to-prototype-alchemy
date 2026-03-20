import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import OrganizationCard from "@/components/OrganizationCard";
import SHACard from "@/components/SHACard";

export const FeaturedConsultants = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("featuredConsultants.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            {t("featuredConsultants.title")}
          </h2>
          <p className="text-[20px] md:text-[22px] font-medium text-[#12385B]/80 max-w-2xl mx-auto">
            Not sure which clinic to choose?
          </p>
        </div>

        {/* Section label + context */}
        <div className="text-center mb-5">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#5F6F7E] mb-1">
            Available Care Networks
          </p>
          <p className="text-[15px] text-[#6B7D8E]">
            Choose a care network — both guide you from intake to the right provider.
          </p>
        </div>

        {/* Organization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <OrganizationCard />
          <SHACard />
        </div>
      </div>
    </section>
  );
};
