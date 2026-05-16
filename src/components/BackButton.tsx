import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Non-disruptive back button shown on all routes except the home page.
 * Uses browser history when available, otherwise falls back to "/".
 */
export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const label = (() => {
    try {
      return t("nav.back") || "Back";
    } catch {
      return "Back";
    }
  })();

  return (
    <div className="container px-3 md:px-6 pt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/10 gap-1"
        aria-label={label}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-xs font-medium">{label}</span>
      </Button>
    </div>
  );
};

export default BackButton;
