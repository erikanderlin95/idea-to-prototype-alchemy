ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS is_nmg_affiliated boolean DEFAULT false;

INSERT INTO public.clinics (name, type, address, phone, rating, is_open, has_digital_queue, is_nmg_affiliated, description)
VALUES ('NMG Family Clinic', 'GP', '10 Sinaran Drive, #08-01 Novena Medical Centre', '+6562345678', 4.7, true, true, true, 'NMG-affiliated family medicine clinic offering both direct patient access and managed care coordination.');