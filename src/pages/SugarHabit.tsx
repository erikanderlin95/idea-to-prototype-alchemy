import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Stethoscope } from "lucide-react";

// Reference: Singapore HPB recommends limiting free/added sugars to <10% of
// daily energy intake (~50g/day for a 2,000 kcal diet). Nutri-Grade beverage
// grades: A ≤1g/100ml, B >1–5g/100ml, C >5–10g/100ml, D >10g/100ml.

type Drink = {
  id: string;
  label: string;
  emoji: string;
  // Approximate added sugar in grams per typical serving
  sugarPerServing: number;
  servingNote: string;
};

const DRINKS: Drink[] = [
  { id: "kopi_teh_sweet", label: "Kopi / Teh (with sugar & milk)", emoji: "☕", sugarPerServing: 18, servingNote: "per cup" },
  { id: "bubble_tea", label: "Bubble Tea (regular sweetness)", emoji: "🧋", sugarPerServing: 35, servingNote: "per 500ml cup" },
  { id: "soft_drink", label: "Soft Drink / Soda", emoji: "🥤", sugarPerServing: 35, servingNote: "per 330ml can" },
  { id: "packet_juice", label: "Packet Fruit Juice / Drink", emoji: "🧃", sugarPerServing: 22, servingNote: "per 250ml pack" },
  { id: "sports_drink", label: "Sports / Energy Drink", emoji: "⚡", sugarPerServing: 21, servingNote: "per 500ml bottle" },
  { id: "iced_dessert_drink", label: "Iced Milk Tea / Flavoured Latte", emoji: "🥛", sugarPerServing: 28, servingNote: "per cup" },
];

const DAILY_LIMIT_G = 50; // HPB guidance reference

function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event, props } }));
    if (typeof console !== "undefined") console.info("[analytics]", event, props);
  } catch {
    /* noop */
  }
}

type Band = {
  key: "low" | "moderate" | "high" | "veryHigh";
  label: string;
  description: string;
  tips: string[];
  className: string;
  badgeClass: string;
};

function getBand(dailySugar: number): Band {
  if (dailySugar <= 25)
    return {
      key: "low",
      label: "Low sugar habit",
      description: "Your sweet drink intake looks well within healthy daily limits. Keep it up.",
      tips: [
        "Continue choosing water, plain tea, or coffee without sugar most of the time",
        "Look out for Nutri-Grade A or B drinks when you do buy beverages",
        "Watch out for hidden sugars in sauces, snacks, and desserts",
      ],
      className: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-100",
      badgeClass: "bg-emerald-200/60 text-emerald-900",
    };
  if (dailySugar <= 50)
    return {
      key: "moderate",
      label: "Moderate sugar habit",
      description: "You're around Singapore's recommended daily limit for added sugars (about 50g). A few small swaps can help you stay comfortably within it.",
      tips: [
        "Ask for less sugar (kosong, siew dai, or half sugar) when ordering",
        "Try smaller cup sizes or share a sweet drink with a friend",
        "Swap one sweet drink each day for water or unsweetened tea",
      ],
      className: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-100",
      badgeClass: "bg-amber-200/60 text-amber-900",
    };
  if (dailySugar <= 100)
    return {
      key: "high",
      label: "High sugar habit",
      description: "You're regularly above the recommended daily limit for added sugars. Gentle, gradual reductions can make a meaningful difference.",
      tips: [
        "Choose Nutri-Grade A or B drinks more often, and limit C and D drinks",
        "Replace one or two sweet drinks each day with water or plain tea",
        "Order kosong / siew dai (less sugar) at the coffee shop",
        "Be mindful of portion sizes — try a smaller cup or regular sweetness instead of extra sweet",
      ],
      className: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-900 dark:text-orange-100",
      badgeClass: "bg-orange-200/60 text-orange-900",
    };
  return {
    key: "veryHigh",
    label: "Very high sugar habit",
    description: "Your sweet drink intake is well above the recommended daily limit. Small, consistent changes over time can support better long-term health.",
    tips: [
      "Set a simple goal — for example, halve your daily sweet drinks this week",
      "Default to water, plain tea, or unsweetened coffee at meals",
      "Limit Nutri-Grade C and D beverages where you can",
      "If you have diabetes, high blood pressure, or other health conditions, consider checking in with your GP for personalised guidance",
    ],
    className: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-100",
    badgeClass: "bg-rose-200/60 text-rose-900",
  };
}

const SugarHabit = () => {
  const [counts, setCounts] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    track("sugar_habit_page_viewed");
  }, []);

  const dailySugar = useMemo(() => {
    return DRINKS.reduce((sum, d) => {
      const n = parseFloat(counts[d.id] || "0");
      if (!isFinite(n) || n < 0) return sum;
      return sum + n * d.sugarPerServing;
    }, 0);
  }, [counts]);

  const band = useMemo(() => getBand(dailySugar), [dailySugar]);
  const teaspoons = Math.round((dailySugar / 4) * 10) / 10; // ~4g per tsp
  const percentOfLimit = Math.round((dailySugar / DAILY_LIMIT_G) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    track("sugar_habit_completed", { daily_sugar_g: Math.round(dailySugar), band: getBand(dailySugar).key });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl px-4 py-8 md:py-12">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              🧋 What's Your Sugar Habit?
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              A quick check-in on your sweet drink habits, based on Singapore's Health Promotion Board (HPB) guidance.
            </p>
          </header>

          <Card className="p-5 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                In a typical day, how many servings do you have of each drink?
              </p>
              <div className="space-y-3">
                {DRINKS.map((d) => (
                  <div key={d.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="text-xl leading-none shrink-0" aria-hidden>{d.emoji}</span>
                      <div className="min-w-0">
                        <Label htmlFor={`drink-${d.id}`} className="text-sm font-medium text-foreground">
                          {d.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">~{d.sugarPerServing}g sugar {d.servingNote}</p>
                      </div>
                    </div>
                    <Input
                      id={`drink-${d.id}`}
                      type="number"
                      inputMode="numeric"
                      placeholder="0"
                      min={0}
                      max={20}
                      step="1"
                      value={counts[d.id] || ""}
                      onChange={(e) => setCounts((c) => ({ ...c, [d.id]: e.target.value }))}
                      className="w-20 shrink-0 text-center"
                    />
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full">
                See my sugar habit
              </Button>
            </form>
          </Card>

          {submitted && (
            <div className="mt-6 space-y-4">
              <div
                className={cn("rounded-xl border p-5 md:p-6", band.className)}
                role="status"
                aria-live="polite"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide opacity-80">Estimated daily added sugar from drinks</p>
                    <p className="text-3xl md:text-4xl font-bold leading-tight">{Math.round(dailySugar)}g</p>
                    <p className="text-xs opacity-70 mt-0.5">
                      ≈ {teaspoons} tsp · {percentOfLimit}% of HPB's ~50g daily limit
                    </p>
                  </div>
                  <span className={cn("text-sm font-semibold px-3 py-1.5 rounded-full shrink-0", band.badgeClass)}>
                    {band.label}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{band.description}</p>
              </div>

              <Card className="p-5 md:p-6">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Simple ways to cut back
                </h3>
                <ul className="space-y-2.5">
                  {band.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {band.key !== "low" && (
                <Card className="p-5 md:p-6 border-l-4 border-l-primary bg-primary/5">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    Good to know
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Look out for the Nutri-Grade label on packaged drinks — choosing grade A or B more often is an easy way to lower added sugar. If you have diabetes, high blood pressure, or other ongoing health conditions, your GP can offer personalised advice.
                  </p>
                </Card>
              )}
            </div>
          )}

          <p className="mt-8 text-xs text-muted-foreground text-center">
            This tool is for general information and uses average sugar values. It is not a substitute for professional medical or dietetic advice.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SugarHabit;
