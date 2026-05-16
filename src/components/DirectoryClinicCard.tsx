import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface DirectoryClinicCardProps {
  name: string;
  type: string;
  address: string;
  phone: string;
}

export const DirectoryClinicCard = ({ name, type, address, phone }: DirectoryClinicCardProps) => {
  const { t } = useLanguage();

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phone) window.location.href = `tel:${phone}`;
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const q = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    const q = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Card className="group flex flex-col px-3 py-2.5 sm:px-3.5 sm:py-3 hover:shadow-md transition-all duration-300 border border-border/60 hover:border-muted-foreground/40 bg-card w-full max-w-[360px] md:max-w-[420px] mx-auto h-full">
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
              <span className="text-[15px] font-bold text-muted-foreground leading-none">{initials}</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-[17px] font-bold text-foreground whitespace-nowrap leading-tight min-w-0 truncate">
              {name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="secondary" className="text-xs font-medium px-1.5 py-0 h-[20px] shrink-0">
            {type}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-[15px] text-muted-foreground -mt-0.5">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1 font-medium">{address}</span>
        </div>

        {phone && (
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            <Phone className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="font-medium">{phone}</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-end gap-1.5 mt-2.5">
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            className="flex-1 h-9 text-xs font-semibold border-border hover:bg-muted"
            onClick={handleCall}
            disabled={!phone}
          >
            <Phone className="mr-1 h-3.5 w-3.5" strokeWidth={2.5} />
            Call Clinic
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-9 text-xs font-semibold border-border hover:bg-muted"
            onClick={handleDirections}
          >
            <Navigation className="mr-1 h-3.5 w-3.5" strokeWidth={2.5} />
            Directions
          </Button>
        </div>
        <Button
          variant="ghost"
          className="w-full h-8 text-xs font-semibold text-muted-foreground hover:bg-muted"
          onClick={handleDetails}
        >
          <ExternalLink className="mr-1 h-3 w-3" />
          View Details
        </Button>
      </div>
    </Card>
  );
};
