import { create } from 'zustand';

interface PatientData {
  clinicId: string;
  queueNumber: number;
  visitType: string;
  estimatedWaitTime: number;
}

interface QueueStore {
  queue: PatientData[];
  patient: PatientData | null;
  status: 'idle' | 'waiting' | 'served';
  
  joinQueue: (patientData: Omit<PatientData, 'queueNumber'>) => void;
  servePatient: () => void;
  leaveQueue: () => void;
}

export const useQueueStore = create<QueueStore>((set) => ({
  queue: [],
  patient: null,
  status: 'idle',

  joinQueue: (patientData) =>
    set((state) => {
      const queueNumber = state.queue.length + 1;
      const newPatient = { ...patientData, queueNumber };
      return {
        queue: [...state.queue, newPatient],
        patient: newPatient,
        status: 'waiting',
      };
    }),

  servePatient: () =>
    set(() => ({
      status: 'served',
    })),

  leaveQueue: () =>
    set(() => ({
      patient: null,
      status: 'idle',
    })),
}));
