import { describe, it, expect, beforeAll } from "bun:test";
import { BASE_URL } from "../../env";
import { getClasses, type SchoolboxClass } from "..";
import { authFetchParse } from "../../utils";

describe("getClasses", () => {
  let result: SchoolboxClass[];

  beforeAll(async () => {
    result = await authFetchParse(`${BASE_URL}/learning/classes`, getClasses);
  });

  it("can extract classes from /learning/classes", () => {
    // console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((cls) => {
      expect(cls).toHaveProperty("id");
      expect(cls.id).toBeDefined();
      expect(typeof cls.id).toBe("string");
      expect(cls.id).toMatch(/^\d+$/); // id should be a string of numbers

      expect(cls).toHaveProperty("code");
      expect(cls.code).toBeDefined();
      expect(typeof cls.code).toBe("string");

      expect(cls).toHaveProperty("url");
      expect(cls.url).toBeDefined();
      expect(typeof cls.url).toBe("string");

      expect(cls).toHaveProperty("name");
      expect(cls.name).toBeDefined();
      expect(typeof cls.name).toBe("string");

      expect(cls).toHaveProperty("imageUrl");
      expect(cls.imageUrl).toBeDefined();
      expect(typeof cls.imageUrl).toBe("string");
    });
  });
});
