import { describe, it, expect, beforeAll } from "bun:test";
import { endOfWeek, parseISO, startOfWeek } from "date-fns";
import { getCalendar, registerMobile } from "@/wrappers";
import { DOMAIN, JWT } from "@/env";

describe("getCalendar", () => {
  let userId: number;

  const date = new Date();

  beforeAll(async () => {
    const result = await registerMobile(fetch, DOMAIN, JWT);
    // console.log(result);
    if (result.id === undefined) throw new Error("user id is undefined");
    userId = result.id;
  });

  it("can fetch calendar events", async () => {
    const result = await getCalendar(
      fetch,
      DOMAIN,
      JWT,
      startOfWeek(date),
      endOfWeek(date),
    );

    // console.log(result);
    expect(result).toBeDefined();

    for (const event of result) {
      expect(event).toBeDefined();

      expect(event.title).toBeString();
      expect(event.title?.length).toBeGreaterThan(0);

      expect(event.allDay).toBeBoolean();

      if (!event.allDay) {
        // event end might not be defined if event is an assessment task
        expect(parseISO(event.start!)).toBeValidDate();
      }
    }
  });
});
