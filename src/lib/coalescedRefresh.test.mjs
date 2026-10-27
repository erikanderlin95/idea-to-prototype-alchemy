import { expect, test } from "bun:test";
import { coalescedRefresh } from "./coalescedRefresh.ts";

test("burst updates never overlap and receive a final authoritative refresh", async () => {
  let calls = 0;
  let active = 0;
  let maxActive = 0;
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const loader = coalescedRefresh(async () => {
    calls++;
    active++;
    maxActive = Math.max(maxActive, active);
    if (calls === 1) await gate;
    active--;
  });
  const first = loader.refresh();
  loader.refresh();
  loader.refresh();
  release();
  await first;
  expect(calls).toBe(2);
  expect(maxActive).toBe(1);
  loader.dispose();
  await loader.refresh();
  expect(calls).toBe(2);
});