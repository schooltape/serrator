import { authFetchParams as authFetchParams } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { endOfWeek, startOfWeek } from "date-fns";
import { getCalendar } from ".";
import { registerMobile } from "../registerMobile";
import { BASE_URL } from "@/env";

describe("getCalendar", () => {
  let userId: number;

  var date = new Date();

  beforeAll(async () => {
    const result = await registerMobile(BASE_URL, authFetchParams);
    // console.log(result);
    if (result.id === undefined) throw new Error("user id is undefined");
    userId = result.id;
  });

  it("can fetch calendar events", async () => {
    const result = await getCalendar(
      authFetchParams,
      userId,
      startOfWeek(date),
      endOfWeek(date),
      false,
    );

    // console.log(result);
    expect(result).toBeDefined();

    for (const event of result) {
      expect(event).toBeDefined();

      expect(event.title).toBeDefined();
      expect(event.title).toBeString();
      expect(event.title.length).toBeGreaterThan(0);

      expect(event.start).toBeDefined();
      expect(event.start).toBeValidDate();
    }
  });

  it("can fetch timetable calendar events", async () => {
    const result = await getCalendar(
      authFetchParams,
      userId,
      startOfWeek(date),
      endOfWeek(date),
      true,
    );

    // console.log(result);
    expect(result).toBeDefined();

    for (const event of result) {
      expect(event).toBeDefined();

      expect(event.title).toBeDefined();
      expect(event.title).toBeString();
      expect(event.title.length).toBeGreaterThan(0);

      expect(event.start).toBeDefined();
      expect(event.start).toBeValidDate();

      expect(event.location).toBeDefined();
      expect(event.location).toBeString();
      expect(event.location!.length).toBeGreaterThan(0);

      expect(event.timetable).toBeDefined();
      expect(event.timetable!.code).toBeString();
      expect(event.timetable!.code.length).toBeGreaterThan(0);
    }
  });
});
