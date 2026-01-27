-- ============================================
-- FIX: Drop the overly permissive RLS policy
-- This policy allows anyone to read all queue entries
-- ============================================

-- Drop the permissive policy that allows unrestricted public access
DROP POLICY IF EXISTS "Allow queue count queries for clinic display" ON public.queue_entries;

-- Ensure the existing restrictive policies remain:
-- 1. "Users can view their own queue entries by user_id" - allows authenticated users to see their own entries
-- 2. "Clinic staff can view their clinic queue" - allows staff to manage their clinic's queue
-- 3. "Users can create queue entries" - allows creating entries (with or without user_id)
-- 4. "Users can update their own queue entries" - allows users to update their entries
-- 5. "Users can delete their own queue entries" - allows users to cancel their entries
-- 6. "Clinic staff can update their clinic queue" - allows staff to manage queue status

-- The queue_stats_public view already exists for public aggregate statistics
-- Mobile number lookups will be handled by a secure edge function