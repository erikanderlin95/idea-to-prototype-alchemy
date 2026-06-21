import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Category = {
  key: "underweight" | "healthy" | "overweight" | "obese";
  label: string;
  description: string;
  className: string;
};

function getCategory(bmi: number): Category {
  if (bmi < 18.5)
    return {
      key: "underweight",
      label: "Underweight",
      description: "Your BMI is below the healthy range. Consider speaking with a GP about nutrition and overall wellbeing.",
      className: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-100",
    };
  if (bmi < 25)
    return {
      key: "healthy",
      label: "Healthy",
      description: "Your BMI is within the healthy range. Keep up your balanced lifestyle with regular activity and good nutrition.",
      className: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-100",
    };
  if (bmi < 30)
    return {
      key: "overweight",
      label: "Overweight",
      description: "Your BMI is slightly above the healthy range. A GP or wellness provider can help with preventive health steps.",
      className: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-100",
    };
  return {
    key: "obese",
    label: "Obese",
    description: "Your BMI is in the obese range. We recommend consulting a GP for a personalised health assessment.",
    className: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-100",
  };
}

type NextStep = {
  emoji: string;
  title: string;
  description: string;
  to: string;
};

const NEXT_STEPS: NextStep[] = [
  {
    emoji: "❤️",
    title: "GP & Health Screening",
    description: "Explore GP clinics and preventive health services.",
    to: "/gp",
  },
  {
    emoji: "🌿",
    title: "TCM",
    description: "Support overall wellness and preventive care.",
    to: "/tcm",
  },
  {
    emoji: "🧬",
    title: "DNA Insights",
    description: "Explore personalised health and wellness insights.",
    to: "/?category=dna_health",
  },
  {
    emoji: "🧠",
    title: "Mental Wellness",
    description: "Access counselling and mental wellness support.",
    to: "/?category=mental_wellness",
  },
];

function track(event: string, props: Record<string, unknown> = {}) {
  try {
    // Lightweight analytics: forward to window event + console for now
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event, props } }));
    if (typeof console !== "undefined") console.info("[analytics]", event, props);
  } catch {
    /* noop */
  }
}

const BMICalculator = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("bmi_page_viewed");
  }, []);

  const category = useMemo(() => (bmi != null ? getCategory(bmi) : null), [bmi]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h < 50 || h > 272 || w < 2 || w > 500) {
      setError("Please enter a valid height (50–272 cm) and weight (2–500 kg).");
      setBmi(null);
      return;
    }
    setError(null);
    const meters = h / 100;
    const value = w / (meters * meters);
    const rounded = Math.round(value * 10) / 10;
    setBmi(rounded);
    const cat = getCategory(rounded);
    track("bmi_calculation_completed", { bmi: rounded, category: cat.key });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl px-4 py-8 md:py-12">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              📏 BMI Calculator
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Quickly check your Body Mass Index and explore relevant care options.
            </p>
          </header>

          <Card className="p-5 md:p-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min={50}
                    max={272}
                    step="0.1"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 65"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min={2}
                    max={500}
                    step="0.1"
                    required
                  />
                </div>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Calculate BMI
              </Button>
            </form>
          </Card>

          {bmi != null && category && (
            <div
              className={cn(
                "mt-6 rounded-xl border p-5 md:p-6 transition-all",
                category.className,
              )}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide opacity-80">Your BMI</p>
                  <p className="text-3xl md:text-4xl font-bold leading-tight">{bmi.toFixed(1)}</p>
                </div>
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white/60 dark:bg-black/20">
                  {category.label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{category.description}</p>
            </div>
          )}

          <section className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Explore next steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {NEXT_STEPS.map((step) => (
                <NextStepCard
                  key={step.title}
                  step={step}
                  bmiCategory={category?.key}
                  onClick={() => {
                    track("bmi_next_step_clicked", {
                      card: step.title,
                      bmi_category: category?.key ?? null,
                    });
                    navigate(step.to);
                  }}
                />
              ))}
            </div>
          </section>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            This calculator is for informational purposes only and does not replace professional medical advice.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const NextStepCard = ({
  step,
  bmiCategory,
  onClick,
}: {
  step: NextStep;
  bmiCategory?: Category["key"];
  onClick: () => void;
}) => {
  useEffect(() => {
    track("bmi_next_step_impression", { card: step.title, bmi_category: bmiCategory ?? null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left rounded-xl border border-border bg-card p-4 md:p-5 transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none shrink-0" aria-hidden>
          {step.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-foreground">{step.title}</h3>
          <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug">
            {step.description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default BMICalculator;
