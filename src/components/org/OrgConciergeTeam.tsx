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
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto space-y-1.5 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#12385B] tracking-tight">
          Care Coordination Team
        </h2>
        <p className="text-[13px] text-[#5F6F7E] max-w-md mx-auto">
          Patients are guided to the right care coordinator based on need and care pathway.
        </p>

        <div className="pt-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 rounded-lg bg-[#DCE8EF] animate-pulse" />
              ))}
            </div>
          ) : concierges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl mx-auto">
              {concierges.map((person) => (
                <div
                  key={person.id}
                  className="group rounded-lg bg-white border border-[#DCE8EF] px-3 py-2.5 shadow-[0_1px_4px_rgba(18,56,91,0.05)] hover:shadow-[0_3px_12px_rgba(18,56,91,0.1)] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F0F5FA] ring-1 ring-[#DCE8EF] flex-shrink-0">
                      {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#F0F5FA]">
                          <User className="h-4 w-4 text-[#5F6F7E]" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-[#12385B] truncate leading-tight">{person.name}</h3>
                      <p className="text-[11px] text-[#5F6F7E] truncate">{person.title}</p>
                      {person.short_bio && (
                        <p className="text-[10px] text-[#5F6F7E]/70 truncate mt-0.5">{person.short_bio}</p>
                      )}
                    </div>

                    {/* Right: status + CTA */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[hsl(155,45%,93%)] text-[9px] font-semibold text-[hsl(155,50%,30%)]">
                        <span className="w-1 h-1 rounded-full bg-[hsl(155,55%,45%)]" />
                        Active
                      </span>
                      <Button
                        size="sm"
                        className="h-7 px-3 text-[11px] bg-[#18B7C9] hover:bg-[#149dab] text-white active:scale-[0.97] transition-all shadow-sm rounded-md"
                        onClick={onConnect}
                      >
                        Start via Concierge
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5F6F7E] text-sm">No concierges available at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
};
