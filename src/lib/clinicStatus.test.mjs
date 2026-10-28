import { expect, test } from "bun:test";
import { clinicClosingStatus } from "./clinicStatus.ts";

// Singapore is UTC+8 with no daylight saving, so a UTC instant maps directly.
// 2026-01-16 is a Friday.
const sgt = (utcHour: number, utcMinute: number) =>
  new Date(Date.UTC(2026, 0, 16, utcHour, utcMinute));

const LOWERCASE_HOURS = {
  monday: "10:00-20:00",
  tuesday: "10:00-20:00",
  wednesday: "10:00-20:00",
  thursday: "10:00-20:00",
  friday: "10:00-20:00",
  saturday: "10:00-18:00",
};

const UPPERCASE_HOURS = {
  Monday: "9:00 AM – 6:00 PM",
  Tuesday: "9:00 AM – 6:00 PM",
  Wednesday: "9:00 AM – 6:00 PM",
  Thursday: "9:00 AM – 6:00 PM",
  Friday: "9:00 AM – 5:00 PM",
  Saturday: "9:00 AM – 1:00 PM",
  Sunday: "Closed",
};

test("within 30 minutes of close, the badge flips to closing soon", () => {
  // 19:40 SGT Friday: 20 minutes before the 20:00 close.
  expect(clinicClosingStatus(LOWERCASE_HOURS, sgt(11, 40))).toBe("closingSoon");
  // 16:35 SGT Friday: 25 minutes before the 5:00 PM close in the other hour format.
  expect(clinicClosingStatus(UPPERCASE_HOURS, sgt(8, 35))).toBe("closingSoon");
});

test("outside the 30-minute window while open, the badge stays open", () => {
  expect(clinicClosingStatus(LOWERCASE_HOURS, sgt(11, 25))).toBe("open");
  expect(clinicClosingStatus(UPPERCASE_HOURS, sgt(7, 0))).toBe("open");
});

test("after close time the closing window does not apply", () => {
  expect(clinicClosingStatus(LOWERCASE_HOURS, sgt(12, 5))).toBe("unknown");
});

test("a closed day or missing day keeps the static badge", () => {
  // 2026-01-18 is a Sunday; Sunday: "Closed" in one format, missing in the other.
  const sunday = new Date(Date.UTC(2026, 0, 18, 5, 0));
  expect(clinicClosingStatus(UPPERCASE_HOURS, sunday)).toBe("unknown");
  expect(clinicClosingStatus(LOWERCASE_HOURS, sunday)).toBe("unknown");
});

test("clinics without usable hours keep their static badge", () => {
  expect(clinicClosingStatus(null)).toBe("unknown");
  expect(clinicClosingStatus({ Friday: "24/7" }, sgt(11, 40))).toBe("unknown");
  expect(clinicClosingStatus({ Friday: "10:00" }, sgt(11, 40))).toBe("unknown");
});
