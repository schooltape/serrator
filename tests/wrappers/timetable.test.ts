import { authFetchParse } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { getTimetable } from "@/wrappers";
import { DOMAIN, JWT } from "@/env";
import type { SchoolboxTimetableEvent } from "@/types";
import { getClasses } from "@/scrapers";

describe("getTimetable", () => {
  let result: SchoolboxTimetableEvent[];

  beforeAll(async () => {
    result = await getTimetable(fetch, DOMAIN, JWT);
    // console.log(result);
  });

  it("can fetch timetable events", async () => {
    expect(result).toBeDefined();

    for (const event of result) {
      expect(event).toBeDefined();

      expect(event.title).toBeString();
      expect(event.title?.length).toBeGreaterThan(0);

      expect(event.allDay).toBeBoolean();

      if (!event.allDay) {
        expect(event.start).toBeValidDate();
        expect(event.end).toBeValidDate();
      }

      expect(event.location).toBeString();
      expect(event.location?.length).toBeGreaterThan(0);

      expect(event.code).toBeString();
      expect(event.code?.length).toBeGreaterThan(0);
    }
  });

  it("can find associated class names of timetable events", async () => {
    const classes = await authFetchParse(
      `https://${DOMAIN}/learning/classes`,
      getClasses,
    );

    for (const event of result) {
      if (!event.allDay) {
        const classEvent = classes.find((c) => c.code === event.code);
        expect(classEvent).toBeDefined();
      }
    }
  });
});
