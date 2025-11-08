-- Enable realtime for queue_entries table
ALTER TABLE public.queue_entries REPLICA IDENTITY FULL;

-- Add phone field to profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema='public' 
                 AND table_name='profiles' 
                 AND column_name='phone') THEN
    ALTER TABLE public.profiles ADD COLUMN phone TEXT;
  END IF;
END $$;