import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueueNotifications } from "@/hooks/useQueueNotifications";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Clock, Users, AlertCircle, CheckCircle2, LogOut, LogIn, Bell, BellOff } from "lucide-react";

export default function Queue() {
  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get("clinic");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [clinic, setClinic] = useState<any>(null);
  const [queueData, setQueueData] = useState<any[]>([]);
  const [myQueueEntry, setMyQueueEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize queue notifications
  const { notificationPermission, requestNotificationPermission } = useQueueNotifications({
    clinicId,
    userId: user?.id || null,
    clinicName: clinic?.name,
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!clinicId) {
      toast.error("No clinic selected");
      navigate("/");
      return;
    }

    loadQueueData();
    subscribeToQueue();
  }, [clinicId, user]);

  const loadQueueData = async () => {
    try {
      // Load clinic details
      const { data: clinicData, error: clinicError } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", clinicId)
        .single();

      if (clinicError) throw clinicError;
      setClinic(clinicData);

      // Load queue entries
      const { data: queueEntries, error: queueError } = await supabase
        .from("queue_entries")
        .select("*")
        .eq("clinic_id", clinicId)
        .eq("status", "waiting")
        .order("queue_number", { ascending: true });

      if (queueError) throw queueError;
      setQueueData(queueEntries || []);

      // Check if user is in queue
      if (user) {
        const { data: userQueue } = await supabase
          .from("queue_entries")
          .select("*")
          .eq("clinic_id", clinicId)
          .eq("user_id", user.id)
          .eq("status", "waiting")
          .maybeSingle();

        setMyQueueEntry(userQueue);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToQueue = () => {
    const channel = supabase
      .channel(`queue-${clinicId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "queue_entries",
          filter: `clinic_id=eq.${clinicId}`,
        },
        () => {
          loadQueueData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const joinQueue = async () => {
    if (!user || !clinicId) return;

    try {
      const nextQueueNumber = queueData.length > 0 
        ? Math.max(...queueData.map(q => q.queue_number)) + 1 
        : 1;

      const { error } = await supabase.from("queue_entries").insert({
        clinic_id: clinicId,
        user_id: user.id,
        queue_number: nextQueueNumber,
        status: "waiting",
        estimated_wait_time: queueData.length * 15, // 15 min per person estimate
      });

      if (error) throw error;
      toast.success("Successfully joined the queue!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const cancelQueue = async () => {
    if (!myQueueEntry) return;

    try {
      const { error } = await supabase
        .from("queue_entries")
        .delete()
        .eq("id", myQueueEntry.id);

      if (error) throw error;
      toast.success("You've left the queue");
      setMyQueueEntry(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel queue");
    }
  };

  const checkIn = async () => {
    if (!myQueueEntry) return;

    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "checked_in" })
        .eq("id", myQueueEntry.id);

      if (error) throw error;
      toast.success("Checked in successfully! Please proceed to the counter");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to check in");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading queue information...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const myPosition = myQueueEntry 
    ? queueData.findIndex(q => q.id === myQueueEntry.id) + 1 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6 bg-gradient-to-r from-card to-primary/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{clinic?.name}</CardTitle>
                <CardDescription className="mt-1">{clinic?.address}</CardDescription>
              </div>
              {myQueueEntry && (
                <Button
                  variant={notificationPermission === "granted" ? "outline" : "default"}
                  size="sm"
                  onClick={requestNotificationPermission}
                  className={notificationPermission === "granted" ? "border-accent text-accent" : ""}
                >
                  {notificationPermission === "granted" ? (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications On
                    </>
                  ) : (
                    <>
                      <BellOff className="h-4 w-4 mr-2" />
                      Enable Alerts
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">In Queue</p>
                  <p className="text-2xl font-bold">{queueData.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Est. Wait</p>
                  <p className="text-2xl font-bold">{queueData.length * 15} min</p>
                </div>
              </div>
            </div>
            
            {myQueueEntry && notificationPermission !== "granted" && (
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                      Enable notifications for queue updates
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Get notified when it's almost your turn so you don't miss your spot
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {myQueueEntry ? (
          <Card className="mb-6 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                You're in Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Queue Number</p>
                    <p className="text-4xl font-bold text-primary">{myQueueEntry.queue_number}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Position</p>
                    <p className="text-3xl font-semibold">
                      {myPosition}/{queueData.length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Est. Wait</p>
                    <p className="text-2xl font-medium">
                      {myPosition ? (myPosition - 1) * 15 : 0}m
                    </p>
                  </div>
                </div>

                {myPosition === 1 && (
                  <Badge variant="default" className="w-full justify-center py-3 text-sm bg-accent">
                    🎉 You're next! Please check in when you arrive
                  </Badge>
                )}

                {myPosition && myPosition > 1 && myPosition <= 3 && (
                  <Badge variant="secondary" className="w-full justify-center py-3 text-sm">
                    ⏰ Almost your turn! Get ready to head to the clinic
                  </Badge>
                )}

                {myPosition && myPosition > 3 && (
                  <Badge variant="outline" className="w-full justify-center py-3 text-sm">
                    📱 We'll notify you when it's almost your turn
                  </Badge>
                )}

                <div className="flex gap-3 pt-2">
                  <Button 
                    onClick={checkIn} 
                    className="flex-1 bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Check In at Clinic
                  </Button>
                  <Button 
                    onClick={cancelQueue} 
                    variant="outline"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    size="lg"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Cancel Queue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Join the Queue</CardTitle>
              <CardDescription>
                Get in line and we'll notify you when it's your turn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={joinQueue} className="w-full" size="lg">
                Join Queue Now
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Queue Status</CardTitle>
            <CardDescription>Real-time queue updates</CardDescription>
          </CardHeader>
          <CardContent>
            {queueData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No one in queue right now</p>
                <p className="text-sm">Be the first to join!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {queueData.slice(0, 10).map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.id === myQueueEntry?.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        #{entry.queue_number}
                      </Badge>
                      {entry.id === myQueueEntry?.id && (
                        <span className="text-sm font-medium text-primary">You</span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {index === 0 ? "Now serving" : `~${index * 15} min wait`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
