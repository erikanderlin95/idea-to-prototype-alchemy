-- Allow users to update their own queue entries (for cancel and check-in)
CREATE POLICY "Users can update their own queue entries"
ON queue_entries
FOR UPDATE
USING (auth.uid() = user_id);

-- Allow users to delete their own queue entries (optional, for complete cancel)
CREATE POLICY "Users can delete their own queue entries"
ON queue_entries
FOR DELETE
USING (auth.uid() = user_id);