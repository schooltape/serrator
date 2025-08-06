import { describe, it, expect, beforeAll } from "vitest";
import { getClassIds } from "../src/classes";
import { JSDOM } from "jsdom";
import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BASE_URL;

describe("getClasses", () => {
  let document: Document;

  beforeAll(async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    });
    const html = await response.text();

    // parse HTML into Document using jsdom
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  it("should extract class info from the HTML document", () => {
    const result = getClassIds(document);
    console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((cls) => {
      expect(cls).toHaveProperty("id");
      expect(cls.id).toBeDefined();
      expect(typeof cls.id).toBe("string");
      expect(cls.id).toMatch(/^\d+$/); // id should be a string of numbers

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
