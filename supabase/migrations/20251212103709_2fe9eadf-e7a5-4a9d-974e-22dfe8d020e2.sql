-- Create consultants table
CREATE TABLE public.consultants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Wellness Advisor',
  photo_url TEXT,
  short_bio TEXT,
  full_bio TEXT,
  areas_of_focus TEXT[] DEFAULT '{}',
  services_offered TEXT[] DEFAULT '{}',
  patient_types TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create consultant-clinic recommendations junction table
CREATE TABLE public.consultant_clinic_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultant_id UUID NOT NULL REFERENCES public.consultants(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(consultant_id, clinic_id)
);

-- Enable RLS
ALTER TABLE public.consultants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultant_clinic_recommendations ENABLE ROW LEVEL SECURITY;

-- Public read access for consultants (only active ones)
CREATE POLICY "Anyone can view active consultants"
ON public.consultants
FOR SELECT
USING (is_active = true);

-- Admin can manage consultants
CREATE POLICY "Admins can manage consultants"
ON public.consultants
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles ur
  WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
));

-- Public read access for recommendations
CREATE POLICY "Anyone can view consultant recommendations"
ON public.consultant_clinic_recommendations
FOR SELECT
USING (true);

-- Admin can manage recommendations
CREATE POLICY "Admins can manage recommendations"
ON public.consultant_clinic_recommendations
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles ur
  WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
));

-- Trigger for updated_at
CREATE TRIGGER update_consultants_updated_at
BEFORE UPDATE ON public.consultants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();