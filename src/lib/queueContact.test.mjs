import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

// LanguageContext.tsx holds all four dictionaries (en, zh, ms, ta) in one file.
const source = readFileSync(
  new URL("../contexts/LanguageContext.tsx", import.meta.url),
  "utf8",
);

const REQUIRED_KEYS = [
  "queue.notice.walkIn",
  "queue.contactWhatsApp",
  "queue.contactCall",
];

// The walk-in notice is the first line of the Patient Notice on the queue page.
const EN_WALK_IN =
  "This is a walk-in queue, not an appointment booking. Patients with appointments will be served first.";

test("walk-in notice and contact options exist in all four languages", () => {
  for (const key of REQUIRED_KEYS) {
    const count = source.split(`"${key}"`).length - 1;
    expect(count).toBe(4);
  }
});

test("walk-in notice first line matches the approved wording", () => {
  expect(source).toContain(`"queue.notice.walkIn": "${EN_WALK_IN}"`);
});

test("walk-in notice also appears in the join-queue intake form", () => {
  const intake = readFileSync(
    new URL("../components/intake/JoinQueueIntakeDialog.tsx", import.meta.url),
    "utf8",
  );
  expect(intake).toContain('t("queue.notice.walkIn")');
});
