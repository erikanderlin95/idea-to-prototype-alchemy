import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/**
 * Prominent floating back button shown on all routes except home.
 * Fixed to top-left and visible while scrolling.
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
    <div className="fixed top-[72px] left-2 z-50 md:top-[80px] md:left-4">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm md:text-base font-semibold text-primary bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-all"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;