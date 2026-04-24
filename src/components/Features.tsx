import { Eye, Layers, CheckCircle2, ArrowRight } from "lucide-react";

const PURPLE = "hsl(var(--ai-purple))";
const TEAL = "hsl(var(--ai-cyan))";

export const Features = () => {
  const steps = [
    {
      step: "Step 1",
      icon: Eye,
      title: "See Queue First",
      desc: "Check how many patients are ahead before you go.",
      accent: PURPLE,
      tintBg: `linear-gradient(180deg, ${PURPLE.replace(")", "/0.07)")}, hsl(var(--card)))`,
      borderColor: PURPLE.replace(")", "/0.30)"),
      iconBg: `linear-gradient(135deg, ${PURPLE}, ${PURPLE.replace(")", "/0.75)")})`,
      iconColor: "#fff",
    },
    {
      step: "Step 2",
      icon: Layers,
      title: "Choose Better",
      desc: "Compare nearby clinics and go where the queue is shorter.",
      accent: TEAL,
      tintBg: "hsl(var(--card))",
      borderColor: "hsl(var(--border))",
      iconBg: TEAL.replace(")", "/0.12)"),
      iconColor: TEAL,
    },
    {
      step: "Step 3",
      icon: CheckCircle2,
      title: "Join or Book",
      desc: "Join the queue or book directly with the clinic.",
      accent: TEAL,
      tintBg: "hsl(var(--card))",
      borderColor: "hsl(var(--border))",
      iconBg: `linear-gradient(135deg, ${PURPLE.replace(")", "/0.15)")}, ${TEAL.replace(")", "/0.18)")})`,
      iconColor: TEAL,
    },
  ];

  return (
    <section id="features" className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How ClynicQ helps you
          </h2>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1 gap-4 md:gap-3">
                <div
                  className="group flex-1 w-full rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                  style={{
                    borderColor: s.borderColor,
                    background: s.tintBg,
                    boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -12px rgba(16,24,40,0.10)",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center"
                      style={{ background: s.iconBg }}
                    >
                      <Icon
                        className="h-[22px] w-[22px]"
                        style={{ color: s.iconColor }}
                        strokeWidth={2.25}
                        fill={i === 0 ? "rgba(255,255,255,0.18)" : "none"}
                      />
                    </div>
                    <span
                      className="text-[10.5px] font-medium tracking-[0.14em] uppercase"
                      style={{ color: s.accent, opacity: 0.85 }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3
                    className="text-[17px] md:text-[18px] font-semibold mb-1.5"
                    style={{ color: "hsl(220 18% 18%)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-[13.5px] leading-relaxed truncate"
                    style={{ color: "hsl(220 9% 46%)" }}
                  >
                    {s.desc}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center flex-shrink-0">
                    <ArrowRight
                      className="h-5 w-5"
                      style={{
                        stroke: "url(#flowGradient)",
                        color: TEAL,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SVG gradient definition for arrow stroke */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={PURPLE} />
              <stop offset="100%" stopColor={TEAL} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};
