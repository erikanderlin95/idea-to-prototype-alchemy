import { LoaderCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Only used for the first load; transitions retain the already visible page.
export const RouteLoading = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none text-primary" aria-hidden="true" />
        <span>{t("appointments.loading")}</span>
      </div>
    </div>
  );
};