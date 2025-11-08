import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";

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
  const [myQueueEntry, setMyQueueEntry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && id) {
      checkQueueStatus();
      
      // Subscribe to queue changes
      const channel = supabase
        .channel(`queue-${id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'queue_entries',
            filter: `clinic_id=eq.${id}`,
          },
          () => {
            checkQueueStatus();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, id]);

  const checkQueueStatus = async () => {
    if (!user || !id) return;
    
    const { data } = await supabase
      .from("queue_entries")
      .select("*")
      .eq("clinic_id", id)
      .eq("user_id", user.id)
      .eq("status", "waiting")
      .maybeSingle();
    
    setMyQueueEntry(data);
  };

  const handleCancelQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("queue_entries")
        .delete()
        .eq("id", myQueueEntry.id);

      if (error) throw error;

      toast.success("Left the queue successfully");
      setMyQueueEntry(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to leave queue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!myQueueEntry) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("queue_entries")
        .update({ status: "checked_in" })
        .eq("id", myQueueEntry.id);

      if (error) throw error;

      toast.success("Checked in successfully!");
      navigate(`/queue?clinic=${id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to check in");
    } finally {
      setIsLoading(false);
    }
  };

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
    <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 cursor-pointer bg-gradient-to-br from-card to-card/50 onboarding-join-queue" onClick={() => id && navigate(`/clinic/${id}`)}>
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{name}</h3>
              <Badge variant="secondary" className="text-xs font-medium">
                {type}
              </Badge>
              {isOpen ? (
                <Badge variant="outline" className="text-xs border-accent text-accent">
                  Open
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
                  Closed
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4 px-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 onboarding-stats">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">In Queue</p>
              <p className="text-base font-bold">{queueCount} people</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Est. Wait</p>
              <p className="text-base font-bold">{waitTime}</p>
            </div>
          </div>
        </div>

        {myQueueEntry ? (
          <div className="space-y-3 pt-2">
            <div className="relative p-5 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 rounded-xl border-2 border-primary shadow-lg shadow-primary/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg animate-pulse">
                      #{myQueueEntry.queue_number}
                    </div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent animate-ping" />
                  </div>
                  <div>
                    <p className="text-base font-black text-foreground mb-1">🎉 You're in the Queue!</p>
                    <p className="text-sm font-bold text-primary">Position <span className="text-lg">#{myQueueEntry.queue_number}</span> of {queueCount}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs font-bold">
                  Waiting
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mt-3 p-3 bg-background/50 rounded-lg backdrop-blur-sm">
                <Clock className="h-4 w-4 text-accent" />
                <p className="text-sm font-bold text-foreground">
                  Est. Wait: <span className="text-accent">{myQueueEntry.queue_number * 15} mins</span>
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/30 border-0" 
                disabled={isLoading}
                onClick={handleCheckIn}
              >
                <CheckCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />
                Check In
              </Button>
              <Button 
                variant="outline"
                className="flex-1 bg-gradient-to-r from-destructive/10 to-red-500/10 hover:from-destructive/20 hover:to-red-500/20 border-2 border-destructive text-destructive font-bold" 
                disabled={isLoading}
                onClick={handleCancelQueue}
              >
                <XCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />
                Leave Queue
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline"
              className="flex-1 hover:bg-primary/10 hover:border-primary" 
              disabled={!isOpen || isJoining}
              onClick={handleJoinQueue}
            >
              <Users className="mr-2 h-4 w-4" />
              {isJoining ? "Joining..." : "Join Queue"}
            </Button>
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90" 
              disabled={!isOpen}
              onClick={(e) => {
                e.stopPropagation();
                id && navigate(`/clinic/${id}`);
              }}
            >
              View Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
