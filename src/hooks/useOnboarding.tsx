import { useState, useEffect } from "react";

const ONBOARDING_KEY = "clynicq_onboarding_completed";

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY);
    
    if (!hasCompletedOnboarding) {
      setIsFirstVisit(true);
      // Small delay to let the page load
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
    setIsFirstVisit(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setShowOnboarding(true);
    setIsFirstVisit(true);
  };

  const startOnboarding = () => {
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    isFirstVisit,
    completeOnboarding,
    resetOnboarding,
    startOnboarding,
  };
};
