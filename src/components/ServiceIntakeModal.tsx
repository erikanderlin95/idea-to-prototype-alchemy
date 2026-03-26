import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, MessageCircle, Copy, ClipboardList } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const sanitizeMobileNumber = (mobile: string): string => {
  const hasPlus = mobile.trim().startsWith('+');
  const digitsOnly = mobile.replace(/\D/g, '');
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
};

const isValidMobileNumber = (mobile: string): boolean => {
  const sanitized = sanitizeMobileNumber(mobile);
  return /^\+?[0-9]{8,15}$/.test(sanitized);
};

const generateCaseId = (prefix: string) => {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let rand = "";
  for (let i = 0; i < 4; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  return `${prefix}-${datePart}-${rand}`;
};

interface ServiceIntakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceType: "speaker" | "afterlife";
  whatsappNumber?: string;
  /** Label for the main concern/need field */
  concernLabel?: string;
  concernPlaceholder?: string;
  disclaimerItems: string[];
  icon?: React.ReactNode;
}

export const ServiceIntakeModal = ({
  open,
  onOpenChange,
  serviceName,
  serviceType,
  whatsappNumber = "",
  concernLabel = "Your Enquiry *",
  concernPlaceholder = "Tell us what you need...",
  disclaimerItems,
  icon,
}: ServiceIntakeModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [notes, setNotes] = useState("");
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");

  const prefix = serviceType === "speaker" ? "CQ-SPK" : "CQ-ALS";

  const reset = () => {
    setName("");
    setPhone("");
    setConcern("");
    setNotes("");
    setDisclaimerAgreed(false);
    setSubmitted(false);
    setSubmitting(false);
    setCaseId("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !concern.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!isValidMobileNumber(phone)) {
      toast.error("Please enter a valid contact number");
      return;
    }
    setSubmitting(true);
    const newCaseId = generateCaseId(prefix);
    try {
      const { error } = await supabase.from("booking_leads").insert({
        patient_name: name.trim(),
        mobile_number: sanitizeMobileNumber(phone),
        clinic_name: serviceName,
        booking_type: serviceType === "speaker" ? "speaker_enquiry" : "afterlife_enquiry",
        source: "service_profile",
        case_id: newCaseId,
        status: "initiated",
        redirect_type: "whatsapp",
      });
      if (error) throw error;
      setCaseId(newCaseId);
      setSubmitted(true);
    } catch (err: any) {
      console.error("[SERVICE INTAKE] Error:", err);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm enquiring about ${serviceName}.\n\nCase ID: ${caseId}\nName: ${name}\nEnquiry: ${concern}${notes ? `\nNotes: ${notes}` : ""}\n\nPlease assist me.`
    );
    const url = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${message}`
      : `https://wa.me/?text=${message}`;
    window.open(url, "_blank");
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base flex items-center gap-2">
            {icon || <ClipboardList className="h-5 w-5 text-primary" />}
            Enquire — {serviceName}
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor="si-name" className="text-xs font-medium">Full Name *</Label>
              <Input id="si-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1 h-9 text-sm" />
            </div>
            <div>
              <Label htmlFor="si-phone" className="text-xs font-medium">Mobile Number *</Label>
              <Input id="si-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +6591234567" className="mt-1 h-9 text-sm" />
              <p className="text-[10px] text-muted-foreground mt-0.5">8-15 digits, country code optional</p>
            </div>
            <div>
              <Label htmlFor="si-concern" className="text-xs font-medium">{concernLabel}</Label>
              <Textarea id="si-concern" value={concern} onChange={(e) => setConcern(e.target.value)} placeholder={concernPlaceholder} className="mt-1 text-sm min-h-[60px]" />
            </div>
            <div>
              <Label htmlFor="si-notes" className="text-xs font-medium">Additional Notes</Label>
              <Textarea id="si-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any other details..." className="mt-1 text-sm min-h-[50px]" />
            </div>

            <div className="p-2.5 rounded-md bg-muted/50 border border-border/40 space-y-1.5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Please Note</p>
              <ul className="space-y-1 text-[11px] text-muted-foreground list-disc pl-3.5">
                {disclaimerItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-2" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                id="si-disclaimer"
                checked={disclaimerAgreed}
                onCheckedChange={(checked) => setDisclaimerAgreed(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="si-disclaimer" className="text-[11px] text-foreground font-medium cursor-pointer leading-tight">
                I understand and agree
              </Label>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold h-10"
              onClick={handleSubmit}
              disabled={submitting || !disclaimerAgreed}
            >
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-foreground">Enquiry Received</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your enquiry has been recorded. Continue via WhatsApp to connect directly.
              </p>
            </div>

            <div className="text-center p-4 border-2 border-primary/30 rounded-lg bg-primary/5">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Case ID</p>
              <p className="text-2xl font-mono font-black tracking-[0.15em] text-primary">{caseId}</p>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{serviceName}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                navigator.clipboard.writeText(caseId);
                toast.success("Case ID copied!");
              }}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Copy Case ID
            </Button>

            <Button
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold h-10"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="mr-1.5 h-4 w-4" />
              Continue via WhatsApp
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
