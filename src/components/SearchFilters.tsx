import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export interface ClinicFilters {
  openNow: boolean;
  queue: boolean;
  booking: boolean;
}

interface SearchFiltersProps {
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (text: string) => void;
  onFiltersChange?: (filters: ClinicFilters) => void;
}

export const SearchFilters = ({
  defaultCategory = "all",
  onCategoryChange,
  onSearchChange,
  onFiltersChange,
}: SearchFiltersProps) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchText, setSearchText] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filters, setFilters] = useState<ClinicFilters>({
    openNow: false,
    queue: false,
    booking: false,
  });
  const [draftFilters, setDraftFilters] = useState<ClinicFilters>(filters);

  useEffect(() => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange?.(value);
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (open) setDraftFilters(filters);
    setSheetOpen(open);
  };

  const toggleDraft = (key: keyof ClinicFilters) =>
    setDraftFilters((d) => ({ ...d, [key]: !d[key] }));

  const applyFilters = () => {
    setFilters(draftFilters);
    setSheetOpen(false);
  };

  const clearFilters = () => {
    setDraftFilters({ openNow: false, queue: false, booking: false });
  };

  const activeFilterCount = [filters.openNow, filters.queue, filters.booking].filter(Boolean).length;

  const filterRows: { key: keyof ClinicFilters; labelKey: string }[] = [
    { key: "openNow", labelKey: "search.filter.openNow" },
    { key: "queue", labelKey: "search.filter.queue" },
    { key: "booking", labelKey: "search.filter.booking" },
  ];

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
          onChange={handleSearchChange}
          aria-label={t("search.placeholder")}
        />
      </div>

      {/* Filter Clinics button */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            onClick={openSheet}
            className="w-full h-11 flex items-center justify-between px-4 rounded-full border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            aria-label={t("search.moreOptions")}
          >
            <span className="flex items-center gap-2 font-medium text-sm">
              <SlidersHorizontal className="h-4 w-4" />
              {t("search.moreOptions")}
            </span>
            <span className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  {activeFilterCount}
                </span>
              )}
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>{t("search.filter.title")}</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-1">
            {filterRows.map((row) => (
              <label
                key={row.key}
                htmlFor={`filter-${row.key}`}
                className="flex items-center justify-between py-3 cursor-pointer"
              >
                <span className="text-base font-medium text-foreground">
                  {t(row.labelKey)}
                </span>
                <Switch
                  id={`filter-${row.key}`}
                  checked={draftFilters[row.key]}
                  onCheckedChange={() => toggleDraft(row.key)}
                />
              </label>
            ))}
          </div>
          <SheetFooter className="flex-row gap-3 items-center pt-4">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground font-medium"
            >
              {t("search.filter.clear")}
            </Button>
            <Button onClick={applyFilters} className="flex-1">
              {t("search.filter.apply")}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

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
