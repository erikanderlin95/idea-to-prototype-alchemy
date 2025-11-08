-- Add more detailed doctor information for Phase 1
ALTER TABLE doctors 
ADD COLUMN IF NOT EXISTS registration_no TEXT,
ADD COLUMN IF NOT EXISTS years_of_practice INTEGER,
ADD COLUMN IF NOT EXISTS availability JSONB DEFAULT '{"monday": ["09:00-17:00"], "tuesday": ["09:00-17:00"], "wednesday": ["09:00-17:00"], "thursday": ["09:00-17:00"], "friday": ["09:00-17:00"]}'::jsonb,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- Add queue statistics table for Phase 4 analytics
CREATE TABLE IF NOT EXISTS queue_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_patients INTEGER DEFAULT 0,
  average_wait_time INTEGER DEFAULT 0,
  peak_hour INTEGER,
  total_appointments INTEGER DEFAULT 0,
  no_show_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clinic_id, date)
);

ALTER TABLE queue_statistics ENABLE ROW LEVEL SECURITY;

-- Clinic staff can view their clinic statistics
CREATE POLICY "Clinic staff can view clinic statistics"
ON queue_statistics FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role IN ('admin', 'clinic_staff')
    AND ur.clinic_id = queue_statistics.clinic_id
  )
);

-- Add treatment demand tracking for Phase 4
CREATE TABLE IF NOT EXISTS treatment_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_type TEXT NOT NULL, -- 'pain', 'fertility', 'wellness', etc.
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE treatment_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view treatment categories"
ON treatment_categories FOR SELECT
USING (true);

-- Track appointment categories for analytics
ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS treatment_category_id UUID REFERENCES treatment_categories(id),
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;

-- Add booking behavior tracking
CREATE TABLE IF NOT EXISTS booking_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  user_id UUID,
  booking_date DATE NOT NULL,
  appointment_date DATE NOT NULL,
  booking_window_days INTEGER, -- days between booking and appointment
  time_slot TEXT,
  is_return_patient BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE booking_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clinic staff can view booking analytics"
ON booking_analytics FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role IN ('admin', 'clinic_staff')
    AND ur.clinic_id = booking_analytics.clinic_id
  )
);

-- Enable realtime for queue_entries for live updates
ALTER TABLE queue_entries REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE queue_entries;

-- Add trigger to update queue statistics
CREATE OR REPLACE FUNCTION update_queue_statistics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO queue_statistics (clinic_id, date, total_patients)
  VALUES (NEW.clinic_id, CURRENT_DATE, 1)
  ON CONFLICT (clinic_id, date)
  DO UPDATE SET 
    total_patients = queue_statistics.total_patients + 1,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER track_queue_entry
AFTER INSERT ON queue_entries
FOR EACH ROW
EXECUTE FUNCTION update_queue_statistics();

-- Insert sample treatment categories
INSERT INTO treatment_categories (name, category_type) VALUES
  ('Pain Management', 'pain'),
  ('Acupuncture', 'pain'),
  ('Fertility Treatment', 'fertility'),
  ('Traditional Chinese Medicine', 'tcm'),
  ('General Wellness', 'wellness'),
  ('Physiotherapy', 'wellness'),
  ('Chiropractic', 'wellness')
ON CONFLICT DO NOTHING;