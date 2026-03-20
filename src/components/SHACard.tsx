import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Network, Stethoscope, ArrowRight, Shield } from "lucide-react";

const SHACard = () => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_12px_36px_rgba(18,56,91,0.14)] hover:-translate-y-1 transition-all duration-300 border-[#C8DAE5] shadow-[0_3px_16px_rgba(18,56,91,0.08)] bg-gradient-to-b from-white to-[#F6F9FC] overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#EBF0FA] to-[#DCE5F3] mb-3 ring-1 ring-[#4A7FC1]/25 shadow-[0_0_12px_rgba(74,127,193,0.15)] group-hover:shadow-[0_0_18px_rgba(74,127,193,0.25)] group-hover:ring-[#4A7FC1]/50 transition-all flex items-center justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <HeartPulse className="h-7 w-7 text-[#4A7FC1]" />
              <span className="text-[7px] font-bold text-[#4A7FC1] tracking-wider uppercase">SHA</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-bold text-[#0E2E4A] mb-0.5">
            SG HealthCare Alliance
          </h3>
          <p className="text-[13px] text-[#5A7089] mb-2.5">
            Integrated Care Network
          </p>

          {/* Description */}
          <p className="text-[14px] text-[#5A7089] leading-snug mb-3">
            Connected access to primary, specialist, and allied health services.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3D6EA3] bg-[#E8EFF8] border border-[#4A7FC1]/20 rounded-full px-2.5 py-0.5">
              <Network className="h-3 w-3" />
              Multi-Site
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3D6EA3] bg-[#E8EFF8] border border-[#4A7FC1]/20 rounded-full px-2.5 py-0.5">
              <Stethoscope className="h-3 w-3" />
              GP & Specialist
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3D6EA3] bg-[#E8EFF8] border border-[#4A7FC1]/20 rounded-full px-2.5 py-0.5">
              <Shield className="h-3 w-3" />
              Integrated Care
            </span>
          </div>

          {/* System hint */}
          <p className="text-[12px] text-[#5A7089]/80 mb-4 pt-1 border-t border-[#DCE8EF]">
            One request → assessed → care begins
          </p>

          {/* CTA */}
          <Button
            className="w-full h-9 bg-gradient-to-r from-[#4A7FC1] to-[#3A6BAD] hover:from-[#3D6EA3] hover:to-[#325D96] text-white font-medium text-[14px] shadow-[0_2px_8px_rgba(74,127,193,0.3)] hover:shadow-[0_4px_14px_rgba(74,127,193,0.4)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
            onClick={() => navigate("/organization/sha")}
          >
            Start with SHA
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SHACard;
