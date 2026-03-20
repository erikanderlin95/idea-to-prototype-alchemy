import { Check, X } from "lucide-react";

export const OrgWhyConcierge = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — Text */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[hsl(210,50%,18%)] tracking-tight">
              Why Medical Concierge Care Exists
            </h2>
            <div className="space-y-2.5 max-w-lg">
              <p className="text-[hsl(210,15%,40%)] leading-relaxed text-[14px]">
                Healthcare today is not a single system — it is a network of providers, referrals, and processes that patients often have to navigate on their own.
              </p>
              <p className="text-[hsl(210,15%,40%)] leading-relaxed text-[14px]">
                Medical concierge services exist to simplify this. Instead of managing appointments, referrals, and decisions independently, patients are guided through a structured coordination process.
              </p>
              <p className="text-[hsl(210,50%,18%)] leading-relaxed text-[14px] font-medium">
                Within Nanyang Medical Group, this coordination is integrated into a managed care network — ensuring patients are directed to the right provider with clearer continuity and less friction.
              </p>
            </div>
          </div>

          {/* Right — Comparison Cards */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[hsl(210,15%,55%)]">
              Care Experience Comparison
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Unstructured */}
              <div className="rounded-xl border border-[hsl(210,20%,88%)] bg-[hsl(210,20%,97%)] p-4 space-y-3">
                <h3 className="text-[13px] font-bold text-[hsl(210,15%,45%)]">Unstructured Experience</h3>
                <ul className="space-y-2">
                  {["Multiple entry points", "Unclear provider selection", "Manual coordination", "Disconnected follow-ups"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-[hsl(210,15%,50%)]">
                      <X className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[hsl(210,15%,70%)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coordinated */}
              <div className="rounded-xl border border-[hsl(178,40%,80%)] bg-gradient-to-b from-[hsl(178,45%,96%)] to-[hsl(210,35%,96%)] p-4 space-y-3 shadow-[0_2px_12px_hsl(178,40%,85%,0.35)]">
                <h3 className="text-[13px] font-bold text-[hsl(210,50%,18%)]">Nanyang Coordinated Model</h3>
                <ul className="space-y-2">
                  {["Single intake point", "Guided provider matching", "Structured care pathways", "Continuous follow-up"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-[hsl(210,50%,18%)]">
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[hsl(178,55%,32%)]" />
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
