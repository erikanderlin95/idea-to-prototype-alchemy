import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Heart, Building2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: Mic,
    titleKey: "continuity.speakers.title",
    descKey: "continuity.speakers.desc",
    gradient: "from-ai-purple/15 to-ai-blue/10",
    iconBg: "from-ai-purple to-ai-blue",
    borderColor: "border-ai-purple/20 hover:border-ai-purple/40",
  },
  {
    icon: Heart,
    titleKey: "continuity.afterlife.title",
    descKey: "continuity.afterlife.desc",
    gradient: "from-ai-blue/15 to-ai-cyan/10",
    iconBg: "from-ai-blue to-ai-cyan",
    borderColor: "border-ai-blue/20 hover:border-ai-blue/40",
  },
  {
    icon: Building2,
    titleKey: "continuity.endOfService.title",
    descKey: "continuity.endOfService.desc",
    gradient: "from-ai-cyan/15 to-ai-violet/10",
    iconBg: "from-ai-cyan to-ai-violet",
    borderColor: "border-ai-cyan/20 hover:border-ai-cyan/40",
  },
];

export const ContinuityServices = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-cyan/10 text-ai-cyan mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("continuity.badge")}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t("continuity.title")}
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
            {t("continuity.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group bg-gradient-to-br ${service.gradient} border ${service.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(service.descKey)}
                </p>
                <Button variant="ghost" size="sm" className="mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" disabled>
                  {t("continuity.comingSoon")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
