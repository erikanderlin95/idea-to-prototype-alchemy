import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DirectoryClinicCard } from "@/components/DirectoryClinicCard";
import { TWENTY_FOUR_HR_CLINICS } from "@/data/twentyFourHrClinics";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";

const NOTICE =
  "Operating hours and availability may change. Please confirm directly with the clinic before visiting.";

const Notice = () => (
  <div className="flex items-start gap-2 rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-xs sm:text-sm text-muted-foreground">
    <Info className="h-4 w-4 shrink-0 mt-0.5" />
    <span>{NOTICE}</span>
  </div>
);

const TwentyFourHourClinics = () => {
  // Group only by the area data that already exists; ungrouped otherwise.
  const areas = Array.from(
    new Set(TWENTY_FOUR_HR_CLINICS.map((c) => c.area).filter(Boolean) as string[])
  ).sort((a, b) => a.localeCompare(b));
  const ungrouped = TWENTY_FOUR_HR_CLINICS.filter((c) => !c.area);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 md:px-6 py-4 md:py-8 max-w-5xl">
        <header className="mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
            24-Hour Clinics in Singapore
          </h1>
        </header>

        <Notice />

        <div className="mt-4 space-y-5">
          {areas.map((area) => (
            <section key={area}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/80">
                {area}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                {TWENTY_FOUR_HR_CLINICS.filter((c) => c.area === area).map((c) => (
                  <DirectoryClinicCard
                    key={c.id}
                    name={c.name}
                    type={c.area ? `24HR · ${c.area}` : "24HR"}
                    address={c.address}
                    mapsUrl={c.mapsUrl}
                  />
                ))}
              </div>
            </section>
          ))}

          {ungrouped.length > 0 && (
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                {ungrouped.map((c) => (
                  <DirectoryClinicCard
                    key={c.id}
                    name={c.name}
                    type="24HR"
                    address={c.address}
                    mapsUrl={c.mapsUrl}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/">Back to homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TwentyFourHourClinics;
