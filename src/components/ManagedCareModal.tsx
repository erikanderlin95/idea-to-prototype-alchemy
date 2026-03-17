import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  const [concern, setConcern] = useState("");
  const [location, setLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [urgency, setUrgency] = useState("flexible");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");

  const reset = () => {
    setName("");
    setPhone("");
    setConcern("");
    setLocation("");
    setTiming("");
    setUrgency("flexible");
    setSubmitted(false);
    setSubmitting(false);
    setCaseId("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !concern.trim()) {
      toast.error("Please fill in Name, Contact Number and Condition/Concern");
      return;
    }
    if (!isValidMobileNumber(phone)) {
      toast.error("Please enter a valid contact number");
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
        condition_concern: concern.trim(),
        preferred_location: location.trim() || null,
        preferred_timing: timing.trim() || null,
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
              <Label htmlFor="mc-concern">Condition / Concern *</Label>
              <Input id="mc-concern" value={concern} onChange={(e) => setConcern(e.target.value)} placeholder="e.g. Knee pain, skin rash" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-location">Preferred Location</Label>
              <Input id="mc-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Central, East Singapore" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-timing">Preferred Appointment Timing</Label>
              <Input id="mc-timing" value={timing} onChange={(e) => setTiming(e.target.value)} placeholder="e.g. Weekday mornings, ASAP" />
            </div>
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

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-3">{NMG_ATTRIBUTION_TAG}</p>
              <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
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
