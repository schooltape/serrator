import { describe, it, expect, beforeAll } from "bun:test";
import { BASE_URL, CLASS_CODE } from "../env";
import { getHomepage, type SchoolboxHomepage } from "..";
import { makeAuthRequest } from "../utils";

describe("getHomepage", () => {
  let result: SchoolboxHomepage;

  beforeAll(async () => {
    result = await makeAuthRequest(
      `${BASE_URL}/homepage/code/${CLASS_CODE}`,
      getHomepage,
    );
  });

  it("extract homepage from /homepage/code/{CLASS_CODE}", () => {
    // console.log(result);

    expect(result).toBeDefined();
    expect(result.title).toBeString();
    const tiles = result.tiles;
    expect(tiles).toBeArray();

    tiles.forEach((tileGroup) => {
      expect(tileGroup).toBeArray();
      tileGroup.forEach((tile) => {
        expect(tile).toHaveProperty("title");
        expect(tile.title).toBeString();
        expect(tile).toHaveProperty("link");
        expect(tile.link).toBeString();
        expect(tile).toHaveProperty("imageUrl");
        expect(tile.imageUrl).toBeString();
      });
    });
  });
});
