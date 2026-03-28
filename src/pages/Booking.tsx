import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Copy, ArrowLeft } from "lucide-react";
import { isManagedCareType } from "@/lib/pathwayUtils";
import { toast } from "sonner";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("case_id");
  const [clinic, setClinic] = useState<any>(null);

  useEffect(() => {
    fetchClinicData();
  }, [id]);

  const fetchClinicData = async () => {
    try {
      const { data } = await supabase.from("clinics").select("*").eq("id", id).single();
      if (data) {
        if (isManagedCareType(data.type)) {
          navigate(`/managed-care-request/${id}`, { replace: true });
          return;
        }
        setClinic(data);
      }
    } catch (error) {
      console.error("Error fetching clinic data:", error);
    }
  };

  const handleBookAppointment = () => {
    const bookingUrl = clinic.booking_url || "https://calendly.com/your-clinic";
    const separator = bookingUrl.includes("?") ? "&" : "?";
    const finalUrl = caseId ? `${bookingUrl}${separator}case_id=${encodeURIComponent(caseId)}` : bookingUrl;
    window.open(finalUrl, "_blank");
  };

  const handleContactClinic = () => {
    if (clinic.phone) {
      const cleanPhone = clinic.phone.replace(/\D/g, '');
      const message = caseId
        ? encodeURIComponent(`Hi, I'd like to book an appointment.\nCase ID: ${caseId}`)
        : encodeURIComponent("Hi, I'd like to book an appointment.");
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
    }
  };

  if (!clinic) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-8 max-w-lg">
        <div className="space-y-6 text-center mt-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Continue to Clinic Booking</h1>
            <p className="text-sm text-muted-foreground">{clinic.name}</p>
          </div>

          {/* Case ID display */}
          {caseId && (
            <div className="p-3 border rounded-lg bg-muted/50">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Your Case ID</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-lg font-mono font-bold text-primary tracking-wide">{caseId}</p>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => {
                  navigator.clipboard.writeText(caseId);
                  toast.success("Case ID copied!");
                }}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">This tracks your booking internally</p>
            </div>
          )}

          <div className="space-y-3">
            {clinic.booking_url ? (
              <>
                <Button onClick={handleBookAppointment} size="lg" className="w-full text-sm h-12" variant="outline">
                  <Calendar className="mr-2 h-5 w-5" />
                  Continue to Clinic Booking
                </Button>
                <p className="text-xs text-muted-foreground">
                  You'll be redirected to the clinic's own booking system.
                </p>
              </>
            ) : (
              <>
                <Button size="lg" className="w-full text-sm h-12" variant="outline" disabled>
                  <Calendar className="mr-2 h-5 w-5" />
                  Continue to Clinic Booking
                </Button>
                <p className="text-xs text-muted-foreground">
                  Online booking is not yet available for this clinic.
                </p>
              </>
            )}

            {clinic.phone && (
              <Button onClick={handleContactClinic} variant="outline" size="lg" className="w-full text-sm h-12">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact via WhatsApp
              </Button>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={() => navigate(`/clinic/${id}`)} className="text-xs">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Clinic
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
