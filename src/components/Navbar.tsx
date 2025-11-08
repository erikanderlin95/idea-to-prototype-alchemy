import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, ClipboardList } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isStaff, setIsStaff] = useState(false);

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
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
            <Heart className="h-6 w-6 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform" fill="currentColor" />
            {/* Queue Indicator Badge */}
            <div className="absolute -top-1.5 -right-1.5 z-20">
              <div className="relative flex items-center justify-center h-5 w-5 rounded-full bg-accent shadow-lg animate-pulse">
                <span className="text-[10px] font-bold text-accent-foreground">Q</span>
                <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
              </div>
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-poppins font-bold tracking-tight leading-none">
              Clynic<span className="text-primary">Q</span>
            </span>
            <span className="text-[9px] font-semibold text-muted-foreground tracking-widest uppercase">Healthcare Simplified</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Find Clinics
          </a>
          {user && (
            <>
              {isStaff && (
                <a href="/staff" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  <ClipboardList className="h-4 w-4" />
                  Staff Dashboard
                </a>
              )}
              <a href="/appointments" className="text-sm font-medium hover:text-primary transition-colors">
                My Appointments
              </a>
              <a href="/chatbot" className="text-sm font-medium hover:text-primary transition-colors">
                Health Assistant
              </a>
              <a href="/analytics" className="text-sm font-medium hover:text-primary transition-colors">
                Analytics
              </a>
              <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </a>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/chatbot")}
                className="md:hidden"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </>
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
