CREATE TABLE public.queue_leave_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT,
  mobile_number TEXT,
  clinic_id UUID,
  clinic_name TEXT,
  queue_entry_id UUID,
  queue_number INTEGER,
  reason TEXT NOT NULL,
  other_reason TEXT,
  status TEXT NOT NULL DEFAULT 'left_queue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.queue_leave_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create leave logs"
ON public.queue_leave_logs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Clinic staff can view their clinic leave logs"
ON public.queue_leave_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin'::app_role, 'clinic_staff'::app_role)
      AND ur.clinic_id = queue_leave_logs.clinic_id
  )
);

CREATE INDEX idx_queue_leave_logs_clinic ON public.queue_leave_logs(clinic_id, created_at DESC);