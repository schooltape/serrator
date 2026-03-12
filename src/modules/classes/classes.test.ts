import { describe, it, expect, beforeAll } from "bun:test";
import { ctx } from "@/env";
import { getClasses } from ".";
import type { SchoolboxClass } from "./types";

describe("getClasses", () => {
  let result: SchoolboxClass[];

  beforeAll(async () => {
    result = await getClasses(ctx);
  });

  it("can extract classes from /learning/classes", () => {
    // console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((cls) => {
      expect(cls.code).toBeString();
      expect(cls.name).toBeString();
    });
  });
});
