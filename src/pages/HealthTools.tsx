import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock } from "lucide-react";

function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event, props } }));
    if (typeof console !== "undefined") console.info("[analytics]", event, props);
  } catch {
    /* noop */
  }
}

const HealthTools = () => {
  const { t } = useLanguage();

  useEffect(() => {
    track("health_tools_page_viewed");
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-xl px-4 pt-5 pb-6 md:pt-8 md:pb-10">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {t("healthTools.title")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
              {t("healthTools.subtitle")}
            </p>
          </header>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="text-lg font-semibold text-foreground">
              {t("healthTools.locked")}
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HealthTools;
