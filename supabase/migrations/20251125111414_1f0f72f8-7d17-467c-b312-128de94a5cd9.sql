-- Add bookingUrl field to clinics table
ALTER TABLE public.clinics 
ADD COLUMN booking_url text;