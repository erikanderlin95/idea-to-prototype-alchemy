import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface SearchFiltersProps {
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (text: string) => void;
}

export const SearchFilters = ({
  defaultCategory = "all",
  onCategoryChange,
  onSearchChange,
}: SearchFiltersProps) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    const id = setTimeout(() => onSearchChange?.(searchText), 150);
    return () => clearTimeout(id);
  }, [searchText, onSearchChange]);

  const activeFilterCount =
    (activeCategory !== "all" ? 1 : 0) + (searchText.trim() ? 1 : 0);

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
    <div className="space-y-3">
      {/* Primary unified search bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder={t("search.placeholder")}
          className="h-14 sm:h-16 w-full pl-12 sm:pl-14 pr-4 rounded-full text-base sm:text-lg border border-input bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label={t("search.placeholder")}
        />
      </div>

      {/* Filter Clinics button */}
      <button
        type="button"
        className="w-full h-11 flex items-center justify-between px-4 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
        aria-label={filtersLabel}
      >
        <span className="flex items-center gap-2 font-medium text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          {filtersLabel}
        </span>
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Category chips */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
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
