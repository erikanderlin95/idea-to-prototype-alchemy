import { expect, test } from "bun:test";
import { participatingClinicsOnly } from "./clinicListing.ts";

test("24-hour directory listings stay out of the general listing, including old cached entries", () => {
  const clinics = [
    { id: "participating-gp", type: "GP" },
    { id: "directory-24hr", type: "24HR GP", is24Hr: true },
    { id: "participating-tcm", type: "TCM", is24Hr: false },
  ];
  expect(participatingClinicsOnly(clinics).map((clinic) => clinic.id)).toEqual([
    "participating-gp", "participating-tcm",
  ]);
  expect(clinics).toHaveLength(3);
});