import { describe, it, expect } from "bun:test";
import { authSession } from "@/wrappers";
import { ctx } from "@/env";

describe("authSession", () => {
  it("can authenticate a session from JWT", async () => {
    const result = await authSession(ctx);
    // console.log(result);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.cookie).toBeString();
  });
});
