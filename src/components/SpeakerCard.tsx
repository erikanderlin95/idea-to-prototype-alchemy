import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Presentation, Award, ArrowRight } from "lucide-react";
import ouchLogo from "@/assets/ouch-logo.jpg";

interface SpeakerCardProps {
  slug: string;
  name: string;
  subtitle: string;
  speakerName: string;
  description: string;
  color: string;
  colorLight: string;
  colorBorder: string;
  icon: React.ReactNode;
}

const SpeakerCard = ({ slug, name, subtitle, speakerName, description }: SpeakerCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_16px_48px_rgba(212,134,10,0.2)] hover:-translate-y-1 transition-all duration-300 border-[#D4B07A] shadow-[0_6px_24px_rgba(212,134,10,0.12)] bg-gradient-to-b from-[#FDF6EE] via-[#FEF8F2] to-[#F8EFE3] overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-[5rem] h-[5rem] rounded-lg overflow-hidden bg-[#F5F0EA] mb-2.5 ring-1 ring-[#D4B07A]/40 shadow-[0_1px_6px_rgba(212,134,10,0.08)] group-hover:shadow-[0_2px_12px_rgba(212,134,10,0.12)] transition-all flex items-center justify-center p-1.5">
            <img src={ouchLogo} alt="Ouch Pte Ltd" className="w-full h-full object-contain" />
          </div>

          {/* Title */}
          <h3 className="text-[19px] font-extrabold text-[#0D2E4A] mb-0.5 tracking-tight leading-tight">
            {name}
          </h3>
          <p className="text-[11.5px] text-[#5A7089] font-medium mb-3 tracking-wide uppercase">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-[13.5px] text-[#3A5068] leading-snug mb-3 font-medium">
            {description}
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1 justify-center mb-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/15 rounded-full px-2 py-[2px]">
              <Mic className="h-2.5 w-2.5" strokeWidth={2.5} />
              Speaker: {speakerName}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/15 rounded-full px-2 py-[2px]">
              <Presentation className="h-2.5 w-2.5" strokeWidth={2.5} />
              Workshops
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/15 rounded-full px-2 py-[2px]">
              <Award className="h-2.5 w-2.5" strokeWidth={2.5} />
              Corporate Training
            </span>
          </div>

          {/* CTA */}
          <Button
            className="w-full h-9 bg-gradient-to-r from-[#D4860A] to-[#B8720A] hover:from-[#B8720A] hover:to-[#9C5F08] text-white font-bold text-[14px] tracking-wide shadow-[0_3px_12px_rgba(212,134,10,0.35)] hover:shadow-[0_5px_18px_rgba(212,134,10,0.45)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
            onClick={() => navigate(`/speakers/${slug}`)}
          >
            View Profile
            <ArrowRight className="ml-1 h-4 w-4" strokeWidth={2.5} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeakerCard;
