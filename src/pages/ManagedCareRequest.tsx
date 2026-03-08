import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { NMG_ATTRIBUTION_TAG } from "@/lib/pathwayUtils";

const ManagedCareRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchClinic = async () => {
      if (!id) return;
      const { data } = await supabase.from("clinics").select("*").eq("id", id).single();
      if (data) setClinic(data);
    };
    fetchClinic();
  }, [id]);

  const handleSubmitRequest = () => {
    // Demo: simulate managed care request submission with attribution
    console.log(`[MANAGED CARE] Request submitted for clinic: ${clinic?.name}`);
    console.log(`[MANAGED CARE] ${NMG_ATTRIBUTION_TAG}`);
    console.log(`[MANAGED CARE] Flow: Patient → Discovery → Managed Care Pathway → Provider`);
    setSubmitted(true);
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
              {clinic.name} is a specialist provider. Appointments are coordinated through the NMG Managed Care Pathway.
            </p>
          </div>

          {!submitted ? (
            <Card className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">How it works</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Submit your managed care request below
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">2.</span>
                      A Medical Concierge will review and coordinate your referral
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">3.</span>
                      You'll be matched with the right specialist and guided through the process
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground mb-4">
                  {NMG_ATTRIBUTION_TAG}
                </p>
                <Button
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={handleSubmitRequest}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Request Managed Care Referral
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Request Submitted</h2>
              <p className="text-muted-foreground">
                Your managed care request has been received. A Medical Concierge will contact you shortly to coordinate your specialist appointment.
              </p>
              <p className="text-xs text-muted-foreground pt-2">
                {NMG_ATTRIBUTION_TAG} • Demo Mode
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="mt-4"
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
