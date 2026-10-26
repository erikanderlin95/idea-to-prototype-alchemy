import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * New pages and clinic details always start at the top. Listing POP navigation
 * remains owned by MarketplaceSection's saved-card restoration.
 */
export const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    if (navType === "POP" && !pathname.startsWith("/clinic/")) return;
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    // Reapply after the new route commits and browser focus/layout settles.
    let frame = requestAnimationFrame(() => {
      reset();
      frame = requestAnimationFrame(reset);
    });
    return () => cancelAnimationFrame(frame);
  }, [key, pathname, navType]);

  return null;
};
