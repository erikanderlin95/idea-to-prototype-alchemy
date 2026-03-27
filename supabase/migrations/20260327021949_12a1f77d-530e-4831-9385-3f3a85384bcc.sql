CREATE TABLE public.clinic_onboarding_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  clinic_type TEXT NOT NULL,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clinic_onboarding_requests ENABLE ROW LEVEL SECURITY;

-- Allow edge function (service role) to insert, no public access needed
CREATE POLICY "Service role can insert onboarding requests"
ON public.clinic_onboarding_requests
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can select onboarding requests"
ON public.clinic_onboarding_requests
FOR SELECT
TO service_role
USING (true);