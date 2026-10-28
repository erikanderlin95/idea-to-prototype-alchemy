import { expect, test } from "bun:test";
import { clinicClosingStatus } from "./clinicStatus.ts";

// Singapore is UTC+8 with no daylight saving, so a UTC instant maps directly.
// 2026-01-16 is a Friday.
const sgt = (utcHour, utcMinute) =>
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

// Demo rotation stored on sample clinics: some clinic is closing soon every minute.
const ROTATION = [
 "0:00-0:30, 1:30-5:30, 6:30-10:30, 11:30-15:30, 16:30-20:30",
 "0:00-1:00, 2:00-6:00, 7:00-11:00, 12:00-16:00, 17:00-21:00",
 "0:00-1:30, 2:30-6:30, 7:30-11:30, 12:30-16:30, 17:30-21:30",
 "0:00-2:00, 3:00-7:00, 8:00-12:00, 13:00-17:00, 18:00-22:00",
 "0:00-2:30, 3:30-7:30, 8:30-12:30, 13:30-17:30, 18:30-22:30",
 "0:00-3:00, 4:00-8:00, 9:00-13:00, 14:00-18:00, 19:00-23:00",
 "0:00-3:30, 4:30-8:30, 9:30-13:30, 14:30-18:30, 19:30-23:30",
 "0:00-4:00, 5:00-9:00, 10:00-14:00, 15:00-19:00, 20:00-0:00",
 "0:30-4:30, 5:30-9:30, 10:30-14:30, 15:30-19:30",
 "1:00-5:00, 6:00-10:00, 11:00-15:00, 16:00-20:00"
];
test("demo rotation always has a clinic closing soon, 24/7", () => {
  for (let m = 0; m < 24 * 60; m++) {
    const now = new Date(Date.UTC(2026, 0, 16, 0, m) - 8 * 3600000);
    const any = ROTATION.some((v) => clinicClosingStatus({ friday: v }, now) === "closingSoon");
    expect(any).toBe(true);
  }
});

test("split sessions: closing soon before each session ends", () => {
  const h = { friday: "8:00-12:00, 14:00-17:00" };
  expect(clinicClosingStatus(h, sgt(3, 45))).toBe("closingSoon");
  expect(clinicClosingStatus(h, sgt(5, 0))).toBe("unknown");
  expect(clinicClosingStatus(h, sgt(8, 40))).toBe("closingSoon");
});
