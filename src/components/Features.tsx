import { Eye, GitCompareArrows, ArrowRight } from "lucide-react";

export const Features = () => {
  return (
    <section id="features" className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            How ClynicQ helps you
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 max-w-5xl mx-auto items-stretch">
          {/* Card 1 — PRIMARY */}
          <div
            className="md:col-span-6 relative overflow-hidden rounded-2xl p-6 md:p-8 border-2 border-ai-purple/40 shadow-lg shadow-ai-purple/10 hover:shadow-xl transition-all"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--ai-purple)/0.15), hsl(var(--ai-blue)/0.10))",
            }}
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase text-ai-purple bg-ai-purple/15 border border-ai-purple/30 mb-3">
              Start here
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--ai-purple)), hsl(var(--ai-blue)))",
                }}
              >
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                See Queue First
              </h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Check how many patients are ahead before you go.
            </p>
          </div>

          {/* Card 2 — DECISION */}
          <div className="md:col-span-3 rounded-2xl p-5 md:p-6 border border-border bg-card hover:border-ai-blue/40 transition-all">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: "hsl(var(--ai-blue)/0.12)" }}
            >
              <GitCompareArrows className="h-5 w-5 text-ai-blue" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5">
              Choose Better
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Compare nearby clinics and go where the queue is shorter.
            </p>
          </div>

          {/* Card 3 — ACTION (secondary) */}
          <div className="md:col-span-3 rounded-2xl p-5 md:p-6 border border-border bg-card hover:border-ai-cyan/40 transition-all">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: "hsl(var(--ai-cyan)/0.12)" }}
            >
              <ArrowRight className="h-5 w-5 text-ai-cyan" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5">
              Join or Book
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Join the queue or book directly with the clinic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
