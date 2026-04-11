import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Stethoscope, ArrowRight, GitBranch } from "lucide-react";
import nymgLogo from "@/assets/nymg-logo.jpg";

const OrganizationCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-[0_16px_48px_rgba(13,46,74,0.2)] hover:-translate-y-1 transition-all duration-300 border-[#B0C8DA] shadow-[0_6px_24px_rgba(13,46,74,0.12)] bg-gradient-to-b from-[#E8F0F6] via-[#F0F6FA] to-[#F6F9FC] overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-white mb-2.5 ring-1 ring-[#B0C8DA]/40 shadow-[0_1px_6px_rgba(13,46,74,0.08)] group-hover:shadow-[0_2px_12px_rgba(13,46,74,0.12)] transition-all flex items-center justify-center p-1">
            <img src={nymgLogo} alt="Nanyang Medical Group" className="w-full h-full object-contain" />
          </div>

          {/* Title */}
          <h3 className="text-[19px] font-extrabold text-[#0D2E4A] mb-0.5 tracking-tight leading-tight">
            Nanyang Medical Group
          </h3>
          <p className="text-[11.5px] text-[#5A7089] font-medium mb-3 tracking-wide uppercase">
            Managed Healthcare Provider
          </p>

          {/* Description */}
          <p className="text-[13.5px] text-[#3A5068] leading-snug mb-3 font-medium">
            One intake. We coordinate everything across GP, specialists, and referrals.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1 justify-center mb-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0E9AAB] bg-[#E0F4F7] border border-[#0E9AAB]/15 rounded-full px-2 py-[2px]">
              <Network className="h-2.5 w-2.5" strokeWidth={2.5} />
              Multi-Clinic Access
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0E9AAB] bg-[#E0F4F7] border border-[#0E9AAB]/15 rounded-full px-2 py-[2px]">
              <Stethoscope className="h-2.5 w-2.5" strokeWidth={2.5} />
              Specialist Matching
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0E9AAB] bg-[#E0F4F7] border border-[#0E9AAB]/15 rounded-full px-2 py-[2px]">
              <GitBranch className="h-2.5 w-2.5" strokeWidth={2.5} />
              Coordinated Care
            </span>
          </div>

          {/* CTA */}
          <Button
            className="w-full h-9 bg-gradient-to-r from-[#0E9AAB] to-[#0C8A99] hover:from-[#0B8797] hover:to-[#097A88] text-white font-bold text-[14px] tracking-wide shadow-[0_3px_12px_rgba(14,154,171,0.35)] hover:shadow-[0_5px_18px_rgba(14,154,171,0.45)] transition-all group-hover:-translate-y-px active:scale-[0.97]"
            onClick={() => navigate("/organization/nymg")}
          >
            Request Managed Care
            <ArrowRight className="ml-1 h-4 w-4" strokeWidth={2.5} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
