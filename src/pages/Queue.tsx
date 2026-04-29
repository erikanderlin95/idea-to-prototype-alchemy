import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueueNotifications } from "@/hooks/useQueueNotifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { StaffNotifications } from "@/components/StaffNotifications";
import { LeaveQueueDialog } from "@/components/LeaveQueueDialog";
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
import { format } from "date-fns";

export default function Queue() {
  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get("clinic");
  const mobileNumberFromUrl = searchParams.get("mobile");
  const storedMobileNumber = clinicId ? localStorage.getItem(`queue_mobile_${clinicId}`) : null;
  const mobileNumber = mobileNumberFromUrl || storedMobileNumber;
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
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!myQueueEntry || myQueueEntry.status !== "waiting") return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [myQueueEntry?.id, myQueueEntry?.status]);

  // Initialize queue notifications
  const { notificationPermission, requestNotificationPermission } = useQueueNotifications({
    clinicId,
    userId: user?.id || null,
    clinicName: clinic?.name,
  });

  useEffect(() => {
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
  }, [clinicId, user, mobileNumber]);

  // Auto-open disclaimer when navigating from clinic card with join=1
  useEffect(() => {
    const wantsToJoin = searchParams.get("join") === "1";
    if (wantsToJoin && !loading) {
      if (!myQueueEntry) {
        setShowDisclaimerDialog(true);
      }
      const params = new URLSearchParams(searchParams);
      params.delete("join");
      navigate(`/queue?clinic=${clinicId}&${params.toString()}`.replace(/&$/, ""), { replace: true });
    }
  }, [searchParams, myQueueEntry, loading]);

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

      // Load public queue list via edge function (no personal data exposed)
      const { data: queueListResponse, error: queueListError } = await supabase.functions.invoke(
        "queue-lookup",
        {
          body: {
            action: "get_public_queue_list",
            clinic_id: clinicId,
            mobile_number: mobileNumber || "anonymous", // Required param but not used for this action
          },
        }
      );

      if (queueListError) throw queueListError;
      setQueueData(queueListResponse?.queue || []);

      // Check if user is in queue (any active status including served for feedback)
      let userQueue = null;
      let position = null;
      
      if (mobileNumber) {
        // Use edge function for mobile lookup (secure - bypasses RLS)
        const { data: lookupResponse, error: lookupError } = await supabase.functions.invoke(
          "queue-lookup",
          {
            body: {
              action: "get_queue_position",
              clinic_id: clinicId,
              mobile_number: mobileNumber,
            },
          }
        );
        
        if (lookupError) {
          console.error("Queue lookup error:", lookupError);
        } else {
          userQueue = lookupResponse?.entry || null;
          position = lookupResponse?.position || null;
        }
      } else if (user) {
        // For authenticated users, query by user_id (allowed by RLS)
        const { data } = await supabase
          .from("queue_entries")
          .select("*")
          .eq("clinic_id", clinicId)
          .eq("user_id", user.id)
          .in("status", ["waiting", "checked_in", "serving", "served"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        userQueue = data;
      }

      setMyQueueEntry(userQueue);
      
      // Detect queue position shift
      if (userQueue && userQueue.queue_number) {
        const currentPosition = position || (queueListResponse?.queue?.findIndex((q: any) => q.id === userQueue.id) + 1) || 0;
        if (previousPosition !== null && currentPosition > 0 && currentPosition !== previousPosition && Math.abs(currentPosition - previousPosition) > 1) {
          setShowQueueShiftAlert(true);
          setTimeout(() => setShowQueueShiftAlert(false), 10000);
        }
        if (currentPosition > 0) {
          setPreviousPosition(currentPosition);
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
    if (!clinicId) return;

    // We must be able to identify you later to show your position + check-in.
    if (!user && !mobileNumber) {
      toast.error("Please sign in or provide a mobile number to join the queue.");
      return;
    }

    try {
      // Query current waiting queue entries to get accurate count
      const { data: currentQueue, error: queueError } = await supabase
        .from("queue_entries")
        .select("*")
        .eq("clinic_id", clinicId)
        .eq("status", "waiting")
        .order("queue_number", { ascending: true });

      if (queueError) throw queueError;

      // Calculate next queue number from current queue length
      const nextQueueNumber = (currentQueue?.length || 0) + 1;
      const estimatedWait = (nextQueueNumber - 1) * 15;

      const { data: createdEntry, error } = await supabase
        .from("queue_entries")
        .insert({
          clinic_id: clinicId,
          user_id: user?.id || null,
          mobile_number: mobileNumber || null,
          queue_number: nextQueueNumber,
          status: "waiting",
          estimated_wait_time: estimatedWait,
          visit_type: visitType,
        })
        .select()
        .single();

      if (error) throw error;

      if (mobileNumber) {
        localStorage.setItem(`queue_mobile_${clinicId}`, mobileNumber);
      }

      // Update UI immediately (don’t rely on realtime)
      if (createdEntry) {
        setMyQueueEntry(createdEntry);
        setQueueData([...(currentQueue || []), createdEntry].sort((a: any, b: any) => a.queue_number - b.queue_number));
      }

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
      // Use edge function for anonymous users (bypasses RLS)
      if (mobileNumber) {
        const { data, error } = await supabase.functions.invoke("queue-lookup", {
          body: {
            action: "cancel_queue",
            clinic_id: clinicId,
            mobile_number: mobileNumber,
          },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);
      } else {
        // Fallback to direct delete for authenticated users
        const { error } = await supabase
          .from("queue_entries")
          .delete()
          .eq("id", myQueueEntry.id);

        if (error) throw error;
      }

      // Clear stored mobile number
      if (clinicId) {
        localStorage.removeItem(`queue_mobile_${clinicId}`);
      }

      toast.success(t("queue.leaveQueue"));
      setMyQueueEntry(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel queue");
    }
  };

  const checkIn = async () => {
    if (!myQueueEntry) return;

    setCheckInLoading(true);
    try {
      // Use edge function for anonymous users (bypasses RLS)
      if (mobileNumber) {
        const { data, error } = await supabase.functions.invoke("queue-lookup", {
          body: {
            action: "check_in",
            clinic_id: clinicId,
            mobile_number: mobileNumber,
          },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);
      } else {
        // Fallback to direct update for authenticated users
        const { error } = await supabase
          .from("queue_entries")
          .update({ status: "checked_in" })
          .eq("id", myQueueEntry.id);

        if (error) throw error;
      }

      // Update local state immediately
      setMyQueueEntry({ ...myQueueEntry, status: "checked_in" });
      
      // Clear stored mobile number after check-in
      if (clinicId) {
        localStorage.removeItem(`queue_mobile_${clinicId}`);
      }

      toast.success("✓ Checked In Successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to check in");
    } finally {
      setCheckInLoading(false);
    }
  };

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

  const myPosition = myQueueEntry ? queueData.findIndex((q) => q.id === myQueueEntry.id) + 1 : null;
  const estimatedWaitMinutes = myQueueEntry
    ? myPosition
      ? Math.max(0, (myPosition - 1) * 15)
      : myQueueEntry.estimated_wait_time ?? 0
    : 0;
  const createdAtMs = myQueueEntry?.created_at ? new Date(myQueueEntry.created_at).getTime() : Date.now();
  const waitTargetMs = createdAtMs + estimatedWaitMinutes * 60_000;
  const waitRemainingMs = myQueueEntry ? Math.max(0, waitTargetMs - now) : 0;
  const waitCountdown = formatCountdown(waitRemainingMs);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Staff Notifications */}
        <div className="mb-6">
          <StaffNotifications />
        </div>

        <Card className="mb-6 bg-gradient-to-r from-card to-primary/5">
          <CardHeader className="px-4 sm:px-6 pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl">{clinic?.name}</CardTitle>
                <CardDescription className="mt-1 text-sm">{clinic?.address}</CardDescription>
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
          <CardContent className="px-4 sm:px-6">
            
            {myQueueEntry && notificationPermission !== "granted" && (
              <>
                <div className="mt-4 p-3 sm:p-4 bg-destructive/5 border border-destructive/30 rounded-xl">
                  <p className="text-sm sm:text-base text-destructive font-semibold leading-relaxed">
                    Please stay nearby and keep this page open, when it's your turn, check in at counter within 30 seconds.
                  </p>
                </div>
                <div className="mt-3 p-3 sm:p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2">Patient Notice</p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <li>• Queue order is managed by clinic staff and may change.</li>
                    <li>• Number of patients ahead is provided for visibility only.</li>
                    <li>• Urgent cases, walk-ins, and clinic prioritization may affect queue movement.</li>
                    <li>• ClynicQ does not guarantee exact waiting time.</li>
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {myQueueEntry ? (
          <Card className="mb-6 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="px-4 sm:px-6 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                You're in the queue
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 rounded-lg bg-background/50">
                    <p className="text-sm sm:text-base text-muted-foreground mb-1">Queue Number</p>
                    <p className="text-3xl sm:text-4xl font-bold text-primary">{myQueueEntry.queue_number}</p>
                  </div>
                   <div className="text-center p-3 sm:p-4 rounded-lg bg-background/50">
                    <p className="text-sm sm:text-base text-muted-foreground mb-1">{t("queue.peopleAhead")}</p>
                    <p className="text-2xl sm:text-3xl font-semibold">
                      {myPosition ? Math.max(0, myPosition - 1) : 0} ahead
                    </p>
                  </div>
                </div>

                {/* Check-in Code */}
                {myQueueEntry.check_in_code && myQueueEntry.status === 'waiting' && (
                  <div className="text-center p-4 sm:p-5 border-2 border-primary/30 rounded-lg bg-primary/5">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">Check-in Code</p>
                    <p className="text-2xl sm:text-3xl font-mono font-black tracking-[0.2em] text-primary">{myQueueEntry.check_in_code}</p>
                    <p className="text-xs sm:text-sm text-foreground font-medium mt-2">
                      Show this code at the clinic counter when you arrive.
                    </p>
                  </div>
                )}

                {myQueueEntry.status === 'checked_in' && (
                  <Badge variant="default" className="w-full justify-center py-3 text-sm bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-500">
                    📅 <a href="/booking" className="underline ml-1">Click here to rebook your next appointment</a>
                  </Badge>
                )}

                {myQueueEntry.status === 'waiting' && myPosition === 1 && (
                  <Badge variant="default" className="w-full justify-center py-3 text-sm sm:text-base bg-accent">
                    🎉 You're next! Please check in when you arrive
                  </Badge>
                )}

                {myQueueEntry.status === 'waiting' && myPosition && myPosition > 1 && myPosition <= 3 && (
                  <Badge variant="secondary" className="w-full justify-center py-3 text-sm sm:text-base">
                    ⏰ Almost your turn! Get ready to head to the clinic
                  </Badge>
                )}

                {myQueueEntry.status === 'waiting' && myPosition && myPosition > 3 && (
                  <Badge variant="outline" className="w-full justify-center py-3 text-sm sm:text-base">
                    📱 We'll notify you when it's almost your turn
                  </Badge>
                )}

                <div className="flex gap-3 pt-2">
                  {myQueueEntry.status === 'waiting' && (
                    <>
                      <Button 
                        onClick={checkIn} 
                        className="flex-1 bg-accent hover:bg-accent/90 text-sm sm:text-base"
                        size="lg"
                        disabled={checkInLoading}
                      >
                        <LogIn className="mr-2 h-5 w-5" />
                        {checkInLoading ? "Checking In..." : "Check In at Clinic"}
                      </Button>
                      <Button 
                        onClick={cancelQueue} 
                        variant="outline"
                        className="flex-1 border-destructive text-destructive hover:bg-destructive/10 text-sm sm:text-base"
                        size="lg"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Leave Queue
                      </Button>
                    </>
                  )}
                  {myQueueEntry.status === 'checked_in' && (
                    <div className="w-full p-5 sm:p-6 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle2 className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                        <p className="text-center text-emerald-700 dark:text-emerald-300 font-semibold text-lg">
                          Checked In
                        </p>
                      </div>
                      <p className="text-center text-emerald-600 dark:text-emerald-400 text-sm">
                        {format(new Date(myQueueEntry.updated_at || myQueueEntry.created_at || new Date()), 'h:mm a')}
                      </p>
                    </div>
                  )}
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
            <CardTitle>Live Queue</CardTitle>
            <CardDescription>{queueData.length} people ahead right now</CardDescription>
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
                      {index === 0 ? "Now serving" : `${index} people ahead of you`}
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
          </DialogHeader>
          <div className="space-y-3">
            <ul className="space-y-2.5 text-sm text-muted-foreground list-disc pl-5">
              <li>{t("queue.disclaimer.bullet1")}</li>
              <li>{t("queue.disclaimer.bullet2")}</li>
              <li>{t("queue.disclaimer.bullet3")}</li>
              <li>{t("queue.disclaimer.bullet4")}</li>
            </ul>
          </div>
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
              Please provide information about your visit
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
