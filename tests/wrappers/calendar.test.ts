import { describe, it, expect, beforeAll } from "bun:test";
import { endOfWeek, parseISO, startOfWeek } from "date-fns";
import { getCalendar, registerMobile } from "@/wrappers";
import { ctx } from "@/env";

describe("getCalendar", () => {
  const date = new Date();

  it("can fetch calendar events", async () => {
    const result = await getCalendar(ctx, startOfWeek(date), endOfWeek(date));

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
