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

        <div className="pt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 rounded-xl bg-[#DCE8EF] animate-pulse" />
              ))}
            </div>
          ) : concierges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {concierges.map((person) => (
                <div
                  key={person.id}
                  className="group rounded-xl bg-white border border-[#DCE8EF] p-4 shadow-[0_2px_8px_rgba(18,56,91,0.06)] hover:shadow-[0_6px_24px_rgba(18,56,91,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F0F5FA] ring-1 ring-[#DCE8EF] flex-shrink-0">
                      {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#F0F5FA]">
                          <User className="h-4 w-4 text-[#5F6F7E]" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#12385B] truncate">{person.name}</h3>
                      <p className="text-xs text-[#5F6F7E] truncate">{person.title}</p>
                    </div>

                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[hsl(155,45%,93%)] text-[10px] font-semibold text-[hsl(155,50%,30%)] flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(155,55%,45%)]" />
                      Active
                    </span>
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-3 bg-[#18B7C9] hover:bg-[#149dab] text-white active:scale-[0.97] transition-all shadow-sm"
                    onClick={onConnect}
                  >
                    Start via Concierge
                  </Button>
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
