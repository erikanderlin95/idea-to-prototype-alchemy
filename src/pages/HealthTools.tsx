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
};

const TOOLS: Tool[] = [
  {
    emoji: "📏",
    title: "BMI Calculator",
    description: "Understand your body weight category and explore next steps.",
    to: "/explore-health/bmi-calculator",
  },
  {
    emoji: "🧋",
    title: "What's Your Sugar Habit?",
    description: "Understand your sweet drink habits and discover simple ways to reduce sugar intake.",
    to: "/explore-health/sugar-habit",
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
        <section className="container max-w-2xl px-4 py-8 md:py-12">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              ❤️ Quick Health Check
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Simple, self-guided tools to help you check in on your everyday health.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {TOOLS.map((tool) => (
              <button
                key={tool.title}
                type="button"
                onClick={() => {
                  track("health_tool_clicked", { tool: tool.title });
                  navigate(tool.to);
                }}
                className="text-left rounded-xl border border-border bg-card p-4 md:p-5 transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none shrink-0" aria-hidden>
                    {tool.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm md:text-base font-semibold text-foreground flex items-center gap-1.5">
                      {tool.title}
                      <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            More health tools coming soon.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HealthTools;
