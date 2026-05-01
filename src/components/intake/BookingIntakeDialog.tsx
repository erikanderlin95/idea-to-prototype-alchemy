import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Copy, Calendar, MessageCircle } from "lucide-react";
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

interface BookingIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinicId: string;
  clinicName: string;
  /** Optional doctor preselect — sent in notes */
  doctorName?: string;
}

export const BookingIntakeDialog = ({
  open,
  onOpenChange,
  clinicId,
  clinicName,
  doctorName,
}: BookingIntakeDialogProps) => {
  const [leadName, setLeadName] = useState("");
  const [leadMobile, setLeadMobile] = useState("");
  const [leadVisitType, setLeadVisitType] = useState("");
  const [leadPrefDate, setLeadPrefDate] = useState("");
  const [leadPrefTime, setLeadPrefTime] = useState("");
  const [leadNotes, setLeadNotes] = useState("");
  const [leadDisclaimerAgreed, setLeadDisclaimerAgreed] = useState(false);
  const [leadPdpaConsent, setLeadPdpaConsent] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [bookingCaseId, setBookingCaseId] = useState("");
  const [bookingRedirectUrl, setBookingRedirectUrl] = useState("");
  const [bookingRedirectType, setBookingRedirectType] = useState("");

  const reset = () => {
    setLeadName("");
    setLeadMobile("");
    setLeadVisitType("");
    setLeadPrefDate("");
    setLeadPrefTime("");
    setLeadNotes("");
    setLeadDisclaimerAgreed(false);
    setLeadPdpaConsent(false);
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

      const { data: clinicData } = await supabase
        .from("clinics")
        .select("booking_url, phone")
        .eq("id", clinicId)
        .single();

      const bookingUrl = clinicData?.booking_url || null;
      const clinicPhone = clinicData?.phone?.replace(/\D/g, "") || "";
      const redirectType = bookingUrl ? "web" : clinicPhone ? "whatsapp" : "web";

      const composedNotes = [
        doctorName ? `Preferred doctor: ${doctorName}` : null,
        leadNotes.trim() || null,
      ]
        .filter(Boolean)
        .join("\n");

      const { data: response } = await supabase.functions.invoke("queue-lookup", {
        body: {
          action: "save_booking_lead",
          clinic_id: clinicId,
          mobile_number: sanitizedMobile,
          patient_name: leadName.trim(),
          clinic_name: clinicName,
          booking_type: "external",
          redirect_type: redirectType,
          redirect_url: bookingUrl || null,
          preferred_date: leadPrefDate || null,
          preferred_time: leadPrefTime || null,
          notes: composedNotes || null,
        },
      });

      const caseId = response?.case_id || "";
      setBookingCaseId(caseId);

      if (bookingUrl) {
        const separator = bookingUrl.includes("?") ? "&" : "?";
        setBookingRedirectUrl(`${bookingUrl}${separator}case_id=${encodeURIComponent(caseId)}`);
        setBookingRedirectType("web");
      } else if (clinicPhone) {
        const message = encodeURIComponent(
          `Hi, I'd like to book an appointment.\nName: ${leadName.trim()}\nCase ID: ${caseId}`,
        );
        setBookingRedirectUrl(`https://wa.me/${clinicPhone}?text=${message}`);
        setBookingRedirectType("whatsapp");
      } else {
        setBookingRedirectUrl("");
        setBookingRedirectType("none");
      }

      onOpenChange(false);
      setShowBookingConfirm(true);
    } catch (err) {
      console.error("Lead save error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  const handleBookingRedirect = () => {
    if (bookingRedirectUrl) {
      window.open(bookingRedirectUrl, "_blank");
    }
    setShowBookingConfirm(false);
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
        <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base">Continue to Clinic Booking — {clinicName}</DialogTitle>
            <DialogDescription className="text-xs">Enter your details to proceed</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="lead-name" className="text-xs font-medium">
                Patient Name <span className="text-muted-foreground font-normal">(as per NRIC)</span> *
              </Label>
              <Input
                id="lead-name"
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Enter Patient Full Name"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="lead-mobile" className="text-xs font-medium">Mobile Number *</Label>
              <Input
                id="lead-mobile"
                type="tel"
                value={leadMobile}
                onChange={(e) => setLeadMobile(e.target.value)}
                placeholder="e.g. +6591234567"
                className="mt-1 h-9 text-sm"
              />
              <p className="text-[10px] text-muted-foreground mt-0.5">8-15 digits, country code optional</p>
            </div>
            <div>
              <Label htmlFor="lead-visit-type" className="text-xs font-medium">Visit Type</Label>
              <Select value={leadVisitType} onValueChange={setLeadVisitType}>
                <SelectTrigger className="mt-1 w-full h-9 text-sm">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Follow Up">Follow Up</SelectItem>
                  <SelectItem value="Health Screening">Health Screening</SelectItem>
                  <SelectItem value="Vaccination">Vaccination</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lead-notes" className="text-xs font-medium">Notes</Label>
              <Textarea
                id="lead-notes"
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Any additional information..."
                className="mt-1 text-sm min-h-[60px]"
              />
            </div>

            <div className="p-2.5 rounded-md bg-muted/50 border border-border/40 space-y-1.5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Please Note</p>
              <ul className="space-y-1 text-[11px] text-muted-foreground list-disc pl-3.5">
                <li>This submission sends your request to the clinic for booking</li>
                <li>The clinic will contact you to confirm your appointment</li>
                <li>Appointment timing and availability are managed by the clinic</li>
                <li>Please ensure your contact details are accurate and reachable</li>
              </ul>
            </div>

            <div className="flex items-start gap-2">
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

            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="lead-pdpa-consent"
                  checked={leadPdpaConsent}
                  onCheckedChange={(checked) => setLeadPdpaConsent(checked === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="lead-pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-tight">
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
              <p className="text-[10px] text-muted-foreground leading-tight">
                This is not for medical emergencies. Please visit A&amp;E or call emergency services if urgent.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
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

      {/* Confirmation */}
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
                <span className="font-medium">{clinicName}</span>
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
    </>
  );
};
