import { describe, it, expect, beforeAll } from "bun:test";
import type { SchoolboxHomepage } from "@/types";
import { authFetchParse } from "@/utils";
import { BASE_URL, CLASS_CODE } from "@/env";
import { getHomepage } from ".";

describe("getHomepage", () => {
  let result: SchoolboxHomepage;

  beforeAll(async () => {
    result = await authFetchParse(
      `${BASE_URL}/homepage/code/${CLASS_CODE}`,
      getHomepage,
    );
  });

  it("can extract homepage from /homepage/code/{CLASS_CODE}", () => {
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
        expect(tile).toHaveProperty("imageUrl");
        expect(tile.imageUrl).toBeString();
        expect(tile.imageUrl.length).toBeGreaterThan(0);
      });
    });
  });
});
