-- Add 'checked_in' as a valid status for queue_entries
ALTER TABLE public.queue_entries 
DROP CONSTRAINT IF EXISTS queue_entries_status_check;

ALTER TABLE public.queue_entries 
ADD CONSTRAINT queue_entries_status_check 
CHECK (status IN ('waiting', 'checked_in', 'serving', 'completed', 'cancelled'));