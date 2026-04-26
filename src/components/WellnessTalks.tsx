import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PURPLE = "hsl(var(--ai-purple))";
const TEAL = "hsl(var(--ai-cyan))";

const talks = [
  {
    title: "Managing Stress & Sleep in Modern Life",
    desc: "Practical strategies from licensed wellness practitioners.",
    date: "Sat, 17 May",
    time: "10:00 AM",
    location: "Online + In-person",
    seats: "Limited seats",
    badge: "Next session",
    accent: PURPLE,
    gradient: `linear-gradient(135deg, hsl(var(--ai-purple) / 0.12), hsl(var(--ai-cyan) / 0.08))`,
    border: `hsl(var(--ai-purple) / 0.25)`,
  },
  {
    title: "Family Health & Preventive Care",
    desc: "What every household should know about staying ahead of illness.",
    date: "Sat, 24 May",
    time: "2:00 PM",
    location: "Community Hall",
    seats: "Limited seats",
    badge: "Featured",
    accent: TEAL,
    gradient: `linear-gradient(135deg, hsl(var(--ai-cyan) / 0.12), hsl(var(--ai-purple) / 0.08))`,
    border: `hsl(var(--ai-cyan) / 0.25)`,
  },
];

export const WellnessTalks = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
            style={{
              background: `linear-gradient(90deg, hsl(var(--ai-purple) / 0.1), hsl(var(--ai-cyan) / 0.1))`,
              border: `1px solid hsl(var(--ai-purple) / 0.2)`,
            }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: PURPLE }} />
            <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: PURPLE }}>
              Free to attend
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-2">
            Upcoming Wellness Talks
          </h2>
          <p className="text-[15px] text-muted-foreground">
            Learn from healthcare experts. Reserve your seat before it fills up.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {talks.map((talk, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: talk.gradient,
                border: `1px solid ${talk.border}`,
                boxShadow: "0 4px 20px -8px hsl(var(--ai-purple) / 0.15)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-[10.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: "#fff",
                    background: talk.accent,
                  }}
                >
                  {talk.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {talk.seats}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 leading-snug">
                {talk.title}
              </h3>
              <p className="text-[13.5px] text-muted-foreground leading-snug mb-5">
                {talk.desc}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 text-[12.5px] text-foreground/80">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" style={{ color: talk.accent }} />
                  {talk.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" style={{ color: talk.accent }} />
                  {talk.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" style={{ color: talk.accent }} />
                  {talk.location}
                </span>
              </div>

              <Button
                className="w-full sm:w-auto gap-2 font-semibold shadow-sm hover:shadow-md transition-all"
                style={{
                  background: talk.accent,
                  color: "#fff",
                }}
                onClick={() => navigate("/speakers")}
              >
                Reserve a Slot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
