
CREATE TABLE public.managed_care_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id text NOT NULL UNIQUE,
  clinic_id uuid REFERENCES public.clinics(id),
  clinic_name text,
  patient_name text NOT NULL,
  contact_number text NOT NULL,
  condition_concern text NOT NULL,
  preferred_location text,
  preferred_timing text,
  urgency text NOT NULL DEFAULT 'flexible',
  source text NOT NULL DEFAULT 'marketplace',
  case_type text NOT NULL DEFAULT 'managed_care',
  status text NOT NULL DEFAULT 'pending_coordinator_review',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.managed_care_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create managed care cases"
ON public.managed_care_cases FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can view managed care cases"
ON public.managed_care_cases FOR SELECT
TO public
USING (true);
