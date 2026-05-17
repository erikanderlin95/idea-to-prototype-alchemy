import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

export interface DirectoryClinicCardProps {
  name: string;
  type: string;
  address: string;
  phone: string;
}

export const DirectoryClinicCard = ({ name, type, address, phone }: DirectoryClinicCardProps) => {
  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const q = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  return (
    <Card className="group flex flex-col px-2.5 py-2 sm:px-3 sm:py-2.5 hover:shadow-sm transition-all duration-300 border border-border/40 hover:border-border/70 bg-muted/20 shadow-none w-full max-w-[360px] md:max-w-[420px] mx-auto h-full">
      <div className="space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-foreground/90 leading-tight min-w-0 truncate flex-1">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 h-[18px] shrink-0 text-muted-foreground border-border/50">
            {type}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{address}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-1.5 mt-2">
        <Button
          variant="ghost"
          className="w-full h-8 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted border border-border/40"
          onClick={handleDirections}
        >
          <Navigation className="mr-1 h-3 w-3" strokeWidth={2} />
          Open in Google Maps
        </Button>
      </div>
    </Card>
  );
};
