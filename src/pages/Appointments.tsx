import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

const Appointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, clinics(name, address, type)")
        .eq("user_id", user!.id)
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(t("appointments.failedToLoad"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "pending": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">{t("appointments.loading")}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{t("appointments.title")}</h1>
            <Button onClick={() => navigate("/")}>{t("appointments.bookNew")}</Button>
          </div>

          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{appointment.clinics.name}</h3>
                        <Badge variant="secondary">{appointment.clinics.type}</Badge>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(appointment.appointment_date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.appointment_time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.clinics.address}</span>
                        </div>
                      </div>

                      {appointment.reason && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">{t("appointments.reason")}:</span> {appointment.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">{t("appointments.noAppointments")}</p>
              <Button onClick={() => navigate("/")}>{t("appointments.browseClinics")}</Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Appointments;
