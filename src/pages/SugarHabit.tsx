import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Stethoscope, RotateCcw } from "lucide-react";

// Reference: Singapore HPB recommends limiting free/added sugars to <10% of
// daily energy intake (~50g/day for a 2,000 kcal diet). Nutri-Grade beverage
// grades: A ≤1g/100ml, B >1–5g/100ml, C >5–10g/100ml, D >10g/100ml.

type Item = {
  id: string;
  label: string;
  emoji: string;
  sugarPerServing: number; // grams added sugar per serving unit
  unitLabels: [string, string, string, string]; // for None / 1 / 2 / 3+
};

const DRINKS: Item[] = [
  { id: "kopi_teh_sweet", label: "Kopi / Teh with sugar & milk", emoji: "☕", sugarPerServing: 18, unitLabels: ["None", "1 cup", "2 cups", "3+ cups"] },
  { id: "bubble_tea", label: "Bubble Tea", emoji: "🧋", sugarPerServing: 35, unitLabels: ["None", "1 cup", "2 cups", "3+ cups"] },
  { id: "soft_drink", label: "Soft Drinks", emoji: "🥤", sugarPerServing: 35, unitLabels: ["None", "1 can", "2 cans", "3+ cans"] },
  { id: "packet_juice", label: "Sweetened Juice / Pack Drinks", emoji: "🧃", sugarPerServing: 22, unitLabels: ["None", "1 pack", "2 packs", "3+ packs"] },
  { id: "energy_drink", label: "Energy Drinks", emoji: "⚡", sugarPerServing: 21, unitLabels: ["None", "1 bottle", "2 bottles", "3+ bottles"] },
];

const SNACKS: Item[] = [
  { id: "biscuits", label: "Biscuits / Cookies", emoji: "🍪", sugarPerServing: 6, unitLabels: ["None", "A little", "Some", "A lot"] },
  { id: "chocolate", label: "Chocolate / Candy", emoji: "🍫", sugarPerServing: 10, unitLabels: ["None", "A little", "Some", "A lot"] },
  { id: "cake", label: "Cakes / Desserts", emoji: "🍰", sugarPerServing: 18, unitLabels: ["None", "A little", "Some", "A lot"] },
  { id: "ice_cream", label: "Ice Cream", emoji: "🍦", sugarPerServing: 14, unitLabels: ["None", "A little", "Some", "A lot"] },
];

// Servings represented by each chip index (0..3)
const SERVING_MULTIPLIER = [0, 1, 2, 3];

const DAILY_LIMIT_G = 50;

function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event, props } }));
    if (typeof console !== "undefined") console.info("[analytics]", event, props);
  } catch {
    /* noop */
  }
}

type BandKey = "low" | "moderate" | "high" | "veryHigh";

type Band = {
  key: BandKey;
  className: string;
  badgeClass: string;
};

function getBand(dailySugar: number): Band {
  if (dailySugar <= 25)
    return {
      key: "low",
      className: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-100",
      badgeClass: "bg-emerald-200/60 text-emerald-900",
    };
  if (dailySugar <= 50)
    return {
      key: "moderate",
      className: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-100",
      badgeClass: "bg-amber-200/60 text-amber-900",
    };
  if (dailySugar <= 100)
    return {
      key: "high",
      className: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-900 dark:text-orange-100",
      badgeClass: "bg-orange-200/60 text-orange-900",
    };
  return {
    key: "veryHigh",
    className: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-100",
    badgeClass: "bg-rose-200/60 text-rose-900",
  };
}

type Profile = {
  emoji: string;
  title: string;
  blurb: string;
  tip: string;
};

const PROFILES: Record<BandKey, Profile> = {
  low: {
    emoji: "🥗",
    title: "Balanced Sipper",
    blurb: "You're generally mindful about sweet drinks and treats.",
    tip: "Keep choosing lower sugar options and drink more water.",
  },
  moderate: {
    emoji: "☕",
    title: "Kopi Kakis",
    blurb: "You enjoy your daily kopi or teh — mostly balanced, with a few sweet moments.",
    tip: "Try kosong or siew dai a couple of times this week to ease back on sugar.",
  },
  high: {
    emoji: "🧋",
    title: "Sweet Tooth",
    blurb: "Sweet drinks and snacks are a regular part of your day.",
    tip: "Swap one sweet drink for water or unsweetened tea today — small wins add up.",
  },
  veryHigh: {
    emoji: "🍰",
    title: "Sugar Rush",
    blurb: "Today's sweet load is well above HPB's daily guidance.",
    tip: "Pick one sweet item to skip tomorrow and look out for Nutri-Grade A or B drinks.",
  },
};

type Selections = Record<string, number>; // id -> chip index 0..3

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
    description: "Explore preventive care and general wellness services.",
    to: "/gp",
  },
  {
    emoji: "🌿",
    title: "TCM",
    description: "Support overall wellness and lifestyle balance.",
    to: "/tcm",
  },
  {
    emoji: "🧬",
    title: "DNA & Health",
    description: "Explore personalised health and wellness insights.",
    to: "/?category=dna_health",
  },
  {
    emoji: "🧠",
    title: "Mental Wellness",
    description: "Support stress management and emotional well-being.",
    to: "/?category=mental_wellness",
  },
];

const SugarHabit = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [drinks, setDrinks] = useState<Selections>({});
  const [snacks, setSnacks] = useState<Selections>({});

  useEffect(() => {
    track("sugar_habit_page_viewed");
  }, []);

  const dailySugar = useMemo(() => {
    const d = DRINKS.reduce((s, it) => s + SERVING_MULTIPLIER[drinks[it.id] ?? 0] * it.sugarPerServing, 0);
    const sn = SNACKS.reduce((s, it) => s + SERVING_MULTIPLIER[snacks[it.id] ?? 0] * it.sugarPerServing, 0);
    return d + sn;
  }, [drinks, snacks]);

  const band = useMemo(() => getBand(dailySugar), [dailySugar]);
  const profile = PROFILES[band.key];
  const teaspoons = Math.round((dailySugar / 4) * 10) / 10;
  const percentOfLimit = Math.round((dailySugar / DAILY_LIMIT_G) * 100);

  const goSeeResult = () => {
    setStep(3);
    track("sugar_habit_completed", {
      daily_sugar_g: Math.round(dailySugar),
      band: band.key,
      profile: profile.title,
    });
  };

  const reset = () => {
    setDrinks({});
    setSnacks({});
    setStep(1);
  };

  const renderItem = (it: Item, selections: Selections, setSelections: (s: Selections) => void) => {
    const selected = selections[it.id] ?? 0;
    return (
      <div key={it.id} className="rounded-lg border border-border bg-muted/30 p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl leading-none" aria-hidden>{it.emoji}</span>
          <span className="text-sm font-medium text-foreground">{it.label}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {it.unitLabels.map((lbl, idx) => {
            const isOn = selected === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelections({ ...selections, [it.id]: idx })}
                className={cn(
                  "rounded-full px-2 py-1.5 text-xs font-medium border transition-colors",
                  isOn
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-muted"
                )}
                aria-pressed={isOn}
              >
                {lbl}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const progressPct = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl px-4 py-8 md:py-12">
          <header className="mb-5">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              🧋 What's Your Sugar Habit?
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              A quick check-in on today's sweet habits, inspired by Singapore's Health Promotion Board (HPB) guidance.
            </p>
          </header>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Step {step} of 3</span>
              <span>
                {step === 1 && "Drinks today"}
                {step === 2 && "Snacks today"}
                {step === 3 && "Your sugar habit"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <Card className="p-5 md:p-6">
              <h2 className="text-base font-semibold text-foreground mb-1">What have you had today?</h2>
              <p className="text-xs text-muted-foreground mb-4">Tap what matches your day so far.</p>
              <div className="space-y-2.5">
                {DRINKS.map((d) => renderItem(d, drinks, setDrinks))}
              </div>
              <Button type="button" className="w-full mt-5" onClick={() => setStep(2)}>
                Next: Snacks <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-5 md:p-6">
              <h2 className="text-base font-semibold text-foreground mb-1">Any snacks today?</h2>
              <p className="text-xs text-muted-foreground mb-4">Quick tap — no need to be exact.</p>
              <div className="space-y-2.5">
                {SNACKS.map((s) => renderItem(s, snacks, setSnacks))}
              </div>
              <div className="flex gap-2 mt-5">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button type="button" className="flex-1" onClick={goSeeResult}>
                  See my sugar habit
                </Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div
                className={cn("rounded-xl border p-5 md:p-6", band.className)}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl leading-none" aria-hidden>{profile.emoji}</span>
                  <div>
                    <p className="text-xs uppercase tracking-wide opacity-80">Today, you're a</p>
                    <p className="text-xl md:text-2xl font-bold leading-tight">{profile.title}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{profile.blurb}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-white/50 dark:bg-black/20">
                    ~{Math.round(dailySugar)}g sugar today
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/50 dark:bg-black/20">
                    ≈ {teaspoons} tsp
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/50 dark:bg-black/20">
                    {percentOfLimit}% of HPB ~50g/day
                  </span>
                </div>
              </div>

              <Card className="p-5 md:p-6">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Tip
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.tip}</p>
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

              <Button type="button" variant="outline" className="w-full" onClick={reset}>
                <RotateCcw className="mr-1 h-4 w-4" /> Check again
              </Button>
            </div>
          )}

          <p className="mt-8 text-xs text-muted-foreground text-center">
            This is a quick daily check-in, not a medical assessment. Sugar values are averages based on HPB guidance.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SugarHabit;
