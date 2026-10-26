/** The 24-hour directory belongs only on its dedicated page, including cached entries. */
export const participatingClinicsOnly = <T extends { is24Hr?: boolean }>(clinics: T[]): T[] =>
  clinics.filter((clinic) => clinic.is24Hr !== true);