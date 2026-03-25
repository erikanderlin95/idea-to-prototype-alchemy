import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Users, Star, CheckCircle, XCircle, AlertTriangle, Copy, Calendar, Shield, MessageCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBookingRoute, isManagedCareType, NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";

// Helper to sanitize and validate mobile number
const sanitizeMobileNumber = (mobile: string): string => {
  // Remove all non-digit characters except leading +
  const hasPlus = mobile.trim().startsWith('+');
  const digitsOnly = mobile.replace(/\D/g, '');
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
};

const isValidMobileNumber = (mobile: string): boolean => {
  const sanitized = sanitizeMobileNumber(mobile);
  // Valid format: optional + followed by 8-15 digits
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
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showQueueCard, setShowQueueCard] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [newQueueNumber, setNewQueueNumber] = useState<number | null>(null);
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
  // OTP verification state
  const [otpStep, setOtpStep] = useState<"form" | "verify">("form");
  const [verificationId, setVerificationId] = useState("");
  const [displayedOtp, setDisplayedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  // Booking lead capture state
  const [showBookingLead, setShowBookingLead] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadMobile, setLeadMobile] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);

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
      console.log(`[MANAGED CARE] Case ${caseId} created for clinic: ${name}`);
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
  }, [id]);

  const checkQueueStatus = async () => {
    if (!id) return;

    // Try to get mobile number from localStorage
    const storedMobile = localStorage.getItem(`queue_mobile_${id}`);
    if (!storedMobile) {
      setMyQueueEntry(null);
      return;
    }

    // Use edge function for secure mobile lookup (bypasses RLS)
    try {
      const { data: response, error } = await supabase.functions.invoke(
        "queue-lookup",
        {
          body: {
            action: "check_active_entry",
            clinic_id: id,
            mobile_number: storedMobile,
          },
        }
      );

      if (error) {
        console.warn("checkQueueStatus error", error);
        return;
      }

      const entry = response?.entry || null;
      setMyQueueEntry(entry);

      // Update state with stored mobile
      if (entry) {
        setMobileNumber(storedMobile);
      } else {
        // No active entry found, clear stored mobile
        localStorage.removeItem(`queue_mobile_${id}`);
      }
    } catch (err) {
      console.warn("checkQueueStatus exception", err);
    }
  };

  const handleCancelQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;

    setIsLoading(true);
    try {
      // Use edge function for anonymous users (bypasses RLS)
      const storedMobile = id ? localStorage.getItem(`queue_mobile_${id}`) : null;
      
      if (storedMobile) {
        const { data, error } = await supabase.functions.invoke("queue-lookup", {
          body: {
            action: "cancel_queue",
            clinic_id: id,
            mobile_number: storedMobile,
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
      if (id) {
        localStorage.removeItem(`queue_mobile_${id}`);
      }

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
      // Use edge function for anonymous users (bypasses RLS)
      const storedMobile = id ? localStorage.getItem(`queue_mobile_${id}`) : null;
      
      if (storedMobile) {
        const { data, error } = await supabase.functions.invoke("queue-lookup", {
          body: {
            action: "check_in",
            clinic_id: id,
            mobile_number: storedMobile,
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

      // Clear the queue entry state and localStorage
      setMyQueueEntry(null);
      if (id) {
        localStorage.removeItem(`queue_mobile_${id}`);
      }
      
      toast.success("✓ Checked In Successfully!");
    } catch (error: any) {
      toast.error(error.message || t("clinicCard.failedToJoin"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) return;

    // Open disclaimer dialog
    setShowDisclaimer(true);
  };

  // Generate a simple device fingerprint
  const getDeviceFingerprint = () => {
    const nav = navigator;
    return btoa(`${nav.userAgent}|${nav.language}|${screen.width}x${screen.height}|${new Date().getTimezoneOffset()}`).slice(0, 64);
  };

  const requestOtp = async () => {
    if (!patientName.trim() || !mobileNumber.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isValidMobileNumber(mobileNumber)) {
      toast.error("Please enter a valid mobile number (8-15 digits)");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    try {
      const sanitizedMobile = sanitizeMobileNumber(mobileNumber);
      const { data: response, error } = await supabase.functions.invoke("queue-lookup", {
        body: {
          action: "request_otp",
          clinic_id: id,
          mobile_number: sanitizedMobile,
          patient_name: patientName.trim(),
          visit_type: visitType,
          device_fingerprint: getDeviceFingerprint(),
        },
      });

      if (error) throw error;
      if (response?.error) {
        if (response.code === "ALREADY_IN_QUEUE") {
          toast.error("You already have an active queue entry at this clinic");
        } else if (response.code === "COOLDOWN") {
          toast.error(response.error);
        } else {
          toast.error(response.error);
        }
        return;
      }

      setVerificationId(response.verification_id);
      setDisplayedOtp(response.otp);
      setOtpStep("verify");
      setOtpInput("");
    } catch (err: any) {
      toast.error(err.message || "Failed to start verification");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpInput.trim()) {
      setOtpError("Please enter the verification code");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    try {
      const sanitizedMobile = sanitizeMobileNumber(mobileNumber);
      const { data: response, error } = await supabase.functions.invoke("queue-lookup", {
        body: {
          action: "verify_otp",
          clinic_id: id,
          mobile_number: sanitizedMobile,
          verification_id: verificationId,
          verification_code: otpInput.trim(),
          estimated_wait_time: parseInt(waitTime) || 15,
        },
      });

      if (error) throw error;
      if (response?.error) {
        if (response.code === "EXPIRED") {
          setOtpError("Code expired. Please try again.");
          setOtpStep("form");
        } else if (response.code === "MAX_ATTEMPTS") {
          setOtpError("Too many attempts. Please try again.");
          setOtpStep("form");
        } else if (response.code === "WRONG_CODE") {
          setOtpError(`Incorrect code. ${response.attempts_left > 0 ? `${response.attempts_left} attempt(s) left.` : ''}`);
        } else {
          setOtpError(response.error);
        }
        return;
      }

      // Success!
      const createdEntry = response.entry;
      setNewQueueNumber(createdEntry.queue_number);
      localStorage.setItem(`queue_mobile_${id}`, sanitizedMobile);
      setMobileNumber(sanitizedMobile);
      setMyQueueEntry(createdEntry);
      toast.success(t("clinicCard.joinedQueue"));
      setShowDisclaimer(false);
      setShowQueueCard(true);
      setOtpStep("form");
      setOtpInput("");
      setDisplayedOtp("");
      setVerificationId("");

      setTimeout(() => checkQueueStatus(), 500);
    } catch (err: any) {
      setOtpError(err.message || "Verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSaveBookingLead = async (bookingUrl: string) => {
    if (!leadName.trim() || !leadMobile.trim()) {
      toast.error("Please fill in your name and mobile number");
      return;
    }
    if (!isValidMobileNumber(leadMobile)) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setLeadSubmitting(true);
    try {
      const sanitizedMobile = sanitizeMobileNumber(leadMobile);
      await supabase.functions.invoke("queue-lookup", {
        body: {
          action: "save_booking_lead",
          clinic_id: id,
          mobile_number: sanitizedMobile,
          patient_name: leadName.trim(),
          clinic_name: name,
          booking_type: "external",
        },
      });
      setShowBookingLead(false);
      // Redirect to booking URL
      window.open(bookingUrl, "_blank");
    } catch (err) {
      console.error("Lead save error:", err);
      // Still redirect even if lead save fails
      window.open(bookingUrl, "_blank");
      setShowBookingLead(false);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <>
      <Card className="group p-2.5 sm:p-4 hover:shadow-lg transition-all duration-300 border border-border/60 hover:border-ai-purple/40 cursor-pointer bg-gradient-to-br from-card to-ai-purple/5 onboarding-join-queue hover:shadow-ai-purple/10 w-full" onClick={() => id && navigate(`/clinic/${id}`)}>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold group-hover:text-primary transition-colors">{name}</h3>
               <Badge variant="secondary" className="text-[10px] sm:text-xs font-medium">
                {type}
              </Badge>
              {isOpen ? (
                <Badge variant="outline" className="text-[10px] sm:text-xs border-accent text-accent">
                  {t("clinicCard.open")}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] sm:text-xs border-muted text-muted-foreground">
                  {t("clinicCard.closed")}
                </Badge>
              )}
              {isNmgAffiliated && (
                <Badge className="text-xs bg-primary/15 text-primary border border-primary/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Managed Care Available
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded-md">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>

        {hasDigitalQueue ? (
          <div className="flex items-center gap-2 py-2 sm:py-3 px-2.5 sm:px-3 rounded-lg border onboarding-stats"
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.08))',
              borderColor: 'hsl(var(--ai-cyan)/0.3)'
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">{t("clinicCard.inQueue")}</p>
                <p className="text-sm font-bold">{queueCount} {t("clinicCard.people")}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Availabilities Today Section */}
            <div className="py-4 px-4 rounded-xl border"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.08))',
                borderColor: 'hsl(var(--ai-cyan)/0.3)'
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-foreground" />
                <p className="text-base text-foreground font-semibold">{t("clinicCard.availabilitiesToday")}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button 
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-primary/10 text-foreground border border-primary/30 hover:bg-primary/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  2:30 PM
                </button>
                <button 
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-primary/10 text-foreground border border-primary/30 hover:bg-primary/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  4:00 PM
                </button>
                <button 
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-primary/10 text-foreground border border-primary/30 hover:bg-primary/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  5:30 PM
                </button>
              </div>
            </div>

            {/* Services Dropdown Section */}
            <div className="py-4 px-4 rounded-xl border"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.08), hsl(var(--ai-cyan)/0.05))',
                borderColor: 'hsl(var(--ai-purple)/0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-foreground" />
                  <p className="text-base text-foreground font-semibold">{t("clinicCard.servicesOffered")}</p>
                </div>
                <Select defaultValue="massage">
                  <SelectTrigger className="w-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="massage">Massage Therapy</SelectItem>
                    <SelectItem value="acupuncture">Acupuncture</SelectItem>
                    <SelectItem value="aromatherapy">Aromatherapy</SelectItem>
                    <SelectItem value="reflexology">Reflexology</SelectItem>
                    <SelectItem value="cupping">Cupping Therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {myQueueEntry ? (
          <div className="space-y-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <div className="relative p-3 bg-card rounded-lg border shadow-sm"
              style={{ borderColor: 'hsl(var(--ai-purple)/0.3)' }}
            >
              <div className="flex items-center justify-between p-3 rounded-md border mb-2"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.1), hsl(var(--ai-blue)/0.1))',
                  borderColor: 'hsl(var(--ai-purple)/0.2)'
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
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-md border-0 h-10 text-sm" 
                disabled={isLoading}
                onClick={handleCheckIn}
              >
                <CheckCircle className="mr-2 h-4 w-4" strokeWidth={2.5} />
                {t("clinicCard.checkIn")}
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive font-bold h-10 text-sm" 
                disabled={isLoading}
                onClick={handleCancelQueue}
              >
                <XCircle className="mr-2 h-4 w-4" strokeWidth={2.5} />
                {t("clinicCard.leaveQueue")}
              </Button>
            </div>
          </div>
        ) : (
            <div className="space-y-2 pt-1">
            {hasDigitalQueue && (
              <div className="p-2.5 sm:p-4 rounded-lg border-2 shadow-md"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--ai-purple)/0.08), hsl(var(--ai-cyan)/0.08), hsl(var(--ai-blue)/0.05))',
                  borderColor: 'hsl(var(--ai-purple)/0.4)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                 <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                   <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/40">
                     <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" strokeWidth={3} />
                   </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-foreground">{t("clinicCard.joinVirtual")}</p>
                    </div>
                 </div>
                
                <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                  <label className="text-xs font-medium text-foreground">{t("clinicCard.visitType")}</label>
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
            )}
            
            <div className={`flex gap-1.5 sm:gap-2 ${isNmgAffiliated && isManagedCareType(type) ? 'flex-col' : ''}`}>
              {hasDigitalQueue ? (
                <Button 
                   className="flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-2xl shadow-primary/50 border-0 h-8 sm:h-10 hover:scale-105 transition-transform" 
                  disabled={!isOpen || isJoining}
                  onClick={handleJoinQueue}
                >
                  <Users className="mr-1.5 h-4 w-4" strokeWidth={3} />
                  {isJoining ? t("clinicCard.joining") : t("clinicCard.joinQueue")}
                </Button>
              ) : isNmgAffiliated && isManagedCareType(type) ? (
                <Button 
                  className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-2xl shadow-primary/50 border-0 h-8 sm:h-10 hover:scale-105 transition-transform" 
                  disabled={!isOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetManagedCareModal();
                    setShowManagedCareModal(true);
                  }}
                >
                  <Shield className="mr-2 h-5 w-5" strokeWidth={3} />
                  Request Managed Care Support
                </Button>
              ) : (
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-2xl shadow-primary/50 border-0 h-8 sm:h-10 hover:scale-105 transition-transform" 
                  disabled={!isOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (id) {
                      setShowBookingLead(true);
                    }
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" strokeWidth={3} />
                  {isManagedCareType(type) ? "Request" : "Book"}
                </Button>
              )}
              <Button 
                variant="outline"
                className={`font-bold text-xs sm:text-sm hover:bg-primary/20 hover:border-primary border border-primary/40 h-8 sm:h-10 hover:scale-105 transition-transform ${isNmgAffiliated && isManagedCareType(type) ? 'w-full' : 'flex-1'}`}
                disabled={!isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  id && navigate(`/clinic/${id}`);
                }}
              >
                {t("clinicCard.viewDetails")}
              </Button>
            </div>
            {isNmgAffiliated && !isManagedCareType(type) && (
              <Button
                variant="outline"
                className="w-full border-2 border-primary/40 text-primary hover:bg-primary/10 font-semibold h-10 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  resetManagedCareModal();
                  setShowManagedCareModal(true);
                }}
              >
                <Shield className="mr-2 h-4 w-4" />
                Request Managed Care Support
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>

    {/* Queue Join with OTP Verification */}
    <Dialog open={showDisclaimer} onOpenChange={(open) => { setShowDisclaimer(open); if (!open) { setOtpStep("form"); setOtpError(""); setOtpInput(""); setDisplayedOtp(""); } }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{otpStep === "form" ? "Join Queue" : "Verify Your Identity"}</DialogTitle>
          <DialogDescription>
            {otpStep === "form" 
              ? "Enter your name and number to secure your spot" 
              : "Verification needed to prevent queue abuse"}
          </DialogDescription>
        </DialogHeader>

        {otpStep === "form" ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor="q-name" className="text-xs font-medium">Name</Label>
              <Input
                id="q-name"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
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
                className="mt-1"
              />
              <p className="text-[10px] text-muted-foreground mt-1">8-15 digits, country code optional</p>
            </div>
            <Alert className="py-2">
              <AlertTriangle className="h-3 w-3" />
              <AlertDescription className="text-[11px]">
                Queue position managed by clinic staff. May shift due to urgent cases.
              </AlertDescription>
            </Alert>
            <DialogFooter className="gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => setShowDisclaimer(false)}>Cancel</Button>
              <Button size="sm" onClick={requestOtp} disabled={otpLoading}>
                {otpLoading ? "Verifying..." : "Continue"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Your verification code</p>
              <p className="text-3xl font-mono font-black tracking-[0.3em] text-primary">{displayedOtp}</p>
              <p className="text-[10px] text-muted-foreground mt-2">Expires in 2 minutes</p>
            </div>
            <div>
              <Label htmlFor="otp-input" className="text-xs font-medium">Enter the code above</Label>
              <Input
                id="otp-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpInput}
                onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '')); setOtpError(""); }}
                placeholder="000000"
                className="mt-1 text-center text-lg tracking-widest font-mono"
                autoFocus
              />
              {otpError && <p className="text-xs text-destructive mt-1">{otpError}</p>}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" size="sm" onClick={() => { setOtpStep("form"); setOtpError(""); }}>Back</Button>
              <Button size="sm" onClick={verifyOtp} disabled={otpLoading || otpInput.length < 6}>
                {otpLoading ? "Verifying..." : "Confirm & Join"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Booking Lead Capture Dialog */}
    <Dialog open={showBookingLead} onOpenChange={setShowBookingLead}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>Enter your details before we redirect you to booking</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="lead-name" className="text-xs font-medium">Name</Label>
            <Input
              id="lead-name"
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Your full name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lead-mobile" className="text-xs font-medium">Mobile Number</Label>
            <Input
              id="lead-mobile"
              type="tel"
              value={leadMobile}
              onChange={(e) => setLeadMobile(e.target.value)}
              placeholder="e.g. +6591234567"
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={() => setShowBookingLead(false)}>Cancel</Button>
          <Button size="sm" onClick={() => {
            // Get clinic booking URL - navigate to booking page which handles external redirect
            handleSaveBookingLead(`/booking/${id}`);
          }} disabled={leadSubmitting}>
            {leadSubmitting ? "Saving..." : "Continue to Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


    {/* Queue Card Dialog */}
    <Dialog open={showQueueCard} onOpenChange={setShowQueueCard}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your queue number has been confirmed</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Queue Number</p>
            <p className="text-5xl font-bold text-primary">{newQueueNumber}</p>
            <p className="text-sm font-bold text-foreground mt-4">
              Current position may change based on clinic flow and urgent cases
            </p>
          </div>
          
          <div className="p-4 border rounded-lg space-y-3">
            <p className="text-sm font-medium">Save your queue link</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const queueUrl = `${window.location.origin}/queue?clinic=${id}&mobile=${encodeURIComponent(mobileNumber)}`;
                navigator.clipboard.writeText(queueUrl);
                toast.success("Link copied to clipboard!");
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
            <p className="text-sm font-bold text-foreground">Use this link to return to your queue anytime.</p>
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
              Your request has been received. A care coordinator will review your case and contact you shortly to recommend the most suitable provider.
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
  </>);
};
