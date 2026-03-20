import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Network, Stethoscope, ArrowRight, GitBranch } from "lucide-react";

const OrganizationCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_14px_40px_rgba(18,56,91,0.18)] hover:-translate-y-1 transition-all duration-300 border-[#B0C8DA] shadow-[0_4px_20px_rgba(18,56,91,0.1)] bg-gradient-to-b from-[#EEF5FA] via-[#F2F7FB] to-[#E4ECF3] overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#E6F7FA] to-[#D0F0F5] mb-3 ring-1 ring-[#18B7C9]/30 shadow-[0_0_12px_rgba(24,183,201,0.15)] group-hover:shadow-[0_0_18px_rgba(24,183,201,0.25)] group-hover:ring-[#18B7C9]/50 transition-all flex items-center justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <Building2 className="h-7 w-7 text-[#18B7C9]" />
              <span className="text-[7px] font-bold text-[#18B7C9] tracking-wider uppercase">NYMG</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-bold text-[#0E2E4A] mb-0.5">
            Nanyang Medical Group
          </h3>
          <p className="text-[13px] text-[#5A7089] mb-2.5">
            Managed Care Network
          </p>

          {/* Description */}
          <p className="text-[14px] text-[#5A7089] leading-snug mb-3">
            Single entry access to coordinated GP and specialist care.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#15939F] bg-[#E0F4F7] border border-[#18B7C9]/20 rounded-full px-2.5 py-0.5">
              <Network className="h-3 w-3" />
              Multi-Clinic
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#15939F] bg-[#E0F4F7] border border-[#18B7C9]/20 rounded-full px-2.5 py-0.5">
              <Stethoscope className="h-3 w-3" />
              GP & Specialist
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#15939F] bg-[#E0F4F7] border border-[#18B7C9]/20 rounded-full px-2.5 py-0.5">
              <GitBranch className="h-3 w-3" />
              Coordinated Care
            </span>
          </div>

          {/* System hint */}
          <p className="text-[12px] text-[#5A7089]/80 mb-4 pt-1 border-t border-[#DCE8EF]">
            One entry → matched → direct follow-up
          </p>

          {/* CTA */}
          <Button
            className="w-full h-9 bg-gradient-to-r from-[#18B7C9] to-[#14A3B3] hover:from-[#139AA8] hover:to-[#11909E] text-white font-medium text-[14px] shadow-[0_2px_8px_rgba(24,183,201,0.3)] hover:shadow-[0_4px_14px_rgba(24,183,201,0.4)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
            onClick={() => navigate("/organization/nymg")}
          >
            Start with Nanyang
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
