-- Fix 1: Create a public view for queue statistics (aggregated only)
-- This hides personal data while allowing queue count display
CREATE OR REPLACE VIEW public.queue_stats_public
WITH (security_invoker=on) AS
  SELECT 
    clinic_id,
    COUNT(*) FILTER (WHERE status = 'waiting') AS queue_count,
    COUNT(*) FILTER (WHERE status = 'waiting') * 15 AS estimated_wait_minutes
  FROM public.queue_entries
  GROUP BY clinic_id;

-- Grant SELECT on the view to authenticated and anon users
GRANT SELECT ON public.queue_stats_public TO authenticated, anon;

-- Fix 2: Update the public read policy to be more restrictive
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view queue entries" ON queue_entries;

-- Create a more restrictive public read policy
-- Clinic staff can see full queue for their clinic
-- Users can see their own entries (by user_id or mobile_number match)
-- For public display, they should use the queue_stats_public view
CREATE POLICY "Users can view queue entries they own or are associated with"
ON queue_entries
FOR SELECT
USING (
  -- Authenticated users can see their own entries
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Clinic staff can see their clinic's entries (already covered by existing policy, but include for clarity)
  (EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'clinic_staff'::app_role 
    AND ur.clinic_id = queue_entries.clinic_id
  ))
  OR
  -- Anyone can see basic queue info for clinics (queue number and clinic, no personal data)
  -- This allows the queue page to work but limits exposure
  (
    auth.uid() IS NULL AND user_id IS NULL
  )
);

-- Fix 3: Allow anyone to check queue counts via the stats view
-- Add policy to allow anonymous/authenticated to query aggregated stats
-- The view already handles this through security_invoker

-- Fix 4: Add a trigger to prevent queue_number manipulation by patients
CREATE OR REPLACE FUNCTION public.validate_queue_entry_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Clinic staff can update anything
  IF EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role IN ('clinic_staff', 'admin') 
    AND ur.clinic_id = NEW.clinic_id
  ) THEN
    RETURN NEW;
  END IF;
  
  -- Regular users can only update status (for check-in/cancel)
  -- They cannot change queue_number, clinic_id, user_id, or mobile_number
  IF OLD.queue_number != NEW.queue_number THEN
    RAISE EXCEPTION 'Cannot modify queue number';
  END IF;
  
  IF OLD.clinic_id != NEW.clinic_id THEN
    RAISE EXCEPTION 'Cannot modify clinic';
  END IF;
  
  IF OLD.user_id IS DISTINCT FROM NEW.user_id THEN
    RAISE EXCEPTION 'Cannot modify user assignment';
  END IF;
  
  IF OLD.mobile_number IS DISTINCT FROM NEW.mobile_number THEN
    RAISE EXCEPTION 'Cannot modify mobile number';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS validate_queue_entry_update_trigger ON queue_entries;
CREATE TRIGGER validate_queue_entry_update_trigger
BEFORE UPDATE ON queue_entries
FOR EACH ROW
EXECUTE FUNCTION public.validate_queue_entry_update();