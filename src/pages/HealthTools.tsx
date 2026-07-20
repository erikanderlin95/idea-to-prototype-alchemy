import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lock } from "lucide-react";

type Tool = {
  emoji: string;
  title: string;
  description: string;
  iconBg: string;
};

const TOOLS: Tool[] = [
  {
    emoji: "📏",
    title: "BMI Calculator",
    description: "Check your BMI and understand your weight category.",
    iconBg: "bg-sky-100 text-sky-600",
  },
  {
    emoji: "🧋",
    title: "What's Your Sugar Habit?",
    description: "A quick check-in on today's sweet habits.",
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
              Health and Wealth audit
            </h1>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed max-w-md">
              A curated set of self-guided check-ins — coming soon.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 opacity-70">
            {TOOLS.map((tool) => (
              <div
                key={tool.title}
                className="relative text-left rounded-2xl border border-border bg-card p-5 md:p-6 cursor-not-allowed overflow-hidden"
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
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0 mt-0.5">
                    <Lock className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground/70 text-center">
            🌱 More health check-ins coming soon.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HealthTools;
