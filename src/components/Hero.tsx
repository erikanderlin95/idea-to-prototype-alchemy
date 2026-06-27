import { Button } from "@/components/ui/button";
import { Building2, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,hsl(168,55%,84%)_0%,hsl(175,55%,92%)_22%,hsl(190,50%,97%)_50%,hsl(200,60%,94%)_78%,hsl(210,65%,86%)_100%)]" />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 700" aria-hidden="true">
        <defs>
          <linearGradient id="heroWaveL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(168,60%,78%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(180,60%,90%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroWaveR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(205,70%,82%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(195,65%,92%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroWaveR2" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(200,70%,78%)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(195,60%,92%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,0 Q380,180 240,420 Q120,640 0,700 L0,0 Z" fill="url(#heroWaveL)" />
        <path d="M0,80 Q300,260 200,500 Q100,640 0,700 L0,80 Z" fill="url(#heroWaveL)" opacity="0.6" />
        <path d="M1440,0 Q1100,200 1240,440 Q1340,620 1440,700 L1440,0 Z" fill="url(#heroWaveR)" />
        <path d="M1440,120 Q1180,300 1280,520 Q1360,640 1440,700 L1440,120 Z" fill="url(#heroWaveR2)" opacity="0.7" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,hsl(0,0%,100%,0.55),transparent_75%)]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              {t("hero.title1")}
              <span className="block mt-2 bg-gradient-to-r from-[hsl(220,90%,58%)] via-[hsl(215,90%,55%)] to-[hsl(210,90%,55%)] bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-foreground/75 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mx-auto mt-1 justify-center">
            <Button 
              variant="outline"
              size="lg" 
              className="text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 min-h-10 sm:min-h-12 h-auto border-primary text-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-1.5 font-bold whitespace-normal text-center leading-tight w-auto"
              onClick={() => document.getElementById('for-clinics')?.scrollIntoView({ behavior: 'smooth' })}
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
