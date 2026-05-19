// Static reference data for 24hr clinics across Singapore (Phase 1).
// No backend onboarding. Each card redirects to its Google Maps link.
export interface TwentyFourHrClinic {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
  area?: string;
}

export const TWENTY_FOUR_HR_CLINICS: TwentyFourHrClinic[] = [
  {
    id: "c24-woodlands",
    name: "Central 24-HR Clinic (Woodlands)",
    address: "768 Woodlands Ave 6, #02-06A, Singapore 730768",
    mapsUrl: "https://share.google/pvz3c6tbCbUOZ7HHb",
    area: "Woodlands",
  },
  {
    id: "c24-yishun",
    name: "Central 24-HR Clinic (Yishun)",
    address: "701A Yishun Ave 5, #01-04, Singapore 761701",
    mapsUrl: "https://share.google/abfyvQ45xlQwB95b3",
    area: "Yishun",
  },
  {
    id: "uni24-yishun",
    name: "Unihealth 24-Hr Clinic (Yishun)",
    address: "103 Yishun Ring Road #01-99, Singapore 760103",
    mapsUrl: "https://share.google/ms3WuhDq1sPUhoRm2",
    area: "Yishun",
  },
  {
    id: "c24-hougang",
    name: "Central 24-HR Clinic (Hougang)",
    address: "681 Hougang Ave 8, #01-829, Singapore 530681",
    mapsUrl: "https://share.google/uQvpAYHP3nBVSUFh7",
    area: "Hougang",
  },
  {
    id: "uni24-tpy",
    name: "Unihealth 24-Hr Clinic (TPY)",
    address: "178 Toa Payoh Central, #01-218, Singapore 310178",
    mapsUrl: "https://share.google/1pEBcRFYQiFFlvlll",
    area: "Toa Payoh",
  },
  {
    id: "c24-tampines",
    name: "Central 24-HR Clinic (Tampines)",
    address: "201D Tampines St. 21, #01-1151, Singapore 524201",
    mapsUrl: "https://share.google/W88cDdB7ZanJxrHzM",
    area: "Tampines",
  },
  {
    id: "uni24-tampines",
    name: "Unihealth 24-Hr Clinic (Tampines)",
    address: "138 Tampines St. 11, #01-98, Singapore 521138",
    mapsUrl: "https://share.google/yhCnXS7q0My9frFyc",
    area: "Tampines",
  },
  {
    id: "c24-jurongwest",
    name: "Central 24-HR Clinic (Jurong West)",
    address: "492 Jurong West Street 41, #01-54, Singapore 640492",
    mapsUrl: "https://share.google/IcHi3nS9tooZ0bNcs",
    area: "Jurong West",
  },
  {
    id: "uni24-jurongeast",
    name: "UniHealth 24-HR Clinic (Jurong East)",
    address: "135 Jurong Gateway Rd, #01-317, Singapore 600135",
    mapsUrl: "https://share.google/CLqgiRL5DtuQDZHwo",
    area: "Jurong East",
  },
  {
    id: "c24-clementi",
    name: "Central 24-HR Clinic (Clementi)",
    address: "450 Clementi Ave 3, #01-291, Singapore 120450",
    mapsUrl: "https://share.google/f6JSnbBj2e2Yq1hFX",
    area: "Clementi",
  },
  {
    id: "c24-cck",
    name: "Central 24-HR Clinic (CCK)",
    address: "304 Choa Chu Kang Ave 4, #01-651, Singapore 680304",
    mapsUrl: "https://share.google/Fku7XcJ9HfpqNPPD6",
    area: "Choa Chu Kang",
  },
];
