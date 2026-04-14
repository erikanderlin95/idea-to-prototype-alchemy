import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Heart, Building2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Mic,
    titleKey: "continuity.speakers.title",
    descKey: "continuity.speakers.desc",
    gradient: "from-ai-purple/15 to-ai-blue/10",
    iconBg: "from-ai-purple to-ai-blue",
    borderColor: "border-ai-purple/20 hover:border-ai-purple/40",
    route: "/speakers",
    clickable: true,
  },
  {
    icon: Heart,
    titleKey: "continuity.afterlife.title",
    descKey: "continuity.afterlife.desc",
    gradient: "from-ai-blue/15 to-ai-cyan/10",
    iconBg: "from-ai-blue to-ai-cyan",
    borderColor: "border-ai-blue/20 hover:border-ai-blue/40",
    route: "/afterlife",
    clickable: true,
  },
  {
    icon: Building2,
    titleKey: "continuity.endOfService.title",
    descKey: "continuity.endOfService.desc",
    gradient: "from-ai-cyan/15 to-ai-violet/10",
    iconBg: "from-ai-cyan to-ai-violet",
    borderColor: "border-ai-cyan/20 hover:border-ai-cyan/40",
    route: "",
    clickable: false,
  },
];

export const ContinuityServices = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-8 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-cyan/10 text-ai-cyan mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("continuity.badge")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t("continuity.title")}
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
            {t("continuity.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto px-1 sm:px-0">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group bg-gradient-to-br ${service.gradient} border ${service.borderColor} hover:shadow-lg transition-all duration-300 ${service.clickable ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => service.clickable && navigate(service.route)}
            >
              <CardContent className="p-2.5 sm:p-5 flex flex-col items-center text-center space-y-1.5 sm:space-y-3">
                <div className={`h-9 w-9 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-[11px] sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {t(service.titleKey)}
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground leading-snug line-clamp-3 sm:line-clamp-none">
                  {t(service.descKey)}
                </p>
                {service.clickable ? (
                  <Button variant="outline" size="sm" className="mt-0.5 text-[9px] sm:text-xs h-6 sm:h-8 px-1.5 sm:px-3 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all">
                    {t("continuity.explore")}
                    <ArrowRight className="ml-0.5 h-2.5 w-2.5 sm:h-4 sm:w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="mt-0.5 text-[9px] sm:text-xs h-6 sm:h-8 px-1.5 sm:px-3 text-muted-foreground border-border/50" disabled>
                    {t("continuity.comingSoon")}
                    <ArrowRight className="ml-0.5 h-2.5 w-2.5 sm:h-4 sm:w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
