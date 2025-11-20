import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface QueueEntry {
  id: string;
  clinic_id: string;
  user_id: string | null;
  queue_number: number;
  status: 'waiting' | 'checked_in' | 'serving' | 'served';
  visit_type: string | null;
  estimated_wait_time: number | null;
  created_at: string;
  updated_at: string;
}

interface Patient {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
}

interface QueueStore {
  queue: QueueEntry[];
  myQueueEntry: QueueEntry | null;
  patient: Patient | null;
  currentClinicId: string | null;
  loading: boolean;
  
  setQueue: (queue: QueueEntry[]) => void;
  setMyQueueEntry: (entry: QueueEntry | null) => void;
  setPatient: (patient: Patient | null) => void;
  setCurrentClinicId: (clinicId: string | null) => void;
  setLoading: (loading: boolean) => void;
  
  joinQueue: (clinicId: string, userId: string, visitType: string) => Promise<void>;
  leaveQueue: (entryId: string) => Promise<void>;
  servePatient: (entryId: string) => Promise<void>;
  loadQueueData: (clinicId: string, userId: string) => Promise<void>;
  reset: () => void;
}

export const useQueueStore = create<QueueStore>((set, get) => ({
  queue: [],
  myQueueEntry: null,
  patient: null,
  currentClinicId: null,
  loading: false,

  setQueue: (queue) => set({ queue }),
  setMyQueueEntry: (entry) => set({ myQueueEntry: entry }),
  setPatient: (patient) => set({ patient }),
  setCurrentClinicId: (clinicId) => set({ currentClinicId: clinicId }),
  setLoading: (loading) => set({ loading }),

  joinQueue: async (clinicId: string, userId: string, visitType: string) => {
    try {
      set({ loading: true });

      // Get current queue to calculate next queue number
      const { data: existingQueue } = await supabase
        .from('queue_entries')
        .select('*')
        .eq('clinic_id', clinicId)
        .in('status', ['waiting', 'checked_in', 'serving'])
        .order('queue_number', { ascending: false })
        .limit(1);

      const nextQueueNumber = existingQueue && existingQueue.length > 0 
        ? existingQueue[0].queue_number + 1 
        : 1;

      // Insert new queue entry
      const { data: newEntry, error } = await supabase
        .from('queue_entries')
        .insert({
          clinic_id: clinicId,
          user_id: userId,
          queue_number: nextQueueNumber,
          status: 'waiting',
          visit_type: visitType,
          estimated_wait_time: 30,
        })
        .select()
        .single();

      if (error) throw error;

      // Reload queue data
      await get().loadQueueData(clinicId, userId);
      
      toast.success(`Joined queue! Your number is #${nextQueueNumber}`);
    } catch (error: any) {
      console.error('Error joining queue:', error);
      toast.error(error.message || 'Failed to join queue');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  leaveQueue: async (entryId: string) => {
    try {
      set({ loading: true });

      const { error } = await supabase
        .from('queue_entries')
        .update({ status: 'served' })
        .eq('id', entryId);

      if (error) throw error;

      set({ myQueueEntry: null });
      toast.success('Left queue successfully');
    } catch (error: any) {
      console.error('Error leaving queue:', error);
      toast.error(error.message || 'Failed to leave queue');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  servePatient: async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('queue_entries')
        .update({ status: 'served' })
        .eq('id', entryId);

      if (error) throw error;

      toast.success('Patient served');
    } catch (error: any) {
      console.error('Error serving patient:', error);
      toast.error(error.message || 'Failed to serve patient');
      throw error;
    }
  },

  loadQueueData: async (clinicId: string, userId: string) => {
    try {
      set({ loading: true, currentClinicId: clinicId });

      // Load queue entries
      const { data: queueData, error: queueError } = await supabase
        .from('queue_entries')
        .select('*')
        .eq('clinic_id', clinicId)
        .in('status', ['waiting', 'checked_in', 'serving'])
        .order('queue_number', { ascending: true });

      if (queueError) throw queueError;

      const queue = (queueData || []) as QueueEntry[];
      set({ queue });

      // Find user's queue entry
      const myEntry = queue.find((entry) => entry.user_id === userId);
      set({ myQueueEntry: myEntry || null });

      // Load patient profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      set({ patient: profileData || null });
    } catch (error: any) {
      console.error('Error loading queue data:', error);
      toast.error('Failed to load queue data');
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({
    queue: [],
    myQueueEntry: null,
    patient: null,
    currentClinicId: null,
    loading: false,
  }),
}));
