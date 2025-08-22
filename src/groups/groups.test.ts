import { describe, it, expect, beforeAll } from "bun:test";
import { BASE_URL } from "../env";
import { getGroups, type SchoolboxGroup } from "..";
import { makeAuthRequest } from "../utils";

describe("getGroups", () => {
  let result: SchoolboxGroup[];

  beforeAll(async () => {
    result = await makeAuthRequest(`${BASE_URL}/groups#all-groups`, getGroups);
  });

  it("extract groups from /groups", () => {
    // console.log(result);

    expect(result).toBeDefined();
    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(0);
  });
});
