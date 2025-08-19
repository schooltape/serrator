import { describe, it, expect, beforeAll } from "bun:test";
import { BASE_URL } from "../env";
import { getDashboard, type SchoolboxDashboard } from "..";
import { makeAuthRequest } from "../utils";

describe("getHomepage", () => {
  let result: SchoolboxDashboard;

  beforeAll(async () => {
    result = await makeAuthRequest(`${BASE_URL}/`, getDashboard);
  });

  it("extract dashboard from /", () => {
    // console.log(result);

    expect(result).toBeDefined();

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
      });
    });
  });
});
