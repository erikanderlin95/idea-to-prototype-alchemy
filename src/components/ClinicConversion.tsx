import { Button } from "@/components/ui/button";
import { Smartphone, MessageSquareOff, Settings2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PURPLE = "hsl(var(--ai-purple))";
const TEAL = "hsl(var(--ai-cyan))";

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

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, hsl(var(--ai-purple) / 0.06) 0%, hsl(var(--background)) 45%, hsl(var(--ai-cyan) / 0.06) 100%)`,
        }}
      />
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full -z-10 blur-[100px] opacity-40" style={{ background: PURPLE }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full -z-10 blur-[100px] opacity-30" style={{ background: TEAL }} />

      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-6 md:p-10 backdrop-blur-sm"
            style={{
              background: "hsl(var(--card) / 0.8)",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 10px 40px -15px hsl(var(--ai-purple) / 0.15)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <span
                  className="inline-block text-[10.5px] font-semibold tracking-[0.16em] uppercase mb-2 px-2.5 py-1 rounded-full"
                  style={{
                    color: PURPLE,
                    background: `linear-gradient(90deg, hsl(var(--ai-purple) / 0.1), hsl(var(--ai-cyan) / 0.1))`,
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
                  background: `linear-gradient(135deg, ${PURPLE}, ${TEAL})`,
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
                const accent = i === 0 ? PURPLE : i === 2 ? TEAL : `linear-gradient(135deg, ${PURPLE}, ${TEAL})`;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "hsl(var(--background) / 0.6)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: accent }}
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
