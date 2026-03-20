import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Phone } from "lucide-react";
import { QueueIcon, AppointmentsIcon, ChatbotIcon } from "@/components/icons/FeatureIcons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const phoneSchema = z.object({
  phone: z.string()
    .trim()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" })
});

export const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showQueueFinder, setShowQueueFinder] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <section className="relative py-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-ai-purple/5 via-ai-blue/5 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--ai-purple)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--ai-cyan)/0.12),transparent_50%)]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
              {t("hero.title1")}
              <span className="block mt-2 bg-gradient-to-r from-ai-purple via-ai-blue to-ai-cyan bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="mr-2 h-5 w-5" />
              {t("hero.findClinics")}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover:bg-secondary/50 transition-all"
              onClick={() => setShowQueueFinder(true)}
            >
              <Phone className="mr-2 h-5 w-5" />
              Find My Queue
            </Button>
          </div>
        </div>
      </div>

      {/* Find My Queue Modal */}
      <Dialog open={showQueueFinder} onOpenChange={setShowQueueFinder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Find My Queue</DialogTitle>
            <DialogDescription>
              Enter your mobile number to find your queue session
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+65 1234 5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={15}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowQueueFinder(false);
                setPhoneNumber("");
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={async () => {
                try {
                  // Validate phone number
                  const validation = phoneSchema.safeParse({ phone: phoneNumber });
                  if (!validation.success) {
                    toast.error(validation.error.issues[0].message);
                    return;
                  }

                  setIsSearching(true);

                  // Find user by phone number
                  const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("phone", phoneNumber.trim())
                    .maybeSingle();

                  if (profileError) throw profileError;

                  if (!profile) {
                    toast.error("No account found with this mobile number");
                    return;
                  }

                  // Find active queue entry
                  const { data: queueEntry, error: queueError } = await supabase
                    .from("queue_entries")
                    .select("id, clinic_id, queue_number, status")
                    .eq("user_id", profile.id)
                    .eq("status", "waiting")
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .maybeSingle();

                  if (queueError) throw queueError;

                  if (!queueEntry) {
                    toast.error("No active queue session found");
                    return;
                  }

                  // Navigate to queue page
                  toast.success(`Found your queue! Position #${queueEntry.queue_number}`);
                  setShowQueueFinder(false);
                  setPhoneNumber("");
                  navigate(`/queue?clinic=${queueEntry.clinic_id}`);
                } catch (error: any) {
                  toast.error(error.message || "Failed to find queue session");
                } finally {
                  setIsSearching(false);
                }
              }}
              disabled={isSearching || !phoneNumber.trim()}
            >
              {isSearching ? "Searching..." : "Find Queue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
