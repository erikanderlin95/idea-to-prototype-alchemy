import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { TrendingUp, Users, Clock, Calendar, Activity, BarChart3 } from "lucide-react";

export default function Analytics() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<any>(null);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [bookingAnalytics, setBookingAnalytics] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view analytics");
      navigate("/auth");
      return;
    }

    checkAccess();
  }, [user]);

  const checkAccess = async () => {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("*, clinics(*)")
        .eq("user_id", user?.id)
        .in("role", ["admin", "clinic_staff"])
        .single();

      if (roleError || !roleData) {
        toast.error("Access denied. Only clinic staff can view analytics.");
        navigate("/");
        return;
      }

      setUserRole(roleData);
      await loadAnalytics(roleData.clinic_id);
    } catch (error: any) {
      toast.error(error.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async (clinicId: string) => {
    try {
      // Load queue statistics
      const { data: statsData } = await supabase
        .from("queue_statistics")
        .select("*")
        .eq("clinic_id", clinicId)
        .order("date", { ascending: false })
        .limit(30);

      setStatistics(statsData || []);

      // Load booking analytics
      const { data: bookingData } = await supabase
        .from("booking_analytics")
        .select("*")
        .eq("clinic_id", clinicId)
        .order("created_at", { ascending: false })
        .limit(100);

      setBookingAnalytics(bookingData || []);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading analytics...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate summary metrics
  const totalPatients = statistics.reduce((sum, stat) => sum + (stat.total_patients || 0), 0);
  const avgWaitTime = statistics.length > 0
    ? Math.round(statistics.reduce((sum, stat) => sum + (stat.average_wait_time || 0), 0) / statistics.length)
    : 0;
  const totalAppointments = statistics.reduce((sum, stat) => sum + (stat.total_appointments || 0), 0);
  const totalNoShows = statistics.reduce((sum, stat) => sum + (stat.no_show_count || 0), 0);
  const noShowRate = totalAppointments > 0 ? ((totalNoShows / totalAppointments) * 100).toFixed(1) : 0;

  // Calculate booking window insights
  const avgBookingWindow = bookingAnalytics.length > 0
    ? Math.round(bookingAnalytics.reduce((sum, b) => sum + (b.booking_window_days || 0), 0) / bookingAnalytics.length)
    : 0;
  const returnPatientRate = bookingAnalytics.length > 0
    ? ((bookingAnalytics.filter(b => b.is_return_patient).length / bookingAnalytics.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <Badge variant="secondary">Phase 4 - Data Insights</Badge>
          </div>
          <p className="text-muted-foreground">
            {userRole?.clinics?.name} - Last 30 days overview
          </p>
        </div>

        {/* Operational Trends */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Operational Trends
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalPatients}</div>
                <p className="text-xs text-muted-foreground mt-1">Queue entries</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Avg Wait Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{avgWaitTime} min</div>
                <p className="text-xs text-muted-foreground mt-1">Per patient</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalAppointments}</div>
                <p className="text-xs text-muted-foreground mt-1">Booked</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  No-Show Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{noShowRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">{totalNoShows} no-shows</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient Behavior Signals */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Patient Behavior Signals
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking Patterns</CardTitle>
                <CardDescription>How far in advance do patients book?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Booking Window</p>
                    <p className="text-2xl font-bold">{avgBookingWindow} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Return Patient Rate</p>
                    <p className="text-2xl font-bold">{returnPatientRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Activity</CardTitle>
                <CardDescription>Most common booking patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statistics.slice(0, 5).map((stat) => (
                    <div key={stat.id} className="flex justify-between items-center">
                      <span className="text-sm">
                        {new Date(stat.date).toLocaleDateString('en-SG', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <Badge variant="secondary">
                        {stat.total_patients} patients
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Benchmarking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Benchmarking
            </CardTitle>
            <CardDescription>
              Compare your clinic's performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Queue Efficiency</p>
                  <p className="text-sm text-muted-foreground">
                    Average wait time vs industry standard
                  </p>
                </div>
                <Badge variant={avgWaitTime <= 20 ? "default" : "destructive"}>
                  {avgWaitTime <= 20 ? "Excellent" : "Needs Improvement"}
                </Badge>
              </div>

              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Patient Retention</p>
                  <p className="text-sm text-muted-foreground">
                    Return patient rate vs industry average
                  </p>
                </div>
                <Badge variant={Number(returnPatientRate) >= 40 ? "default" : "secondary"}>
                  {Number(returnPatientRate) >= 40 ? "Above Average" : "Average"}
                </Badge>
              </div>

              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Attendance Rate</p>
                  <p className="text-sm text-muted-foreground">
                    No-show rate vs industry benchmark
                  </p>
                </div>
                <Badge variant={Number(noShowRate) <= 10 ? "default" : "destructive"}>
                  {Number(noShowRate) <= 10 ? "Excellent" : "Needs Attention"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
