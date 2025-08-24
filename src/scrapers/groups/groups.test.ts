import { describe, it, expect, beforeAll } from "bun:test";
import { BASE_URL } from "../../env";
import { getGroups, type SchoolboxGroup } from "..";
import { authFetchParse } from "../../utils";

describe("getGroups", () => {
  let result: SchoolboxGroup[];

  beforeAll(async () => {
    result = await authFetchParse(`${BASE_URL}/groups#all-groups`, getGroups);
  });

  it("can extract groups from /groups", () => {
    // console.log(result);

    expect(result).toBeDefined();
    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(0);
  });
});
