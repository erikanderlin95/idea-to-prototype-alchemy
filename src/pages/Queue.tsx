import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueueNotifications } from "@/hooks/useQueueNotifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { StaffNotifications } from "@/components/StaffNotifications";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Clock, Users, AlertCircle, CheckCircle2, LogOut, LogIn, Bell, BellOff, Star, AlertTriangle } from "lucide-react";

export default function Queue() {
  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get("clinic");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [clinic, setClinic] = useState<any>(null);
  const [queueData, setQueueData] = useState<any[]>([]);
  const [myQueueEntry, setMyQueueEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false);
  const [showPreConsultDialog, setShowPreConsultDialog] = useState(false);
  const [visitReason, setVisitReason] = useState("");
  const [visitType, setVisitType] = useState("General Consultation");
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [previousPosition, setPreviousPosition] = useState<number | null>(null);
  const [showQueueShiftAlert, setShowQueueShiftAlert] = useState(false);

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
    const unsubscribe = subscribeToQueue();
    
    // Auto-refresh indicator every 10 seconds
    const refreshInterval = setInterval(() => {
      setLastRefresh(Date.now());
    }, 10000);
    
    return () => {
      if (unsubscribe) unsubscribe();
      clearInterval(refreshInterval);
    };
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

      // Check if user is in queue (any active status including served for feedback)
      if (user) {
        const { data: userQueue } = await supabase
          .from("queue_entries")
          .select("*")
          .eq("clinic_id", clinicId)
          .eq("user_id", user.id)
          .in("status", ["waiting", "checked_in", "serving", "served"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        setMyQueueEntry(userQueue);
        
        // Detect queue position shift
        if (userQueue && userQueue.queue_number) {
          const currentPosition = queueEntries?.findIndex(q => q.id === userQueue.id) + 1 || 0;
          if (previousPosition !== null && currentPosition > 0 && currentPosition !== previousPosition && Math.abs(currentPosition - previousPosition) > 1) {
            setShowQueueShiftAlert(true);
            setTimeout(() => setShowQueueShiftAlert(false), 10000);
          }
          if (currentPosition > 0) {
            setPreviousPosition(currentPosition);
          }
        }
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
        (payload: any) => {
          console.log("Queue update:", payload);
          loadQueueData();
          
          // Check if this update affects current user
          if (payload.new && user && payload.new.user_id === user.id) {
            if (payload.new.status === "served") {
              toast.success(t("queue.thankYou"));
            } else if (payload.new.status === "serving") {
              toast.success(t("queue.beingServedNow"));
            }
          }
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
      // Get the highest queue number
      const { data: lastEntry } = await supabase
        .from("queue_entries")
        .select("queue_number")
        .eq("clinic_id", clinicId)
        .eq("status", "waiting")
        .order("queue_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextQueueNumber = lastEntry ? lastEntry.queue_number + 1 : 1;

      const { error } = await supabase.from("queue_entries").insert({
        clinic_id: clinicId,
        user_id: user.id,
        queue_number: nextQueueNumber,
        status: "waiting",
        estimated_wait_time: queueData.length * 15,
        visit_type: visitType,
      });

      if (error) throw error;
      
      toast.success(t("queue.joinQueue") + "!");
      toast.info(t("queue.smsConfirmation"));
      
      setShowPreConsultDialog(false);
      setShowDisclaimerDialog(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleJoinQueueClick = () => {
    setShowDisclaimerDialog(true);
  };

  const handleDisclaimerAgree = () => {
    setDisclaimerAgreed(true);
    setShowDisclaimerDialog(false);
    setShowPreConsultDialog(true);
  };

  const cancelQueue = async () => {
    if (!myQueueEntry) return;

    try {
      const { error } = await supabase
        .from("queue_entries")
        .delete()
        .eq("id", myQueueEntry.id);

      if (error) throw error;
      toast.success(t("queue.leaveQueue"));
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
      toast.success(t("queue.checkIn") + "!");
      loadQueueData(); // Reload to show updated status
    } catch (error: any) {
      toast.error(error.message || "Failed to check in");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>{t("queue.loading")}</p>
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
        {/* Staff Notifications */}
        <div className="mb-6">
          <StaffNotifications />
        </div>

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
                      {t("queue.notificationsOn")}
                    </>
                  ) : (
                    <>
                      <BellOff className="h-4 w-4 mr-2" />
                      {t("queue.enableAlerts")}
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
                  <p className="text-xs text-muted-foreground font-medium">{t("queue.inQueue")}</p>
                  <p className="text-2xl font-bold">{queueData.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{t("queue.estWait")}</p>
                  <p className="text-2xl font-bold">{queueData.length * 15} {t("queue.minutes")}</p>
                </div>
              </div>
            </div>
            
            {myQueueEntry && notificationPermission !== "granted" && (
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                      {t("queue.enableNotifications")}
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      {t("queue.notificationDesc")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {myQueueEntry?.status === "served" ? (
          <Card className="mb-6 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 animate-in slide-in-from-bottom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6 animate-pulse" />
                {t("queue.complete")}
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-500">
                {t("queue.thankYou")} {clinic?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-white dark:bg-background rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-center text-lg font-medium mb-4">{t("queue.rateVisit")}</p>
                <div className="flex gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 text-center animate-in fade-in">
                    {t("queue.feedbackThanks")}
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {t("queue.feedbackHelps")}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => navigate("/")} 
                  variant="outline"
                  size="lg"
                >
                  {t("queue.returnHome")}
                </Button>
                <Button 
                  onClick={() => navigate(`/clinic/${clinicId}`)} 
                  className="bg-gradient-to-r from-primary to-accent"
                  size="lg"
                >
                  {t("queue.bookAgain")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : myQueueEntry?.status === "serving" ? (
          <Card className="mb-6 border-accent bg-gradient-to-br from-accent/20 to-primary/10 animate-in slide-in-from-bottom">
            <CardHeader>
              <div className="relative">
                <CardTitle className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="h-6 w-6 animate-bounce" />
                  {t("queue.beingServedNow")}
                </CardTitle>
                <div className="absolute -top-2 right-0">
                  <Badge variant="default" className="animate-pulse">{t("queue.status")}</Badge>
                </div>
              </div>
              <CardDescription>
                {t("queue.proceedToConsultation")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-6 bg-white dark:bg-background rounded-xl border-2 border-accent relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 animate-pulse" />
                  <div className="text-center relative z-10">
                    <p className="text-6xl font-bold text-accent mb-2">#{myQueueEntry.queue_number}</p>
                    <p className="text-lg font-medium">{t("queue.yourQueueNumber")}</p>
                  </div>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-center">
                    <strong>{t("queue.visitType")}:</strong> {myQueueEntry.visit_type || t("queue.generalConsultation")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : myQueueEntry?.status === "checked_in" ? (
          <Card className="mb-6 border-primary bg-gradient-to-br from-primary/10 to-accent/5 animate-in slide-in-from-bottom">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="relative">
                      {t("queue.checkedIn")}
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    </span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {clinic?.name}
                  </CardDescription>
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("queue.updated")} {Math.floor((Date.now() - lastRefresh) / 1000)}s {t("queue.ago")}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">{t("queue.queueNumber")}</p>
                    <p className="text-4xl font-bold text-primary animate-in zoom-in">{myQueueEntry.queue_number}</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">{t("queue.status")}</p>
                    <Badge variant="default" className="text-base px-4 py-2 animate-pulse">
                      {t("queue.waiting")}
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">{t("queue.estWaitTime")}</p>
                    <p className="text-2xl font-medium animate-in zoom-in">
                      {myPosition ? (myPosition - 1) * 15 : 0}m
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("queue.visitType")}</span>
                    <span className="font-medium">{myQueueEntry.visit_type || t("queue.generalConsultation")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">{t("queue.peopleAhead")}</span>
                    <span className="font-medium">{myPosition ? myPosition - 1 : 0}</span>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <p className="text-sm text-center font-medium">
                    🔔 {t("queue.notifiedWhenTurn")}
                  </p>
                </div>

                <Button 
                  onClick={cancelQueue} 
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  size="lg"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {t("queue.leaveQueue")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : myQueueEntry ? (
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
                    Leave Queue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{t("queue.joinQueue")}</CardTitle>
              <CardDescription>
                {t("queue.notifiedWhenTurn")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleJoinQueueClick} className="w-full" size="lg">
                {t("queue.joinQueue")}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Queue Shift Alert */}
        {showQueueShiftAlert && myQueueEntry && (
          <Alert className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              {t("queue.queueShiftNotice")}
            </AlertDescription>
          </Alert>
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

      {/* Disclaimer Dialog */}
      <Dialog open={showDisclaimerDialog} onOpenChange={setShowDisclaimerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {t("queue.disclaimer.title")}
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  {t("queue.disclaimer.riskAssessment")}
                </AlertDescription>
              </Alert>
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  {t("queue.disclaimer.queueShift")}
                </AlertDescription>
              </Alert>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleDisclaimerAgree} className="w-full" size="lg">
            {t("queue.disclaimer.understand")}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Pre-Consult Form Dialog */}
      <Dialog open={showPreConsultDialog} onOpenChange={setShowPreConsultDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("queue.preConsult.title")}</DialogTitle>
            <DialogDescription>
              {t("queue.preConsult.visitReason")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="visitType">{t("queue.preConsult.visitType")}</Label>
              <Select value={visitType} onValueChange={setVisitType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Consultation">General Consultation</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Acute Condition">Acute Condition</SelectItem>
                  <SelectItem value="Chronic Condition">Chronic Condition</SelectItem>
                  <SelectItem value="Health Screening">Health Screening</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitReason">{t("queue.preConsult.visitReason")}</Label>
              <Textarea
                id="visitReason"
                placeholder={t("queue.preConsult.visitReasonPlaceholder")}
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            <Button onClick={joinQueue} className="w-full" size="lg">
              {t("queue.preConsult.continue")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
