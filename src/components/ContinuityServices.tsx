import { Building2, Heart, ArrowRight, Leaf, Users, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const services = [
  {
    titleKey: "continuity.endOfService.title",
    descKey: "continuity.endOfService.desc",
    route: "/speakers",
    icon: Building2,
    iconAccent: Plus,
    cardGradient: "from-[#F0F9FA] via-white to-white",
    iconBg: "from-[#0E9AAB] to-[#067A8A]",
    iconShadow: "shadow-[#0E9AAB]/25",
    borderColor: "border-[#0E9AAB]/15 hover:border-[#0E9AAB]/30",
    accentColor: "text-[#0E9AAB]",
    ctaKey: "continuity.explore",
    deco: "corporate",
  },
  {
    titleKey: "continuity.afterlife.title",
    descKey: "continuity.afterlife.desc",
    route: "/afterlife",
    icon: Heart,
    iconAccent: Leaf,
    cardGradient: "from-[#F8F5FA] via-white to-white",
    iconBg: "from-[#B8A0C8] to-[#8A7AB0]",
    iconShadow: "shadow-[#9B7DB8]/25",
    borderColor: "border-[#9B7DB8]/15 hover:border-[#9B7DB8]/30",
    accentColor: "text-[#9B7DB8]",
    ctaKey: "continuity.explore",
    deco: "afterlife",
  },
];

export const ContinuityServices = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="other-providers" className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20 text-xs font-semibold tracking-wider uppercase mb-4">
            {t("continuity.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            {t("continuity.title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t("continuity.subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.route)}
              className={`group relative overflow-hidden rounded-[20px] border ${service.borderColor} bg-gradient-to-br ${service.cardGradient} p-6 md:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer`}
            >
              {/* Decorative background shapes */}
              {service.deco === "corporate" ? (
                <>
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#0E9AAB]/[0.06] to-transparent blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-[#0E9AAB]/[0.04] to-transparent blur-xl" />
                  {/* Subtle cross/plus decoration */}
                  <svg className="absolute top-6 right-8 w-8 h-8 text-[#0E9AAB]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute bottom-8 right-12 w-5 h-5 text-[#0E9AAB]/8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </>
              ) : (
                <>
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#9B7DB8]/[0.06] to-transparent blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B7DB8]/[0.04] to-transparent blur-xl" />
                  {/* Subtle leaf decoration */}
                  <svg className="absolute top-5 right-7 w-7 h-7 text-[#9B7DB8]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 2.9-.3 4.2-.9" strokeLinecap="round" />
                    <path d="M12 22c5.5-3 8-7 8-12 0-3-1.5-5.5-4-7" strokeLinecap="round" />
                    <path d="M12 22V12" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute bottom-10 right-14 w-4 h-4 text-[#9B7DB8]/8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </>
              )}

              {/* Icon */}
              <div className="relative mb-5 md:mb-6">
                <div className={`relative h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-lg ${service.iconShadow} group-hover:scale-105 transition-transform duration-300`}>
                  <service.icon className="h-7 w-7 md:h-8 md:w-8 text-white" strokeWidth={1.8} />
                  {/* Small accent badge */}
                  <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center">
                    <service.iconAccent className={`h-3 w-3 ${service.accentColor}`} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2.5 leading-snug">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6 md:mb-8">
                  {t(service.descKey)}
                </p>

                {/* CTA */}
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${service.accentColor} group-hover:gap-3 transition-all duration-300`}>
                  <span>{t(service.ctaKey)}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r ${service.deco === "corporate" ? "from-[#0E9AAB]/0 via-[#0E9AAB]/30 to-[#0E9AAB]/0" : "from-[#9B7DB8]/0 via-[#9B7DB8]/30 to-[#9B7DB8]/0"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
