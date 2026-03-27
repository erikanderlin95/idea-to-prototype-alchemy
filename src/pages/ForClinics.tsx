import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2 } from "lucide-react";

const ForClinics = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    clinicName: "",
    contactPerson: "",
    phone: "",
    clinicType: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clinicName || !form.contactPerson || !form.phone || !form.clinicType) return;
    setLoading(true);
    try {
      await supabase.functions.invoke("clinic-onboarding", {
        body: form,
      });
    } catch (err) {
      console.error("Submission error:", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <CheckCircle className="h-14 w-14 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Thank you!</h2>
              <p className="text-muted-foreground text-[15px] max-w-sm mx-auto">
                Thanks, we've received your request. We'll reach out shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Apply to Join ClynicQ
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  We are onboarding a small group of clinics for our pilot.
                  <br />
                  No change to your existing workflow.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="clinicName">Clinic Name *</Label>
                  <Input
                    id="clinicName"
                    value={form.clinicName}
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                    placeholder="e.g. Sunrise Family Clinic"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactPerson">Contact Person Name *</Label>
                  <Input
                    id="contactPerson"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone / WhatsApp Number *</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+65 9123 4567"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="clinicType">Clinic Type *</Label>
                  <Select
                    value={form.clinicType}
                    onValueChange={(val) => setForm({ ...form, clinicType: val })}
                    required
                  >
                    <SelectTrigger id="clinicType">
                      <SelectValue placeholder="Select clinic type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GP">GP</SelectItem>
                      <SelectItem value="TCM">TCM</SelectItem>
                      <SelectItem value="Allied Health">Allied Health</SelectItem>
                      <SelectItem value="Mental Health">Mental Health</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="website">Website / Booking Link (optional)</Label>
                  <Input
                    id="website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForClinics;
