import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, Handshake } from "lucide-react";
import { toast } from "sonner";

interface PartnerIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerType: string;
  title?: string;
  description?: string;
  accentClassName?: string;
}

const MOBILE_REGEX = /^\+?[0-9]{8,15}$/;

const PartnerIntakeDialog = ({
  open,
  onOpenChange,
  partnerType,
  title = "Partner With Us",
  description = "Tell us about your organisation and we'll be in touch.",
  accentClassName = "bg-primary hover:bg-primary/90",
}: PartnerIntakeDialogProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdpa, setPdpa] = useState(false);
  const [form, setForm] = useState({
    organisationName: "",
    contactPerson: "",
    phone: "",
    website: "",
  });

  const reset = () => {
    setSubmitted(false);
    setLoading(false);
    setPdpa(false);
    setForm({ organisationName: "", contactPerson: "", phone: "", website: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.organisationName || !form.contactPerson || !form.phone) return;
    const sanitized = form.phone.replace(/\s|-/g, "");
    if (!MOBILE_REGEX.test(sanitized)) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (!pdpa) return;
    setLoading(true);
    try {
      await supabase.functions.invoke("clinic-onboarding", {
        body: {
          clinicName: form.organisationName,
          contactPerson: form.contactPerson,
          phone: sanitized,
          clinicType: partnerType,
          website: form.website,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) setTimeout(reset, 200);
        onOpenChange(o);
      }}
    >
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-xl font-bold">Thank you!</h2>
            <p className="text-sm text-muted-foreground">
              We've received your request and will be in touch shortly.
            </p>
            <Button onClick={() => onOpenChange(false)} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                {title}
              </DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="p-org">Organisation Name *</Label>
                <Input
                  id="p-org"
                  value={form.organisationName}
                  onChange={(e) => setForm({ ...form, organisationName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-contact">Contact Person *</Label>
                <Input
                  id="p-contact"
                  value={form.contactPerson}
                  onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-phone">Phone / WhatsApp *</Label>
                <Input
                  id="p-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-web">Website (optional)</Label>
                <Input
                  id="p-web"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="p-pdpa"
                  checked={pdpa}
                  onCheckedChange={(c) => setPdpa(c === true)}
                />
                <Label htmlFor="p-pdpa" className="text-xs leading-snug font-normal">
                  I consent to ClynicQ contacting me about this partnership enquiry.
                </Label>
              </div>
              <Button
                type="submit"
                disabled={loading || !pdpa}
                className={`w-full ${accentClassName}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PartnerIntakeDialog;
