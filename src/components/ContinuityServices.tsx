import { Building2, Heart, ArrowRight, Leaf, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const services = [
  {
    titleKey: "continuity.endOfService.title",
    descKey: "continuity.endOfService.desc",
    route: "/speakers",
    icon: Building2,
    iconAccent: Plus,
    cardGradient: "from-[#F0FAFB] via-white to-white",
    patternId: "tealPattern",
    iconBg: "from-[#0E9AAB] to-[#067A8A]",
    accentColor: "#0E9AAB",
    accentClass: "text-[#0E9AAB]",
    borderColor: "border-2 border-[#0E9AAB]/20 hover:border-[#0E9AAB]/60",
    shadowColor: "shadow-[#0E9AAB]/20",
  },
  {
    titleKey: "continuity.afterlife.title",
    descKey: "continuity.afterlife.desc",
    route: "/afterlife",
    icon: Heart,
    iconAccent: Leaf,
    cardGradient: "from-[#F7F3FB] via-white to-white",
    patternId: "lavenderPattern",
    iconBg: "from-[#B8A0C8] to-[#8A7B9E]",
    accentColor: "#9B7DB8",
    accentClass: "text-[#9B7DB8]",
    borderColor: "border-2 border-[#9B7DB8]/20 hover:border-[#9B7DB8]/60",
    shadowColor: "shadow-[#9B7DB8]/20",
  },
];


export const ContinuityServices = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="other-providers" className="relative py-14 md:py-20 bg-white overflow-hidden">
      {/* Subtle healthcare cross pattern background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] text-foreground pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="crossPattern"
            x="0"
            y="0"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25 17h6v8h8v6h-8v8h-6v-8h-8v-6h8z"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crossPattern)" />
      </svg>

      <div className="container relative px-4 md:px-6 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-foreground tracking-tight mb-4 leading-tight">
            {t("continuity.title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {t("continuity.subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(service.route)}
              className={`group relative flex flex-col overflow-hidden rounded-[24px] border ${service.borderColor} bg-gradient-to-br ${service.cardGradient} px-6 md:px-8 py-5 md:py-6 shadow-[0_2px_18px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_44px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
            >
              {/* Decorative pattern overlay (3-5% opacity) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ color: service.accentColor, opacity: 0.04 }}
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id={service.patternId}
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    {service.patternId === "tealPattern" ? (
                      <path d="M18 12h4v6h6v4h-6v6h-4v-6h-6v-4h6z" fill="currentColor" />
                    ) : (
                      <path
                        d="M0 20 Q10 10 20 20 T40 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    )}
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${service.patternId})`} />
              </svg>

              {/* Top accent bar on hover */}
              <div
                className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${service.accentColor}40, transparent)`,
                }}
              />

              {/* Icon — reduced ~18% */}
              <div className="relative mb-3 md:mb-4 shrink-0">
                <div
                  className={`relative h-[58px] w-[58px] md:h-16 md:w-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-lg ${service.shadowColor} group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300`}
                >
                  <service.icon
                    className="h-7 w-7 md:h-8 md:w-8 text-white"
                    strokeWidth={1.5}
                  />
                  <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-white border-[2.5px] border-white shadow-md flex items-center justify-center">
                    <service.iconAccent
                      className={`h-3 w-3 ${service.accentClass}`}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </div>

              {/* Content — tighter spacing */}
              <div className="relative flex flex-col flex-grow">
                <h3 className="text-[1.2rem] md:text-[1.4rem] font-bold text-foreground mb-1.5 leading-tight tracking-tight">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm md:text-[0.9rem] text-muted-foreground/85 leading-[1.55] mb-4 md:mb-5 line-clamp-2">
                  {t(service.descKey)}
                </p>

                {/* CTA — slightly smaller */}
                <div className="mt-auto">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.iconBg} text-white text-[13px] font-semibold shadow-md ${service.shadowColor} group-hover:shadow-lg group-hover:-translate-y-0.5 group-hover:gap-3 active:translate-y-0 transition-all duration-300`}
                  >
                    <span>{t("continuity.explore")}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

