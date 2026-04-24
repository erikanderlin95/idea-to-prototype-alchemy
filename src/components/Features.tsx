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
      accentSolid: PURPLE,
      tintBg: `linear-gradient(180deg, ${PURPLE.replace(")", "/0.05)")}, #ffffff)`,
      borderLeft: `3px solid ${PURPLE}`,
      iconBg: `linear-gradient(135deg, ${PURPLE}, ${PURPLE.replace(")", "/0.78)")})`,
      iconColor: "#fff",
      iconFill: "rgba(255,255,255,0.18)",
    },
    {
      step: "Step 2",
      icon: Layers,
      title: "Choose Better",
      desc: "Compare nearby clinics and go where the queue is shorter.",
      accent: `linear-gradient(90deg, ${PURPLE}, ${TEAL})`,
      accentSolid: TEAL,
      tintBg: "#ffffff",
      borderLeft: `3px solid transparent`,
      borderImage: `linear-gradient(180deg, ${PURPLE}, ${TEAL}) 1`,
      iconBg: `linear-gradient(135deg, ${PURPLE.replace(")", "/0.16)")}, ${TEAL.replace(")", "/0.18)")})`,
      iconColor: PURPLE,
      iconFill: "none",
    },
    {
      step: "Step 3",
      icon: CheckCircle2,
      title: "Join or Book",
      desc: "Join the queue or book directly with the clinic.",
      accent: TEAL,
      accentSolid: TEAL,
      tintBg: `linear-gradient(180deg, ${TEAL.replace(")", "/0.05)")}, #ffffff)`,
      borderLeft: `3px solid ${TEAL}`,
      iconBg: `linear-gradient(135deg, ${TEAL}, ${TEAL.replace(")", "/0.78)")})`,
      iconColor: "#fff",
      iconFill: "rgba(255,255,255,0.18)",
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

        <div className="w-[88%] md:w-[72%] max-w-[1080px] mx-auto flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1 max-w-[420px] mx-auto md:mx-0 w-full gap-3">
                <div
                  className="group flex-1 w-full rounded-xl px-5 py-6 md:py-7 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                  style={{
                    background: s.tintBg,
                    borderLeft: s.borderLeft,
                    borderImage: (s as any).borderImage,
                    boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 6px 18px -10px rgba(16,24,40,0.10)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ background: s.iconBg }}
                    >
                      <Icon
                        className="h-[20px] w-[20px]"
                        style={{ color: s.iconColor }}
                        strokeWidth={2.25}
                        fill={s.iconFill as any}
                      />
                    </div>
                    <span
                      className="text-[10.5px] font-medium tracking-[0.14em] uppercase"
                      style={{ color: s.accent }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3
                    className="text-[16.5px] md:text-[17px] font-semibold mb-1"
                    style={{ color: "hsl(220 18% 18%)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-[13px] leading-snug"
                    style={{ color: "hsl(220 9% 46%)" }}
                  >
                    {s.desc}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center flex-shrink-0">
                    <ArrowRight
                      className="h-4 w-4"
                      style={{ stroke: "url(#flowGradient)" }}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
