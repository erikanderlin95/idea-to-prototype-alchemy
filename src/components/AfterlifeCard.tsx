import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Flower2, ArrowRight } from "lucide-react";

import nirvanaLogo from "@/assets/nirvana-logo.jpg";

interface AfterlifeCardProps {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
}

const AfterlifeCard = ({ slug, name, subtitle, description }: AfterlifeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_14px_40px_rgba(45,27,78,0.12)] hover:-translate-y-1 transition-all duration-300 border-[#DDD0EA] shadow-[0_4px_20px_rgba(45,27,78,0.06)] bg-gradient-to-b from-[#FAF7FC] via-[#F5EEF8] to-[#EDE4F5] overflow-hidden aspect-square max-w-[380px] mx-auto w-full">
      <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
        {/* Subtle gold accent ring */}
        <div className="w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden mb-3 ring-1 ring-[#C9A84C]/25 shadow-[0_2px_12px_rgba(201,168,76,0.1)]">
          <img src={nirvanaLogo} alt="Nirvana Joyful Life logo" className="w-full h-full object-cover" />
        </div>

        <h3 className="text-[17px] font-bold text-[#2D1B4E] mb-0.5">
          {name}
        </h3>
        <p className="text-[13px] text-[#8A7A9A] mb-2.5">
          {subtitle}
        </p>

        <p className="text-[14px] text-[#7A6B8A] leading-snug mb-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7A6093] bg-[#F0E6F8]/60 border border-[#DDD0EA]/50 rounded-full px-2.5 py-0.5">
            <Flower2 className="h-3 w-3" />
            Columbarium Niche
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7A6093] bg-[#F0E6F8]/60 border border-[#DDD0EA]/50 rounded-full px-2.5 py-0.5">
            <Shield className="h-3 w-3" />
            Ancestral Tablet
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7A6093] bg-[#F0E6F8]/60 border border-[#DDD0EA]/50 rounded-full px-2.5 py-0.5">
            <Heart className="h-3 w-3" />
            Funeral Service
          </span>
        </div>

        <Button
          className="w-full h-9 bg-gradient-to-r from-[#9B7DB8] to-[#8A6BAA] hover:from-[#8A6BAA] hover:to-[#7A5B9A] text-white font-medium text-[14px] shadow-[0_2px_8px_rgba(155,125,184,0.25)] hover:shadow-[0_4px_14px_rgba(155,125,184,0.35)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
          onClick={() => navigate(`/afterlife/${slug}`)}
        >
          Explore
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AfterlifeCard;