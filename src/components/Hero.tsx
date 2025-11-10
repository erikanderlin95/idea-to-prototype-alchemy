import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { QueueIcon, AppointmentsIcon, ChatbotIcon } from "@/components/icons/FeatureIcons";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-ai-purple/5 via-ai-blue/5 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--ai-purple)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--ai-cyan)/0.12),transparent_50%)]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">
                {t("hero.badge")}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              {t("hero.title1")}
              <span className="block mt-2 bg-gradient-to-r from-ai-purple via-ai-blue to-ai-cyan bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="mr-2 h-5 w-5" />
              {t("hero.findClinics")}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover:bg-secondary/50 transition-all"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t("hero.learnMore")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl mt-12 pt-12 border-t border-border/50">
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <QueueIcon size="md" className="group-hover:scale-110 transition-transform" />
              <p className="text-base font-bold">{t("hero.queueTitle")}</p>
              <p className="text-sm text-muted-foreground text-center">{t("hero.queueDesc")}</p>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <AppointmentsIcon size="md" className="group-hover:scale-110 transition-transform" />
              <p className="text-base font-bold">{t("hero.bookTitle")}</p>
              <p className="text-sm text-muted-foreground text-center">{t("hero.bookDesc")}</p>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <ChatbotIcon size="md" className="group-hover:scale-110 transition-transform" />
              <p className="text-base font-bold">{t("hero.connectTitle")}</p>
              <p className="text-sm text-muted-foreground text-center">{t("hero.connectDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
