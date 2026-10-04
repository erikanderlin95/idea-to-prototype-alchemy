import { Button } from "@/components/ui/button";
import { Building2, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative py-16 flex items-center justify-center overflow-hidden bg-white">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div className="space-y-3 pt-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t("hero.title1")}
              <span className="block mt-2 bg-gradient-to-r from-[hsl(220,90%,58%)] via-[hsl(215,90%,55%)] to-[hsl(210,90%,55%)] bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            {(() => {
              const [line1, line2] = t("hero.subtitle").split("\n");
              return (
                <div className="space-y-1 pt-2">
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-snug">
                    {line1}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 whitespace-nowrap leading-snug">
                    {line2 || ""}
                  </p>
                </div>
              );
            })()}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mx-auto mt-1 justify-center">
            <Button 
              variant="outline"
              size="lg" 
              className="text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 min-h-10 sm:min-h-12 h-auto border-primary text-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-1.5 font-bold whitespace-normal text-center leading-tight w-auto"
              onClick={() => navigate('/for-clinics')}
            >
              <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="min-w-0 break-words">{t("hero.findMyQueue")}</span>
            </Button>
            <Button 
              size="lg" 
              className="text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 min-h-10 sm:min-h-12 h-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-1.5 font-bold whitespace-normal text-center leading-tight w-auto"
              onClick={() => window.dispatchEvent(new CustomEvent('open-explore-sidebar'))}
            >
              <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="min-w-0 break-words">{t("sidebar.explore")}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-center">
            <span className="text-xs font-medium text-foreground/70">{t("hero.activityTitle")}</span>
            <span className="text-xs text-muted-foreground">{t("hero.activityDesc")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
