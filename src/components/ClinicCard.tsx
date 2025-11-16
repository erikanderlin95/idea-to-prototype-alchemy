import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Clock, Users, Star, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClinicCardProps {
  id?: string;
  name: string;
  type: "GP" | "TCM" | "Wellness";
  address: string;
  queueCount: number;
  waitTime: string;
  rating: number;
  isOpen: boolean;
}

export const ClinicCard = ({
  id,
  name,
  type,
  address,
  queueCount,
  waitTime,
  rating,
  isOpen,
}: ClinicCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isJoining, setIsJoining] = useState(false);
  const [myQueueEntry, setMyQueueEntry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visitType, setVisitType] = useState(t("clinicCard.generalConsultation"));
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showPreConsult, setShowPreConsult] = useState(false);
  const [showQueueCard, setShowQueueCard] = useState(false);
  const [preConsultData, setPreConsultData] = useState({
    symptoms: "",
    duration: "",
    allergies: "",
    medications: ""
  });

  useEffect(() => {
    if (user && id) {
      checkQueueStatus();
      
      // Subscribe to queue changes
      const channel = supabase
        .channel(`queue-${id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'queue_entries',
            filter: `clinic_id=eq.${id}`,
          },
          () => {
            checkQueueStatus();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, id]);

  const checkQueueStatus = async () => {
    if (!user || !id) return;
    
    const { data } = await supabase
      .from("queue_entries")
      .select("*")
      .eq("clinic_id", id)
      .eq("user_id", user.id)
      .eq("status", "waiting")
      .maybeSingle();
    
    setMyQueueEntry(data);
  };

  const handleCancelQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("queue_entries")
        .delete()
        .eq("id", myQueueEntry.id);

      if (error) throw error;

      toast.success(t("clinicCard.leftQueue"));
      setMyQueueEntry(null);
    } catch (error: any) {
      toast.error(error.message || t("clinicCard.failedToLeave"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "checked_in" })
        .eq("id", myQueueEntry.id);

      if (error) throw error;

      toast.success(t("clinicCard.checkedIn"));
      navigate(`/queue?clinic=${id}`);
    } catch (error: any) {
      toast.error(error.message || t("clinicCard.failedToJoin"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error(t("clinicCard.signInRequired"));
      navigate("/auth");
      return;
    }

    if (!id) return;

    // Open disclaimer dialog
    setShowDisclaimer(true);
  };

  const addToQueue = async (formData: any) => {
    if (!user || !id) return;

    setIsJoining(true);
    try {
      const { data: queueData, error: queueError } = await supabase
        .from("queue_entries")
        .select("queue_number")
        .eq("clinic_id", id)
        .order("queue_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (queueError && queueError.code !== "PGRST116") throw queueError;

      const nextQueueNumber = queueData ? queueData.queue_number + 1 : 1;

      const { error: insertError } = await supabase
        .from("queue_entries")
        .insert({
          clinic_id: id,
          user_id: user.id,
          queue_number: nextQueueNumber,
          visit_type: visitType,
          status: "waiting",
          estimated_wait_time: parseInt(waitTime) || 15,
        });

      if (insertError) throw insertError;

      toast.success(t("clinicCard.joinedQueue"));
      await checkQueueStatus();
      setShowQueueCard(true);
    } catch (error: any) {
      toast.error(error.message || t("clinicCard.failedToJoin"));
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-ai-indigo/30 hover:border-ai-purple/50 cursor-pointer bg-gradient-to-br from-card to-ai-purple/5 onboarding-join-queue hover:shadow-ai-purple/10" onClick={() => id && navigate(`/clinic/${id}`)}>
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{name}</h3>
              <Badge variant="secondary" className="text-sm font-medium">
                {type}
              </Badge>
              {isOpen ? (
                <Badge variant="outline" className="text-sm border-accent text-accent">
                  {t("clinicCard.open")}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-sm border-muted text-muted-foreground">
                  {t("clinicCard.closed")}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4 px-4 rounded-xl border onboarding-stats"
          style={{ 
            background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.08))',
            borderColor: 'hsl(var(--ai-cyan)/0.3)'
          }}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t("clinicCard.inQueue")}</p>
              <p className="text-base font-bold">{queueCount} {t("clinicCard.people")}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t("clinicCard.estWait")}</p>
              <p className="text-base font-bold">{waitTime}</p>
            </div>
          </div>
        </div>

        {myQueueEntry ? (
          <div className="space-y-3 pt-2" onClick={(e) => e.stopPropagation()}>
            <div className="relative p-5 bg-card rounded-xl border-2 shadow-lg"
              style={{ borderColor: 'hsl(var(--ai-purple)/0.4)' }}
            >
              <div className="flex items-center justify-between p-4 rounded-lg border-2 mb-3"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.1), hsl(var(--ai-blue)/0.1))',
                  borderColor: 'hsl(var(--ai-purple)/0.3)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                      {/* Background circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="4"
                        opacity="0.3"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - ((queueCount - myQueueEntry.queue_number) / queueCount))}`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg">
                      #{myQueueEntry.queue_number}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{t("clinicCard.youreInQueue")}</p>
                    <p className="text-lg font-bold text-foreground">
                      {t("clinicCard.position")} <span className="text-2xl font-black text-primary">#{myQueueEntry.queue_number}</span>
                      <span className="text-sm font-medium text-muted-foreground ml-2">{t("clinicCard.of")} {queueCount}</span>
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs font-semibold px-3 py-1">
                  {t("clinicCard.waiting")}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black shadow-md border-0 h-16 text-lg" 
                disabled={isLoading}
                onClick={handleCheckIn}
              >
                <CheckCircle className="mr-2 h-6 w-6" strokeWidth={2.5} />
                {t("clinicCard.checkIn")}
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive font-black h-16 text-lg" 
                disabled={isLoading}
                onClick={handleCancelQueue}
              >
                <XCircle className="mr-2 h-6 w-6" strokeWidth={2.5} />
                {t("clinicCard.leaveQueue")}
              </Button>
            </div>
          </div>
        ) : (
            <div className="space-y-3 pt-2">
            <div className="p-5 rounded-xl border-2 shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.08), hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.05))',
                borderColor: 'hsl(var(--ai-purple)/0.4)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/40">
                  <Users className="h-7 w-7 text-primary-foreground" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{t("clinicCard.readyToSkip")}</p>
                  <p className="text-base font-bold text-foreground/80">{t("clinicCard.joinVirtual")}</p>
                </div>
              </div>
              
              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                <label className="text-sm font-medium text-foreground">{t("clinicCard.visitType")}</label>
                <Select value={visitType} onValueChange={setVisitType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={t("clinicCard.generalConsultation")}>{t("clinicCard.generalConsultation")}</SelectItem>
                    <SelectItem value={t("clinicCard.followUp")}>{t("clinicCard.followUp")}</SelectItem>
                    <SelectItem value={t("clinicCard.emergency")}>{t("clinicCard.emergency")}</SelectItem>
                    <SelectItem value={t("clinicCard.vaccination")}>{t("clinicCard.vaccination")}</SelectItem>
                    <SelectItem value={t("clinicCard.healthScreening")}>{t("clinicCard.healthScreening")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-base shadow-2xl shadow-primary/50 border-0 h-12 hover:scale-105 transition-transform" 
                disabled={!isOpen || isJoining}
                onClick={handleJoinQueue}
              >
                <Users className="mr-2 h-6 w-6" strokeWidth={3} />
                {isJoining ? t("clinicCard.joining") : t("clinicCard.joinQueue")}
              </Button>
              <Button 
                variant="outline"
                className="flex-1 font-black text-base hover:bg-primary/20 hover:border-primary border-2 border-primary/50 h-12 hover:scale-105 transition-transform" 
                disabled={!isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  id && navigate(`/clinic/${id}`);
                }}
              >
                {t("clinicCard.viewDetails")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>

    {/* Disclaimer Dialog */}
    <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Queue Disclaimer</DialogTitle>
          <DialogDescription>Please read and agree to continue</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Notice:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Queue positions are estimates and may change</li>
                <li>• Wait times are approximate and subject to clinic operations</li>
                <li>• You must check in when your number is called</li>
                <li>• Missing your turn may result in queue removal</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDisclaimer(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            setShowDisclaimer(false);
            setShowPreConsult(true);
          }}>
            I understand and agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Pre-Consult Form Dialog */}
    <Dialog open={showPreConsult} onOpenChange={setShowPreConsult}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pre-Consultation Form</DialogTitle>
          <DialogDescription>Help us prepare for your visit</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToQueue(preConsultData);
          setShowPreConsult(false);
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">What are your symptoms?</Label>
            <Textarea
              id="symptoms"
              placeholder="Describe your symptoms..."
              value={preConsultData.symptoms}
              onChange={(e) => setPreConsultData({...preConsultData, symptoms: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">How long have you had these symptoms?</Label>
            <Input
              id="duration"
              placeholder="e.g., 3 days"
              value={preConsultData.duration}
              onChange={(e) => setPreConsultData({...preConsultData, duration: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allergies">Any allergies?</Label>
            <Input
              id="allergies"
              placeholder="e.g., Penicillin, None"
              value={preConsultData.allergies}
              onChange={(e) => setPreConsultData({...preConsultData, allergies: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medications">Current medications?</Label>
            <Textarea
              id="medications"
              placeholder="List any medications you're currently taking..."
              value={preConsultData.medications}
              onChange={(e) => setPreConsultData({...preConsultData, medications: e.target.value})}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowPreConsult(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isJoining}>
              {isJoining ? "Joining..." : "Join Queue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    {/* Queue Card Dialog */}
    <Dialog open={showQueueCard} onOpenChange={setShowQueueCard}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You're in the Queue!</DialogTitle>
          <DialogDescription>Your queue position has been confirmed</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Your Queue Number</p>
            <p className="text-5xl font-bold text-primary">{myQueueEntry?.queue_number}</p>
            <p className="text-sm text-muted-foreground mt-4">
              Estimated wait time: {myQueueEntry?.estimated_wait_time || waitTime} mins
            </p>
          </div>
          <Alert>
            <AlertDescription>
              Please stay nearby and check your notifications. You'll be notified when it's your turn.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            setShowQueueCard(false);
            navigate(`/queue?clinic=${id}`);
          }}>
            View Queue Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>);
};
