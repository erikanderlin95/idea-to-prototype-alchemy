import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Network, Stethoscope, ArrowRight, GitBranch } from "lucide-react";

const OrganizationCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_8px_30px_rgba(18,56,91,0.12)] hover:-translate-y-0.5 transition-all duration-300 border-[#DCE8EF] shadow-[0_2px_12px_rgba(18,56,91,0.06)] bg-white overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F0F8FA] mb-3 ring-1 ring-[#18B7C9]/25 group-hover:ring-[#18B7C9]/50 transition-all flex items-center justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <Building2 className="h-7 w-7 text-[#18B7C9]" />
              <span className="text-[7px] font-bold text-[#18B7C9] tracking-wider uppercase">NYMG</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-semibold text-[#12385B] mb-0.5">
            Nanyang Medical Group
          </h3>
          <p className="text-[13px] text-[#6B7D8E] mb-2.5">
            Managed Care Network
          </p>

          {/* Description */}
          <p className="text-[14px] text-[#6B7D8E] leading-snug mb-3">
            Single entry access to coordinated GP and specialist care.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#18B7C9] bg-[#E6F7FA] rounded-full px-2.5 py-0.5">
              <Network className="h-3 w-3" />
              Multi-Clinic
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#18B7C9] bg-[#E6F7FA] rounded-full px-2.5 py-0.5">
              <Stethoscope className="h-3 w-3" />
              GP & Specialist
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#18B7C9] bg-[#E6F7FA] rounded-full px-2.5 py-0.5">
              <GitBranch className="h-3 w-3" />
              Coordinated Care
            </span>
          </div>

          {/* System hint */}
          <p className="text-[12px] text-[#6B7D8E]/70 mb-4">
            One entry → matched → direct follow-up
          </p>

          {/* CTA */}
          <Button
            className="w-full h-9 bg-[#18B7C9] hover:bg-[#139AA8] text-white font-medium text-[14px] transition-all group-hover:shadow-md active:scale-[0.97]"
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
