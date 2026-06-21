import { useState, useEffect, useMemo, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
  Sparkles,
  Droplet,
  GlassWater,
  Apple,
  Boxes,
  RotateCcw,
  Check,
} from "lucide-react";

// Inspired by Singapore's healthy eating guidance. Lifestyle awareness only.

type Item = {
  id: string;
  label: string;
  sublabel?: string;
  emoji: string;
  sugarPerServing: number;
  unitLabels: [string, string, string, string];
};

const DRINKS: Item[] = [
  { id: "kopi_teh_sweet", label: "Kopi / Teh", sublabel: "with sugar & milk", emoji: "☕", sugarPerServing: 18, unitLabels: ["None", "1 cup", "2 cups", "3+ cups"] },
  { id: "bubble_tea", label: "Bubble Tea", emoji: "🧋", sugarPerServing: 35, unitLabels: ["None", "1 cup", "2 cups", "3+ cups"] },
  { id: "soft_drink", label: "Soft Drinks", emoji: "🥤", sugarPerServing: 35, unitLabels: ["None", "1 can", "2 cans", "3+ cans"] },
  { id: "packet_juice", label: "Sweetened Juice", sublabel: "Pack Drinks", emoji: "🧃", sugarPerServing: 22, unitLabels: ["None", "1 pack", "2 packs", "3+ packs"] },
  { id: "energy_drink", label: "Energy Drinks", emoji: "⚡", sugarPerServing: 21, unitLabels: ["None", "1 bottle", "2 bottles", "3+ bottles"] },
];

const SNACKS: Item[] = [
  { id: "biscuits", label: "Biscuits / Cookies", emoji: "🍪", sugarPerServing: 6, unitLabels: ["None", "A little", "Some", "A lot"] },
  { id: "chocolate", label: "Chocolate / Candy", emoji: "🍫", sugarPerServing: 10, unitLabels: ["None", "A little", "Some", "A lot"] },
  { id: "cake", label: "Cakes / Desserts", emoji: "🍰", sugarPerServing: 18, unitLabels: ["None", "A little", "Some", "A lot"] },
  { id: "ice_cream", label: "Ice Cream", emoji: "🍦", sugarPerServing: 14, unitLabels: ["None", "A little", "Some", "A lot"] },
];

const HABITS: { id: string; label: string }[] = [
  { id: "h1", label: "I usually choose less sugar when possible." },
  { id: "h2", label: "I often drink sweet drinks with meals." },
  { id: "h3", label: "I snack while working or watching shows." },
  { id: "h4", label: "I rarely think about sugar intake." },
  { id: "h5", label: "I prefer water most of the time." },
];

const SERVING_MULTIPLIER = [0, 1, 2, 3];

function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event, props } }));
    if (typeof console !== "undefined") console.info("[analytics]", event, props);
  } catch {
    /* noop */
  }
}

type BandKey = "starter" | "balanced" | "explorer" | "treat";

type Profile = {
  emoji: string;
  title: string;
  blurb: string;
  tips: string[];
  cardClass: string;
};

function getBand(dailySugar: number): BandKey {
  if (dailySugar <= 25) return "starter";
  if (dailySugar <= 50) return "balanced";
  if (dailySugar <= 100) return "explorer";
  return "treat";
}

const PROFILES: Record<BandKey, Profile> = {
  starter: {
    emoji: "🌿",
    title: "Sugar-Smart Starter",
    blurb: "You kept things light on the sweet side today — a lovely, mindful start.",
    tips: [
      "Keep water close by throughout the day.",
      "Choose lower-sugar options when you can.",
    ],
    cardClass: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-100",
  },
  balanced: {
    emoji: "🍵",
    title: "Balanced Sipper",
    blurb: "You enjoyed a few sweet moments today, balanced with simpler choices.",
    tips: [
      "Try kosong or siew dai for your next kopi or teh.",
      "Swap one sweet drink for water tomorrow.",
    ],
    cardClass: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-100",
  },
  explorer: {
    emoji: "🍪",
    title: "Sweet Explorer",
    blurb: "You enjoyed a few sweet treats today. Small changes like choosing water or reducing sugary drinks can help support healthier habits.",
    tips: [
      "Pick one sweet drink or snack to skip tomorrow.",
      "Look out for lower-sugar labels on packaged drinks.",
      "Add an extra glass of water between meals.",
    ],
    cardClass: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-900 dark:text-orange-100",
  },
  treat: {
    emoji: "🍫",
    title: "Treat Lover",
    blurb: "Today was full of sweet favourites. A few small swaps can make your day feel just as enjoyable.",
    tips: [
      "Choose plain water or unsweetened tea with your next meal.",
      "Try a fruit option in place of one dessert tomorrow.",
      "Take a short walk after sweet treats to feel refreshed.",
    ],
    cardClass: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-100",
  },
};

type Selections = Record<string, number>;

type StepKey = 1 | 2 | 3 | 4;
const STEP_LABELS: Record<StepKey, string> = { 1: "Drinks", 2: "Snacks", 3: "Habits", 4: "Result" };

const SugarHabit = () => {
  const [step, setStep] = useState<StepKey>(1);
  const [drinks, setDrinks] = useState<Selections>({});
  const [snacks, setSnacks] = useState<Selections>({});
  const [habits, setHabits] = useState<Record<string, boolean>>({});
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track("sugar_habit_page_viewed");
  }, []);

  const dailySugar = useMemo(() => {
    const d = DRINKS.reduce((s, it) => s + SERVING_MULTIPLIER[drinks[it.id] ?? 0] * it.sugarPerServing, 0);
    const sn = SNACKS.reduce((s, it) => s + SERVING_MULTIPLIER[snacks[it.id] ?? 0] * it.sugarPerServing, 0);
    return d + sn;
  }, [drinks, snacks]);

  const bandKey = useMemo(() => getBand(dailySugar), [dailySugar]);
  const profile = PROFILES[bandKey];

  const goTo = (next: StepKey) => {
    setStep(next);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = () => {
    track("sugar_habit_completed", { band: bandKey, profile: profile.title });
    goTo(4);
  };

  const reset = () => {
    setDrinks({});
    setSnacks({});
    setHabits({});
    goTo(1);
  };

  const renderItem = (it: Item, selections: Selections, setSelections: (s: Selections) => void, activeTint: "teal" | "green") => {
    const selected = selections[it.id] ?? 0;
    const activeCls = activeTint === "teal"
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-emerald-500 text-white border-emerald-500";
    return (
      <div key={it.id} className="py-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl leading-none shrink-0" aria-hidden>{it.emoji}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">{it.label}</p>
            {it.sublabel && <p className="text-xs text-muted-foreground leading-tight mt-0.5">{it.sublabel}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {it.unitLabels.map((lbl, idx) => {
            const isOn = selected === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelections({ ...selections, [it.id]: idx })}
                className={cn(
                  "rounded-full px-3 py-2.5 text-sm font-medium border transition-colors",
                  isOn ? activeCls : "bg-background text-foreground border-border hover:bg-muted"
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

  const ProgressBar = () => {
    const steps: StepKey[] = [1, 2, 3];
    return (
      <div className="flex items-center gap-2 md:gap-3">
        {steps.map((s, i) => {
          const done = step > s;
          const active = step === s;
          return (
            <div key={s} className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors",
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : s}
              </div>
              <span
                className={cn(
                  "text-xs md:text-sm font-medium truncate",
                  active || done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {STEP_LABELS[s]}
              </span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-border min-w-2" />}
            </div>
          );
        })}
      </div>
    );
  };

  const InfoCards = (
    <>
      <Card className="p-6 bg-violet-50/60 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900">
        <h3 className="flex items-center gap-2 text-base font-semibold text-violet-900 dark:text-violet-100 mb-4">
          <Lightbulb className="h-4 w-4" /> Why it matters
        </h3>
        <ul className="space-y-4">
          <li className="flex gap-3 text-sm text-foreground/80">
            <Boxes className="h-4 w-4 mt-0.5 text-violet-600 shrink-0" />
            <span>Added sugar can add up quickly in our daily diet.</span>
          </li>
          <li className="flex gap-3 text-sm text-foreground/80">
            <GlassWater className="h-4 w-4 mt-0.5 text-violet-600 shrink-0" />
            <span>Small swaps can help you feel better.</span>
          </li>
          <li className="flex gap-3 text-sm text-foreground/80">
            <ShieldCheck className="h-4 w-4 mt-0.5 text-violet-600 shrink-0" />
            <span>Inspired by Singapore healthy eating guidance.</span>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
        <h3 className="flex items-center gap-2 text-base font-semibold text-amber-900 dark:text-amber-100 mb-4">
          <Sparkles className="h-4 w-4" /> Quick reminders
        </h3>
        <ul className="space-y-4">
          <li className="flex gap-3 text-sm text-foreground/80">
            <Droplet className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
            <span>Choose lower-sugar options when you can.</span>
          </li>
          <li className="flex gap-3 text-sm text-foreground/80">
            <GlassWater className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
            <span>Drink more water throughout the day.</span>
          </li>
          <li className="flex gap-3 text-sm text-foreground/80">
            <Apple className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
            <span>Enjoy a balanced diet with wholegrains, vegetables, fruits and lean proteins.</span>
          </li>
        </ul>
      </Card>

    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-6xl px-4 py-6 md:py-10">
          <div ref={topRef} />
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-4xl md:text-5xl leading-none" aria-hidden>🧋</span>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  What's Your Sugar Habit?
                </h1>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  A quick check-in on today's sweet habits, inspired by healthy eating guidance.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-foreground shrink-0">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span className="leading-tight">For awareness,<br />not diagnosis.</span>
            </div>
          </div>

          {/* Mobile badge */}
          <div className="sm:hidden mb-5 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 text-xs text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>For awareness, not diagnosis.</span>
          </div>

          {/* Progress */}
          {step < 4 && (
            <div className="border-t border-border pt-5 mb-8">
              <ProgressBar />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-8">
              {step === 1 && (
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground leading-tight">Drinks today</h2>
                      <p className="text-xs text-muted-foreground mt-1">What have you had today?</p>
                    </div>
                    <span className="text-3xl leading-none" aria-hidden>🥤</span>
                  </div>
                  <div className="divide-y divide-border/60">
                    {DRINKS.map((d) => renderItem(d, drinks, setDrinks, "teal"))}
                  </div>
                  <Button type="button" size="lg" className="w-full mt-6" onClick={() => goTo(2)}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              )}

              {step === 2 && (
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground leading-tight">Snacks today</h2>
                      <p className="text-xs text-muted-foreground mt-1">What have you had today?</p>
                    </div>
                    <span className="text-3xl leading-none" aria-hidden>🍪</span>
                  </div>
                  <div className="divide-y divide-border/60">
                    {SNACKS.map((s) => renderItem(s, snacks, setSnacks, "green"))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => goTo(1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="button" size="lg" className="flex-1" onClick={() => goTo(3)}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              )}

              {step === 3 && (
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground leading-tight">Everyday habits</h2>
                      <p className="text-xs text-muted-foreground mt-1">Pick what sounds most like you.</p>
                    </div>
                    <span className="text-3xl leading-none" aria-hidden>❤️</span>
                  </div>
                  <div className="space-y-1">
                    {HABITS.map((h) => {
                      const on = !!habits[h.id];
                      return (
                        <label
                          key={h.id}
                          className="flex items-center gap-3 py-3.5 px-2 rounded-md hover:bg-muted/50 cursor-pointer"
                        >
                          <Checkbox
                            checked={on}
                            onCheckedChange={(v) => setHabits({ ...habits, [h.id]: !!v })}
                          />
                          <span className="text-sm text-foreground">{h.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => goTo(2)}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="button" size="lg" className="flex-1" onClick={handleSubmit}>
                      See Result <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              )}

              {step < 4 && (
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Your answers are private and for your awareness only.
                </p>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className={cn("rounded-xl border p-6", profile.cardClass)} role="status" aria-live="polite">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl leading-none" aria-hidden>{profile.emoji}</span>
                      <div>
                        <p className="text-xs uppercase tracking-wide opacity-80">Today, you're a</p>
                        <p className="text-xl md:text-2xl font-bold leading-tight">{profile.title}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{profile.blurb}</p>
                  </div>

                  <Card className="p-6">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-primary" />
                      A few simple ideas
                    </h3>
                    <ul className="space-y-3">
                      {profile.tips.map((t, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Button type="button" variant="outline" size="lg" className="w-full" onClick={reset}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Check again
                  </Button>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This quiz is for general awareness only and does not provide medical advice or diagnose any condition. If you have concerns about your health, please consult a healthcare professional.
                  </p>
                </div>
              )}

              {/* Mobile: collapsible info cards below questionnaire */}
              <div className="lg:hidden pt-2">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="why" className="border border-violet-200 dark:border-violet-900 rounded-lg bg-violet-50/60 dark:bg-violet-950/20 px-4">
                    <AccordionTrigger className="text-sm font-semibold text-violet-900 dark:text-violet-100 hover:no-underline py-4">
                      <span className="flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Why it matters</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-2">
                        <li className="flex gap-3 text-sm text-foreground/80"><Boxes className="h-4 w-4 mt-0.5 text-violet-600 shrink-0" /><span>Added sugar can add up quickly in our daily diet.</span></li>
                        <li className="flex gap-3 text-sm text-foreground/80"><GlassWater className="h-4 w-4 mt-0.5 text-violet-600 shrink-0" /><span>Small swaps can help you feel better.</span></li>
                        <li className="flex gap-3 text-sm text-foreground/80"><ShieldCheck className="h-4 w-4 mt-0.5 text-violet-600 shrink-0" /><span>Inspired by Singapore healthy eating guidance.</span></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="reminders" className="border border-amber-200 dark:border-amber-900 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 px-4">
                    <AccordionTrigger className="text-sm font-semibold text-amber-900 dark:text-amber-100 hover:no-underline py-4">
                      <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Quick reminders</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-2">
                        <li className="flex gap-3 text-sm text-foreground/80"><Droplet className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" /><span>Choose lower-sugar options when you can.</span></li>
                        <li className="flex gap-3 text-sm text-foreground/80"><GlassWater className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" /><span>Drink more water throughout the day.</span></li>
                        <li className="flex gap-3 text-sm text-foreground/80"><Apple className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" /><span>Enjoy a balanced diet with wholegrains, vegetables, fruits and lean proteins.</span></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block space-y-5 lg:sticky lg:top-4 self-start">
              {InfoCards}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SugarHabit;
