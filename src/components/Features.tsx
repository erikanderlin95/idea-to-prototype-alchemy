import { Users, MapPin, CalendarCheck } from "lucide-react";

const DARK_BLUE = "#1e3a8a"; // dark blue
const TEAL = "#14b8a6"; // teal

export const Features = () => {
  const steps = [
    {
      step: "STEP 1",
      icon: Users,
      title: "See Queue First",
      desc: "Check how many patients are ahead before you go.",
      accentSolid: DARK_BLUE,
      iconBg: `linear-gradient(135deg, ${DARK_BLUE}, ${TEAL})`,
      badgeBg: "linear-gradient(135deg, rgba(30,58,138,0.10), rgba(30,58,138,0.04))",
      badgeBorder: "rgba(30,58,138,0.35)",
    },
    {
      step: "STEP 2",
      icon: MapPin,
      title: "Choose Better",
      desc: "Compare nearby clinics and go where the queue is shorter.",
      accentSolid: TEAL,
      iconBg: `linear-gradient(135deg, ${DARK_BLUE}, ${TEAL})`,
      badgeBg: "linear-gradient(135deg, rgba(30,58,138,0.08), rgba(20,184,166,0.10))",
      badgeBorder: "rgba(20,184,166,0.40)",
    },
    {
      step: "STEP 3",
      icon: CalendarCheck,
      title: "Join or Book",
      desc: "Join the queue or book directly with the clinic.",
      accentSolid: TEAL,
      iconBg: `linear-gradient(135deg, ${DARK_BLUE}, ${TEAL})`,
      badgeBg: "linear-gradient(135deg, rgba(20,184,166,0.10), rgba(20,184,166,0.04))",
      badgeBorder: "rgba(20,184,166,0.40)",
    },
  ];

  const gradientBorder = `linear-gradient(135deg, ${DARK_BLUE}, ${TEAL})`;

  return (
    <section id="features" className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How ClynicQ helps you
          </h2>
        </div>

        <div className="w-[90%] md:w-[88%] max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 items-stretch gap-4 md:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl p-[1.5px] transition-all duration-300 hover:-translate-y-0.5 h-full"
                style={{
                  background: gradientBorder,
                  boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 6px 18px -10px rgba(16,24,40,0.10)",
                }}
              >
                <div className="rounded-[10px] bg-white px-6 py-7 md:px-7 md:py-8 h-full flex flex-col items-start">
                  {/* Step badge */}
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
                    style={{
                      background: s.badgeBg,
                      border: `1px solid ${s.badgeBorder}`,
                      color: s.accentSolid,
                    }}
                  >
                    {s.step}
                  </span>

                  {/* Icon */}
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: s.iconBg }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: "#fff" }}
                      strokeWidth={2.25}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[16.5px] md:text-[17px] font-semibold mb-1"
                    style={{ color: "hsl(220 18% 18%)" }}
                  >
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[13px] leading-snug min-h-[40px]"
                    style={{ color: "hsl(220 9% 46%)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
