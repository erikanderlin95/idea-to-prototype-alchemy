import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface Phase2FeaturesProps {
  enabled: boolean;
  myQueueEntry: any;
  myPosition: number | null;
  clinicName: string;
}

export const usePhase2Features = ({
  enabled,
  myQueueEntry,
  myPosition,
  clinicName,
}: Phase2FeaturesProps) => {
  const previousPositionRef = useRef<number | null>(null);
  const preVisitReminderSent = useRef(false);
  const nextAlertSent = useRef(false);
  const checkInAlertSent = useRef(false);

  // Smart Queue Logic: Auto-detect position changes and notify
  useEffect(() => {
    if (!enabled || !myQueueEntry || myPosition === null) return;

    // Detect position improvements (someone ahead cancelled)
    if (
      previousPositionRef.current !== null &&
      myPosition < previousPositionRef.current
    ) {
      const improvement = previousPositionRef.current - myPosition;
      toast.success(
        `Queue updated! You moved up ${improvement} ${
          improvement === 1 ? "position" : "positions"
        }`,
        {
          description: "Someone ahead cancelled their spot",
          duration: 5000,
        }
      );
    }

    previousPositionRef.current = myPosition;
  }, [enabled, myPosition, myQueueEntry]);

  // Automated Reminders: Pre-visit reminder
  useEffect(() => {
    if (!enabled || !myQueueEntry || preVisitReminderSent.current) return;

    // Simulate pre-visit reminder when user joins queue
    if (myQueueEntry.status === "waiting" && !preVisitReminderSent.current) {
      setTimeout(() => {
        toast.info("Pre-visit Reminder", {
          description: `Your appointment at ${clinicName} is confirmed. Please arrive 10 minutes early.`,
          duration: 6000,
        });
        preVisitReminderSent.current = true;
      }, 3000); // Show after 3 seconds
    }
  }, [enabled, myQueueEntry, clinicName]);

  // Automated Reminders: "You're next" alert
  useEffect(() => {
    if (!enabled || !myQueueEntry || myPosition === null) return;

    if (myPosition === 2 && !nextAlertSent.current) {
      toast.warning("You're Next!", {
        description: "Please prepare to be called. Your turn is coming up.",
        duration: 8000,
      });
      nextAlertSent.current = true;
    }
  }, [enabled, myPosition, myQueueEntry]);

  // Automated Reminders: "Please check in" alert
  useEffect(() => {
    if (!enabled || !myQueueEntry) return;

    if (myQueueEntry.status === "serving" && !checkInAlertSent.current) {
      toast.success("Please Check In", {
        description: "It's your turn! Please proceed to the reception desk.",
        duration: 10000,
      });
      checkInAlertSent.current = true;
    }
  }, [enabled, myQueueEntry]);

  // Reset alerts when queue entry changes
  useEffect(() => {
    if (!myQueueEntry) {
      preVisitReminderSent.current = false;
      nextAlertSent.current = false;
      checkInAlertSent.current = false;
      previousPositionRef.current = null;
    }
  }, [myQueueEntry]);
};
