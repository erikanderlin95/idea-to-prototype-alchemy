import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight, Users, CheckCircle2, CalendarX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { toast } from "sonner";

const TEAL = "hsl(var(--ai-cyan))";

type FeaturedTalk = {
  title: string;
  desc: string;
  date: string;
  time: string;
  image: string;
  partner?: string;
};

const featuredTalks: FeaturedTalk[] = [];

const reserveSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(80, { message: "Name must be less than 80 characters" }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255)
    .optional()
    .or(z.literal("")),
  attendees: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]?$/, { message: "Enter a number between 1 and 99" }),
  notes: z
    .string()
    .trim()
    .max(300, { message: "Notes must be less than 300 characters" })
    .optional()
    .or(z.literal("")),
});

const hostSchema = z.object({
  orgName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your organisation name" })
    .max(120, { message: "Organisation name must be less than 120 characters" }),
  contactName: z
    .string()
    .trim()
    .min(2, { message: "Please enter the contact person's name" })
    .max(80, { message: "Name must be less than 80 characters" }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255),
  topic: z
    .string()
    .trim()
    .min(2, { message: "Please share the talk topic or area of expertise" })
    .max(150, { message: "Topic must be less than 150 characters" }),
  audienceSize: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{0,4}$/, { message: "Enter an audience size between 1 and 99999" }),
  notes: z
    .string()
    .trim()
    .max(500, { message: "Notes must be less than 500 characters" })
    .optional()
    .or(z.literal("")),
});

export const WellnessTalks = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTalk, setActiveTalk] = useState<FeaturedTalk | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    attendees: "1",
    notes: "",
  });

  const [hostOpen, setHostOpen] = useState(false);
  const [hostSubmitted, setHostSubmitted] = useState(false);
  const [hostForm, setHostForm] = useState({
    orgName: "",
    contactName: "",
    phone: "",
    email: "",
    topic: "",
    audienceSize: "",
    notes: "",
  });

  const openReserve = (talk: FeaturedTalk) => {
    setActiveTalk(talk);
    setSubmitted(false);
    setForm({ name: "", phone: "", email: "", attendees: "1", notes: "" });
    setOpen(true);
  };

  const openHost = () => {
    setHostSubmitted(false);
    setHostForm({
      orgName: "",
      contactName: "",
      phone: "",
      email: "",
      topic: "",
      audienceSize: "",
      notes: "",
    });
    setHostOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reserveSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setSubmitted(true);
    toast.success("Reservation request received");
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = hostSchema.safeParse(hostForm);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setHostSubmitted(true);
    toast.success("Request received");
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-2">
            Featured Upcoming Wellness Talks
          </h2>
          <p className="text-[15px] text-muted-foreground">
            Learn from healthcare experts. Reserve your seat before it fills up.
          </p>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4 md:gap-5 min-h-[280px]">
          {talks.length === 0 ? (
            <div
              className="rounded-2xl p-8 md:p-10 text-center flex flex-col items-center justify-center"
              style={{
                background: `linear-gradient(135deg, hsl(var(--ai-cyan) / 0.06), hsl(var(--ai-cyan) / 0.02))`,
                border: `1px dashed hsl(var(--ai-cyan) / 0.35)`,
              }}
            >
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `hsl(var(--ai-cyan) / 0.12)` }}
              >
                <CalendarX className="h-7 w-7" style={{ color: TEAL }} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                No upcoming talks right now
              </h3>
              <p className="text-[13.5px] md:text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                We're preparing the next sessions. In the meantime, explore clinics or partner with us to host one.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto items-stretch sm:items-center justify-center">
                <Button
                  className="gap-2 font-semibold shadow-sm hover:shadow-md transition-all"
                  style={{ background: TEAL, color: "#fff" }}
                  onClick={openHost}
                >
                  Host a Talk with Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="font-medium text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    document.getElementById("continuity")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Partners
                </Button>
              </div>
            </div>
          ) : (
            talks.map((talk, i) => (
              <div
                key={i}
                className="group relative rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: talk.gradient,
                  border: `1px solid ${talk.border}`,
                  boxShadow: "0 4px 20px -8px hsl(var(--ai-cyan) / 0.18)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-[10.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                    style={{ color: "#fff", background: talk.accent }}
                  >
                    {talk.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {talk.seats}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 leading-snug">
                  {talk.title}
                </h3>
                <p className="text-[13.5px] text-muted-foreground leading-snug mb-5">
                  {talk.desc}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 text-[12.5px] text-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" style={{ color: talk.accent }} />
                    {talk.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" style={{ color: talk.accent }} />
                    {talk.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" style={{ color: talk.accent }} />
                    {talk.location}
                  </span>
                </div>

                <Button
                  className="w-full sm:w-auto gap-2 font-semibold shadow-sm hover:shadow-md transition-all"
                  style={{ background: talk.accent, color: "#fff" }}
                  onClick={() => openReserve(talk)}
                >
                  Reserve a Slot
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[460px]">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 mx-auto" style={{ color: TEAL }} />
              <h3 className="text-xl font-semibold text-foreground">Reservation received</h3>
              <p className="text-sm text-muted-foreground">
                We've noted your reservation for{" "}
                <span className="font-medium text-foreground">{activeTalk?.title}</span>. We'll
                contact you with confirmation details.
              </p>
              <Button onClick={() => setOpen(false)} className="mt-2" style={{ background: TEAL, color: "#fff" }}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Reserve your slot</DialogTitle>
                <DialogDescription>
                  {activeTalk?.title} — {activeTalk?.date}, {activeTalk?.time}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <div className="space-y-1.5">
                  <Label htmlFor="rt-name">Full Name *</Label>
                  <Input
                    id="rt-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={80}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rt-phone">Mobile Number *</Label>
                  <Input
                    id="rt-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={15}
                    placeholder="+65 9123 4567"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rt-email">Email (optional)</Label>
                  <Input
                    id="rt-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rt-attendees">Number of attendees *</Label>
                  <Input
                    id="rt-attendees"
                    type="number"
                    min={1}
                    max={99}
                    value={form.attendees}
                    onChange={(e) => setForm({ ...form, attendees: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rt-notes">Notes (optional)</Label>
                  <Textarea
                    id="rt-notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    maxLength={300}
                    placeholder="Any questions or special requests?"
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" style={{ background: TEAL, color: "#fff" }}>
                  Reserve Slot
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={hostOpen} onOpenChange={setHostOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          {hostSubmitted ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 mx-auto" style={{ color: TEAL }} />
              <h3 className="text-xl font-semibold text-foreground">Request received</h3>
              <p className="text-sm text-muted-foreground">
                Thanks for your interest in hosting a talk with ClynicQ. Our team will reach out shortly to discuss next steps.
              </p>
              <Button onClick={() => setHostOpen(false)} className="mt-2" style={{ background: TEAL, color: "#fff" }}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleHostSubmit}>
              <DialogHeader>
                <DialogTitle>Host a Talk with Us</DialogTitle>
                <DialogDescription>
                  Tell us about your organisation and the talk you'd like to deliver.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ht-org">Organisation Name *</Label>
                  <Input
                    id="ht-org"
                    value={hostForm.orgName}
                    onChange={(e) => setHostForm({ ...hostForm, orgName: e.target.value })}
                    maxLength={120}
                    placeholder="e.g. Wellness Partners Pte Ltd"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ht-contact">Contact Person *</Label>
                  <Input
                    id="ht-contact"
                    value={hostForm.contactName}
                    onChange={(e) => setHostForm({ ...hostForm, contactName: e.target.value })}
                    maxLength={80}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="ht-phone">Mobile Number *</Label>
                    <Input
                      id="ht-phone"
                      type="tel"
                      value={hostForm.phone}
                      onChange={(e) => setHostForm({ ...hostForm, phone: e.target.value })}
                      maxLength={15}
                      placeholder="+65 9123 4567"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ht-email">Email *</Label>
                    <Input
                      id="ht-email"
                      type="email"
                      value={hostForm.email}
                      onChange={(e) => setHostForm({ ...hostForm, email: e.target.value })}
                      maxLength={255}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ht-topic">Talk Topic / Expertise *</Label>
                  <Input
                    id="ht-topic"
                    value={hostForm.topic}
                    onChange={(e) => setHostForm({ ...hostForm, topic: e.target.value })}
                    maxLength={150}
                    placeholder="e.g. Stress management, TCM wellness"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ht-audience">Expected Audience Size *</Label>
                  <Input
                    id="ht-audience"
                    type="number"
                    min={1}
                    max={99999}
                    value={hostForm.audienceSize}
                    onChange={(e) => setHostForm({ ...hostForm, audienceSize: e.target.value })}
                    placeholder="e.g. 30"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ht-notes">Notes (optional)</Label>
                  <Textarea
                    id="ht-notes"
                    value={hostForm.notes}
                    onChange={(e) => setHostForm({ ...hostForm, notes: e.target.value })}
                    maxLength={500}
                    placeholder="Preferred dates, format (online / in-person), or anything else."
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setHostOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" style={{ background: TEAL, color: "#fff" }}>
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
