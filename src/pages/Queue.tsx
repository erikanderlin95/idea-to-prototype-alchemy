import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Calendar, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useQueueStore } from "@/stores/useQueueStore";
import { useLanguage } from "@/contexts/LanguageContext";

const Queue = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { patient, status, servePatient, leaveQueue } = useQueueStore();

  const [clinic, setClinic] = useState<any>(null);
  const [dbQueue, setDbQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const clinicId = searchParams.get("clinic");
    if (!clinicId) {
      navigate("/");
      return;
    }

    // Redirect to thank-you if served
    if (status === 'served') {
      navigate('/thank-you');
      return;
    }

    loadQueueData();
    subscribeToQueue();

    return () => {
      supabase.removeAllChannels();
    };
  }, [user, searchParams, navigate, status]);

  const loadQueueData = async () => {
    const clinicId = searchParams.get("clinic");
    if (!clinicId) return;

    try {
      const [clinicData, queueData] = await Promise.all([
        supabase.from("clinics").select("*").eq("id", clinicId).single(),
        supabase.from("queue_entries")
          .select("*, profiles(full_name)")
          .eq("clinic_id", clinicId)
          .in("status", ["waiting", "checked_in", "serving"])
          .order("queue_number"),
      ]);

      if (clinicData.data) setClinic(clinicData.data);
      if (queueData.data) setDbQueue(queueData.data);
    } catch (error) {
      console.error("Error loading queue:", error);
      toast.error(t("queue.loadError"));
    } finally {
      setLoading(false);
    }
  };

  const subscribeToQueue = () => {
    const clinicId = searchParams.get("clinic");
    if (!clinicId) return;

    const channel = supabase
      .channel(`queue-${clinicId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "queue_entries",
          filter: `clinic_id=eq.${clinicId}`,
        },
        () => {
          loadQueueData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleLeaveQueue = () => {
    leaveQueue();
    toast.success(t("clinicCard.leftQueue"));
    navigate('/');
  };

  const handleServed = () => {
    servePatient();
    navigate('/thank-you');
  };

  if (loading || !patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">{t("queue.loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>

          <Card className="p-8">
            <div className="text-center space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{clinic?.name}</h1>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <p>{clinic?.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">{t("queue.queueSize")}</p>
                  <p className="text-2xl font-bold">{dbQueue.length}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">{t("queue.estimatedWait")}</p>
                  <p className="text-2xl font-bold">{patient.estimatedWaitTime} {t("queue.mins")}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-2 border-primary">
            <div className="text-center space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t("queue.yourNumber")}</p>
                <p className="text-6xl font-bold text-primary">#{patient.queueNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">{t("queue.peopleAhead")}</p>
                  <p className="text-3xl font-bold">{patient.queueNumber - 1}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">{t("queue.estimatedWait")}</p>
                  <p className="text-3xl font-bold">{patient.estimatedWaitTime} {t("queue.mins")}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("queue.visitType")}</p>
                <p className="text-lg">{patient.visitType}</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleLeaveQueue}
                >
                  {t("queue.leaveQueue")}
                </Button>
                {process.env.NODE_ENV === "development" && (
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleServed}
                  >
                    {t("queue.simulateServed")}
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t("queue.currentQueue")}
            </h3>
            <div className="space-y-2">
              {dbQueue.slice(0, 10).map((entry: any, index: number) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    entry.user_id === user?.id ? "bg-primary/10 border border-primary" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={entry.user_id === user?.id ? "default" : "secondary"}>
                      #{entry.queue_number}
                    </Badge>
                    <span className="font-medium">
                      {entry.user_id === user?.id ? t("common.you") : `${t("queue.patient")} ${index + 1}`}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {entry.status === "waiting" && t("clinicCard.waiting")}
                    {entry.status === "checked_in" && "Checked In"}
                    {entry.status === "serving" && "Being Served"}
                  </Badge>
                </div>
              ))}
              {dbQueue.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  {t("queue.noOneInQueue")}
                </p>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Queue;
