import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Presentation, Users, ArrowRight, Award } from "lucide-react";

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

const SpeakerCard = ({ slug, name, subtitle, speakerName, description, color, colorLight, colorBorder, icon }: SpeakerCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`group hover:shadow-[0_14px_40px_rgba(18,56,91,0.18)] hover:-translate-y-1 transition-all duration-300 border-[${colorBorder}] shadow-[0_4px_20px_rgba(18,56,91,0.1)] bg-gradient-to-b from-[#FDF6EE] via-[#FEF8F2] to-[#F8EFE3] overflow-hidden`}>
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#FDECD2] to-[#F5D9B0] mb-3 ring-1 ring-[#D4860A]/40 shadow-[0_0_16px_rgba(212,134,10,0.2)] group-hover:shadow-[0_0_24px_rgba(212,134,10,0.35)] group-hover:ring-[#D4860A]/60 transition-all flex items-center justify-center`}>
            {icon}
          </div>

          <h3 className="text-[17px] font-bold text-[#0E2E4A] mb-0.5">
            {name}
          </h3>
          <p className="text-[13px] text-[#5A7089] mb-2.5">
            {subtitle}
          </p>

          <p className="text-[14px] text-[#5A7089] leading-snug mb-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/20 rounded-full px-2.5 py-0.5">
              <Mic className="h-3 w-3" />
              Speaker: {speakerName}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/20 rounded-full px-2.5 py-0.5">
              <Presentation className="h-3 w-3" />
              Workshops
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9B6B1A] bg-[#FDF2E0] border border-[#D4860A]/20 rounded-full px-2.5 py-0.5">
              <Award className="h-3 w-3" />
              Corporate Training
            </span>
          </div>

          <Button
            className="w-full h-9 bg-gradient-to-r from-[#D4860A] to-[#B8720A] hover:from-[#B8720A] hover:to-[#9C5F08] text-white font-medium text-[14px] shadow-[0_2px_8px_rgba(212,134,10,0.3)] hover:shadow-[0_4px_14px_rgba(212,134,10,0.4)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
            onClick={() => navigate(`/speakers/${slug}`)}
          >
            View Profile
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeakerCard;
