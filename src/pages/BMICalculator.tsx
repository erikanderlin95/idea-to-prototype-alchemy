import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Stethoscope, AlertTriangle, ArrowRight } from "lucide-react";

type Category = {
  key: "severelyUnderweight" | "underweight" | "healthy" | "overweight" | "obese1" | "obese2" | "obese3";
  label: string;
  range: string;
  description: string;
  nextSteps: string[];
  seekMedicalHelp: string;
  urgency: "urgent" | "advised" | "routine";
  className: string;
  badgeClass: string;
};

function getCategory(bmi: number): Category {
  if (bmi < 16)
    return {
      key: "severelyUnderweight",
      label: "Severely Underweight",
      range: "BMI < 16",
      description: "Your BMI is below the healthy range. A check-in with a healthcare professional can help rule out underlying causes and guide nutrition support.",
      nextSteps: [
        "Consider a GP visit to check for underlying conditions such as thyroid or digestive issues",
        "Ask about a dietitian referral for a personalised meal plan",
        "Track your meals, energy levels, and any symptoms to share with your doctor",
        "Include gentle strength activities and nutrient-dense foods in your routine",
      ],
      seekMedicalHelp: "Speak with a GP within the next few weeks, or sooner if you feel faint, very weak, or are losing weight unintentionally.",
      urgency: "urgent",
      className: "bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/40 dark:border-sky-900 dark:text-sky-100",
      badgeClass: "bg-sky-200/60 text-sky-900",
    };
  if (bmi < 18.5)
    return {
      key: "underweight",
      label: "Underweight",
      range: "BMI 16 – 18.4",
      description: "Your BMI is just below the healthy range. Small, sustainable changes can help you reach a comfortable, healthy weight.",
      nextSteps: [
        "Speak with a GP if you have trouble gaining weight or notice ongoing fatigue",
        "Work with a dietitian on a balanced, calorie-adequate eating plan",
        "Add strength training to build lean muscle mass gradually",
        "Focus on protein-rich whole foods and consistent meal timing",
      ],
      seekMedicalHelp: "See a GP if you have ongoing fatigue, hair loss, missed periods, or difficulty gaining weight despite eating well.",
      urgency: "advised",
      className: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-100",
      badgeClass: "bg-blue-200/60 text-blue-900",
    };
  if (bmi < 25)
    return {
      key: "healthy",
      label: "Healthy Weight",
      range: "BMI 18.5 – 24.9",
      description: "Your BMI is within the healthy range. Keep up your balanced lifestyle with regular activity and good nutrition.",
      nextSteps: [
        "Maintain a balanced diet with whole foods and adequate protein",
        "Stay active with at least 150 minutes of moderate exercise per week",
        "Keep up with routine health screenings",
        "Prioritise sleep and stress management",
      ],
      seekMedicalHelp: "Continue with routine check-ups. See a GP if you notice sudden weight changes or new symptoms.",
      urgency: "routine",
      className: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-100",
      badgeClass: "bg-emerald-200/60 text-emerald-900",
    };
  if (bmi < 30)
    return {
      key: "overweight",
      label: "Overweight",
      range: "BMI 25 – 29.9",
      description: "Your BMI is slightly above the healthy range. Gentle, consistent steps can make a meaningful difference over time.",
      nextSteps: [
        "Consider a routine GP or wellness check for a personalised health plan",
        "Introduce more whole foods and mindful portion sizes gradually",
        "Build up enjoyable movement — aim for 150–300 minutes of moderate activity weekly",
        "Track small wins like energy levels, sleep quality, and stamina",
      ],
      seekMedicalHelp: "Helpful to check in if you have high blood pressure, high cholesterol, a family history of diabetes, or joint discomfort.",
      urgency: "advised",
      className: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-100",
      badgeClass: "bg-amber-200/60 text-amber-900",
    };
  if (bmi < 35)
    return {
      key: "obese1",
      label: "Obese (Class I)",
      range: "BMI 30 – 34.9",
      description: "Your BMI is above the healthy range. A proactive, supportive health plan can help you move towards a weight that feels right for you.",
      nextSteps: [
        "Schedule a routine GP appointment for a general health review",
        "Ask about referrals to a dietitian or exercise physiologist if available",
        "Consider screening for blood pressure, cholesterol, and blood sugar as routine prevention",
        "Set small, realistic goals with your care team and celebrate progress",
      ],
      seekMedicalHelp: "A routine GP visit is a good next step, especially if you experience shortness of breath, loud snoring, or joint stiffness.",
      urgency: "advised",
      className: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-900 dark:text-orange-100",
      badgeClass: "bg-orange-200/60 text-orange-900",
    };
  if (bmi < 40)
    return {
      key: "obese2",
      label: "Severely Obese (Class II)",
      range: "BMI 35 – 39.9",
      description: "Your BMI is above the healthy range. Working with a healthcare team can help you create a steady, personalised plan that fits your life.",
      nextSteps: [
        "Book a routine GP appointment for a health review and care plan",
        "Discuss whether dietetics, physiotherapy, or other support services might help",
        "Ask about routine screenings for diabetes, blood pressure, sleep quality, and liver health",
        "Look into community programmes or support groups that feel right for you",
      ],
      seekMedicalHelp: "A GP check-in is recommended within the next few weeks. Seek care promptly if you have chest discomfort, significant breathlessness, or leg swelling.",
      urgency: "urgent",
      className: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-100",
      badgeClass: "bg-rose-200/60 text-rose-900",
    };
  return {
    key: "obese3",
    label: "Very Severely Obese (Class III)",
    range: "BMI ≥ 40",
    description: "Your BMI is above the healthy range. Support from a healthcare team can help you build a personalised, sustainable plan.",
    nextSteps: [
      "Schedule a GP appointment for a full health review and supportive care plan",
      "Ask about comprehensive support: dietetics, physiotherapy, and possible specialist input",
      "Discuss routine screenings for diabetes, cardiovascular health, sleep quality, and joint comfort",
      "Ask about evidence-based weight-management programmes available in your area",
    ],
    seekMedicalHelp: "A GP visit is recommended soon. If you experience chest tightness, severe shortness of breath, or fainting, seek emergency care.",
    urgency: "urgent",
    className: "bg-red-50 border-red-300 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-100",
    badgeClass: "bg-red-200/60 text-red-900",
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

  const healthyWeightRange = useMemo(() => {
    const h = parseFloat(height);
    if (!h || h < 50 || h > 272) return null;
    const meters = h / 100;
    const lower = 18.5 * meters * meters;
    const upper = 24.9 * meters * meters;
    return { lower: Math.round(lower * 10) / 10, upper: Math.round(upper * 10) / 10 };
  }, [height]);

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
            <div className="mt-6 space-y-4">
              {/* Main result card */}
              <div
                className={cn(
                  "rounded-xl border p-5 md:p-6 transition-all",
                  category.className,
                )}
                role="status"
                aria-live="polite"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide opacity-80">Your BMI</p>
                    <p className="text-3xl md:text-4xl font-bold leading-tight">{bmi.toFixed(1)}</p>
                    <p className="text-xs opacity-70 mt-0.5">{category.range}</p>
                  </div>
                  <span className={cn("text-sm font-semibold px-3 py-1.5 rounded-full shrink-0", category.badgeClass)}>
                    {category.label}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{category.description}</p>
              </div>

              {/* Recommended next steps */}
              <Card className="p-5 md:p-6">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Recommended next steps
                </h3>
                <ul className="space-y-2.5">
                  {category.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* When to seek medical help */}
              <Card
                className={cn(
                  "p-5 md:p-6 border-l-4",
                  category.urgency === "urgent"
                    ? "border-l-destructive bg-destructive/5"
                    : category.urgency === "advised"
                      ? "border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                      : "border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20",
                )}
              >
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  {category.urgency === "urgent" ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Stethoscope className="h-4 w-4 text-primary" />
                  )}
                  When to seek medical help
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.seekMedicalHelp}
                </p>
              </Card>
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
