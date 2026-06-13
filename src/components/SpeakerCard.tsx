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
  color?: string;
  colorLight?: string;
  colorBorder?: string;
  icon?: React.ReactNode;
  logo?: string;
  titleColor?: string;
  subtitleColor?: string;
  descColor?: string;
  ctaGradientFrom?: string;
  ctaGradientTo?: string;
  ctaGradientHoverFrom?: string;
  ctaGradientHoverTo?: string;
  ctaShadow?: string;
  ctaShadowHover?: string;
  hoverShadow?: string;
  baseShadow?: string;
  bannerImage?: string;
}

const SpeakerCard = ({
  slug,
  name,
  subtitle,
  description,
  logo = ouchLogo,
  titleColor = "#0A3D42",
  subtitleColor = "#4A7A80",
  descColor = "#355E63",
  ctaGradientFrom = "#0E9AAB",
  ctaGradientTo = "#067A8A",
  ctaGradientHoverFrom = "#067A8A",
  ctaGradientHoverTo = "#055F6D",
  ctaShadow = "0 3px 12px rgba(14,154,171,0.35)",
  ctaShadowHover = "0 5px 18px rgba(14,154,171,0.45)",
  hoverShadow = "0 16px 48px rgba(14,154,171,0.2)",
  baseShadow = "0 6px 24px rgba(14,154,171,0.08)",
  bannerImage,
}: SpeakerCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 bg-white overflow-hidden rounded-2xl aspect-square max-w-[380px] mx-auto flex items-center relative"
      style={{ boxShadow: baseShadow }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = baseShadow)}
    >
      {bannerImage && (
        <div className="absolute top-0 left-0 right-0 h-[22%] pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImage})` }}
          />
          {/* Subtle fade into white for seamless transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
        </div>
      )}
      <CardContent className="p-4 relative z-10">

        <div className="flex flex-col items-center text-center">
          {/* Logo — overlaps banner by ~12px for depth */}
          <div className="w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden mb-3 border border-gray-200 -mt-3 bg-white shadow-sm">
            <img src={logo} alt={name} className="w-full h-full object-cover" />
          </div>

          {/* Title */}
          <h3 className="text-[19px] font-extrabold mb-0.5 tracking-tight leading-tight" style={{ color: titleColor }}>
            {name}
          </h3>
          <p className="text-[11.5px] font-medium mb-3 tracking-wide uppercase" style={{ color: subtitleColor }}>
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-[13.5px] leading-snug mb-3 font-medium" style={{ color: descColor }}>
            {description}
          </p>

          {/* CTA */}
          <Button
            className="w-full h-9 text-white font-bold text-[14px] tracking-wide transition-all group-hover:-translate-y-px active:scale-[0.97]"
            style={{
              background: `linear-gradient(to right, ${ctaGradientFrom}, ${ctaGradientTo})`,
              boxShadow: ctaShadow,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, ${ctaGradientHoverFrom}, ${ctaGradientHoverTo})`;
              e.currentTarget.style.boxShadow = ctaShadowHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, ${ctaGradientFrom}, ${ctaGradientTo})`;
              e.currentTarget.style.boxShadow = ctaShadow;
            }}
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
