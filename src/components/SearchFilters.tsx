import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface SearchFiltersProps {
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const SearchFilters = ({ defaultCategory = "all", onCategoryChange }: SearchFiltersProps) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  useEffect(() => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory]);

  const categories = [
    { key: "all", label: t("search.all") },
    { key: "gp", label: t("search.gp") },
    { key: "tcm", label: t("search.tcm") },
    { key: "allied_health", label: "Allied Health" }
  ];

  const handleCategoryClick = (key: string) => {
    setActiveCategory(key);
    onCategoryChange?.(key);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t("search.placeholder")}
            className="pl-10 h-12"
          />
        </div>
        <div className="relative md:w-64">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t("search.location")}
            className="pl-10 h-12"
          />
        </div>
        <Button size="lg" variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-5 w-5" />
          {t("search.filters")}
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <Badge
            key={category.key}
            variant={activeCategory === category.key ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => handleCategoryClick(category.key)}
          >
            {category.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};
