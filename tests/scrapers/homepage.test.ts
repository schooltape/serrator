import { describe, it, expect, beforeAll } from "bun:test";
import type { SchoolboxHomepage } from "@/types";
import { ctx } from "@/env";
import { getHomepage } from "@/scrapers";

describe("getHomepage", () => {
  let result: SchoolboxHomepage;

  beforeAll(async () => {
    result = await getHomepage(ctx, "/");
    // console.log(result);
  });

  it("can extract homepage data from /", () => {
    expect(result).toBeDefined();
    expect(result.title).toBeString();
    const tiles = result.tiles;
    expect(tiles).toBeArray();

    tiles.forEach((tileGroup) => {
      // console.log(tileGroup);
      expect(tileGroup).toBeArray();
      expect(tileGroup.length).toBeGreaterThan(0);

      tileGroup.forEach((tile) => {
        expect(tile.title).toBeString();
        expect(tile.link).toBeString();
      });
    });
  });
});
