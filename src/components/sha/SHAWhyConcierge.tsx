import { Check, X } from "lucide-react";

export const SHAWhyConcierge = () => {
  return (
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
              Why Integrated Care Matters
            </h2>
            <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
              Patients can access specialist care across multiple disciplines through a single panel of doctors.
            </p>
            <p className="text-[18px] text-[#12385B] font-medium">Available specialist disciplines:</p>
            <ul className="space-y-1.5 pl-1">
              {["Surgical specialties including general surgery and orthopaedics", "Medical specialties including cardiology, endocrinology and dermatology", "Access across multiple specialist disciplines"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[17px] text-[#12385B]">
                  <Check className="h-4 w-4 text-[#4A7FC1] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              Care Experience Comparison
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#DCE8EF] bg-white p-3.5 space-y-2">
                <h3 className="text-[16px] font-bold text-[#5F6F7E]">Fragmented</h3>
                <ul className="space-y-1">
                  {["Separate providers", "No shared access", "Repeated intake", "Gaps in follow-up"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] text-[#5F6F7E]">
                      <X className="h-3.5 w-3.5 shrink-0 text-[#b0bec5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#4A7FC1]/20 bg-[#E8EFF8] p-3.5 space-y-2 shadow-[0_2px_12px_rgba(74,127,193,0.1)]">
                <h3 className="text-[16px] font-bold text-[#12385B]">Alliance Model</h3>
                <ul className="space-y-1">
                  {[
                    { label: "Surgical Specialties", desc: "general surgery, orthopaedics and related disciplines" },
                    { label: "Medical Specialties", desc: "cardiology, endocrinology, dermatology, urology and more" },
                    { label: "Comprehensive Coverage", desc: "access across multiple specialist areas" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-2 text-[15px] text-[#12385B]">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#4A7FC1] mt-0.5" />
                      <span><span className="font-semibold">{item.label}</span> — {item.desc}</span>
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
