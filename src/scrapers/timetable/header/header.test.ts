import { BASE_URL } from "@/env";
import type { SchoolboxTimetable } from "@/types";
import { authFetchParse } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { getTimetableHeader } from ".";

describe("getTimetableHeader", () => {
  let result: SchoolboxTimetable.Header[];

  beforeAll(async () => {
    result = await authFetchParse(`${BASE_URL}/`, getTimetableHeader);
  });

  it("can extract the timetable header from /", () => {
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(0);

    for (const header of result) {
      expect(header).toBeDefined();
      expect(header).toHaveProperty("name");
      expect(header).toHaveProperty("startTime");
      expect(header).toHaveProperty("endTime");
      expect(header.startTime).toBeString();
      expect(header.startTime).toMatch(/^([1-9]|1[0-2]):[0-5][0-9](am|pm)$/); // HH:MM
    }
  });
});
