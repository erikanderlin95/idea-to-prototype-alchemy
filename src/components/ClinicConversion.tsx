import { Button } from "@/components/ui/button";
import { Smartphone, MessageSquareOff, Settings2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Healthcare blue-led palette
const BLUE = "#1d4ed8";
const BLUE_DARK = "#1e40af";
const TEAL = "#0d9488";
// Toned purple for CTA only
const PURPLE_SOFT = "#8b5cf6";

export const ClinicConversion = () => {
  const navigate = useNavigate();

  const points = [
    {
      icon: Smartphone,
      title: "Patients check queue on their own phone",
      desc: "No more calls asking 'how many ahead?'",
    },
    {
      icon: MessageSquareOff,
      title: "Staff stop repeating the same answers",
      desc: "Front desk handles care, not status updates.",
    },
    {
      icon: Settings2,
      title: "No change to your current system",
      desc: "Works alongside how you already operate.",
    },
  ];

  const iconGradient = `linear-gradient(135deg, ${BLUE}, ${TEAL})`;

  return (
    <section className="relative pt-12 md:pt-16 pb-6 md:pb-8 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, rgba(29,78,216,0.05) 0%, hsl(var(--background)) 45%, rgba(13,148,136,0.05) 100%)`,
        }}
      />
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full -z-10 blur-[100px] opacity-30" style={{ background: BLUE }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full -z-10 blur-[100px] opacity-25" style={{ background: TEAL }} />

      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-6 md:p-10 backdrop-blur-sm"
            style={{
              background: "hsl(var(--card) / 0.85)",
              border: `1.5px solid ${BLUE}`,
              boxShadow: "0 10px 40px -15px rgba(29,78,216,0.25)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <span
                  className="inline-block text-[10.5px] font-semibold tracking-[0.16em] uppercase mb-2 px-2.5 py-1 rounded-full"
                  style={{
                    color: BLUE_DARK,
                    background: "rgba(29,78,216,0.10)",
                    border: "1px solid rgba(29,78,216,0.30)",
                  }}
                >
                  For Clinic Owners
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-foreground leading-tight">
                  Less front desk noise.<br className="hidden sm:block" /> Same workflow you already use.
                </h2>
              </div>
              <Button
                size="lg"
                className="shrink-0 gap-2 font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${PURPLE_SOFT} 0%, ${BLUE} 60%, ${BLUE_DARK} 100%)`,
                  color: "#fff",
                }}
                onClick={() => navigate("/for-clinics")}
              >
                List Your Clinic
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6">
              {points.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "hsl(var(--background) / 0.7)",
                      border: "1px solid rgba(29,78,216,0.15)",
                      boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 4px 12px -8px rgba(29,78,216,0.10)",
                    }}
                  >
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: iconGradient }}
                    >
                      <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="text-[14.5px] font-semibold text-foreground leading-snug mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[12.5px] leading-snug text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
