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
      accentSolid: PURPLE,
      iconBg: `linear-gradient(135deg, ${PURPLE}, ${PURPLE.replace(")", "/0.78)")})`,
      iconColor: "#fff",
      iconFill: "rgba(255,255,255,0.18)",
    },
    {
      step: "Step 2",
      icon: Layers,
      title: "Choose Better",
      desc: "Compare nearby clinics and go where the queue is shorter.",
      accentSolid: TEAL,
      iconBg: `linear-gradient(135deg, ${PURPLE.replace(")", "/0.16)")}, ${TEAL.replace(")", "/0.18)")})`,
      iconColor: PURPLE,
      iconFill: "none",
    },
    {
      step: "Step 3",
      icon: CheckCircle2,
      title: "Join or Book",
      desc: "Join the queue or book directly with the clinic.",
      accentSolid: TEAL,
      iconBg: `linear-gradient(135deg, ${TEAL}, ${TEAL.replace(")", "/0.78)")})`,
      iconColor: "#fff",
      iconFill: "rgba(255,255,255,0.18)",
    },
  ];

  const gradientBorder = `linear-gradient(135deg, ${PURPLE}, ${TEAL})`;

  return (
    <section id="features" className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How ClynicQ helps you
          </h2>
        </div>

        <div className="w-[90%] md:w-[88%] max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 items-stretch gap-4 md:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl p-[1.5px] transition-all duration-300 hover:-translate-y-0.5 h-full"
                style={{
                  background: gradientBorder,
                  boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 6px 18px -10px rgba(16,24,40,0.10)",
                }}
              >
                <div
                  className="rounded-[10px] bg-white px-6 py-7 md:px-7 md:py-8 h-full flex flex-col"
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
                      className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
                      style={{ color: s.accentSolid }}
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
                    className="text-[13px] leading-snug min-h-[40px]"
                    style={{ color: "hsl(220 9% 46%)" }}
                  >
                    {s.desc}
                  </p>
                </div>
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
