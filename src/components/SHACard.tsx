import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Network, Stethoscope, ArrowRight, Shield } from "lucide-react";

const SHACard = () => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_14px_40px_rgba(18,56,91,0.18)] hover:-translate-y-1 transition-all duration-300 border-[#A8BDD4] shadow-[0_4px_20px_rgba(18,56,91,0.1)] bg-gradient-to-b from-[#EDF2F9] via-[#F0F4FA] to-[#E2EAF3] overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#D8E4F3] to-[#C2D5EA] mb-3 ring-1 ring-[#4A7FC1]/40 shadow-[0_0_16px_rgba(74,127,193,0.2)] group-hover:shadow-[0_0_24px_rgba(74,127,193,0.35)] group-hover:ring-[#4A7FC1]/60 transition-all flex items-center justify-center">
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
            Access primary, specialist, and allied care.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3D6EA3] bg-[#E8EFF8] border border-[#4A7FC1]/20 rounded-full px-2.5 py-0.5">
              <Network className="h-3 w-3" />
              Multi-Clinic
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
            One entry → assessed → follow-up
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
