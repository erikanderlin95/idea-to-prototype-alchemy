
-- Queue verification table for OTP-based join authorization
CREATE TABLE public.queue_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  mobile_number text NOT NULL,
  patient_name text NOT NULL,
  visit_type text NOT NULL DEFAULT 'General Consultation',
  verification_code text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  device_fingerprint text,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  verified_at timestamptz,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '2 minutes')
);

-- Index for fast lookups
CREATE INDEX idx_queue_verifications_lookup ON public.queue_verifications(clinic_id, mobile_number, status);

-- Enable RLS
ALTER TABLE public.queue_verifications ENABLE ROW LEVEL SECURITY;

-- Open insert/select for anonymous usage (edge function uses service role)
CREATE POLICY "Service role full access" ON public.queue_verifications FOR ALL USING (true) WITH CHECK (true);

-- Booking leads table for lead tracking
CREATE TABLE public.booking_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  clinic_name text,
  patient_name text NOT NULL,
  mobile_number text NOT NULL,
  booking_type text NOT NULL DEFAULT 'external',
  source text NOT NULL DEFAULT 'marketplace',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (edge function uses service role, but also allow direct inserts)
CREATE POLICY "Anyone can create booking leads" ON public.booking_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view booking leads" ON public.booking_leads FOR SELECT USING (true);
