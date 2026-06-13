import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ouchLogo from "@/assets/ouch-logo.jpg";

interface SpeakerCardProps {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  colorLight: string;
  colorBorder: string;
  icon: React.ReactNode;
}

const SpeakerCard = ({ slug, name, subtitle, description }: SpeakerCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_16px_48px_rgba(14,154,171,0.2)] hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-[0_6px_24px_rgba(14,154,171,0.08)] bg-white overflow-hidden rounded-2xl aspect-square max-w-[380px] mx-auto flex items-center">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo — no border */}
          <div className="w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden mb-3">
            <img src={ouchLogo} alt="Ouch Pte Ltd" className="w-full h-full object-cover" />
          </div>

          {/* Title */}
          <h3 className="text-[19px] font-extrabold text-[#0A3D42] mb-0.5 tracking-tight leading-tight">
            {name}
          </h3>
          <p className="text-[11.5px] text-[#4A7A80] font-medium mb-3 tracking-wide uppercase">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-[13.5px] text-[#355E63] leading-snug mb-3 font-medium">
            {description}
          </p>


          {/* CTA */}
          <Button
            className="w-full h-9 bg-gradient-to-r from-[#0E9AAB] to-[#067A8A] hover:from-[#067A8A] hover:to-[#055F6D] text-white font-bold text-[14px] tracking-wide shadow-[0_3px_12px_rgba(14,154,171,0.35)] hover:shadow-[0_5px_18px_rgba(14,154,171,0.45)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
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
