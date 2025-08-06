import { describe, it, expect, beforeAll } from "vitest";
import { getClasses } from "../src/classes";
import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BASE_URL;
if (!API_URL) {
  throw new Error("BASE_URL is not defined in the environment variables");
}
const JWT = process.env.JWT;
if (!JWT) {
  throw new Error("JWT is not defined in the environment variables");
}

describe("getClasses", () => {
  let html: string;

  beforeAll(async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
    html = await response.text();
  });

  it("should extract class info from the HTML document", () => {
    const result = getClasses(html);
    console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((cls) => {
      expect(cls).toHaveProperty("id");
      expect(cls.id).toBeDefined();
      expect(typeof cls.id).toBe("string");
      expect(cls.id).toMatch(/^\d+$/); // id should be a string of numbers

      // expect(cls).toHaveProperty("code");
      // expect(cls.code).toBeDefined();
      // expect(typeof cls.code).toBe("string");

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
