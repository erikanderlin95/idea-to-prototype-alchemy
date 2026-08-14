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
    <Card className="group hover:shadow-[0_14px_40px_rgba(45,27,78,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-[0_4px_20px_rgba(45,27,78,0.04)] bg-white overflow-hidden max-w-[380px] mx-auto w-full">
      <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
        {/* Subtle gold accent ring */}
        <div className="w-14 h-14 rounded-xl overflow-hidden mb-2 ring-1 ring-[#C9A84C]/25 shadow-[0_2px_12px_rgba(201,168,76,0.1)]">
          <img src={nirvanaLogo} alt="Nirvana Joyful Life logo" className="w-full h-full object-cover" />
        </div>

        <h3 className="text-[17px] font-bold text-[#2D1B4E] mb-0">
          {name}
        </h3>
        {subtitle && (
          <p className="text-[13px] text-[#8A7A9A] mb-1">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-[13px] text-[#7A6B8A] leading-snug mb-3">
            {description}
          </p>
        )}

        <Button
          className="w-full h-9 bg-gradient-to-r from-[#9B7DB8] to-[#8A6BAA] hover:from-[#8A6BAA] hover:to-[#7A5B9A] text-white font-medium text-[14px] shadow-[0_2px_8px_rgba(155,125,184,0.25)] hover:shadow-[0_4px_14px_rgba(155,125,184,0.35)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
          onClick={() => navigate(`/afterlife/${slug}`)}
        >
          {t("afterlife.card.cta")}
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AfterlifeCard;
