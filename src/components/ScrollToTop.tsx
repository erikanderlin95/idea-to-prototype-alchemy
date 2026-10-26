import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scrolls to the top on forward navigation (PUSH/REPLACE) so new pages,
 * e.g. clinic details, open at the top. Back/forward (POP) is left alone so
 * listing pages can restore their previous scroll position.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    if (navType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
};
