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
        <Button variant="outline" size="sm" className="h-9 px-3 gap-2 text-sm font-semibold border-2 border-primary/50 hover:border-primary/70 hover:bg-primary/5">
          <Languages className="h-4 w-4 text-primary" />
          {languageLabels[language] || "EN"}
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
