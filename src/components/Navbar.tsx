import { Button } from "@/components/ui/button";
import { ClipboardList, HelpCircle, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

interface NavbarProps {
  onRestartTour?: () => void;
}

export const Navbar = ({ onRestartTour }: NavbarProps = {}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group onboarding-logo shrink-0" onClick={() => navigate("/")}>
          <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
            {/* Clinic Queue Icon - ClipboardList representing digital queue */}
            <ClipboardList className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform" />
            {/* Queue Indicator Badge - Active queue count */}
            <div className="absolute -top-1.5 -right-1.5 z-20">
              <div className="relative flex items-center justify-center h-5 w-5 rounded-full bg-accent shadow-lg animate-pulse">
                <span className="text-[10px] font-bold text-accent-foreground">Q</span>
                <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
              </div>
            </div>
            {/* Medical Cross indicator on bottom left */}
            <div className="absolute -bottom-0.5 -left-0.5 z-10">
              <div className="h-3 w-3 rounded-sm bg-background flex items-center justify-center shadow-sm">
                <div className="relative">
                  <div className="absolute h-2 w-0.5 bg-accent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute w-2 h-0.5 bg-accent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col -space-y-0.5 min-w-0">
            <span className="text-xl md:text-2xl font-poppins font-bold tracking-tight leading-none whitespace-nowrap">
              Clynic<span className="text-primary">Q</span>
            </span>
            <span className="text-[7px] md:text-[8px] font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">
              <span className="font-normal opacity-70">Digital</span> Queue • Book • Connect
            </span>
          </div>
        </div>

        {/* Desktop Navigation - Only show on xl screens when signed in */}
        <div className={`hidden ${user ? 'xl:flex' : 'lg:flex'} items-center gap-4 xl:gap-6 onboarding-nav`}>
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
            Find Clinics
          </a>
          {user && (
            <>
              {isStaff && (
                <a href="/staff" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap">
                  <QueueIcon size="sm" />
                  Staff Dashboard
                </a>
              )}
              <a href="/appointments" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap">
                <AppointmentsIcon size="sm" />
                My Appointments
              </a>
              <a href="/chatbot" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap">
                <ChatbotIcon size="sm" />
                Health Assistant
              </a>
              <a href="/analytics" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap">
                <AnalyticsIcon size="sm" />
                Analytics
              </a>
            </>
          )}
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
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <a 
                    href="/" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-medium">Find Clinics</span>
                  </a>
                  {isStaff && (
                    <a 
                      href="/staff" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <QueueIcon size="sm" />
                      <span className="text-sm font-medium">Staff Dashboard</span>
                    </a>
                  )}
                  <a 
                    href="/appointments" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AppointmentsIcon size="sm" />
                    <span className="text-sm font-medium">My Appointments</span>
                  </a>
                  <a 
                    href="/chatbot" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ChatbotIcon size="sm" />
                    <span className="text-sm font-medium">Health Assistant</span>
                  </a>
                  <a 
                    href="/analytics" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AnalyticsIcon size="sm" />
                    <span className="text-sm font-medium">Analytics</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Help Menu */}
          {onRestartTour && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onRestartTour}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Restart Tour
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/auth")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
