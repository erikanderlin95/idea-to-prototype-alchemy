import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientNric, setPatientNric] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);

  const reset = () => {
    setPatientName("");
    setPatientNric("");
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
      const { callQueueLookup } = await import("@/lib/queueLookup");
      const { data: response, error, status } = await callQueueLookup({
        action: "join_queue",
        clinic_id: clinicId,
        mobile_number: sanitizedMobile,
        patient_name: patientName.trim(),
        patient_nric: patientNric.trim() || null,
        estimated_wait_time: estimatedWaitMinutes,
        device_fingerprint: getDeviceFingerprint(),
      });

      const payload = response ?? error;
      if (status !== 200 || payload?.error) {
        if (payload?.code === "ALREADY_IN_QUEUE") {
          if (payload.entry) {
            localStorage.setItem(`queue_mobile_${clinicId}`, sanitizedMobile);
      if (patientNric.trim()) localStorage.setItem(`queue_nric_${clinicId}`, patientNric.trim().toUpperCase());
            toast.info("You are already in the queue at this clinic");
            onOpenChange(false);
            onJoined?.(payload.entry);
            navigate(`/queue?clinic=${clinicId}&mobile=${encodeURIComponent(sanitizedMobile)}`);
          } else {
            setJoinError("You already have an active queue entry at this clinic");
          }
        } else if (payload?.code === "COOLDOWN") {
          setJoinError(payload.error);
        } else if (payload?.code === "RATE_LIMITED") {
          setJoinError("Too many attempts. Please try again shortly.");
        } else {
          setJoinError(payload?.error || "Failed to join queue");
        }
        return;
      }


      const createdEntry = response.entry;
      localStorage.setItem(`queue_mobile_${clinicId}`, sanitizedMobile);
      if (patientNric.trim()) localStorage.setItem(`queue_nric_${clinicId}`, patientNric.trim().toUpperCase());
      toast.success("You've joined the queue");
      onOpenChange(false);
      onJoined?.(createdEntry);
      navigate(`/queue?clinic=${clinicId}&mobile=${encodeURIComponent(sanitizedMobile)}`);
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
        <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto visible-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-base text-foreground">Join Queue Remotely — {clinicName}</DialogTitle>
            <DialogDescription className="text-xs text-center font-bold text-red-700">
              Please return when 3–4 patients are ahead.
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
              <Label htmlFor="q-nric" className="text-xs font-medium">
                Patient NRIC/FIN
              </Label>
              <Input
                id="q-nric"
                type="text"
                value={patientNric}
                onChange={(e) => setPatientNric(e.target.value)}
                placeholder="e.g. S1234567A"
                className="mt-1 h-9 text-sm"
              />
              <p className="text-[10px] text-muted-foreground mt-0.5">Only required if requested by your selected clinic for registration or identity verification.</p>
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
                <li>Queue order is managed by the clinic and may change.</li>
                <li>Check your queue status using the link provided.</li>
                <li>Please return when 3–4 patients are ahead.</li>
                <li>The number ahead is based on active patients who checked in before you and refreshes every minute.</li>
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
                  I consent to ClynicQ collecting, using and disclosing my personal data, including my NRIC/FIN only where required by my selected clinic for patient registration or identity verification, for the purposes of facilitating my registration, queue management, appointment coordination and visit. I understand that my information may be shared with my selected clinic and authorised service providers where necessary, and will be handled in accordance with the{" "}
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

    </>
  );
};
