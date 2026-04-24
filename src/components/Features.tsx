import { Eye, GitCompareArrows, CheckCircle2, ArrowRight } from "lucide-react";

export const Features = () => {
  const steps = [
    {
      step: "Step 1",
      icon: Eye,
      title: "See Queue First",
      desc: "Check how many patients are ahead before you go.",
      tint: "hsl(var(--ai-purple))",
    },
    {
      step: "Step 2",
      icon: GitCompareArrows,
      title: "Choose Better",
      desc: "Compare nearby clinics and go where the queue is shorter.",
      tint: "hsl(var(--ai-blue))",
    },
    {
      step: "Step 3",
      icon: CheckCircle2,
      title: "Join or Book",
      desc: "Join the queue or book directly with the clinic.",
      tint: "hsl(var(--ai-cyan))",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            How ClynicQ helps you
          </h2>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isPrimary = i === 0;
            return (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1 gap-4 md:gap-3">
                <div
                  className="flex-1 w-full rounded-2xl p-6 border bg-card transition-all hover:shadow-md flex flex-col"
                  style={{
                    borderColor: isPrimary ? `${s.tint.replace(")", "/0.45)")}` : `${s.tint.replace(")", "/0.25)")}`,
                    background: isPrimary
                      ? `linear-gradient(135deg, ${s.tint.replace(")", "/0.08)")}, hsl(var(--card)))`
                      : "hsl(var(--card))",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center"
                      style={{ background: s.tint.replace(")", "/0.12)") }}
                    >
                      <Icon className="h-5 w-5" style={{ color: s.tint }} />
                    </div>
                    <span
                      className="text-[11px] font-semibold tracking-wide uppercase"
                      style={{ color: s.tint }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1.5">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <ArrowRight
                    className="hidden md:block h-5 w-5 flex-shrink-0 text-muted-foreground/40"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
