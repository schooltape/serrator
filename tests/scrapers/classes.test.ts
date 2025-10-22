import { describe, it, expect, beforeAll } from "bun:test";
import { DOMAIN } from "@/env";
import { type SchoolboxClass } from "@/types";
import { authFetchParse } from "@/utils";
import { getClasses } from "@/scrapers";

describe("getClasses", () => {
  let result: SchoolboxClass[];

  beforeAll(async () => {
    result = await authFetchParse(
      `https://${DOMAIN}/learning/classes`,
      getClasses,
    );
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
