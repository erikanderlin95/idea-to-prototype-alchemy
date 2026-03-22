import { BarChart3, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QueueIcon, AppointmentsIcon, ChatbotIcon } from "@/components/icons/FeatureIcons";
import { useLanguage } from "@/contexts/LanguageContext";

export const Features = () => {
  const { t } = useLanguage();
  
  const mainFeatures = [
    {
      icon: "queue",
      title: t("features.queue.title"),
      subtitle: t("features.queue.subtitle"),
      description: t("features.queue.description"),
    },
    {
      icon: "book",
      title: t("features.book.title"),
      subtitle: t("features.book.subtitle"),
      description: t("features.book.description"),
    },
    {
      icon: "connect",
      title: t("features.connect.title"),
      subtitle: t("features.connect.subtitle"),
      description: t("features.connect.description"),
    },
  ];

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: t("features.transparency.title"),
      description: t("features.transparency.description"),
    },
    {
      icon: Shield,
      title: t("features.pdpa.title"),
      description: t("features.pdpa.description"),
    },
    {
      icon: Zap,
      title: t("features.fast.title"),
      description: t("features.fast.description"),
    },
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">{t("features.badge")}</Badge>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-3">{t("features.title")}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Main Features - Queue, Book, Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 px-2 sm:px-0">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-ai-purple/5 via-ai-blue/5 to-ai-cyan/5 p-6 rounded-xl border border-ai-purple/20 hover:border-ai-blue/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
              style={{ 
                background: index === 0 ? 'linear-gradient(135deg, hsl(var(--ai-purple)/0.08), hsl(var(--ai-blue)/0.05))' :
                           index === 1 ? 'linear-gradient(135deg, hsl(var(--ai-blue)/0.08), hsl(var(--ai-cyan)/0.05))' :
                           'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-violet)/0.05))'
              }}
            >
              <div className="flex justify-center mb-3">
                {feature.icon === "queue" && <QueueIcon size="md" />}
                {feature.icon === "book" && <AppointmentsIcon size="md" />}
                {feature.icon === "connect" && <ChatbotIcon size="md" />}
              </div>
              <h3 className="text-lg font-bold mb-1 text-center">{feature.title}</h3>
              <p className="text-xs font-semibold text-primary text-center mb-2">{feature.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-4 rounded-lg border border-ai-indigo/20 hover:border-ai-purple/40 transition-all duration-300 hover:shadow-md hover:shadow-ai-purple/10"
            >
              <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.25), hsl(var(--ai-blue)/0.15))' }}
              >
                <feature.icon className="h-5 w-5 text-ai-purple" />
              </div>
              <h3 className="text-base font-bold mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
