-- Add has_digital_queue field to clinics table (defaults to true for existing clinics)
ALTER TABLE public.clinics ADD COLUMN has_digital_queue boolean DEFAULT true;