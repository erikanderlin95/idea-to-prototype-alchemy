import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MyClynicQStaffPanel } from "@/components/MyClynicQStaffPanel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Users, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<any>(null);
  const [clinic, setClinic] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [queueEntries, setQueueEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access the dashboard");
      navigate("/");
      return;
    }
    checkAccess();
  }, [user]);

  const checkAccess = async () => {
    try {
      // Check if user has clinic_staff or admin role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("*, clinics(*)")
        .eq("user_id", user!.id)
        .in("role", ["admin", "clinic_staff"])
        .single();

      if (!roleData) {
        toast.error("You don't have access to the dashboard");
        navigate("/");
        return;
      }

      setUserRole(roleData);
      if (roleData.clinic_id) {
        setClinic(roleData.clinics);
        await fetchDashboardData(roleData.clinic_id);
      }
    } catch (error) {
      console.error("Error checking access:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async (clinicId: string) => {
    try {
      const [appointmentsData, queueData] = await Promise.all([
        supabase
          .from("appointments")
          .select("*, profiles(full_name)")
          .eq("clinic_id", clinicId)
          .gte("appointment_date", format(new Date(), "yyyy-MM-dd"))
          .order("appointment_date")
          .order("appointment_time"),
        supabase
          .from("queue_entries")
          .select("*, profiles(full_name)")
          .eq("clinic_id", clinicId)
          .eq("status", "waiting")
          .order("queue_number"),
      ]);

      if (appointmentsData.data) setAppointments(appointmentsData.data);
      if (queueData.data) setQueueEntries(queueData.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Appointment ${status}`);
      if (clinic) fetchDashboardData(clinic.id);
    } catch (error: any) {
      console.error("Error updating appointment:", error);
      toast.error(error.message || "Failed to update appointment");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!clinic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 md:px-6 py-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No clinic assigned to your account</p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const todayAppointments = appointments.filter(
    (apt) => apt.appointment_date === format(new Date(), "yyyy-MM-dd")
  );
  const pendingAppointments = appointments.filter((apt) => apt.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Clinic Dashboard</h1>
            <p className="text-muted-foreground mt-1">{clinic.name}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayAppointments.length}</p>
                  <p className="text-xs text-muted-foreground">Today's Appointments</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{queueEntries.length}</p>
                  <p className="text-xs text-muted-foreground">In Queue</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingAppointments.length}</p>
                  <p className="text-xs text-muted-foreground">Pending Approval</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                  <p className="text-xs text-muted-foreground">Total Upcoming</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="appointments" className="w-full">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="queue">Queue</TabsTrigger>
              <TabsTrigger value="plugins">Plugins</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <Card key={appointment.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{appointment.profiles?.full_name || "Patient"}</h3>
                          <Badge variant={
                            appointment.status === "confirmed" ? "default" :
                            appointment.status === "pending" ? "secondary" :
                            appointment.status === "completed" ? "outline" : "destructive"
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{format(new Date(appointment.appointment_date), "MMM dd, yyyy")}</span>
                          <span>{appointment.appointment_time}</span>
                        </div>
                        {appointment.reason && (
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                        )}
                      </div>
                      {appointment.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center text-muted-foreground">
                  No upcoming appointments
                </Card>
              )}
            </TabsContent>

            <TabsContent value="queue" className="space-y-4">
              {queueEntries.length > 0 ? (
                queueEntries.map((entry) => (
                  <Card key={entry.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{entry.queue_number}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{entry.profiles?.full_name || "Walk-in Patient"}</p>
                          <p className="text-sm text-muted-foreground">
                            Est. wait: {entry.estimated_wait_time || 15} min
                          </p>
                        </div>
                      </div>
                      <Badge>{entry.status}</Badge>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center text-muted-foreground">
                  No one in queue
                </Card>
              )}
            </TabsContent>

            <TabsContent value="plugins" className="space-y-4">
              <MyClynicQStaffPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
