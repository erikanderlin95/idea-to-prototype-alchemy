import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { isManagedCareType } from "@/lib/pathwayUtils";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState<any>(null);

  useEffect(() => {
    fetchClinicData();
  }, [id]);

  const fetchClinicData = async () => {
    try {
      const { data } = await supabase.from("clinics").select("*").eq("id", id).single();
      if (data) {
        // Redirect specialist providers to managed care flow
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
    // Use clinic's configured booking URL or fallback to placeholder
    const bookingUrl = clinic.booking_url || "https://calendly.com/your-clinic";
    window.open(bookingUrl, "_blank");
  };

  const handleContactClinic = () => {
    if (clinic.phone) {
      // Format phone number for WhatsApp (remove spaces, dashes, etc.)
      const cleanPhone = clinic.phone.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanPhone}`, "_blank");
    }
  };

  if (!clinic) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-8 max-w-2xl">
        <div className="space-y-8 text-center mt-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Book Your Appointment</h1>
            <p className="text-xl text-muted-foreground">{clinic.name}</p>
          </div>

          <div className="space-y-4">
            {clinic.booking_url ? (
              <>
                <Button 
                  onClick={handleBookAppointment}
                  size="lg"
                  className="w-full max-w-md mx-auto text-lg py-6"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Book Appointment
                </Button>

                <p className="text-sm text-muted-foreground pt-4">
                  Bookings are handled by the clinic's existing system (Calendly / Google Calendar).
                </p>
              </>
            ) : (
              <>
                <Button 
                  size="lg"
                  className="w-full max-w-md mx-auto text-lg py-6"
                  disabled
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Book Appointment
                </Button>

                <p className="text-sm text-muted-foreground pt-4">
                  Online booking is not yet available for this clinic.
                </p>

                {clinic.phone && (
                  <Button 
                    onClick={handleContactClinic}
                    variant="outline"
                    size="lg"
                    className="w-full max-w-md mx-auto text-lg py-6"
                  >
                    Contact Clinic
                  </Button>
                )}
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => navigate(`/clinic/${id}`)}
            className="mt-8"
          >
            Back to Clinic
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
