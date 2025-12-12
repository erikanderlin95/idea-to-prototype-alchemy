import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight } from "lucide-react";

interface ConsultantCardProps {
  consultant: {
    id: string;
    name: string;
    title: string;
    photo_url: string | null;
    short_bio: string | null;
    areas_of_focus: string[];
  };
}

const ConsultantCard = ({ consultant }: ConsultantCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-4 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            {consultant.photo_url ? (
              <img
                src={consultant.photo_url}
                alt={consultant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                <User className="h-12 w-12 text-primary/60" />
              </div>
            )}
          </div>

          {/* Name & Title */}
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {consultant.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {consultant.title}
          </p>

          {/* Areas of Focus */}
          {consultant.areas_of_focus && consultant.areas_of_focus.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              {consultant.areas_of_focus.slice(0, 3).map((area, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {area}
                </Badge>
              ))}
              {consultant.areas_of_focus.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{consultant.areas_of_focus.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Short Bio */}
          {consultant.short_bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {consultant.short_bio}
            </p>
          )}

          {/* View Profile Button */}
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            onClick={() => navigate(`/consultant/${consultant.id}`)}
          >
            {t("consultant.viewProfile")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultantCard;
