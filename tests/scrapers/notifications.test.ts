import { describe, it, expect, beforeAll } from "bun:test";
import { ctx } from "@/env";
import { type SchoolboxNotification } from "@/types";
import { getNotifications } from "@/scrapers";

describe("getNotifications", () => {
  let result: SchoolboxNotification[];

  beforeAll(async () => {
    result = await getNotifications(ctx);
  });

  it("can extract notifications from /notifications", () => {
    // console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((cls) => {
      expect(cls.link).toBeString();
      expect(cls.body).toBeString();
      expect(cls.unread).toBeBoolean();
      expect(cls.date).toBeDate();

      if (cls.action === null) console.warn("unknown action for:", cls);
    });
  });
});
