-- Add visit_type column to queue_entries to track reason for visit
ALTER TABLE queue_entries 
ADD COLUMN IF NOT EXISTS visit_type TEXT DEFAULT 'General Consultation';

-- Add comment
COMMENT ON COLUMN queue_entries.visit_type IS 'Type of visit: General Consultation, Follow-up, Emergency, etc.';
