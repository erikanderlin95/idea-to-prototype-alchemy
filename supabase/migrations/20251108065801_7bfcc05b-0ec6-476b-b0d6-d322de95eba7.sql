-- Allow clinic staff to update queue entries for their clinic
CREATE POLICY "Clinic staff can update their clinic queue"
ON queue_entries
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'clinic_staff'
    AND ur.clinic_id = queue_entries.clinic_id
  )
);

-- Allow clinic staff to view all queue entries for their clinic
CREATE POLICY "Clinic staff can view their clinic queue"
ON queue_entries
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'clinic_staff'
    AND ur.clinic_id = queue_entries.clinic_id
  )
);

-- Create notifications table for staff to send custom messages
CREATE TABLE IF NOT EXISTS public.queue_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_entry_id UUID REFERENCES queue_entries(id) ON DELETE CASCADE NOT NULL,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  sent_by UUID REFERENCES auth.users(id) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on notifications
ALTER TABLE public.queue_notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view their notifications"
ON queue_notifications
FOR SELECT
USING (auth.uid() = user_id);

-- Clinic staff can create notifications for their clinic
CREATE POLICY "Staff can send notifications"
ON queue_notifications
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'clinic_staff'
    AND ur.clinic_id = queue_notifications.clinic_id
  )
);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE queue_notifications;