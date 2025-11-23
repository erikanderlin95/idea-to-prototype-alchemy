import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { MyClynicQPlugin } from "@/components/MyClynicQPlugin";
import { Footer } from "@/components/Footer";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueueStore } from "@/stores/useQueueStore";
import { toast } from "sonner";

const Index = () => {
  const { showOnboarding, completeOnboarding, startOnboarding } = useOnboarding();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [visitType, setVisitType] = useState("");
  const { joinQueue } = useQueueStore();
  const navigate = useNavigate();

  const handleOpenJoinModal = (clinic: any) => {
    setSelectedClinic(clinic);
    setVisitType("");
    setShowJoinModal(true);
  };

  const handleJoinQueue = () => {
    if (!visitType || !selectedClinic) {
      toast.error("Please select a visit type");
      return;
    }

    const estimatedWait = selectedClinic.queueCount * 15;
    joinQueue({
      clinicId: selectedClinic.id,
      visitType,
      estimatedWaitTime: estimatedWait || 15,
    });

    toast.success("Successfully joined the queue!");
    setShowJoinModal(false);
    navigate(`/queue?clinic=${selectedClinic.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRestartTour={startOnboarding} />
      <main>
        <Hero />
        <Features />
        <MarketplaceSection onJoinQueue={handleOpenJoinModal} />
        <MyClynicQPlugin />
      </main>
      <Footer />
      
      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}

      {/* Join Queue Modal */}
      <AlertDialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Join Queue - {selectedClinic?.name}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visit-type">Visit Type *</Label>
                <Select value={visitType} onValueChange={setVisitType}>
                  <SelectTrigger id="visit-type">
                    <SelectValue placeholder="Select visit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Consultation">General Consultation</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="TCM Treatment">TCM Treatment</SelectItem>
                    <SelectItem value="Pain & Wellness">Pain & Wellness</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 pt-2">
                <p>Queue order is fully managed by clinic staff.</p>
                <p>Queue numbers are estimates, not guaranteed.</p>
                <p>Queue positions may shift due to urgent cases, drop-offs, or clinic triage.</p>
                <p>ClynicQ displays data based on clinic updates; platform is not liable for delays or changes.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleJoinQueue} disabled={!visitType}>
              I understand and agree
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
