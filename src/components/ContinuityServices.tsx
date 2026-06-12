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
    cardGradient: "from-[#F0F9FA] via-white to-white",
    iconBg: "from-[#0E9AAB] to-[#067A8A]",
    accentColor: "#0E9AAB",
    accentClass: "text-[#0E9AAB]",
    borderColor: "border-[#0E9AAB]/8 hover:border-[#0E9AAB]/25",
    shadowColor: "shadow-[#0E9AAB]/20",
  },
  {
    titleKey: "continuity.afterlife.title",
    descKey: "continuity.afterlife.desc",
    route: "/afterlife",
    icon: Heart,
    iconAccent: Leaf,
    cardGradient: "from-[#F8F5FA] via-white to-white",
    iconBg: "from-[#B8A0C8] to-[#8A7B9E]",
    accentColor: "#9B7DB8",
    accentClass: "text-[#9B7DB8]",
    borderColor: "border-[#9B7DB8]/8 hover:border-[#9B7DB8]/25",
    shadowColor: "shadow-[#9B7DB8]/20",
  },
];

export const ContinuityServices = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="other-providers" className="relative py-14 md:py-20 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
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
              className={`group relative flex flex-col overflow-hidden rounded-[20px] border border-border bg-white/60 backdrop-blur-sm p-6 md:p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 active:translate-y-0 active:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-400 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              style={{ transitionDuration: "400ms" }}
            >
              {/* Top accent bar — outline style */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
                }}
              />

              {/* Icon — outline style */}
              <div className="relative mb-6 md:mb-7 shrink-0">
                <div
                  className={`relative h-[72px] w-[72px] md:h-20 md:w-20 rounded-2xl border-2 border-border bg-white flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300`}
                >
                  <service.icon
                    className={`h-9 w-9 md:h-10 md:w-10 ${service.accentClass}`}
                    strokeWidth={1.5}
                  />
                  {/* Small accent badge — outlined */}
                  <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-white border-2 border-border shadow-sm flex items-center justify-center">
                    <service.iconAccent
                      className={`h-3.5 w-3.5 ${service.accentClass}`}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl md:text-[1.35rem] font-bold text-foreground mb-3 leading-snug tracking-tight">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm md:text-[0.95rem] text-muted-foreground/90 leading-[1.7] mb-8 md:mb-10">
                  {t(service.descKey)}
                </p>

                {/* CTA — outlined pill button */}
                <div className="mt-auto">
                  <div
                    className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-white/80 text-foreground text-sm font-semibold group-hover:border-border group-hover:bg-white group-hover:gap-3.5 transition-all duration-300`}
                  >
                    <span>{t("continuity.explore")}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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

