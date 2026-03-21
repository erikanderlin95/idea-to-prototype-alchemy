import { Check } from "lucide-react";

export const SHAWhyConcierge = () => {
  return (
    <section className="py-8 px-4 bg-[#F4F8FB]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-[1.7rem] md:text-[1.9rem] font-bold text-[#12385B] tracking-tight">
              Specialist Disciplines
            </h2>
            <p className="text-[18px] text-[#5F6F7E] leading-relaxed max-w-lg">
              Specialist disciplines available include surgical, medical and sub-specialty care across multiple fields.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[15px] font-semibold uppercase tracking-widest text-[#5F6F7E]">
              Key Procedures & Services
            </p>
            <ul className="space-y-1.5 pl-1">
              {[
                "Colonoscopy and gastroscopy",
                "Gastric sleeve surgery",
                "Hernia repair",
                "Prostate surgery",
                "Breast biopsy and breast cancer surgery",
                "Tonsil and adenoid surgery",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] text-[#12385B]">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#4A7FC1]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
