import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface Concierge {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
}

interface Props {
  concierges: Concierge[];
  loading: boolean;
  onConnect: () => void;
}

export const OrgConciergeTeam = ({ concierges, loading, onConnect }: Props) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-3 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Care Coordination Team
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Assigned based on patient needs and care pathway
        </p>

        <div className="pt-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-44 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : concierges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {concierges.map((person) => (
                <div
                  key={person.id}
                  className="group rounded-xl bg-card border border-border/50 p-5 shadow-[0_2px_8px_hsl(var(--primary)/0.04)] hover:shadow-[0_6px_24px_hsl(var(--primary)/0.08)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Smaller avatar */}
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-muted ring-1 ring-border/60 flex-shrink-0">
                      {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <User className="h-5 w-5 text-primary/50" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-foreground truncate">{person.name}</h3>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent/10 text-[10px] font-semibold text-accent flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{person.title}</p>
                    </div>
                  </div>

                  {person.short_bio && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-3">{person.short_bio}</p>
                  )}

                  <Button
                    size="sm"
                    className="w-full mt-4 active:scale-[0.97] transition-transform"
                    onClick={onConnect}
                  >
                    Start via Concierge
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No concierges available at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
};
