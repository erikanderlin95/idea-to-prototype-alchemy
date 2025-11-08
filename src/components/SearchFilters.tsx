import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter } from "lucide-react";

export const SearchFilters = () => {
  const categories = ["All", "GP", "TCM", "Wellness", "Specialists"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search clinics, doctors, or specialties..."
            className="pl-10 h-12"
          />
        </div>
        <div className="relative md:w-64">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Location"
            className="pl-10 h-12"
          />
        </div>
        <Button size="lg" variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={category === "All" ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};
