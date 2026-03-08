// Managed Healthcare Pathway Logic
// Direct booking: GP, TCM, Physio, Wellness
// Managed Care: Specialist and all other provider types

const DIRECT_BOOKING_TYPES = ["gp", "tcm", "physio", "physiotherapy", "wellness"];

export const isDirectBookingType = (clinicType: string): boolean => {
  return DIRECT_BOOKING_TYPES.includes(clinicType.toLowerCase());
};

export const isManagedCareType = (clinicType: string): boolean => {
  return !isDirectBookingType(clinicType);
};

export const getPathwayLabel = (clinicType: string): string => {
  return isDirectBookingType(clinicType) ? "Direct Booking" : "Managed Care Pathway";
};

export const NMG_ATTRIBUTION_TAG = "Source: NMG Managed Pathway";

export const getBookingRoute = (clinicId: string, clinicType: string): string => {
  if (isManagedCareType(clinicType)) {
    return `/managed-care-request/${clinicId}`;
  }
  return `/booking/${clinicId}`;
};
