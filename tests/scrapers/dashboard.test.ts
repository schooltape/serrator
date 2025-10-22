import { DOMAIN } from "@/env";
import type { SchoolboxDashboard } from "@/types";
import { authFetchParse } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { getDashboard } from "@/scrapers";

describe("getDashboard", () => {
  let result: SchoolboxDashboard;

  beforeAll(async () => {
    result = await authFetchParse(`https://${DOMAIN}/`, getDashboard);
  });

  it("can extract dashboard from /", () => {
    // console.log(result);

    expect(result).toBeDefined();

    expect(result.navLinks).toBeArray();
    for (const navLink of result.navLinks) {
      expect(navLink.name).toBeString();
      expect(navLink.link).toBeString();
      expect(navLink.iconId).toBeString();
    }

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
