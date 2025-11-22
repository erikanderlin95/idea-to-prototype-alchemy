import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useJoinQueueModal } from "@/contexts/JoinQueueContext";

interface ClinicCardProps {
  id?: string;
  name: string;
  type: "GP" | "TCM" | "Wellness";
  address: string;
  queueCount: number;
  waitTime: string;
  rating: number;
  isOpen: boolean;
}

export const ClinicCard = ({
  id,
  name,
  type,
  address,
  queueCount,
  waitTime,
  rating,
  isOpen,
}: ClinicCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { openModal } = useJoinQueueModal();

  const handleJoinQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    openModal(id, name, queueCount);
  };

  return (
    <Card 
      className="group p-6 hover:shadow-xl transition-all duration-300 border-ai-indigo/30 hover:border-ai-purple/50 cursor-pointer bg-gradient-to-br from-card to-ai-purple/5 onboarding-join-queue hover:shadow-ai-purple/10" 
      onClick={() => id && navigate(`/clinic/${id}`)}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{name}</h3>
              <Badge variant="secondary" className="text-sm font-medium">
                {type}
              </Badge>
              {isOpen ? (
                <Badge variant="outline" className="text-sm border-accent text-accent">
                  {t("clinicCard.open")}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-sm border-muted text-muted-foreground">
                  {t("clinicCard.closed")}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4 px-4 rounded-xl border onboarding-stats"
          style={{ 
            background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.08))',
            borderColor: 'hsl(var(--ai-cyan)/0.3)'
          }}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t("clinicCard.inQueue")}</p>
              <p className="text-base font-bold">{queueCount} {t("clinicCard.people")}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t("clinicCard.estWait")}</p>
              <p className="text-base font-bold">{waitTime}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1 h-12" 
            onClick={(e) => {
              e.stopPropagation();
              id && navigate(`/clinic/${id}`);
            }}
          >
            {t("clinicCard.viewDetails")}
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-base shadow-2xl shadow-primary/50 border-0 h-12 hover:scale-105 transition-transform" 
            disabled={!isOpen}
            onClick={handleJoinQueue}
          >
            {t("clinicCard.joinQueue")}
          </Button>
        </div>
      </div>
    </Card>
  );
};
