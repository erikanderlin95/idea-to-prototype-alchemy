import { Button } from "@/components/ui/button";
import { HelpCircle, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { QueueIcon, AppointmentsIcon, AnalyticsIcon, ChatbotIcon } from "@/components/icons/FeatureIcons";
import { ClynicQIcon } from "@/components/icons/ClynicQIcon";
import { Heart } from "lucide-react";

interface NavbarProps {
  onRestartTour?: () => void;
}

export const Navbar = ({ onRestartTour }: NavbarProps = {}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isStaff, setIsStaff] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsStaff(false);
      return;
    }

    const checkStaffRole = async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "clinic_staff")
        .maybeSingle();

      setIsStaff(!!data);
    };

    checkStaffRole();
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center justify-between gap-3 px-3 md:px-6">
        <div className="flex items-center gap-1.5 md:gap-2 cursor-pointer group onboarding-logo shrink-0" onClick={() => navigate("/")}>
          <ClynicQIcon size="md" />
          <div className="flex flex-col -space-y-0.5 min-w-0">
            <span className="text-base md:text-xl font-poppins font-bold tracking-tight leading-none whitespace-nowrap">
              Clynic<span className="text-primary">Q</span>
            </span>
            
          </div>
        </div>

        {/* Desktop Navigation removed */}

        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {/* Mobile Menu - Show when signed in on smaller screens */}
          {user && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>{t("nav.menu")}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <a 
                    href="/" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-medium">{t("nav.findClinics")}</span>
                  </a>
                  <a 
                    href="/consultants" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">{t("nav.consultants")}</span>
                  </a>
                  {isStaff && (
                    <a 
                      href="/staff" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <QueueIcon size="sm" />
                      <span className="text-sm font-medium">{t("nav.staffDashboard")}</span>
                    </a>
                  )}
                  <a 
                    href="/appointments" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AppointmentsIcon size="sm" />
                    <span className="text-sm font-medium">{t("nav.myAppointments")}</span>
                  </a>
                  <a 
                    href="/chatbot" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ChatbotIcon size="sm" />
                    <span className="text-sm font-medium">{t("nav.healthAssistant")}</span>
                  </a>
                  <a 
                    href="/analytics" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AnalyticsIcon size="sm" />
                    <span className="text-sm font-medium">{t("nav.analytics")}</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Help Menu */}
          {onRestartTour && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t("nav.help")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onRestartTour}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  {t("nav.restartTour")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Sign out button hidden */}
        </div>
      </div>
    </nav>
  );
};
