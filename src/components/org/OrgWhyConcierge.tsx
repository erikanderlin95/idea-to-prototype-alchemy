import { Check, X } from "lucide-react";

export const OrgWhyConcierge = () => {
  return (
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-[#12385B] tracking-tight">
              Why Medical Concierge Care Exists
            </h2>
            <p className="text-[16px] text-[#5F6F7E] leading-relaxed max-w-lg">
              Healthcare is not a single system — patients often navigate multiple providers, referrals, and steps on their own.
            </p>
            <p className="text-[16px] text-[#12385B] font-medium">This model simplifies it:</p>
            <ul className="space-y-1.5 pl-1">
              {["One intake", "Guided provider matching", "Continuous follow-up"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                  <Check className="h-4 w-4 text-[#18B7C9] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              Care Experience Comparison
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#DCE8EF] bg-white p-3.5 space-y-2">
                <h3 className="text-[14px] font-bold text-[#5F6F7E]">Unstructured</h3>
                <ul className="space-y-1">
                  {["Multiple entry points", "No clear provider choice", "Manual coordination", "Fragmented care"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-[#5F6F7E]">
                      <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#18B7C9]/20 bg-[#E6F7FA] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(24,183,201,0.1)]">
                <h3 className="text-[14px] font-bold text-[#12385B]">Nanyang Model</h3>
                <ul className="space-y-1">
                  {["Single entry", "Guided matching", "Structured handoff", "Continuous care"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-[#12385B]">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#18B7C9]" />
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
