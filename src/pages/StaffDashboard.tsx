import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  Bell, 
  TrendingUp,
  Activity,
  PhoneCall,
  MessageSquare,
  XCircle,
  Trash2
} from "lucide-react";

interface QueueEntry {
  id: string;
  queue_number: number;
  status: string;
  estimated_wait_time: number;
  created_at: string;
  user_id: string;
  visit_type?: string;
  patient_name?: string;
}

interface QueueStats {
  total: number;
  waiting: number;
  served: number;
  avgWaitTime: number;
}

export default function StaffDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [staffRole, setStaffRole] = useState<any>(null);
  const [clinic, setClinic] = useState<any>(null);
  const [queueData, setQueueData] = useState<QueueEntry[]>([]);
  const [stats, setStats] = useState<QueueStats>({ total: 0, waiting: 0, served: 0, avgWaitTime: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<QueueEntry | null>(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [queueOpen, setQueueOpen] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access staff dashboard");
      navigate("/auth");
      return;
    }

    checkStaffRole();
  }, [user]);

  const checkStaffRole = async () => {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("*, clinics(*)")
        .eq("user_id", user!.id)
        .eq("role", "clinic_staff")
        .maybeSingle();

      if (roleError) throw roleError;

      if (!roleData) {
        toast.error("Access denied. Staff privileges required.");
        navigate("/");
        return;
      }

      setStaffRole(roleData);
      setClinic(roleData.clinics);
      loadQueueData(roleData.clinic_id);
      subscribeToQueue(roleData.clinic_id);
    } catch (error: any) {
      toast.error(error.message);
      navigate("/");
    }
  };

  const loadQueueData = async (clinicId: string) => {
    try {
      // Load queue entries
      const { data: queueEntries, error: queueError } = await supabase
        .from("queue_entries")
        .select("*")
        .eq("clinic_id", clinicId)
        .eq("status", "waiting")
        .order("queue_number", { ascending: true });

      if (queueError) throw queueError;

      // Fetch patient names separately
      const enrichedEntries = await Promise.all(
        (queueEntries || []).map(async (entry) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", entry.user_id)
            .maybeSingle();
          
          return {
            ...entry,
            patient_name: profile?.full_name || "Patient"
          };
        })
      );

      setQueueData(enrichedEntries);

      // Calculate statistics
      const { data: todayStats } = await supabase
        .from("queue_statistics")
        .select("*")
        .eq("clinic_id", clinicId)
        .eq("date", new Date().toISOString().split("T")[0])
        .maybeSingle();

      if (todayStats) {
        setStats({
          total: todayStats.total_patients || 0,
          waiting: queueEntries?.length || 0,
          served: (todayStats.total_patients || 0) - (queueEntries?.length || 0),
          avgWaitTime: todayStats.average_wait_time || 0
        });
      } else {
        setStats({
          total: queueEntries?.length || 0,
          waiting: queueEntries?.length || 0,
          served: 0,
          avgWaitTime: 0
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToQueue = (clinicId: string) => {
    const channel = supabase
      .channel(`staff-queue-${clinicId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "queue_entries",
          filter: `clinic_id=eq.${clinicId}`,
        },
        () => {
          loadQueueData(clinicId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const callNextPatient = async () => {
    if (queueData.length === 0) {
      toast.error("No patients in queue");
      return;
    }

    const nextPatient = queueData[0];

    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "called" })
        .eq("id", nextPatient.id);

      if (error) throw error;

      // Send notification to patient
      await supabase.from("queue_notifications").insert({
        queue_entry_id: nextPatient.id,
        clinic_id: clinic.id,
        user_id: nextPatient.user_id,
        message: `Queue #${nextPatient.queue_number}: Please proceed to the counter. It's your turn!`,
        sent_by: user!.id
      });

      toast.success(`Called patient #${nextPatient.queue_number}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to call patient");
    }
  };

  const markAsServed = async (entryId: string, queueNumber: number) => {
    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "served" })
        .eq("id", entryId);

      if (error) throw error;
      toast.success(`Patient #${queueNumber} marked as served`);
    } catch (error: any) {
      toast.error(error.message || "Failed to mark as served");
    }
  };

  const markAsServing = async (entryId: string, queueNumber: number) => {
    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "serving" })
        .eq("id", entryId);

      if (error) throw error;
      toast.success(`Now serving patient #${queueNumber}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const markAsCancelled = async (entryId: string, queueNumber: number) => {
    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "cancelled" })
        .eq("id", entryId);

      if (error) throw error;
      toast.success(`Patient #${queueNumber} marked as cancelled`);
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel");
    }
  };

  const markAsNoShow = async (entryId: string, queueNumber: number) => {
    try {
      const { error } = await supabase
        .from("queue_entries")
        .delete()
        .eq("id", entryId);

      if (error) throw error;
      toast.success(`Patient #${queueNumber} marked as no-show and removed`);
    } catch (error: any) {
      toast.error(error.message || "Failed to mark as no-show");
    }
  };

  const moveQueuePosition = async (entryId: string, direction: "up" | "down") => {
    const currentIndex = queueData.findIndex(e => e.id === entryId);
    if (currentIndex === -1) return;
    
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= queueData.length) return;

    const currentEntry = queueData[currentIndex];
    const targetEntry = queueData[targetIndex];

    try {
      // Swap queue numbers
      await supabase.from("queue_entries").update({ 
        queue_number: targetEntry.queue_number 
      }).eq("id", currentEntry.id);

      await supabase.from("queue_entries").update({ 
        queue_number: currentEntry.queue_number 
      }).eq("id", targetEntry.id);

      toast.success("Queue position updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to reorder queue");
    }
  };

  const sendCustomNotification = async () => {
    if (!selectedPatient || !notificationMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      const { error } = await supabase.from("queue_notifications").insert({
        queue_entry_id: selectedPatient.id,
        clinic_id: clinic.id,
        user_id: selectedPatient.user_id,
        message: notificationMessage,
        sent_by: user!.id
      });

      if (error) throw error;

      toast.success("Notification sent!");
      setNotificationMessage("");
      setSelectedPatient(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to send notification");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>{t("staff.loading")}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t("staff.title")}</h1>
              <p className="text-muted-foreground">{clinic?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{t("staff.queueStatus")}</span>
              <Button
                variant={queueOpen ? "default" : "outline"}
                onClick={() => {
                  setQueueOpen(!queueOpen);
                  toast.success(`${t("staff." + (queueOpen ? "closed" : "open"))} ${t("staff.queueStatus")}`);
                }}
                className="gap-2"
              >
                {queueOpen ? t("staff.open") : t("staff.closed")}
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                {t("staff.totalToday")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                {t("staff.waiting")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{stats.waiting}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                {t("staff.served")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.served}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                {t("staff.avgWait")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.avgWaitTime}m</p>
            </CardContent>
          </Card>
        </div>

        {/* Queue Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Queue */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("staff.currentQueue")}</CardTitle>
                  <CardDescription>{t("staff.managePatients")}</CardDescription>
                </div>
                <Button 
                  onClick={callNextPatient}
                  disabled={queueData.length === 0}
                  size="lg"
                  className="bg-accent hover:bg-accent/90"
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  {t("staff.callNextPatient")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {queueData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">{t("staff.noPatients")}</p>
                  <p className="text-sm">{t("staff.queueEmpty")}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {queueData.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        index === 0
                          ? "bg-primary/10 border-primary/30 shadow-md"
                          : "bg-muted/50 border-border"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Badge 
                          variant={index === 0 ? "default" : "secondary"}
                          className="text-lg px-4 py-2"
                        >
                          #{entry.queue_number}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-semibold text-base">
                            {entry.patient_name || t("staff.patient")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {entry.visit_type || t("queue.generalConsultation")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("staff.waitingTime")} {Math.floor((Date.now() - new Date(entry.created_at).getTime()) / 60000)} {t("staff.minutes2")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <Button
                            onClick={() => moveQueuePosition(entry.id, "up")}
                            variant="ghost"
                            size="sm"
                            title="Move up"
                          >
                            ↑
                          </Button>
                        )}
                        {index < queueData.length - 1 && (
                          <Button
                            onClick={() => moveQueuePosition(entry.id, "down")}
                            variant="ghost"
                            size="sm"
                            title="Move down"
                          >
                            ↓
                          </Button>
                        )}

                        {index === 0 && entry.status === "waiting" && (
                          <Button
                            onClick={() => markAsServing(entry.id, entry.queue_number)}
                            variant="default"
                            size="sm"
                            className="bg-accent hover:bg-accent/90"
                          >
                            <PhoneCall className="h-4 w-4 mr-2" />
                            {t("staff.callPatient")}
                          </Button>
                        )}

                        {(entry.status === "checked_in" || entry.status === "serving") && (
                          <Button
                            onClick={() => markAsServed(entry.id, entry.queue_number)}
                            variant="outline"
                            size="sm"
                            className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            {t("staff.markServed")}
                          </Button>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPatient(entry)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Notify
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Notification</DialogTitle>
                              <DialogDescription>
                                Send a custom message to Queue #{entry.queue_number}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Enter your message..."
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                                rows={4}
                              />
                              <Button 
                                onClick={sendCustomNotification}
                                className="w-full"
                              >
                                <Bell className="mr-2 h-4 w-4" />
                                Send Notification
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => markAsCancelled(entry.id, entry.queue_number)}
                          variant="outline"
                          size="sm"
                          className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>

                        <Button
                          onClick={() => markAsNoShow(entry.id, entry.queue_number)}
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Queue Insights
              </CardTitle>
              <CardDescription>Real-time metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Wait</span>
                  <span className="font-semibold">{queueData.length * 15} min</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min((queueData.length / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Next Available</span>
                  <Badge variant="secondary">
                    {queueData.length === 0 ? "Now" : `~${queueData.length * 15}m`}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Peak Hour</span>
                  <Badge variant="outline">2:00 PM - 4:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Efficiency</span>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    {stats.total > 0 ? Math.round((stats.served / stats.total) * 100) : 0}%
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/analytics")}>
                  <Activity className="mr-2 h-4 w-4" />
                  View Full Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
