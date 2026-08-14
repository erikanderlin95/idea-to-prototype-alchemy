import { ArrowRight } from "lucide-react";
import afterlifeBroLogo from "@/assets/afterlifebro-logo.png";

const BRAND_COLOR = "#4F8669";

const AfterlifeBroCard = () => {
  return (
    <a
      href="https://www.afterlifebro.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-[#4F8669]/50 bg-white p-3 shadow-[0_2px_12px_rgba(79,134,105,0.08)] hover:shadow-[0_4px_16px_rgba(79,134,105,0.14)] hover:border-[#4F8669]/70 transition-all duration-300 active:scale-[0.99]"
      aria-label="Visit The Afterlife Bro"
    >
      {/* Logo */}
      <div
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden shrink-0 ring-1 ring-[#4F8669]/25"
        style={{ ringColor: `${BRAND_COLOR}40` }}
      >
        <img
          src={afterlifeBroLogo}
          alt="The Afterlife Bro mascot"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-[15px] sm:text-base font-bold text-[#2D1B4E] truncate">
          The Afterlife Bro
        </p>
        <p className="text-[12px] sm:text-[13px] text-[#7A6B8A] truncate">
          Independent Afterlife Consultant
        </p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#4F8669]/10 text-[#4F8669] group-hover:bg-[#4F8669] group-hover:text-white transition-colors duration-300">
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
};

export default AfterlifeBroCard;
