import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface ClinicCardProps {
  id?: string;
  name: string;
  type: "GP" | "TCM" | "Wellness";
  address: string;
  queueCount: number;
  waitTime: string;
  rating: number;
  isOpen: boolean;
}

export const ClinicCard = ({
  id,
  name,
  type,
  address,
  queueCount,
  waitTime,
  rating,
  isOpen,
}: ClinicCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please sign in to join the queue");
      navigate("/auth");
      return;
    }

    if (!id) return;

    setIsJoining(true);
    try {
      // Check if user is already in queue
      const { data: existingQueue } = await supabase
        .from("queue_entries")
        .select("*")
        .eq("clinic_id", id)
        .eq("user_id", user.id)
        .eq("status", "waiting")
        .maybeSingle();

      if (existingQueue) {
        toast.info("You're already in this queue!");
        navigate(`/queue?clinic=${id}`);
        return;
      }

      // Get the next queue number
      const { data: queueData } = await supabase
        .from("queue_entries")
        .select("queue_number")
        .eq("clinic_id", id)
        .eq("status", "waiting")
        .order("queue_number", { ascending: false })
        .limit(1);

      const nextQueueNumber = queueData && queueData.length > 0 
        ? queueData[0].queue_number + 1 
        : 1;

      // Join the queue
      const { error } = await supabase.from("queue_entries").insert({
        clinic_id: id,
        user_id: user.id,
        queue_number: nextQueueNumber,
        status: "waiting",
        estimated_wait_time: queueCount * 15,
      });

      if (error) throw error;

      toast.success(`You're #${nextQueueNumber} in the queue!`);
      navigate(`/queue?clinic=${id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to join queue");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 cursor-pointer" onClick={() => id && navigate(`/clinic/${id}`)}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Badge variant="secondary" className="text-xs">
                {type}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 px-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-2 flex-1">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Queue</p>
              <p className="text-sm font-semibold">{queueCount} waiting</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Wait Time</p>
              <p className="text-sm font-semibold">{waitTime}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1" 
            disabled={!isOpen || isJoining}
            onClick={handleJoinQueue}
          >
            <Users className="mr-2 h-4 w-4" />
            {isJoining ? "Joining..." : "Join Queue"}
          </Button>
          <Button 
            className="flex-1" 
            disabled={!isOpen}
            onClick={(e) => {
              e.stopPropagation();
              id && navigate(`/clinic/${id}`);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
