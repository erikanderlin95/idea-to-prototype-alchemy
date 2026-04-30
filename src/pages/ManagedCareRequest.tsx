import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";
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

const ManagedCareRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");

  // Form fields
  const [urgency, setUrgency] = useState("flexible");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);

  useEffect(() => {
    const fetchClinic = async () => {
      if (!id) return;
      const { data } = await supabase.from("clinics").select("*").eq("id", id).single();
      if (data) setClinic(data);
    };
    fetchClinic();
  }, [id]);

  const generateCaseId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "MC-";
    for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  };

  const handleSubmitRequest = async () => {
    if (!contactName.trim() || !contactNumber.trim()) {
      toast.error("Please fill in Name and Contact Number");
      return;
    }
    if (!isValidMobileNumber(contactNumber)) {
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
        clinic_id: id || null,
        clinic_name: clinic?.name || null,
        patient_name: contactName.trim(),
        contact_number: sanitizeMobileNumber(contactNumber),
        urgency,
        source: "marketplace",
        case_type: "managed_care",
        status: "pending_coordinator_review",
      } as any);
      if (error) throw error;
      setCaseId(newCaseId);
      setSubmitted(true);
      console.log(`[MANAGED CARE] Case ${newCaseId} created for clinic: ${clinic?.name}`);
    } catch (err: any) {
      console.error("[MANAGED CARE] Error:", err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!clinic) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 md:px-6 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(`/clinic/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clinic
        </Button>

        <div className="space-y-6 mt-4">
          <div className="space-y-2 text-center">
            <Badge variant="secondary" className="mb-2">Managed Care Pathway</Badge>
            <h1 className="text-3xl font-bold text-foreground">Request Specialist Referral</h1>
            <p className="text-muted-foreground">
              {clinic.name} is a specialist provider. Complete the form below and a care coordinator will contact you shortly.
            </p>
          </div>

          {!submitted ? (
            <Card className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Urgency Level *</Label>
                <RadioGroup value={urgency} onValueChange={setUrgency} className="flex gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="page-urg-urgent" />
                    <Label htmlFor="page-urg-urgent" className="font-normal cursor-pointer">Urgent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soon" id="page-urg-soon" />
                    <Label htmlFor="page-urg-soon" className="font-normal cursor-pointer">Soon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="page-urg-flexible" />
                    <Label htmlFor="page-urg-flexible" className="font-normal cursor-pointer">Flexible</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name *</Label>
                <Input id="contact-name" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-number">Contact Number *</Label>
                <Input id="contact-number" type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="e.g. +6591234567" required />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="mc-page-pdpa-consent"
                  checked={pdpaConsent}
                  onCheckedChange={(checked) => setPdpaConsent(checked === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="mc-page-pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-snug">
                  I consent to my personal data being collected and used by ClynicQ to facilitate queue management and appointment coordination, and shared with the selected clinic for my visit. I understand how my data is handled as described in the{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">
                    Privacy Policy
                  </a>.
                </Label>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground mb-4">{NMG_ATTRIBUTION_TAG}</p>
                <Button
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={handleSubmitRequest}
                  disabled={submitting || !pdpaConsent}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Request Received</h2>
              <p className="text-muted-foreground">
                Your request has been received. A care coordinator will review your case and contact you shortly to recommend the most suitable provider.
              </p>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground">Case Reference</p>
                <p className="text-2xl font-mono font-bold text-foreground">{caseId}</p>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  const message = encodeURIComponent(`Hi, I have a managed care request. My Case ID is: ${caseId}. Please assist me.`);
                  window.open(`https://wa.me/?text=${message}`, "_blank");
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with Care Coordinator
              </Button>
              <p className="text-xs text-muted-foreground pt-2">{NMG_ATTRIBUTION_TAG}</p>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="mt-2"
              >
                Return to Home
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManagedCareRequest;
