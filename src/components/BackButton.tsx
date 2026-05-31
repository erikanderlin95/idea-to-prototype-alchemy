import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/**
 * Minimal top-left back navigation shown on all routes except home.
 * Sits inline at the top of the page (below the navbar), not floating.
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
    <div className="sticky top-2 z-40 container px-3 md:px-6 pt-2 pointer-events-none">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back"
        className="pointer-events-auto inline-flex items-center gap-1 -ml-1 px-2 py-1 text-sm font-medium text-primary bg-background/70 backdrop-blur-sm hover:bg-primary/10 transition-colors rounded-md shadow-sm"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
