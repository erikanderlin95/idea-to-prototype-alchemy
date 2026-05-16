// Mock frontend-only directory clinics for early-rollout listing density.
// These are informational listings — no queue/booking/WhatsApp logic.
export interface DirectoryClinic {
  id: string;
  name: string;
  type: string; // category label e.g. "GP", "TCM", "Dental"
  address: string;
  phone: string;
  category: "gp_specialist" | "dental" | "therapy_rehab" | "mental_wellness" | "traditional_medicine";
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
    name: "Greenleaf TCM Hall",
    type: "TCM",
    address: "456 Geylang Road, #02-12, Singapore 389405",
    phone: "+6562345678",
    category: "traditional_medicine",
  },
  {
    id: "dir-3",
    name: "BrightSmile Dental Surgery",
    type: "Dental",
    address: "78 Orchard Boulevard, #03-08, Singapore 248649",
    phone: "+6567321890",
    category: "dental",
  },
  {
    id: "dir-4",
    name: "Active Life Physiotherapy",
    type: "Physiotherapy",
    address: "200 Bishan Street 23, #04-11, Singapore 570200",
    phone: "+6569871234",
    category: "therapy_rehab",
  },
  {
    id: "dir-5",
    name: "Mindful Care Counselling",
    type: "Counselling",
    address: "150 South Bridge Road, #05-22, Singapore 058727",
    phone: "+6566543210",
    category: "mental_wellness",
  },
  {
    id: "dir-6",
    name: "Harmony Family Medical",
    type: "GP",
    address: "88 Bedok North Ave 4, #01-09, Singapore 460088",
    phone: "+6564441234",
    category: "gp_specialist",
  },
];
