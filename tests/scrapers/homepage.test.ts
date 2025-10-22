import { describe, it, expect, beforeAll } from "bun:test";
import type { SchoolboxHomepage } from "@/types";
import { authFetchParse } from "@/utils";
import { DOMAIN } from "@/env";
import { getHomepage } from "@/scrapers";

describe("getHomepage", () => {
  let result: SchoolboxHomepage;

  beforeAll(async () => {
    result = await authFetchParse(
      // TODO)) implement
      `https://${DOMAIN}/`,
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
        expect(tile.title).toBeString();
        expect(tile.link).toBeString();
      });
    });
  });
});
