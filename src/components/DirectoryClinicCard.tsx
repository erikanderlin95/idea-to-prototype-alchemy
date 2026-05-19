import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

export interface DirectoryClinicCardProps {
  name: string;
  type: string;
  address: string;
  phone?: string;
  mapsUrl?: string;
}

export const DirectoryClinicCard = ({ name, type, address, mapsUrl }: DirectoryClinicCardProps) => {
  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mapsUrl) {
      window.open(mapsUrl, "_blank");
      return;
    }
    const q = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  return (
    <Card className="group flex flex-col px-3 py-2.5 sm:px-3.5 sm:py-3 hover:shadow-sm transition-all duration-300 border border-border/70 hover:border-border bg-muted/20 shadow-none w-full max-w-[360px] md:max-w-[420px] mx-auto h-full">
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight min-w-0 truncate flex-1">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="outline" className="text-[11px] font-normal px-1.5 py-0 h-[20px] shrink-0 text-muted-foreground border-border/70">
            {type}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{address}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-1.5 mt-2.5">
        <Button
          variant="ghost"
          className="w-full h-9 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted border border-border/70"
          onClick={handleDirections}
        >
          <Navigation className="mr-1.5 h-3.5 w-3.5" strokeWidth={2} />
          Open in Google Maps
        </Button>
      </div>
    </Card>
  );
};
