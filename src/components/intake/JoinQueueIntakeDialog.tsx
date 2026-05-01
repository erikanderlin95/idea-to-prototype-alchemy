import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const sanitizeMobileNumber = (mobile: string): string => {
  const hasPlus = mobile.trim().startsWith("+");
  const digitsOnly = mobile.replace(/\D/g, "");
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
};

const isValidMobileNumber = (mobile: string): boolean => {
  const sanitized = sanitizeMobileNumber(mobile);
  return /^\+?[0-9]{8,15}$/.test(sanitized);
};

const getDeviceFingerprint = () => {
  const nav = navigator;
  return btoa(`${nav.userAgent}|${nav.language}|${screen.width}x${screen.height}|${new Date().getTimezoneOffset()}`).slice(0, 64);
};

interface JoinQueueIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinicId: string;
  clinicName: string;
  clinicType: string;
  estimatedWaitMinutes?: number;
  onJoined?: (entry: any) => void;
}

export const JoinQueueIntakeDialog = ({
  open,
  onOpenChange,
  clinicId,
  clinicName,
  clinicType,
  estimatedWaitMinutes = 15,
  onJoined,
}: JoinQueueIntakeDialogProps) => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [showQueueCard, setShowQueueCard] = useState(false);
  const [newQueueNumber, setNewQueueNumber] = useState<number | null>(null);
  const [newCheckInCode, setNewCheckInCode] = useState("");

  const reset = () => {
    setPatientName("");
    setMobileNumber("");
    setVisitReason("");
    setDisclaimerAgreed(false);
    setPdpaConsent(false);
    setJoinError("");
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
          clinic_id: clinicId,
          mobile_number: sanitizedMobile,
          patient_name: patientName.trim(),
          visit_type: "General Consultation",
          estimated_wait_time: estimatedWaitMinutes,
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
      localStorage.setItem(`queue_mobile_${clinicId}`, sanitizedMobile);
      toast.success("You've joined the queue");
      onOpenChange(false);
      setShowQueueCard(true);
      onJoined?.(createdEntry);
    } catch (err: any) {
      setJoinError(err.message || "Failed to join queue");
    } finally {
      setJoinLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          onOpenChange(o);
          if (!o) reset();
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base text-foreground">Join Queue Remotely — {clinicName}</DialogTitle>
            <DialogDescription className="text-xs text-center font-bold text-red-700">
              Arrive within 1 minute when called.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label htmlFor="q-name" className="text-xs font-medium">
                Patient Name <span className="text-muted-foreground font-normal">(as per NRIC)</span>
              </Label>
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
                {clinicType === "GP" || clinicType === "TCM" ? "Visit Reason" : "Remarks (optional)"}
              </Label>
              <Input
                id="q-reason"
                type="text"
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                placeholder={clinicType === "GP" || clinicType === "TCM" ? "e.g. Cold, flu, fever" : "Any additional remarks..."}
                className="mt-1 h-9 text-sm"
              />
            </div>

            <div className="p-2.5 rounded-md bg-muted/50 border border-border/40 space-y-1.5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Please Note</p>
              <ul className="space-y-1.5 text-xs text-foreground font-medium list-disc pl-3.5">
                <li>Queue order is managed by clinic staff</li>
                <li>Waiting time and position may change</li>
                <li>We highly recommend you make your way down when there are 3–4 patients ahead of you to account for travelling time</li>
              </ul>
            </div>

            <div className="flex items-start gap-2">
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

            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="pdpa-consent"
                  checked={pdpaConsent}
                  onCheckedChange={(checked) => setPdpaConsent(checked === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-snug">
                  I consent to my personal data being collected and used by ClynicQ to facilitate queue management and appointment coordination, and shared with the selected clinic and partner for my visit. I understand how my data is handled as described in the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                  .
                </Label>
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug pl-6">
                This is not for medical emergencies. Please visit A&amp;E or call emergency services if urgent.
              </p>
            </div>

            {joinError && <p className="text-xs text-destructive font-medium">{joinError}</p>}

            <DialogFooter className="gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
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

      {/* Success card */}
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
                  const stored = localStorage.getItem(`queue_mobile_${clinicId}`) || "";
                  const queueUrl = `${window.location.origin}/queue?clinic=${clinicId}&mobile=${encodeURIComponent(stored)}`;
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
            <Button
              size="sm"
              onClick={() => {
                const stored = localStorage.getItem(`queue_mobile_${clinicId}`) || "";
                setShowQueueCard(false);
                navigate(`/queue?clinic=${clinicId}&mobile=${encodeURIComponent(stored)}`);
              }}
            >
              View Queue Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
