import { Button } from "@/components/ui/button";
import { User, MessageCircle } from "lucide-react";

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
      <div className="max-w-4xl mx-auto space-y-1.5 text-center">
        <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight">
          Care Coordination Team
        </h2>
        <p className="text-[13px] text-[#5F6F7E]/70">
          Start by choosing a care coordinator below
        </p>

        <div className="pt-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-[#DCE8EF] animate-pulse" />
              ))}
            </div>
          ) : concierges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {concierges.map((person) => (
                <div
                  key={person.id}
                  className="group rounded-2xl bg-white border border-[#DCE8EF] p-4 pb-3.5 shadow-[0_2px_8px_rgba(18,56,91,0.06)] hover:shadow-[0_6px_20px_rgba(18,56,91,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center"
                >
                  {/* Circular avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F0F5FA] ring-2 ring-[#DCE8EF] group-hover:ring-[#18B7C9]/30 transition-all mb-3">
                    {person.photo_url ? (
                      <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#F0F5FA]">
                        <User className="h-6 w-6 text-[#5F6F7E]" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-[15px] font-semibold text-[#12385B] leading-tight truncate w-full">
                    {person.name}
                  </h3>

                  {/* Role */}
                  <p className="text-[13px] text-[#5F6F7E] mt-0.5 truncate w-full">
                    {person.title}
                  </p>

                  {/* Focus line */}
                  {person.short_bio && (
                    <p className="text-[12px] text-[#5F6F7E]/70 mt-1 truncate w-full leading-tight">
                      {person.short_bio}
                    </p>
                  )}

                  {/* Active dot */}
                  <span className="inline-flex items-center gap-1 mt-2.5 px-2 py-0.5 rounded-full bg-[hsl(155,45%,93%)] text-[11px] font-semibold text-[hsl(155,50%,30%)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(155,55%,45%)]" />
                    Active
                  </span>

                  {/* Compact pill CTA */}
                  <Button
                    size="sm"
                    className="mt-2.5 h-8 px-4 text-[13px] rounded-full bg-[#18B7C9] hover:bg-[#149dab] text-white active:scale-[0.96] transition-all shadow-sm gap-1.5"
                    onClick={onConnect}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5F6F7E] text-base">No concierges available at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
};
