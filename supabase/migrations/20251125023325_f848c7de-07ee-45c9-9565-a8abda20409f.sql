-- Add mobile_number and patient_name to queue_entries table
ALTER TABLE queue_entries 
ADD COLUMN mobile_number TEXT,
ADD COLUMN patient_name TEXT;