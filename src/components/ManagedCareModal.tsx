import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, CheckCircle2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";

const sanitizeMobileNumber = (mobile: string): string => {
  const hasPlus = mobile.trim().startsWith('+');
  const digitsOnly = mobile.replace(/\D/g, '');
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
};

const isValidMobileNumber = (mobile: string): boolean => {
  const sanitized = sanitizeMobileNumber(mobile);
  return /^\+?[0-9]{8,15}$/.test(sanitized);
};

const generateCaseId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "MC-";
  for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};

interface ManagedCareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinicId?: string | null;
  clinicName?: string | null;
  source?: string;
}

export const ManagedCareModal = ({
  open,
  onOpenChange,
  clinicId = null,
  clinicName = null,
  source = "marketplace",
}: ManagedCareModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState("flexible");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");

  const reset = () => {
    setName("");
    setPhone("");
    setUrgency("flexible");
    setPdpaConsent(false);
    setSubmitted(false);
    setSubmitting(false);
    setCaseId("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in Name and Contact Number");
      return;
    }
    if (!isValidMobileNumber(phone)) {
      toast.error("Please enter a valid contact number");
      return;
    }
    if (!pdpaConsent) {
      toast.error("Please provide consent to proceed");
      return;
    }
    setSubmitting(true);
    const newCaseId = generateCaseId();
    try {
      const { error } = await supabase.from("managed_care_cases" as any).insert({
        case_id: newCaseId,
        clinic_id: clinicId || null,
        clinic_name: clinicName || null,
        patient_name: name.trim(),
        contact_number: sanitizeMobileNumber(phone),
        urgency,
        source,
        case_type: "managed_care",
        status: "pending_coordinator_review",
      } as any);
      if (error) throw error;
      setCaseId(newCaseId);
      setSubmitted(true);
    } catch (err: any) {
      console.error("[MANAGED CARE] Error:", err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Request Managed Care Support
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <div className="space-y-4">
            <Badge variant="secondary" className="text-xs">Managed Care Pathway</Badge>

            <div className="space-y-2">
              <Label>Urgency Level *</Label>
              <RadioGroup value={urgency} onValueChange={setUrgency} className="flex gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="mc-modal-urgent" />
                  <Label htmlFor="mc-modal-urgent" className="font-normal cursor-pointer">Urgent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="soon" id="mc-modal-soon" />
                  <Label htmlFor="mc-modal-soon" className="font-normal cursor-pointer">Soon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="mc-modal-flexible" />
                  <Label htmlFor="mc-modal-flexible" className="font-normal cursor-pointer">Flexible</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-name">Name *</Label>
              <Input id="mc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-phone">Contact Number *</Label>
              <Input id="mc-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +6591234567" />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="mc-pdpa-consent"
                checked={pdpaConsent}
                onCheckedChange={(checked) => setPdpaConsent(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="mc-pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-snug">
                I consent to my personal data being collected and used by ClynicQ to facilitate queue management and appointment coordination, and shared with the selected clinic for my visit. I understand how my data is handled as described in the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </a>.
              </Label>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-3">{NMG_ATTRIBUTION_TAG}</p>
              <Button className="w-full" onClick={handleSubmit} disabled={submitting || !pdpaConsent}>
                <Shield className="mr-2 h-4 w-4" />
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="h-14 w-14 text-primary mx-auto" />
            <h3 className="text-xl font-bold text-foreground">Request Received</h3>
            <p className="text-sm text-muted-foreground">
              Your request has been received. A care coordinator will review your case and contact you shortly to recommend the most suitable provider.
            </p>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Case Reference</p>
              <p className="text-xl font-mono font-bold text-foreground">{caseId}</p>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                const message = encodeURIComponent(`Hi, I have a managed care request. My Case ID is: ${caseId}. Please assist me.`);
                window.open(`https://wa.me/?text=${message}`, "_blank");
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Care Coordinator
            </Button>
            <p className="text-xs text-muted-foreground">{NMG_ATTRIBUTION_TAG}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
