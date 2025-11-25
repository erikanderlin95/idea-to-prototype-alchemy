import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const BookingTriage = () => {
  const handleBookAppointment = () => {
    // Placeholder Calendly URL - clinic will configure their own
    window.open("https://calendly.com/your-clinic", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mt-12 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Book Your Appointment</h1>
            <p className="text-muted-foreground">
              Click below to schedule your visit with us
            </p>
          </div>

          <Button 
            onClick={handleBookAppointment}
            size="lg"
            className="w-full"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>

          <p className="text-sm text-muted-foreground pt-4">
            📋 After booking, you will be redirected to the clinic's intake form (Google Form).
          </p>
        </div>
      </main>
    </div>
  );
};

export default BookingTriage;
