import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, ArrowRight, Flower2 } from "lucide-react";

interface AfterlifeCardProps {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const AfterlifeCard = ({ slug, name, subtitle, description, icon }: AfterlifeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_14px_40px_rgba(18,56,91,0.18)] hover:-translate-y-1 transition-all duration-300 border-[#C4B5D4] shadow-[0_4px_20px_rgba(18,56,91,0.1)] bg-gradient-to-b from-[#F6F0FA] via-[#F8F4FC] to-[#EDE4F5] overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#E8D8F4] to-[#D4BFE8] mb-3 ring-1 ring-[#8B5CB8]/40 shadow-[0_0_16px_rgba(139,92,184,0.2)] group-hover:shadow-[0_0_24px_rgba(139,92,184,0.35)] group-hover:ring-[#8B5CB8]/60 transition-all flex items-center justify-center">
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
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B4A8A] bg-[#F0E6F8] border border-[#8B5CB8]/20 rounded-full px-2.5 py-0.5">
              <Flower2 className="h-3 w-3" />
              Memorial Services
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B4A8A] bg-[#F0E6F8] border border-[#8B5CB8]/20 rounded-full px-2.5 py-0.5">
              <Shield className="h-3 w-3" />
              Pre-Planning
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B4A8A] bg-[#F0E6F8] border border-[#8B5CB8]/20 rounded-full px-2.5 py-0.5">
              <Heart className="h-3 w-3" />
              Family Support
            </span>
          </div>

          <Button
            className="w-full h-9 bg-gradient-to-r from-[#8B5CB8] to-[#7548A0] hover:from-[#7548A0] hover:to-[#633E8A] text-white font-medium text-[14px] shadow-[0_2px_8px_rgba(139,92,184,0.3)] hover:shadow-[0_4px_14px_rgba(139,92,184,0.4)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
            onClick={() => navigate(`/afterlife/${slug}`)}
          >
            View Services
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AfterlifeCard;
