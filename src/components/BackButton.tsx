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
    <div className="container px-3 md:px-6 pt-3">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back"
        className="group inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-primary/10 hover:border-primary/40 hover:shadow active:scale-95"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
