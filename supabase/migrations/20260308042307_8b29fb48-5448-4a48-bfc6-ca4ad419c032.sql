ALTER TABLE clinics DROP CONSTRAINT clinics_type_check;
ALTER TABLE clinics ADD CONSTRAINT clinics_type_check CHECK (type = ANY (ARRAY['GP'::text, 'TCM'::text, 'Wellness'::text, 'Specialist'::text]));