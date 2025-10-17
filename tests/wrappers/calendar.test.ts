import { authFetchParams as authFetchParams } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { endOfWeek, parseISO, startOfWeek } from "date-fns";
import { getCalendar, registerMobile } from "@/wrappers";
import { BASE_URL } from "@/env";

describe("getCalendar", () => {
  let userId: number;

  const date = new Date();

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
    );

    // console.log(result);
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
        expect(parseISO(event.start!)).toBeValidDate();

        expect(event.end).toBeDefined();
        expect(parseISO(event.end!)).toBeValidDate();
      }
    }
  });
});
