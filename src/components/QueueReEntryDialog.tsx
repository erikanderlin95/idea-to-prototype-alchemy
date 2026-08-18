import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { callQueueLookup } from "@/lib/queueLookup";

export const QueueReEntryDialog = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = mobile.replace(/\s/g, "");
    if (!/^\+?[0-9]{8,15}$/.test(sanitized)) {
      toast.error(t("queue.reentry.invalidMobile"));
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await callQueueLookup({
        action: "find_my_queue",
        mobile_number: sanitized,
      });

      if (error || !data) {
        toast.error(t("queue.reentry.error"));
        return;
      }

      const entry = (data as any)?.entry;
      if (entry?.clinic_id) {
        setOpen(false);
        navigate(`/queue?clinic=${entry.clinic_id}&mobile=${encodeURIComponent(sanitized)}`);
      } else {
        toast.error(t("queue.reentry.noEntry"));
      }
    } catch (err) {
      toast.error(t("queue.reentry.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 min-h-10 sm:min-h-12 h-auto border-primary text-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-1.5 font-bold whitespace-normal text-center leading-tight w-auto"
        >
          <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="min-w-0 break-words">{t("hero.findMyQueue")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("queue.reentry.title")}</DialogTitle>
          <DialogDescription>{t("queue.reentry.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="reentry-mobile">{t("queue.reentry.mobileLabel")}</Label>
            <Input
              id="reentry-mobile"
              type="tel"
              placeholder={t("queue.reentry.mobilePlaceholder")}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("clinicCard.joining") : t("queue.reentry.findButton")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
