import { authFetchParams, authFetchParse } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { getTimetable, registerMobile } from "@/wrappers";
import { BASE_URL } from "@/env";
import type { SchoolboxTimetableEvent } from "@/types";
import { getClasses } from "@/scrapers";

describe("getTimetable", () => {
  let userId: number;
  let result: SchoolboxTimetableEvent[];

  beforeAll(async () => {
    await registerMobile(BASE_URL, authFetchParams).then((result) => {
      if (result.id === undefined) throw new Error("user id is undefined");
      userId = result.id;
    });

    result = await getTimetable(authFetchParams, userId);
    // console.log(result);
  });

  it("can fetch timetable events", async () => {
    expect(result).toBeDefined();

    for (const event of result) {
      expect(event).toBeDefined();

      expect(event.title).toBeDefined();
      expect(event.title).toBeString();
      expect(event.title?.length).toBeGreaterThan(0);

      expect(event.allDay).toBeDefined();
      expect(event.allDay).toBeBoolean();

      if (!event.allDay) {
        expect(event.start).toBeDefined();
        expect(event.start).toBeValidDate();

        expect(event.end).toBeDefined();
        expect(event.end).toBeValidDate();
      }

      expect(event.location).toBeDefined();
      expect(event.location).toBeString();
      expect(event.location?.length).toBeGreaterThan(0);

      expect(event.code).toBeDefined();
      expect(event.code).toBeString();
      expect(event.code?.length).toBeGreaterThan(0);
    }
  });

  it("can find associated class names of timetable events", async () => {
    const classes = await authFetchParse(
      `https://${BASE_URL}/learning/classes`,
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
