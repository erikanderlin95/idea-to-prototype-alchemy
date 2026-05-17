// Mock frontend-only directory clinics for early-rollout listing density.
// These are informational listings — no queue/booking/WhatsApp logic.
// Scope: GP clinics only.
export interface DirectoryClinic {
  id: string;
  name: string;
  type: string; // category label e.g. "GP"
  address: string;
  phone: string;
  category: "gp_specialist";
}

export const DIRECTORY_CLINICS: DirectoryClinic[] = [
  {
    id: "dir-1",
    name: "Sunrise Family Clinic",
    type: "GP",
    address: "Blk 123 Tampines St 11, #01-45, Singapore 521123",
    phone: "+6567851234",
    category: "gp_specialist",
  },
  {
    id: "dir-2",
    name: "Harmony Family Medical",
    type: "GP",
    address: "88 Bedok North Ave 4, #01-09, Singapore 460088",
    phone: "+6564441234",
    category: "gp_specialist",
  },
  {
    id: "dir-3",
    name: "Northpoint GP Clinic",
    type: "GP",
    address: "930 Yishun Ave 2, #01-15, Singapore 769098",
    phone: "+6567531234",
    category: "gp_specialist",
  },
  {
    id: "dir-4",
    name: "Westgate Family Practice",
    type: "GP",
    address: "3 Gateway Drive, #02-21, Singapore 608532",
    phone: "+6562224455",
    category: "gp_specialist",
  },
  {
    id: "dir-5",
    name: "Eastside Medical Centre",
    type: "GP",
    address: "112 Marine Parade Rd, #01-07, Singapore 440112",
    phone: "+6563445566",
    category: "gp_specialist",
  },
  {
    id: "dir-6",
    name: "Central Health Family Clinic",
    type: "GP",
    address: "21 Bukit Batok Central, #01-33, Singapore 659959",
    phone: "+6568776655",
    category: "gp_specialist",
  },
];
