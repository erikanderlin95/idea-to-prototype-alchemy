import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const REASONS = [
  { value: "wait_too_long", label: "Wait is too long" },
  { value: "another_clinic", label: "Decided to visit another clinic" },
  { value: "no_longer_need", label: "Changed Plans" },
  { value: "other", label: "Other" },
];

interface LeaveQueueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after the leave is logged AND the actual cancel logic should run. Should perform the cancel and resolve. */
  onConfirm: () => Promise<void> | void;
  patientName?: string;
  mobileNumber?: string;
  clinicId?: string;
  clinicName?: string;
  queueEntryId?: string;
  queueNumber?: number;
}

export const LeaveQueueDialog = ({
  open,
  onOpenChange,
  onConfirm,
  patientName,
  mobileNumber,
  clinicId,
  clinicName,
  queueEntryId,
  queueNumber,
}: LeaveQueueDialogProps) => {
  const [reason, setReason] = useState<string>("");
  const [otherText, setOtherText] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const reset = () => {
    setReason("");
    setOtherText("");
    setError("");
    setSubmitting(false);
  };

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  const handleSubmit = async () => {
    if (!reason) {
      setError("Please select a reason");
      return;
    }
    if (reason === "other" && !otherText.trim()) {
      setError("Please tell us why");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      // Log leave reason — non-blocking on cancel
      const { error: logError } = await supabase.from("queue_leave_logs").insert({
        patient_name: patientName || null,
        mobile_number: mobileNumber || null,
        clinic_id: clinicId || null,
        clinic_name: clinicName || null,
        queue_entry_id: queueEntryId || null,
        queue_number: queueNumber ?? null,
        reason,
        other_reason: reason === "other" ? otherText.trim() : null,
        status: "left_queue",
      });
      if (logError) console.warn("[LEAVE QUEUE] Log failed:", logError);

      await onConfirm();
      toast.success("You have left the queue.");
      handleClose(false);
    } catch (err: any) {
      console.error("[LEAVE QUEUE] Error:", err);
      setError(err?.message || "Failed to leave queue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Why are you leaving the queue?</DialogTitle>
          <DialogDescription className="text-xs">
            This helps the clinic understand missed visits better.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
          <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
            {REASONS.map((r) => (
              <div key={r.value} className="flex items-center gap-2">
                <RadioGroupItem value={r.value} id={`leave-${r.value}`} />
                <Label htmlFor={`leave-${r.value}`} className="text-sm font-normal cursor-pointer">
                  {r.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {reason === "other" && (
            <Textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Please tell us why"
              className="text-sm min-h-[60px]"
              maxLength={500}
            />
          )}

          {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        </div>

        <DialogFooter className="gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={() => handleClose(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
          >
            {submitting ? "Submitting..." : "Submit & Leave Queue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
