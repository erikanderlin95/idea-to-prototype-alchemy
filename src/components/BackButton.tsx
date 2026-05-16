import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Non-disruptive back button shown on all routes except the home page.
 * Uses browser history when available, otherwise falls back to "/".
 */
export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back"
        className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/95 backdrop-blur px-3.5 py-2 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
