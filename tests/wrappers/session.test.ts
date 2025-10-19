import { authFetchParams } from "@/utils";
import { describe, it, expect } from "bun:test";
import { authSession } from "@/wrappers";
import { BASE_URL, JWT } from "@/env";

describe("authSession", () => {
  it("can authenticate a session from JWT", async () => {
    const result = await authSession(authFetchParams, BASE_URL, JWT);
    // console.log(result);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.setCookie).toBeDefined();
    expect(result.setCookie).toBeArray();
  });
});
