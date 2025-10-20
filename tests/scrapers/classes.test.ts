import { describe, it, expect, beforeAll } from "bun:test";
import { BASE_URL } from "@/env";
import { type SchoolboxClass } from "@/types";
import { authFetchParse } from "@/utils";
import { getClasses } from "@/scrapers";

describe("getClasses", () => {
  let result: SchoolboxClass[];

  beforeAll(async () => {
    result = await authFetchParse(
      `https://${BASE_URL}/learning/classes`,
      getClasses,
    );
  });

  it("can extract classes from /learning/classes", () => {
    // console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((cls) => {
      expect(cls).toHaveProperty("code");
      expect(cls.code).toBeDefined();
      expect(typeof cls.code).toBe("string");

      expect(cls).toHaveProperty("name");
      expect(cls.name).toBeDefined();
      expect(typeof cls.name).toBe("string");
    });
  });
});
