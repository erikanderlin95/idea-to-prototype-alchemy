import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

type Tool = {
  emoji: string;
  title: string;
  description: string;
  to: string;
  iconBg: string;
};

const TOOLS: Tool[] = [
  {
    emoji: "📏",
    title: "BMI Calculator",
    description: "Check your BMI and understand your weight category.",
    to: "/explore-health/bmi-calculator",
    iconBg: "bg-sky-100 text-sky-600",
  },
  {
    emoji: "🧋",
    title: "What's Your Sugar Habit?",
    description: "A quick check-in on today's sweet habits.",
    to: "/explore-health/sugar-habit",
    iconBg: "bg-rose-100 text-rose-600",
  },
];

function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event, props } }));
    if (typeof console !== "undefined") console.info("[analytics]", event, props);
  } catch {
    /* noop */
  }
}

const HealthTools = () => {
  const navigate = useNavigate();

  useEffect(() => {
    track("health_tools_page_viewed");
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-xl px-4 pt-5 pb-6 md:pt-8 md:pb-10">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Quick Health Check
            </h1>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed max-w-md">
              Simple, self-guided tools to help you check in on your everyday health.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {TOOLS.map((tool) => (
              <button
                key={tool.title}
                type="button"
                onClick={() => {
                  track("health_tool_clicked", { tool: tool.title });
                  navigate(tool.to);
                }}
                className="text-left rounded-2xl border border-border bg-card p-5 md:p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-[0_8px_28px_-6px_hsl(var(--primary)/0.18)] hover:-translate-y-0.5 active:scale-[0.98] active:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-xl shrink-0 ${tool.iconBg}`}
                    aria-hidden
                  >
                    {tool.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm md:text-base font-semibold text-foreground leading-snug">
                      {tool.title}
                    </h2>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                      {tool.description}
                    </p>
                  </div>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground/70 text-center">
            🌱 More health check-ins coming soon.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="container max-w-xl px-4 pb-6 md:pb-8">
          <div className="rounded-xl border border-border/60 bg-muted/40 p-4 md:p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              General disclaimer
            </h3>
            <p className="text-[11px] md:text-xs text-muted-foreground/80 leading-relaxed">
              These tools are provided for educational and awareness purposes only and do not provide medical advice, diagnosis or treatment. If you have concerns about your health, please consult a qualified healthcare professional.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HealthTools;
