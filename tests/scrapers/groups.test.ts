import { DOMAIN } from "@/env";
import type { SchoolboxGroup } from "@/types";
import { authFetchParse } from "@/utils";
import { describe, it, expect, beforeAll } from "bun:test";
import { getGroups } from "@/scrapers";

describe("getGroups", () => {
  let result: SchoolboxGroup[];

  beforeAll(async () => {
    result = await authFetchParse(
      `https://${DOMAIN}/groups#all-groups`,
      getGroups,
    );
  });

  it("can extract groups from /groups", () => {
    // console.log(result);

    expect(result).toBeDefined();
    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(0);
  });
});
