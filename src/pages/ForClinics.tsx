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
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ForClinics = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdpaConsent, setPdpaConsent] = useState(false);
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
    if (!pdpaConsent) return;
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
              <h2 className="text-2xl font-bold text-foreground">{t("forClinics.thankYou")}</h2>
              <p className="text-muted-foreground text-[15px] max-w-sm mx-auto">
                {t("forClinics.thankYouDesc")}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {t("forClinics.title")}
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
                  {t("forClinics.subtitle")}
                </p>
                <ul className="text-left max-w-sm mx-auto space-y-2 text-[14px] text-muted-foreground mb-2">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>{t("forClinics.bullet1")}</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>{t("forClinics.bullet2")}</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>{t("forClinics.bullet3")}</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="clinicName">{t("forClinics.clinicName")}</Label>
                  <Input
                    id="clinicName"
                    value={form.clinicName}
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                    placeholder={t("forClinics.clinicNamePlaceholder")}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactPerson">{t("forClinics.contactPerson")}</Label>
                  <Input
                    id="contactPerson"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder={t("forClinics.contactPersonPlaceholder")}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">{t("forClinics.phone")}</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={t("forClinics.phonePlaceholder")}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="clinicType">{t("forClinics.clinicType")}</Label>
                  <Select
                    value={form.clinicType}
                    onValueChange={(val) => setForm({ ...form, clinicType: val })}
                    required
                  >
                    <SelectTrigger id="clinicType">
                      <SelectValue placeholder={t("forClinics.clinicTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GP">GP</SelectItem>
                      <SelectItem value="TCM">TCM</SelectItem>
                      <SelectItem value="Allied Health">{t("forClinics.alliedHealth")}</SelectItem>
                      <SelectItem value="Mental Health">{t("forClinics.mentalHealth")}</SelectItem>
                      <SelectItem value="Others">{t("forClinics.others")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="website">{t("forClinics.website")}</Label>
                  <Input
                    id="website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    id="fc-pdpa-consent"
                    checked={pdpaConsent}
                    onCheckedChange={(checked) => setPdpaConsent(checked === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="fc-pdpa-consent" className="text-[11px] text-foreground font-medium cursor-pointer leading-snug">
                    I consent to my personal data being collected and used by ClynicQ to facilitate queue management and appointment coordination, and shared with the selected clinic and partner for my visit. I understand how my data is handled as described in the{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">
                      Privacy Policy
                    </a>.
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading || !pdpaConsent}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("forClinics.submitting")}
                    </>
                  ) : (
                    t("forClinics.submitRequest")
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">{t("forClinics.reviewNote")}</p>
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