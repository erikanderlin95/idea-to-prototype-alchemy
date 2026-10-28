// Live closing-window status for clinic cards, derived from the clinic's
// operating_hours JSONB (two formats seen in the database) evaluated in
// Singapore local time (UTC+8, no daylight saving). Clinics without usable
// hours keep their existing static badge.
export type ClinicStatus = "open" | "closingSoon" | "unknown";

const DAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

const CLOSED_WORDS = new Set(["closed", ""]);
const ALL_DAY_WORDS = new Set(["24 hours", "24hours", "24/7", "24 hr", "24hrs", "24-hour", "24-hour clinic"]);

function minutesFromParts(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

// "9:00 AM – 5:00 PM" (en dash), "9:00-18:00", "9:00 AM - 5:00 PM".
function parseTime(value: string): number | null {
  const matches = [...value.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/gi)];
  if (matches.length === 0) return null;
  const toMinutes = (m: RegExpMatchArray): number => {
    let hours = parseInt(m[1], 10);
    const minutes = m[2] ? parseInt(m[2], 10) : 0;
    const meridiem = m[3]?.toLowerCase().replace(/\./g, "");
    if (meridiem === "pm" && hours < 12) hours += 12;
    if (meridiem === "am" && hours === 12) hours = 0;
    return minutesFromParts(hours, minutes);
  };
  return toMinutes(matches[matches.length - 1]);
}

type Session = { open: number; close: number };

// A day may hold several sessions separated by "," or ";" (e.g. morning and evening).
function parseDayValue(raw: unknown): Session[] | "closed" | null {
  if (typeof raw !== "string") return null;
  const lowered = raw.trim().toLowerCase();
  if (CLOSED_WORDS.has(lowered)) return "closed";
  const sessions = raw.split(/\s*[,;]\s*/).map(parseSession).filter((s): s is Session => s !== null);
  return sessions.length ? sessions : null;
}

function parseSession(raw: string): Session | null {
  const text = raw.trim();
  const lowered = text.toLowerCase();
  if (ALL_DAY_WORDS.has(lowered)) return null;
  const [startRaw, endRaw] = text.split(/\s*[–—-]\s*/);
  if (!endRaw) return null;
  const open = parseTime(startRaw);
  let close = parseTime(endRaw);
  if (open === null || close === null) return null;
  if (close === 0 && open > 0) close = 24 * 60; // closes at midnight
  if (close <= open) return null; // overnight hours are not supported for the closing window
  return { open, close };
}

export function singaporeNowParts(now: Date): { weekday: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Singapore",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const lookup = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = lookup("weekday").toLowerCase();
  const minutes = minutesFromParts(parseInt(lookup("hour"), 10), parseInt(lookup("minute"), 10));
  return { weekday, minutes };
}

// Returns 'closingSoon' when Singapore local time is within the 30 minutes
// before the clinic's close time today; 'unknown' when the hours cannot
// establish it (no hours data, all-day clinic, closed today, overnight hours).
export function clinicClosingStatus(
  operatingHours: unknown,
  now: Date = new Date(),
): ClinicStatus {
  if (!operatingHours || typeof operatingHours !== "object" || Array.isArray(operatingHours)) return "unknown";
  const hours = operatingHours as Record<string, unknown>;
  const { weekday, minutes } = singaporeNowParts(now);
  const dayIndex = DAY_KEYS.indexOf(weekday as (typeof DAY_KEYS)[number]);
  if (dayIndex < 0) return "unknown";
  const key = Object.keys(hours).find((k) => k.toLowerCase() === weekday);
  if (key === undefined) return "unknown"; // missing day entry: fall back to the static badge
  const day = parseDayValue(hours[key]);
  if (day === null || day === "closed") return "unknown";
  const session = day.find((s) => minutes >= s.open && minutes < s.close);
  if (!session) return "unknown";
  return minutes >= session.close - 30 ? "closingSoon" : "open";
}
