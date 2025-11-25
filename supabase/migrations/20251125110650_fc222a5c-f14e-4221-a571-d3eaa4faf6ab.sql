-- Make user_id nullable in appointments table to allow guest bookings
ALTER TABLE public.appointments 
ALTER COLUMN user_id DROP NOT NULL;