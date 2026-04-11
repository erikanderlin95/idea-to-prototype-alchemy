import { Button } from "@/components/ui/button";
import { User, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section className="py-6 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto space-y-1 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
          {t("org.yourCareCoordinator")}
        </p>
        <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
          {t("org.careCoordTeam")}
        </h2>
        <p className="text-[17px] text-[#5F6F7E]">
          {t("org.careCoordDesc")}
        </p>

        <div className="pt-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-2xl bg-[#DCE8EF] animate-pulse" />
              ))}
            </div>
          ) : concierges.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2.5">
              {concierges.map((person) => (
                <div
                  key={person.id}
                  className="group rounded-2xl bg-white border border-[#DCE8EF] p-4 shadow-[0_2px_8px_rgba(18,56,91,0.06)] hover:shadow-[0_6px_20px_rgba(18,56,91,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center w-52 aspect-square justify-center"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F0F5FA] ring-2 ring-[#DCE8EF] group-hover:ring-[#18B7C9]/30 transition-all mb-2.5">
                    {person.photo_url ? (
                      <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#F0F5FA]">
                        <User className="h-5 w-5 text-[#5F6F7E]" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-[16px] font-semibold text-[#12385B] leading-tight truncate w-full">
                    {t("org.speakTo")} {person.name}
                  </h3>
                  <p className="text-[14px] text-[#5F6F7E] mt-0.5 truncate w-full">
                    {person.title}
                  </p>
                  {person.short_bio && (
                    <p className="text-[13px] text-[#5F6F7E]/70 mt-0.5 truncate w-full leading-tight">
                      {person.short_bio}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-auto pt-2.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[hsl(155,45%,93%)] text-[12px] font-semibold text-[hsl(155,50%,30%)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(155,55%,45%)]" />
                      {t("org.active")}
                    </span>
                    <Button
                      size="sm"
                      className="h-7 px-3.5 text-[14px] rounded-full bg-[#18B7C9] hover:bg-[#149dab] text-white active:scale-[0.96] transition-all shadow-sm gap-1"
                      onClick={onConnect}
                    >
                      <MessageCircle className="h-3 w-3" />
                      {t("org.start")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5F6F7E] text-[17px]">{t("org.noConciergesAvailable")}</p>
          )}
        </div>
      </div>
    </section>
  );
};