import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, SlidersHorizontal, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface SearchFiltersProps {
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (text: string) => void;
  onLocationChange?: (location: string) => void;
  locations?: string[];
}

export const SearchFilters = ({
  defaultCategory = "all",
  onCategoryChange,
  onSearchChange,
  onLocationChange,
  locations = [],
}: SearchFiltersProps) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("all");

  useEffect(() => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    const id = setTimeout(() => onSearchChange?.(searchText), 150);
    return () => clearTimeout(id);
  }, [searchText, onSearchChange]);

  useEffect(() => {
    onLocationChange?.(location);
  }, [location, onLocationChange]);

  const activeFilterCount =
    (activeCategory !== "all" ? 1 : 0) +
    (searchText.trim() ? 1 : 0) +
    (location !== "all" ? 1 : 0);

  const categories = [
    { key: "all", labelKey: "search.category.all" },
    { key: "gp_specialist", labelKey: "search.category.gp_specialist" },
    { key: "dental", labelKey: "search.category.dental" },
    { key: "therapy_rehab", labelKey: "search.category.therapy_rehab" },
    { key: "mental_wellness", labelKey: "search.category.mental_wellness" },
    { key: "traditional_medicine", labelKey: "search.category.traditional_medicine" },
  ];

  const handleCategoryClick = (key: string) => {
    setActiveCategory(key);
    onCategoryChange?.(key);
  };

  const filtersLabel =
    activeFilterCount > 0
      ? `${t("search.moreOptions")} \u2022 ${activeFilterCount}`
      : t("search.moreOptions");

  return (
    <div className="space-y-4">
      {/* Combined search + location bar */}
      <div className="flex items-stretch h-12 w-full rounded-full border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
        <div className="relative flex-[7] min-w-0 flex items-center">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={t("search.placeholder")}
            className="pl-10 sm:pl-11 pr-2 h-full w-full border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label={t("search.placeholder")}
          />
        </div>
        <div className="w-px self-stretch bg-border my-2" />
        <div className="flex-[3] min-w-[110px] sm:min-w-[160px] flex items-center">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger
              className="h-full w-full border-0 rounded-none bg-transparent focus:ring-0 focus:ring-offset-0 pl-2 pr-3 sm:pl-3 sm:pr-4 gap-1"
              aria-label={t("search.location")}
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <SelectValue placeholder={t("search.location")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.location")}</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* More Search Options button */}
      <button
        type="button"
        className="w-full h-12 flex items-center justify-between px-4 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
        aria-label={filtersLabel}
      >
        <span className="flex items-center gap-2 font-medium text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          {filtersLabel}
        </span>
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Category chips (unchanged) */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <Badge
            key={category.key}
            variant={activeCategory === category.key ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => handleCategoryClick(category.key)}
          >
            {t(category.labelKey)}
          </Badge>
        ))}
      </div>
    </div>
  );
};
