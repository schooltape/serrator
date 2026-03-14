import { describe, it, expect } from "bun:test";
import { ctx } from "@/env";
import { authSession } from ".";

describe("authSession", () => {
  it("can authenticate a session from JWT", async () => {
    const result = await authSession(ctx);
    // console.log(result);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.cookie).toBeString();
  });
});
