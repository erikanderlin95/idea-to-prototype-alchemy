import { createContext, useContext, useState, ReactNode } from "react";

interface JoinQueueContextType {
  isOpen: boolean;
  clinicId: string | null;
  clinicName: string | null;
  queueCount: number;
  openModal: (clinicId: string, clinicName: string, queueCount: number) => void;
  closeModal: () => void;
}

const JoinQueueContext = createContext<JoinQueueContextType | undefined>(undefined);

export const JoinQueueProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [clinicName, setClinicName] = useState<string | null>(null);
  const [queueCount, setQueueCount] = useState(0);

  const openModal = (id: string, name: string, count: number) => {
    setClinicId(id);
    setClinicName(name);
    setQueueCount(count);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setClinicId(null);
    setClinicName(null);
    setQueueCount(0);
  };

  return (
    <JoinQueueContext.Provider value={{ isOpen, clinicId, clinicName, queueCount, openModal, closeModal }}>
      {children}
    </JoinQueueContext.Provider>
  );
};

export const useJoinQueueModal = () => {
  const context = useContext(JoinQueueContext);
  if (!context) {
    throw new Error("useJoinQueueModal must be used within JoinQueueProvider");
  }
  return context;
};
