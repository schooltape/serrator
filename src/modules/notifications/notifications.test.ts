import { describe, it, expect, beforeAll } from "bun:test";
import { ctx } from "@/env";
import { getNotifications } from "./parser";
import type { SchoolboxNotification } from "./types";

describe("getNotifications", () => {
  let result: SchoolboxNotification[];

  beforeAll(async () => {
    result = await getNotifications(ctx);
  });

  it("can extract notifications from /notifications", () => {
    // console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((notif) => {
      expect(notif.link).toBeString();
      expect(notif.body).toBeString();
      expect(notif.unread).toBeBoolean();
      expect(notif.date).toBeDate();

      if (notif.action === null) console.warn("unknown action for:", notif);
    });
  });
});
