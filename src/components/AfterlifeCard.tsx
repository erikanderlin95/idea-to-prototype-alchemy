import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import nirvanaLogo from "@/assets/nirvana-logo.jpg";

interface AfterlifeCardProps {
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
}

const AfterlifeCard = ({ slug, name, subtitle, description }: AfterlifeCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card className="group hover:shadow-[0_10px_28px_rgba(45,27,78,0.10)] hover:-translate-y-0.5 transition-all duration-300 border border-gray-200/80 hover:border-gray-300/80 shadow-[0_2px_12px_rgba(45,27,78,0.04)] bg-white overflow-hidden w-full">
      <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center h-full text-center">
        {/* Subtle gold accent ring */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden mb-1.5 ring-1 ring-[#C9A84C]/20 shadow-[0_2px_8px_rgba(201,168,76,0.08)]">
          <img src={nirvanaLogo} alt="Nirvana Joyful Life logo" className="w-full h-full object-cover" />
        </div>

        <h3 className="text-base sm:text-[17px] font-bold text-[#2D1B4E] mb-0">
          {name}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-[13px] text-[#8A7A9A] mb-0.5">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-xs sm:text-[13px] text-[#7A6B8A] leading-snug mb-2">
            {description}
          </p>
        )}

        <Button
          className="w-1/2 mx-auto h-8 sm:h-9 bg-gradient-to-r from-[#9B7DB8] to-[#8A6BAA] hover:from-[#8A6BAA] hover:to-[#7A5B9A] text-white font-medium text-[13px] sm:text-[14px] shadow-[0_2px_6px_rgba(155,125,184,0.22)] hover:shadow-[0_4px_12px_rgba(155,125,184,0.32)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
          onClick={() => navigate(`/afterlife/${slug}`)}
        >
          {t("afterlife.card.cta")}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AfterlifeCard;
