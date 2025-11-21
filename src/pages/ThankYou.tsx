import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQueueStore } from "@/stores/useQueueStore";
import { useEffect } from "react";

export default function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get("clinic");
  const { patient, status, leaveQueue } = useQueueStore();

  useEffect(() => {
    // Only show this page if status is served
    if (status !== 'served') {
      navigate('/');
    }
  }, [status, navigate]);

  const handleBookAgain = () => {
    leaveQueue(); // Reset state to idle
    if (patient?.clinicId || clinicId) {
      navigate(`/clinic/${patient?.clinicId || clinicId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Thank you for visiting!</CardTitle>
            <CardDescription className="text-base mt-2">
              Your visit is complete.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleBookAgain} size="lg" className="w-full">
              Book Again
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
