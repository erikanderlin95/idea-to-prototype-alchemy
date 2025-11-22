import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useJoinQueueModal } from "@/contexts/JoinQueueContext";
import { useQueueStore } from "@/stores/useQueueStore";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const JoinQueueModal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isOpen, clinicId, clinicName, queueCount, closeModal } = useJoinQueueModal();
  const { joinQueue } = useQueueStore();
  const [visitType, setVisitType] = useState("");

  const handleJoinQueue = () => {
    if (!user) {
      toast.error("Please sign in to join the queue");
      closeModal();
      navigate("/auth");
      return;
    }

    if (!visitType || !clinicId) return;

    joinQueue({
      clinicId,
      visitType,
      estimatedWaitTime: queueCount * 15,
    });

    toast.success("Successfully joined the queue!");
    setVisitType("");
    closeModal();
    navigate(`/queue?clinic=${clinicId}`);
  };

  const handleClose = () => {
    setVisitType("");
    closeModal();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent 
        className="z-[100]"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Join Queue - {clinicName}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
              <label className="text-sm font-medium text-foreground">Visit Type *</label>
              <Select value={visitType} onValueChange={setVisitType}>
                <SelectTrigger 
                  className="bg-background"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-popover z-[101]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SelectItem value="General Consultation">General Consultation</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="TCM Treatment">TCM Treatment</SelectItem>
                  <SelectItem value="Pain & Wellness">Pain & Wellness</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important Notice:</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Queue order is fully managed by clinic staff.</p>
                  <p>Queue numbers are estimates, not guaranteed.</p>
                  <p>Queue positions may shift due to urgent cases, drop-offs, or clinic triage.</p>
                  <p>ClynicQ displays data based on clinic updates; platform is not liable for delays or changes.</p>
                </div>
              </AlertDescription>
            </Alert>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleJoinQueue} disabled={!visitType}>
            I understand and agree
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
