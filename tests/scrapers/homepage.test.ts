import { describe, it, expect, beforeAll } from "bun:test";
import type { SchoolboxHomepage } from "@/types";
import { authFetchParse } from "@/utils";
import { BASE_URL } from "@/env";
import { getHomepage } from "@/scrapers";

describe("getHomepage", () => {
  let result: SchoolboxHomepage;

  beforeAll(async () => {
    result = await authFetchParse(
      // TODO)) implement
      `https://${BASE_URL}/`,
      getHomepage,
    );
  });

  it("can extract homepage data from /", () => {
    // console.log(result);

    expect(result).toBeDefined();
    expect(result.title).toBeString();
    const tiles = result.tiles;
    expect(tiles).toBeArray();

    tiles.forEach((tileGroup) => {
      // console.log(tileGroup);
      expect(tileGroup).toBeArray();
      expect(tileGroup.length).toBeGreaterThan(0);

      tileGroup.forEach((tile) => {
        expect(tile).toHaveProperty("title");
        expect(tile.title).toBeString();
        expect(tile).toHaveProperty("link");
        expect(tile.link).toBeString();
      });
    });
  });
});
