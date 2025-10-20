import { describe, it, expect } from "bun:test";
import { BASE_URL, PHPSESSID } from "@/env";
import { SchoolboxWebSocket } from "@/wrappers";

let url = `wss://${BASE_URL}/websocket`;
let cookie = `PHPSESSID=${PHPSESSID}`;

describe("websocket", () => {
  it("connects and sends subscribe", async () => {
    let lastMessage: string | undefined;
    const ws = await SchoolboxWebSocket.create(url, cookie);

    ws.subscribe();

    // wait until we receive the expected message
    await new Promise<void>((resolve, reject) => {
      ws.onMessage((data) => {
        const message = data.toString();
        try {
          const json = JSON.parse(message);
          if (json.subscribe === true) {
            lastMessage = message;
            resolve();
          }
        } catch (e) {
          // Ignore non-JSON messages
        }
      });

      ws.onError((err) => {
        reject(err);
      });

      // timeout after 5 seconds if not received
      setTimeout(
        () => reject(new Error("did not receive subscribe:true")),
        5000,
      );
    });

    console.log(lastMessage);
    expect(lastMessage).toBeDefined();
    expect(lastMessage).toBe(JSON.stringify({ subscribe: true }));
    ws.close();
  });

  it.todo("sends fetch", async () => {
    // lastMessage = null;
    // const ws = await SchoolboxWebSocket.create(url, cookie);
    // ws.fetch(42);
    // await new Promise((resolve) => setTimeout(resolve, 100));
    // expect(lastMessage).toBe(JSON.stringify({ fetch: 42 }));
    // ws.close();
  });

  it("closes the websocket", async () => {
    const ws = await SchoolboxWebSocket.create(url, cookie);
    ws.close();
  });
});
