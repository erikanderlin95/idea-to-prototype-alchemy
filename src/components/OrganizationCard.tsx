import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Network, Stethoscope, ArrowRight, GitBranch } from "lucide-react";

const OrganizationCard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Organization Logo */}
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-white mb-4 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all flex items-center justify-center p-3">
            <div className="flex flex-col items-center gap-1">
              <Building2 className="h-10 w-10 text-primary" />
              <span className="text-[8px] font-bold text-primary tracking-wider uppercase">NYMG</span>
            </div>
          </div>

          {/* Name & Subtitle */}
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {t("org.name")}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {t("org.subtitle")}
          </p>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {t("org.tagline")}
          </p>

          {/* Key Highlights */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-4">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <Network className="h-3 w-3" />
              {t("org.highlight1")}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <Stethoscope className="h-3 w-3" />
              {t("org.highlight2")}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <GitBranch className="h-3 w-3" />
              {t("org.highlight3")}
            </Badge>
          </div>

          {/* CTA */}
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            onClick={() => navigate("/organization/nymg")}
          >
            {t("org.viewProvider")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
