import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, Users, Star, CheckCircle, XCircle, AlertTriangle, Copy, Calendar, Shield, MessageCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBookingRoute, isManagedCareType, NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";
import { LeaveQueueDialog } from "@/components/LeaveQueueDialog";

const sanitizeMobileNumber = (mobile: string): string => {
  const hasPlus = mobile.trim().startsWith('+');
  const digitsOnly = mobile.replace(/\D/g, '');
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
};

const isValidMobileNumber = (mobile: string): boolean => {
  const sanitized = sanitizeMobileNumber(mobile);
  return /^\+?[0-9]{8,15}$/.test(sanitized);
};

interface ClinicCardProps {
  id?: string;
  name: string;
  type: "GP" | "TCM" | "Wellness" | "Specialist";
  address: string;
  queueCount: number;
  waitTime: string;
  rating: number;
  isOpen: boolean;
  hasDigitalQueue?: boolean;
  isNmgAffiliated?: boolean;
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
  hasDigitalQueue = true,
  isNmgAffiliated = false,
}: ClinicCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isJoining, setIsJoining] = useState(false);
  const [myQueueEntry, setMyQueueEntry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visitType, setVisitType] = useState(t("clinicCard.generalConsultation"));
  const [visitReason, setVisitReason] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showQueueCard, setShowQueueCard] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [newQueueNumber, setNewQueueNumber] = useState<number | null>(null);
  const [newCheckInCode, setNewCheckInCode] = useState("");
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [showManagedCareModal, setShowManagedCareModal] = useState(false);
  const [mcName, setMcName] = useState("");
  const [mcPhone, setMcPhone] = useState("");
  const [mcTiming, setMcTiming] = useState("");
  const [mcConcern, setMcConcern] = useState("");
  const [mcLocation, setMcLocation] = useState("");
  const [mcUrgency, setMcUrgency] = useState("flexible");
  const [mcSubmitted, setMcSubmitted] = useState(false);
  const [mcSubmitting, setMcSubmitting] = useState(false);
  const [mcCaseId, setMcCaseId] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  // Booking lead capture state
  const [showBookingLead, setShowBookingLead] = useState(false);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadMobile, setLeadMobile] = useState("");
  const [leadPrefDate, setLeadPrefDate] = useState("");
  const [leadPrefTime, setLeadPrefTime] = useState("");
  const [leadNotes, setLeadNotes] = useState("");
  const [leadDisclaimerAgreed, setLeadDisclaimerAgreed] = useState(false);
  const [leadPdpaConsent, setLeadPdpaConsent] = useState(false);
  const [leadVisitType, setLeadVisitType] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [bookingCaseId, setBookingCaseId] = useState("");
  const [bookingRedirectUrl, setBookingRedirectUrl] = useState("");
  const [bookingRedirectType, setBookingRedirectType] = useState("");

  const generateCaseId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "MC-";
    for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  };

  const handleManagedCareSubmit = async () => {
    if (!mcName.trim() || !mcPhone.trim() || !mcConcern.trim()) {
      toast.error("Please fill in Name, Contact Number and Condition/Concern");
      return;
    }
    if (!isValidMobileNumber(mcPhone)) {
      toast.error("Please enter a valid contact number");
      return;
    }
    setMcSubmitting(true);
    const caseId = generateCaseId();
    try {
      const { error } = await supabase.from("managed_care_cases" as any).insert({
        case_id: caseId,
        clinic_id: id || null,
        clinic_name: name,
        patient_name: mcName.trim(),
        contact_number: sanitizeMobileNumber(mcPhone),
        condition_concern: mcConcern.trim(),
        preferred_location: mcLocation.trim() || null,
        preferred_timing: mcTiming.trim() || null,
        urgency: mcUrgency,
        source: "marketplace",
        case_type: "managed_care",
        status: "pending_coordinator_review",
      } as any);
      if (error) throw error;
      setMcCaseId(caseId);
      setMcSubmitted(true);
    } catch (err: any) {
      console.error("[MANAGED CARE] Error:", err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setMcSubmitting(false);
    }
  };

  const resetManagedCareModal = () => {
    setMcName("");
    setMcPhone("");
    setMcTiming("");
    setMcConcern("");
    setMcLocation("");
    setMcUrgency("flexible");
    setMcSubmitted(false);
    setMcSubmitting(false);
    setMcCaseId("");
  };

  useEffect(() => {
    if (id) {
      checkQueueStatus();
      const channel = supabase
        .channel(`queue-${id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'queue_entries', filter: `clinic_id=eq.${id}` },
          () => { checkQueueStatus(); }
        )
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [id]);

  const checkQueueStatus = async () => {
    if (!id) return;
    const storedMobile = localStorage.getItem(`queue_mobile_${id}`);
    if (!storedMobile) { setMyQueueEntry(null); return; }
    try {
      const { data: response, error } = await supabase.functions.invoke("queue-lookup", {
        body: { action: "check_active_entry", clinic_id: id, mobile_number: storedMobile },
      });
      if (error) { console.warn("checkQueueStatus error", error); return; }
      const entry = response?.entry || null;
      setMyQueueEntry(entry);
      if (entry) { setMobileNumber(storedMobile); } 
      else { localStorage.removeItem(`queue_mobile_${id}`); }
    } catch (err) { console.warn("checkQueueStatus exception", err); }
  };

  const handleCancelQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;
    setShowLeaveDialog(true);
  };

  const performCancelQueue = async () => {
    if (!myQueueEntry) return;
    setIsLoading(true);
    try {
      const storedMobile = id ? localStorage.getItem(`queue_mobile_${id}`) : null;
      if (storedMobile) {
        const { data, error } = await supabase.functions.invoke("queue-lookup", {
          body: { action: "cancel_queue", clinic_id: id, mobile_number: storedMobile },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
      } else {
        const { error } = await supabase.from("queue_entries").delete().eq("id", myQueueEntry.id);
        if (error) throw error;
      }
      if (id) localStorage.removeItem(`queue_mobile_${id}`);
      setMyQueueEntry(null);
    } catch (error: any) {
      toast.error(error.message || t("clinicCard.failedToLeave"));
      throw error;
    } finally { setIsLoading(false); }
  };

  const handleCheckIn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;
    setIsLoading(true);
    try {
      const storedMobile = id ? localStorage.getItem(`queue_mobile_${id}`) : null;
      if (storedMobile) {
        const { data, error } = await supabase.functions.invoke("queue-lookup", {
          body: { action: "check_in", clinic_id: id, mobile_number: storedMobile },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
      } else {
        const { error } = await supabase.from("queue_entries").update({ status: "checked_in" }).eq("id", myQueueEntry.id);
        if (error) throw error;
      }
      setMyQueueEntry(null);
      if (id) localStorage.removeItem(`queue_mobile_${id}`);
      toast.success("✓ Checked In Successfully!");
    } catch (error: any) {
      toast.error(error.message || t("clinicCard.failedToJoin"));
    } finally { setIsLoading(false); }
  };

  const handleJoinQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    setShowDisclaimer(true);
    setDisclaimerAgreed(false);
    setPdpaConsent(false);
    setJoinError("");
  };

  const getDeviceFingerprint = () => {
    const nav = navigator;
    return btoa(`${nav.userAgent}|${nav.language}|${screen.width}x${screen.height}|${new Date().getTimezoneOffset()}`).slice(0, 64);
  };

  const handleSecureSpot = async () => {
    if (!patientName.trim() || !mobileNumber.trim()) {
      setJoinError("Please fill in all fields");
      return;
    }
    if (!isValidMobileNumber(mobileNumber)) {
      setJoinError("Please enter a valid mobile number (8-15 digits)");
      return;
    }
    if (!disclaimerAgreed) {
      setJoinError("Please agree to the disclaimer to continue");
      return;
    }
    if (!pdpaConsent) {
      setJoinError("Please provide consent to proceed");
      return;
    }

    setJoinLoading(true);
    setJoinError("");
    try {
      const sanitizedMobile = sanitizeMobileNumber(mobileNumber);
      const { data: response, error } = await supabase.functions.invoke("queue-lookup", {
        body: {
          action: "join_queue",
          clinic_id: id,
          mobile_number: sanitizedMobile,
          patient_name: patientName.trim(),
          visit_type: visitType,
          estimated_wait_time: parseInt(waitTime) || 15,
          device_fingerprint: getDeviceFingerprint(),
        },
      });

      if (error) throw error;
      if (response?.error) {
        if (response.code === "ALREADY_IN_QUEUE") {
          setJoinError("You already have an active queue entry at this clinic");
        } else if (response.code === "COOLDOWN") {
          setJoinError(response.error);
        } else if (response.code === "RATE_LIMITED") {
          setJoinError("Too many attempts. Please try again shortly.");
        } else {
          setJoinError(response.error);
        }
        return;
      }

      const createdEntry = response.entry;
      setNewQueueNumber(createdEntry.queue_number);
      setNewCheckInCode(createdEntry.check_in_code || "");
      localStorage.setItem(`queue_mobile_${id}`, sanitizedMobile);
      setMobileNumber(sanitizedMobile);
      setMyQueueEntry(createdEntry);
      toast.success(t("clinicCard.joinedQueue"));
      setShowDisclaimer(false);
      setShowQueueCard(true);
      setTimeout(() => checkQueueStatus(), 500);
    } catch (err: any) {
      setJoinError(err.message || "Failed to join queue");
    } finally {
      setJoinLoading(false);
    }
  };

  const handleSaveBookingLead = async () => {
    if (!leadName.trim() || !leadMobile.trim()) {
      toast.error("Please fill in your name and mobile number");
      return;
    }
    if (!isValidMobileNumber(leadMobile)) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (!leadDisclaimerAgreed) {
      toast.error("Please agree to the disclaimer to continue");
      return;
    }
    if (!leadPdpaConsent) {
      toast.error("Please provide consent to proceed");
      return;
    }
    setLeadSubmitting(true);
    try {
      const sanitizedMobile = sanitizeMobileNumber(leadMobile);
      
      const { data: clinicData } = await supabase.from("clinics").select("booking_url, phone").eq("id", id).single();
      
      const bookingUrl = clinicData?.booking_url || null;
      const clinicPhone = clinicData?.phone?.replace(/\D/g, '') || "";
      const redirectType = bookingUrl ? "web" : (clinicPhone ? "whatsapp" : "web");

      const { data: response } = await supabase.functions.invoke("queue-lookup", {
        body: { 
          action: "save_booking_lead", 
          clinic_id: id, 
          mobile_number: sanitizedMobile, 
          patient_name: leadName.trim(), 
          clinic_name: name, 
          booking_type: "external",
          redirect_type: redirectType,
          redirect_url: bookingUrl || null,
          preferred_date: leadPrefDate || null,
          preferred_time: leadPrefTime || null,
          notes: leadNotes.trim() || null,
        },
      });

      const caseId = response?.case_id || "";
      setBookingCaseId(caseId);
      
      // Prepare redirect info for confirmation screen
      if (bookingUrl) {
        const separator = bookingUrl.includes("?") ? "&" : "?";
        setBookingRedirectUrl(`${bookingUrl}${separator}case_id=${encodeURIComponent(caseId)}`);
        setBookingRedirectType("web");
      } else if (clinicPhone) {
        const message = encodeURIComponent(`Hi, I'd like to book an appointment.\nName: ${leadName.trim()}\nCase ID: ${caseId}`);
        setBookingRedirectUrl(`https://wa.me/${clinicPhone}?text=${message}`);
        setBookingRedirectType("whatsapp");
      } else {
        setBookingRedirectUrl("");
        setBookingRedirectType("none");
      }

      setShowBookingLead(false);
      setShowBookingConfirm(true);
    } catch (err) {
      console.error("Lead save error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally { setLeadSubmitting(false); }
  };

  const handleBookingRedirect = () => {
    if (bookingRedirectUrl) {
      window.open(bookingRedirectUrl, "_blank");
    }
    setShowBookingConfirm(false);
  };

  const clinicNameSizeClass =
    name.length > 32
      ? "text-base sm:text-[17px] md:text-[15px]"
      : name.length > 24
        ? "text-[17px] sm:text-lg md:text-base"
        : "text-lg sm:text-xl md:text-[17px]";

  const resetBookingLead = () => {
    setLeadName("");
    setLeadVisitType("");
    setLeadMobile("");
    setLeadPrefDate("");
    setLeadPrefTime("");
    setLeadNotes("");
    setLeadDisclaimerAgreed(false);
    setLeadPdpaConsent(false);
    setBookingCaseId("");
    setBookingRedirectUrl("");
    setBookingRedirectType("");
  };

  return (
    <>
      <Card className="group flex flex-col px-3 py-3 sm:px-3.5 sm:py-3 hover:shadow-lg transition-all duration-300 border border-emerald-300/70 hover:border-emerald-400 cursor-pointer bg-gradient-to-br from-card to-primary/5 onboarding-join-queue w-full max-w-[360px] md:max-w-[420px] mx-auto h-full min-h-[420px]" onClick={() => id && navigate(`/clinic/${id}`)}>
        {/* === TOP SECTION (fixed) === */}
        <div className="space-y-1">
        {/* Row 1: Name + rating */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-[15px] font-bold text-primary leading-none">{name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
            </div>
            <h3 className={`${clinicNameSizeClass} font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap leading-tight min-w-0`}>{name}</h3>
          </div>
          <div className="flex items-center gap-0.5 bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded shrink-0">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[13px] font-bold">{rating}</span>
          </div>
        </div>

        {/* Row 1b: Type + status badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="secondary" className="text-xs font-medium px-1.5 py-0 h-[20px] shrink-0">
              {type}
            </Badge>
            {isOpen ? (
              <Badge variant="outline" className="text-xs border-accent text-accent px-1.5 py-0 h-[20px] shrink-0">
                {t("clinicCard.open")}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs border-muted text-muted-foreground px-1.5 py-0 h-[20px] shrink-0">
                {t("clinicCard.closed")}
              </Badge>
            )}
            {isNmgAffiliated && (
              <Badge className="text-xs bg-primary/15 text-primary border border-primary/30 px-1.5 py-0 h-[20px] shrink-0">
                <Shield className="h-2.5 w-2.5 mr-0.5" />
                Managed Care
              </Badge>
            )}
        </div>

        {/* Row 2: Address */}
        <div className="flex items-center gap-1 text-[15px] text-muted-foreground -mt-0.5">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1 font-medium">{address}</span>
        </div>
        </div>

        {/* === MIDDLE SECTION === */}
        <div className="flex-1 flex flex-col gap-1.5 mt-1.5">
        {hasDigitalQueue && (
          myQueueEntry ? (
            <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg cursor-pointer text-xs border-2"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.1), hsl(var(--ai-blue)/0.08))',
                borderColor: 'hsl(var(--ai-cyan)/0.25)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                const queueUrl = `${window.location.origin}/queue/${id}`;
                navigator.clipboard.writeText(queueUrl);
                toast.success("Queue link copied!");
              }}
            >
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <Copy className="h-4 w-4 text-primary shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-muted-foreground leading-none mb-0.5">Save your queue link</p>
                  <p className="text-xs font-mono text-primary leading-tight truncate">{window.location.origin}/queue/{id}</p>
                </div>
              </div>
              <Copy className="h-4 w-4 text-primary/60 shrink-0" />
            </div>
          ) : (
            <div className="flex items-center gap-2 py-1 px-2 rounded border"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.08))',
                borderColor: 'hsl(var(--ai-cyan)/0.2)'
              }}
            >
              <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">
                <Users className="h-3 w-3 text-primary" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground leading-tight">Live Queue</p>
              </div>
            </div>
          )
        )}
        {!hasDigitalQueue && (
          <>
            <div className="flex items-center gap-2 py-1 px-2 rounded border"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.08))',
                borderColor: 'hsl(var(--ai-cyan)/0.2)'
              }}
            >
              <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">
                <Calendar className="h-3 w-3 text-primary" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground leading-tight">Appointment Basis</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center py-2.5 px-2.5 rounded border"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.08), hsl(var(--ai-cyan)/0.05))',
                borderColor: 'hsl(var(--ai-purple)/0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <Star className="h-4 w-4 text-foreground" />
                <p className="text-sm text-foreground font-bold">{t("clinicCard.servicesOffered")}</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[14px] text-foreground/90 list-disc pl-5">
                <li>Massage Therapy</li>
                <li>Acupuncture</li>
                <li>Aromatherapy</li>
                <li>Reflexology</li>
                <li>Cupping Therapy</li>
              </ul>
            </div>
          </>
        )}

        {myQueueEntry ? (
          <div className="flex-1 flex flex-col justify-between gap-1.5" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-2.5 py-2 rounded-lg border-2"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.12), hsl(var(--ai-blue)/0.1))',
                  borderColor: 'hsl(var(--ai-purple)/0.3)'
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">People Ahead</span>
                </div>
                <span className="text-2xl font-bold tabular-nums text-primary leading-none">{Math.max(0, myQueueEntry.queue_number - 1)}</span>
              </div>

              {myQueueEntry.check_in_code && (
                <div className="flex items-center justify-between px-2.5 py-2 bg-muted/50 rounded-lg border border-border/30">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Check-in Code</span>
                  </div>
                  <span className="text-lg font-mono font-bold tracking-[0.15em] text-primary">{myQueueEntry.check_in_code}</span>
                </div>
              )}
            </div>
            
            {/* Action buttons — anchored bottom */}
            <div className="flex gap-1.5">
              <Button 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-sm border-0 h-10 text-sm" 
                disabled={isLoading}
                onClick={handleCheckIn}
              >
                <CheckCircle className="mr-1 h-3.5 w-3.5" strokeWidth={2.5} />
                {t("clinicCard.checkIn")}
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border border-destructive/30 text-destructive hover:bg-destructive/10 font-bold h-10 text-sm" 
                disabled={isLoading}
                onClick={handleCancelQueue}
              >
                <XCircle className="mr-1 h-3.5 w-3.5" strokeWidth={2.5} />
                {t("clinicCard.leaveQueue")}
              </Button>
            </div>
          </div>
        ) : (
          <div className={`flex flex-col justify-between gap-1.5 ${hasDigitalQueue ? 'flex-1' : ''}`}>
            <div className={`flex flex-col gap-1.5 ${hasDigitalQueue ? 'flex-1' : ''}`}>
            {hasDigitalQueue && (
              <div className="flex-1 flex flex-col gap-2 p-2.5 rounded border"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.06), hsl(var(--ai-cyan)/0.06))',
                  borderColor: 'hsl(var(--ai-purple)/0.2)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                 <div className="flex items-center gap-2.5">
                   <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm shadow-primary/20 shrink-0">
                     <Users className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
                   </div>
                    <p className="text-[17px] sm:text-lg font-bold text-foreground">{t("clinicCard.joinVirtual").replace("{count}", String(queueCount))}</p>
                 </div>

                {type !== "GP" && type !== "TCM" && (
                <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                  <label className="text-sm font-semibold text-foreground">{t("clinicCard.visitType")}</label>
                  <Select value={visitType} onValueChange={setVisitType}>
                    <SelectTrigger className="w-full h-9 text-sm">
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
                )}

                {/* Services Offered list — fills remaining space, vertically centered */}
                <div className="flex-1 flex flex-col justify-center pt-2 border-t border-border/30">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star className="h-4 w-4 text-foreground" />
                    <p className="text-sm text-foreground font-bold">{t("clinicCard.servicesOffered")}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[14px] text-foreground/90 list-disc pl-5">
                    <li>General Consultation</li>
                    <li>Health Screening</li>
                    <li>Vaccination</li>
                    <li>Chronic Care</li>
                  </ul>
                </div>
              </div>
            )}
            </div>
            
            {/* Buttons — anchored bottom */}
            <div className="space-y-1.5">
            <div className={`flex gap-1.5 ${isNmgAffiliated && isManagedCareType(type) ? 'flex-col' : ''}`}>
              {/* Join Queue button — shown when clinic has digital queue */}
              {hasDigitalQueue && (
                <Button 
                   className="flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/40 border-2 border-emerald-600 h-10 hover:scale-[1.02] transition-transform" 
                  disabled={!isOpen || isJoining}
                  onClick={handleJoinQueue}
                >
                  <Users className="mr-1.5 h-3.5 w-3.5" strokeWidth={3} />
                  {isJoining ? t("clinicCard.joining") : t("clinicCard.joinQueue")}
                </Button>
              )}
              {/* Book button — shown when clinic does NOT have digital queue, OR specifically for Harmony TCM Centre */}
              {(!hasDigitalQueue || name === "Harmony TCM Centre") && (
                isNmgAffiliated && isManagedCareType(type) ? (
                  <Button 
                    className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/40 border-2 border-emerald-600 h-10 hover:scale-[1.02] transition-transform" 
                    disabled={!isOpen}
                    onClick={(e) => { e.stopPropagation(); resetManagedCareModal(); setShowManagedCareModal(true); }}
                  >
                    <Shield className="mr-1.5 h-4 w-4" strokeWidth={3} />
                    Request Managed Care Support
                  </Button>
                ) : (
                  <Button 
                    variant={hasDigitalQueue ? "outline" : "default"}
                    className={hasDigitalQueue 
                      ? "flex-1 font-bold text-sm border-2 border-emerald-600 text-foreground hover:bg-emerald-50 h-10 hover:scale-[1.02] transition-transform"
                      : "flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/40 border-2 border-emerald-600 h-10 hover:scale-[1.02] transition-transform"
                    }
                    disabled={!isOpen}
                    onClick={(e) => { e.stopPropagation(); if (id) { resetBookingLead(); setShowBookingLead(true); } }}
                  >
                    <Calendar className="mr-1.5 h-3.5 w-3.5" strokeWidth={3} />
                    {isManagedCareType(type) ? "Request" : "Book"}
                  </Button>
                )
              )}
            </div>
            {/* View Details — secondary CTA */}
            <Button 
              variant="outline"
              className="w-full text-sm font-bold h-9 bg-white text-emerald-700 border-2 border-emerald-600 hover:bg-emerald-50 hover:border-emerald-700"
              onClick={(e) => { e.stopPropagation(); id && navigate(`/clinic/${id}`); }}
            >
              {t("clinicCard.viewDetails")}
            </Button>
            </div>
          </div>
        )}
        </div>
    </Card>

    {/* Queue Join with Disclaimer + Checkbox */}
    <Dialog open={showDisclaimer} onOpenChange={(open) => { setShowDisclaimer(open); if (!open) { setJoinError(""); setDisclaimerAgreed(false); setPdpaConsent(false); } }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base text-foreground">Join Queue Remotely</DialogTitle>
          <DialogDescription className="text-xs text-center font-bold text-red-700">
            Arrive within 30 seconds when called.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label htmlFor="q-name" className="text-xs font-medium">Patient Name <span className="text-muted-foreground font-normal">(as per NRIC)</span></Label>
            <Input
              id="q-name"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter Patient Full Name"
              className="mt-1 h-9 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="q-mobile" className="text-xs font-medium">Mobile Number</Label>
            <Input
              id="q-mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="e.g. +6591234567"
              className="mt-1 h-9 text-sm"
            />
            <p className="text-[10px] text-muted-foreground mt-0.5">8-15 digits, country code optional</p>
          </div>
          <div>
            <Label htmlFor="q-reason" className="text-xs font-medium">
              {(type === "GP" || type === "TCM") ? "Visit Reason" : "Remarks (optional)"}
            </Label>
            <Input
              id="q-reason"
              type="text"
              value={visitReason}
              onChange={(e) => setVisitReason(e.target.value)}
              placeholder={(type === "GP" || type === "TCM") ? "e.g. Cold, flu, fever" : "Any additional remarks..."}
              className="mt-1 h-9 text-sm"
            />
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-2.5 rounded-md bg-muted/50 border border-border/40 space-y-1.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Please Note</p>
            <ul className="space-y-1.5 text-xs text-foreground font-medium list-disc pl-3.5">
              <li>Queue order is managed by clinic staff</li>
              <li>Waiting time and position may change</li>
              <li>We highly recommend you make your way down when there are 3–4 patients ahead of you to account for travelling time</li>
            </ul>
          </div>

          <div className="flex items-start gap-2" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              id="disclaimer-agree"
              checked={disclaimerAgreed}
              onCheckedChange={(checked) => setDisclaimerAgreed(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="disclaimer-agree" className="text-[11px] text-foreground font-medium cursor-pointer leading-tight">
              I understand and agree
            </Label>
          </div>

          {/* Mandatory PDPA Consent */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                id="pdpa-consent"
                checked={pdpaConsent}
                onCheckedChange={(checked) => setPdpaConsent(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-snug">
                I consent to my personal data being collected and used by ClynicQ to facilitate queue management and appointment coordination, and shared with the selected clinic for my visit. I understand how my data is handled as described in the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </a>.
              </Label>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug pl-6">
              Information is submitted via ClynicQ and shared with the clinic for this purpose.
            </p>
            <p className="text-[10px] text-muted-foreground leading-snug pl-6">
              This is not for medical emergencies. Please visit A&amp;E or call emergency services if urgent.
            </p>
          </div>

          {joinError && (
            <p className="text-xs text-destructive font-medium">{joinError}</p>
          )}

          <DialogFooter className="gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => setShowDisclaimer(false)}>Cancel</Button>
            <Button 
              size="sm" 
              onClick={handleSecureSpot} 
              disabled={joinLoading || !disclaimerAgreed || !pdpaConsent}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold"
            >
              {joinLoading ? "Joining..." : "Secure My Spot"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>

    {/* Booking Lead Capture Dialog — Full Intake */}
    <Dialog open={showBookingLead} onOpenChange={(open) => { setShowBookingLead(open); if (!open) { setLeadDisclaimerAgreed(false); setLeadPdpaConsent(false); } }}>
      <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base">Continue to Clinic Booking</DialogTitle>
          <DialogDescription className="text-xs">Enter your details to proceed</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="lead-name" className="text-xs font-medium">Patient Name <span className="text-muted-foreground font-normal">(as per NRIC)</span> *</Label>
            <Input id="lead-name" type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Enter Patient Full Name" className="mt-1 h-9 text-sm" />
          </div>
          <div>
            <Label htmlFor="lead-mobile" className="text-xs font-medium">Mobile Number *</Label>
            <Input id="lead-mobile" type="tel" value={leadMobile} onChange={(e) => setLeadMobile(e.target.value)} placeholder="e.g. +6591234567" className="mt-1 h-9 text-sm" />
            <p className="text-[10px] text-muted-foreground mt-0.5">8-15 digits, country code optional</p>
          </div>
          <div>
            <Label htmlFor="lead-visit-type" className="text-xs font-medium">Visit Type</Label>
            <Select value={leadVisitType} onValueChange={setLeadVisitType}>
              <SelectTrigger className="mt-1 w-full h-9 text-sm">
                <SelectValue placeholder="Select visit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Acupuncture">Acupuncture</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Follow Up">Follow Up</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lead-notes" className="text-xs font-medium">Notes</Label>
            <Textarea id="lead-notes" value={leadNotes} onChange={(e) => setLeadNotes(e.target.value)} placeholder="Any additional information..." className="mt-1 text-sm min-h-[60px]" />
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-2.5 rounded-md bg-muted/50 border border-border/40 space-y-1.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Please Note</p>
            <ul className="space-y-1 text-[11px] text-muted-foreground list-disc pl-3.5">
              <li>This submission sends your request to the clinic for booking</li>
              <li>The clinic will contact you to confirm your appointment</li>
              <li>Appointment timing and availability are managed by the clinic</li>
              <li>Please ensure your contact details are accurate and reachable</li>
            </ul>
          </div>

          <div className="flex items-start gap-2" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              id="lead-disclaimer-agree"
              checked={leadDisclaimerAgreed}
              onCheckedChange={(checked) => setLeadDisclaimerAgreed(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="lead-disclaimer-agree" className="text-[11px] text-foreground font-medium cursor-pointer leading-tight">
              I understand and agree
            </Label>
          </div>

          {/* PDPA Consent */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                id="lead-pdpa-consent"
                checked={leadPdpaConsent}
                onCheckedChange={(checked) => setLeadPdpaConsent(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="lead-pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-tight">
                I consent to my personal data being collected and used by ClynicQ to facilitate queue management and appointment coordination, and shared with the selected clinic for my visit. I understand how my data is handled as described in the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </a>.
              </Label>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Information is submitted via ClynicQ and shared with the clinic for this purpose.
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              This is not for medical emergencies. Please visit A&amp;E or call emergency services if urgent.
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={() => setShowBookingLead(false)}>Cancel</Button>
          <Button 
            size="sm" 
            onClick={handleSaveBookingLead} 
            disabled={leadSubmitting || !leadDisclaimerAgreed || !leadPdpaConsent}
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold"
          >
            {leadSubmitting ? "Processing..." : "Proceed to Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Booking Confirmation Screen — Intermediate before redirect */}
    <Dialog open={showBookingConfirm} onOpenChange={setShowBookingConfirm}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            Redirecting to Clinic Booking
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="text-center p-4 border-2 border-primary/30 rounded-lg bg-primary/5">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Case ID</p>
            <p className="text-2xl font-mono font-black tracking-[0.15em] text-primary">{bookingCaseId}</p>
          </div>

          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Patient</span>
              <span className="font-medium">{leadName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Clinic</span>
              <span className="font-medium">{name}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your details have been recorded. Continue to complete your booking with the clinic.
          </p>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              navigator.clipboard.writeText(bookingCaseId);
              toast.success("Case ID copied!");
            }}
          >
            <Copy className="mr-1.5 h-3.5 w-3.5" />
            Copy Case ID
          </Button>

          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold h-10"
            onClick={handleBookingRedirect}
          >
            {bookingRedirectType === "whatsapp" ? (
              <><MessageCircle className="mr-1.5 h-4 w-4" />Continue via WhatsApp</>
            ) : bookingRedirectType === "web" ? (
              <><Calendar className="mr-1.5 h-4 w-4" />Continue to Booking</>
            ) : (
              "Done"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    {/* Queue Success Card Dialog */}
    <Dialog open={showQueueCard} onOpenChange={setShowQueueCard}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Your queue number has been confirmed</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="text-center p-5 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Queue Number</p>
            <p className="text-5xl font-bold text-primary">{newQueueNumber}</p>
            <p className="text-[11px] font-medium text-foreground mt-3">
              Current position may change based on clinic flow and urgent cases
            </p>
          </div>

          {/* Check-in code */}
          {newCheckInCode && (
            <div className="text-center p-4 border-2 border-primary/30 rounded-lg bg-primary/5">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Check-in Code</p>
              <p className="text-2xl font-mono font-black tracking-[0.2em] text-primary">{newCheckInCode}</p>
              <p className="text-[11px] text-foreground font-medium mt-2">
                Show this code at the clinic counter when you arrive.
              </p>
            </div>
          )}
          
          <div className="p-3 border rounded-md space-y-2">
            <p className="text-xs font-medium">Save your queue link</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                const queueUrl = `${window.location.origin}/queue?clinic=${id}&mobile=${encodeURIComponent(mobileNumber)}`;
                navigator.clipboard.writeText(queueUrl);
                toast.success("Link copied!");
              }}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Copy Link
            </Button>
            <p className="text-[11px] font-medium text-foreground">Use this link to return to your queue anytime.</p>
          </div>
          
          <Alert className="py-2">
            <AlertDescription className="text-[11px] text-destructive">
              Please stay nearby and keep this page open, when it's your turn, check in at counter within 30 seconds.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={() => {
            setShowQueueCard(false);
            navigate(`/queue?clinic=${id}&mobile=${encodeURIComponent(mobileNumber)}`);
          }}>
            View Queue Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* NMG Managed Care Request Modal */}
    <Dialog open={showManagedCareModal} onOpenChange={(open) => { setShowManagedCareModal(open); if (!open) resetManagedCareModal(); }}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Managed Care Support</DialogTitle>
          <DialogDescription>Complete this form and a care coordinator will contact you shortly.</DialogDescription>
        </DialogHeader>
        {!mcSubmitted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mc-concern">Condition / Concern *</Label>
              <Input id="mc-concern" value={mcConcern} onChange={(e) => setMcConcern(e.target.value)} placeholder="e.g. Knee pain, skin rash" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-location">Preferred Location</Label>
              <Input id="mc-location" value={mcLocation} onChange={(e) => setMcLocation(e.target.value)} placeholder="e.g. Central, East Singapore" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-timing">Preferred Appointment Timing</Label>
              <Input id="mc-timing" value={mcTiming} onChange={(e) => setMcTiming(e.target.value)} placeholder="e.g. Weekday mornings, ASAP" />
            </div>
            <div className="space-y-2">
              <Label>Urgency Level *</Label>
              <RadioGroup value={mcUrgency} onValueChange={setMcUrgency} className="flex gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urg-urgent" />
                  <Label htmlFor="urg-urgent" className="font-normal cursor-pointer">Urgent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="soon" id="urg-soon" />
                  <Label htmlFor="urg-soon" className="font-normal cursor-pointer">Soon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="urg-flexible" />
                  <Label htmlFor="urg-flexible" className="font-normal cursor-pointer">Flexible</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-name">Name *</Label>
              <Input id="mc-name" value={mcName} onChange={(e) => setMcName(e.target.value)} placeholder="Your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-phone">Contact Number *</Label>
              <Input id="mc-phone" type="tel" value={mcPhone} onChange={(e) => setMcPhone(e.target.value)} placeholder="e.g. +6591234567" required />
            </div>
            <p className="text-xs text-muted-foreground">{NMG_ATTRIBUTION_TAG}</p>
            <Button className="w-full" onClick={handleManagedCareSubmit} disabled={mcSubmitting}>
              <Shield className="mr-2 h-4 w-4" />
              {mcSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <p className="text-lg font-semibold text-foreground">Request Received</p>
            <p className="text-sm text-muted-foreground">
              Your request has been received. A care coordinator will review your case and contact you shortly.
            </p>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Case Reference</p>
              <p className="text-lg font-mono font-bold text-foreground">{mcCaseId}</p>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                const message = encodeURIComponent(`Hi, I have a managed care request. My Case ID is: ${mcCaseId}. Please assist me.`);
                window.open(`https://wa.me/?text=${message}`, "_blank");
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Care Coordinator
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setShowManagedCareModal(false)}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>

    <LeaveQueueDialog
      open={showLeaveDialog}
      onOpenChange={setShowLeaveDialog}
      onConfirm={performCancelQueue}
      patientName={myQueueEntry?.patient_name}
      mobileNumber={myQueueEntry?.mobile_number || (id ? localStorage.getItem(`queue_mobile_${id}`) || undefined : undefined)}
      clinicId={id}
      clinicName={name}
      queueEntryId={myQueueEntry?.id}
      queueNumber={myQueueEntry?.queue_number}
    />
  </>);
};
