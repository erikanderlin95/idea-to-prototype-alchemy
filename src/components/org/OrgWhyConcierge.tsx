import { Check, X } from "lucide-react";

export const OrgWhyConcierge = () => {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2.5">
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight">
              Why Medical Concierge Care Exists
            </h2>
            <div className="space-y-2 max-w-lg">
              <p className="text-[#5F6F7E] leading-relaxed text-[16px]">
                Healthcare today is not a single system — it is a network of providers, referrals, and processes that patients often have to navigate on their own.
              </p>
              <p className="text-[#5F6F7E] leading-relaxed text-[16px]">
                Medical concierge services exist to simplify this. Instead of managing appointments, referrals, and decisions independently, patients are guided through a structured coordination process.
              </p>
              <p className="text-[#12385B] leading-relaxed text-[16px] font-medium">
                Within Nanyang Medical Group, this coordination is integrated into a managed care network — ensuring patients are directed to the right provider with clearer continuity and less friction.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              Care Experience Comparison
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#DCE8EF] bg-white p-4 space-y-2.5">
                <h3 className="text-[15px] font-bold text-[#5F6F7E]">Unstructured Experience</h3>
                <ul className="space-y-1.5">
                  {["Multiple entry points", "Unclear provider selection", "Manual coordination", "Disconnected follow-ups"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-[#5F6F7E]">
                      <X className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#b0bec5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#18B7C9]/20 bg-[#E6F7FA] p-4 space-y-2.5 shadow-[0_2px_12px_rgba(24,183,201,0.1)]">
                <h3 className="text-[15px] font-bold text-[#12385B]">Nanyang Coordinated Model</h3>
                <ul className="space-y-1.5">
                  {["Single intake point", "Guided provider matching", "Structured care pathways", "Continuous follow-up"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-[#12385B]">
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#18B7C9]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
