import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 cursor-pointer" onClick={() => id && navigate(`/clinic/${id}`)}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Badge variant="secondary" className="text-xs">
                {type}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 px-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-2 flex-1">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Queue</p>
              <p className="text-sm font-semibold">{queueCount} waiting</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Wait Time</p>
              <p className="text-sm font-semibold">{waitTime}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            disabled={!isOpen}
            onClick={(e) => {
              e.stopPropagation();
              id && navigate(`/clinic/${id}`);
            }}
          >
            {isOpen ? "View Details" : "Closed"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
