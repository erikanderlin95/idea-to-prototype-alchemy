import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QueueNotificationProps {
  clinicId: string | null;
  userId: string | null;
  clinicName?: string;
}

export const useQueueNotifications = ({ clinicId, userId, clinicName }: QueueNotificationProps) => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");
  const [lastNotifiedPosition, setLastNotifiedPosition] = useState<number | null>(null);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Your browser doesn't support notifications");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === "granted") {
        toast.success("Notifications enabled! We'll alert you when it's almost your turn");
      } else if (permission === "denied") {
        toast.error("Notifications blocked. Enable them in your browser settings");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  // Send browser notification
  const sendNotification = (title: string, body: string, position: number) => {
    if (notificationPermission !== "granted") return;
    
    // Prevent duplicate notifications for the same position
    if (lastNotifiedPosition === position) return;
    
    try {
      const notification = new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: `queue-position-${position}`,
        requireInteraction: true,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setLastNotifiedPosition(position);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  useEffect(() => {
    if (!clinicId || !userId) return;

    // Check initial permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }

    // Subscribe to queue changes
    const channel = supabase
      .channel(`queue-notifications-${clinicId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "queue_entries",
          filter: `clinic_id=eq.${clinicId}`,
        },
        async (payload) => {
          try {
            // For authenticated users, get their entry directly (RLS allows this)
            const { data: myEntry } = await supabase
              .from("queue_entries")
              .select("*")
              .eq("clinic_id", clinicId)
              .eq("user_id", userId)
              .eq("status", "waiting")
              .maybeSingle();

            if (!myEntry) return;

            // Get public queue list via edge function
            const { data: response } = await supabase.functions.invoke(
              "queue-lookup",
              {
                body: {
                  action: "get_public_queue_list",
                  clinic_id: clinicId,
                  mobile_number: "anonymous", // Required param, not used for this action
                },
              }
            );

            const allQueue = response?.queue || [];
            if (!allQueue.length) return;

            const myPosition = allQueue.findIndex((q: any) => q.id === myEntry.id) + 1;
            const queueNumber = myEntry.queue_number;
            const clinic = clinicName || "clinic";

            // Notify based on position
            if (myPosition === 1) {
              sendNotification(
                "🎉 You're Next!",
                `Your turn at ${clinic}! Please head to the clinic now. Queue #${queueNumber}`,
                myPosition
              );
              toast.success("You're next in queue! Head to the clinic", {
                duration: 10000,
              });
            } else if (myPosition === 2) {
              sendNotification(
                "⏰ Almost Your Turn",
                `You're 2nd in queue at ${clinic}. Get ready! Queue #${queueNumber}`,
                myPosition
              );
              toast.info("You're 2nd in queue! Get ready", {
                duration: 8000,
              });
            } else if (myPosition === 3) {
              sendNotification(
                "📱 Coming Up Soon",
                `You're 3rd in queue at ${clinic}. Please prepare to head over. Queue #${queueNumber}`,
                myPosition
              );
              toast.info("You're 3rd in queue! Prepare to head over", {
                duration: 6000,
              });
            }

            // Notify when someone checks in or cancels ahead of you
            if (payload.eventType === "DELETE" || (payload.eventType === "UPDATE" && payload.new.status !== "waiting")) {
              const deletedEntry = payload.old;
              if (deletedEntry && deletedEntry.queue_number < myEntry.queue_number) {
                toast.info("Someone ahead left the queue. Your wait time is shorter!", {
                  duration: 5000,
                });
              }
            }
          } catch (error) {
            console.error("Queue notification error:", error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clinicId, userId, notificationPermission, clinicName, lastNotifiedPosition]);

  return {
    notificationPermission,
    requestNotificationPermission,
  };
};
