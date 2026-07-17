ALTER TABLE public.queue_entries ADD COLUMN IF NOT EXISTS patient_nric TEXT NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.queue_entries TO authenticated;
GRANT ALL ON public.queue_entries TO service_role;

COMMENT ON COLUMN public.queue_entries.patient_nric IS 'Patient NRIC/FIN, collected only where required by the clinic.';