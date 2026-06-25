import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languageLabels: Record<string, string> = {
  en: "EN",
  zh: "中文",
  ms: "MS",
  ta: "தமிழ்",
};

const languageFullLabels: Record<string, string> = {
  en: "English",
  zh: "简体中文",
  ms: "Bahasa Melayu",
  ta: "தமிழ்",
};

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Change language"
          className="h-9 px-3 gap-1.5 text-sm font-semibold border-2 border-primary/60 hover:border-primary bg-background hover:bg-primary/5 shadow-sm rounded-full"
        >
          <Languages className="h-4 w-4 text-primary" />
          <span className="text-primary">{languageLabels[language] || "EN"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70"><polyline points="6 9 12 15 18 9"/></svg>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {(["en", "zh", "ms", "ta"] as const).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={language === lang ? "bg-muted font-medium" : ""}
          >
            {languageFullLabels[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
