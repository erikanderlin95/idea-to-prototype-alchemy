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
import { ClynicQIcon } from "@/components/icons/ClynicQIcon";

interface NavbarProps {
  onRestartTour?: () => void;
}

export const Navbar = ({ onRestartTour }: NavbarProps = {}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group onboarding-logo shrink-0" onClick={() => navigate("/")}>
          <ClynicQIcon size="lg" />
          <div className="flex flex-col -space-y-0.5 min-w-0">
            <span className="text-xl md:text-2xl font-poppins font-bold tracking-tight leading-none whitespace-nowrap">
              Clynic<span className="text-primary">Q</span>
            </span>
            <span className="text-[7px] md:text-[8px] font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">Queue • Book • Connect</span>
          </div>
        </div>

        {/* Desktop Navigation - Only show on xl screens when signed in */}
        <div className={`hidden ${user ? 'xl:flex' : 'lg:flex'} items-center gap-4 xl:gap-6 onboarding-nav`}>
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
            {t("nav.findClinics")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
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
                <div className="space-y-1 mt-6">
                  <a 
                    href="/" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-medium">{t("nav.findClinics")}</span>
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

          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut}>
              {t("nav.signOut")}
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                {t("nav.login")}
              </Button>
              <Button size="sm" onClick={() => navigate("/auth")}>
                {t("nav.signUp")}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
