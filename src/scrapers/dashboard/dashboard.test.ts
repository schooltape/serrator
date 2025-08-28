import { BASE_URL } from "@/env";
import type { SchoolboxDashboard } from "@/types";
import { authFetchParse } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { getDashboard } from ".";

describe("getDashboard", () => {
  let result: SchoolboxDashboard;

  beforeAll(async () => {
    result = await authFetchParse(`${BASE_URL}/`, getDashboard);
  });

  it("can extract dashboard from /", () => {
    // console.log(result);

    expect(result).toBeDefined();

    const user = result.user;
    expect(user).toBeDefined();
    // console.log(user);
    expect(user).toHaveProperty("id");
    expect(user.id).toBeNumber();
    expect(user).toHaveProperty("externalId");
    expect(user.externalId).toBeString();
    expect(user).toHaveProperty("title");
    expect(user.title).toBeString();
    expect(user).toHaveProperty("firstname");
    expect(user.firstname).toBeString();
    expect(user).toHaveProperty("preferredName");
    expect(user.preferredName).toBeString();
    expect(user).toHaveProperty("givenName");
    expect(user.givenName).toBeString();
    expect(user).toHaveProperty("lastname");
    expect(user.lastname).toBeString();
    expect(user).toHaveProperty("fullName");
    expect(user.fullName).toBeString();

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
