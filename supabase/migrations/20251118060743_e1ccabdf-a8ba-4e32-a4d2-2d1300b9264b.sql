-- Add Phase 2 toggle to clinics table
ALTER TABLE public.clinics 
ADD COLUMN IF NOT EXISTS phase2_enabled boolean DEFAULT false;

-- Add comment for clarity
COMMENT ON COLUMN public.clinics.phase2_enabled IS 'Enables bot-enabled features: smart queue logic, automated reminders, and enhanced notifications';
