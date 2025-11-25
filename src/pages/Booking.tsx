import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clinic, setClinic] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  useEffect(() => {
    fetchClinicData();
  }, [id]);

  const fetchClinicData = async () => {
    try {
      const [clinicData, doctorsData] = await Promise.all([
        supabase.from("clinics").select("*").eq("id", id).single(),
        supabase.from("doctors").select("*").eq("clinic_id", id),
      ]);

      if (clinicData.data) setClinic(clinicData.data);
      if (doctorsData.data) setDoctors(doctorsData.data);
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error("Failed to load clinic information");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        user_id: user?.id || null,
        clinic_id: id,
        doctor_id: selectedDoctor || null,
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        reason,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Appointment booked successfully!");
      
      // Navigate to appointments page only if user is logged in
      if (user) {
        navigate("/appointments");
      } else {
        toast.info("Your appointment request has been submitted. The clinic will contact you to confirm.");
        navigate(`/clinic/${id}`);
      }
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!clinic) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Book Appointment</h1>
            <p className="text-muted-foreground mt-2">{clinic.name}</p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {doctors.length > 0 && (
                <div className="space-y-2">
                  <Label>Select Doctor (Optional)</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any available doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any available doctor</SelectItem>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="w-full"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Brief description of your symptoms or reason for visit..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/clinic/${id}`)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
