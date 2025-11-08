import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";

interface ClinicCardProps {
  name: string;
  type: "GP" | "TCM" | "Wellness";
  address: string;
  queueCount: number;
  waitTime: string;
  rating: number;
  isOpen: boolean;
}

export const ClinicCard = ({
  name,
  type,
  address,
  queueCount,
  waitTime,
  rating,
  isOpen,
}: ClinicCardProps) => {
  const queueStatus = queueCount < 5 ? "low" : queueCount < 10 ? "medium" : "high";

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
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
          <Button className="flex-1" disabled={!isOpen}>
            {isOpen ? "Join Queue" : "Closed"}
          </Button>
          <Button variant="outline" className="flex-1">
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};
