ALTER TABLE public.booking_leads 
  ADD COLUMN case_id text,
  ADD COLUMN status text NOT NULL DEFAULT 'initiated',
  ADD COLUMN redirect_type text DEFAULT 'web',
  ADD COLUMN redirect_url text;