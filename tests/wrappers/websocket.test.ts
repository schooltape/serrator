import { describe, it, expect, beforeAll, afterEach } from "bun:test";
import { BASE_URL, JWT } from "@/env";
import { authSession, SchoolboxWebSocket, ConnectionState } from "@/wrappers";
import type { WebsocketMessage } from "@/types";

let url = `wss://${BASE_URL}/websocket`;
let cookie: string;
let ws: SchoolboxWebSocket | null = null;

beforeAll(async () => {
  const result = await authSession(fetch, BASE_URL, JWT);
  cookie = result.cookie;
});

afterEach(async () => {
  if (ws) {
    ws.close();
    ws = null;
  }
});

describe("websocket", () => {
  it("creates connection and is connected", async () => {
    ws = await SchoolboxWebSocket.create(url, cookie);
    expect(ws.isConnected()).toBe(true);
    expect(ws.getState()).toBe(ConnectionState.CONNECTED);
  });

  it.todo("tracks state transitions", async () => {
    const states: ConnectionState[] = [];
    ws = await SchoolboxWebSocket.create(url, cookie);

    ws.onStateChange((state) => {
      states.push(state);
    });

    expect(states.length).toBeGreaterThan(0);
    expect(states.at(-1)).toBe(ConnectionState.CONNECTED);
    expect(states).toContain(ConnectionState.CONNECTING);
  });

  it.todo("connects and sends subscribe", async () => {
    let lastMessage: string | undefined;
    ws = await SchoolboxWebSocket.create(url, cookie);

    ws.subscribe();

    await new Promise<void>((resolve, reject) => {
      ws?.onMessage((data) => {
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

      ws?.onError((err) => {
        reject(err);
      });

      setTimeout(
        () => reject(new Error("did not receive subscribe:true")),
        5000,
      );
    });

    expect(lastMessage).toBe(JSON.stringify({ subscribe: true }));
  });

  it.todo("sends fetch", async () => {
    // ws = await SchoolboxWebSocket.create(url, cookie);
    // let fetchMessage: string | undefined;
    //
    // ws.onMessage((data) => {
    //   const message = data.toString();
    //   try {
    //     const json = JSON.parse(message);
    //     if (json.fetch === 42) {
    //       fetchMessage = message;
    //     }
    //   } catch (e) {
    //     // Ignore non-JSON messages
    //   }
    // });
    //
    // ws.fetch(42);
    //
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // expect(fetchMessage).toBe(JSON.stringify({ fetch: 42 }));
  });

  it("handles multiple message listeners", async () => {
    ws = await SchoolboxWebSocket.create(url, cookie);
    const messages: string[] = [];
    const messages2: string[] = [];

    ws.onMessage((data) => {
      messages.push(data.toString());
    });

    ws.onMessage((data) => {
      messages2.push(data.toString());
    });

    ws.subscribe();

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(messages.length).toBeGreaterThan(0);
    expect(messages2.length).toBeGreaterThan(0);
    expect(messages.length).toBe(messages2.length);
  });

  it("handles error listeners", async () => {
    ws = await SchoolboxWebSocket.create(url, cookie);
    let errorCaught: Error | null = null;

    ws.onError((err) => {
      errorCaught = err;
    });

    expect(errorCaught).toBeNull();
  });

  it.todo("handles 401 unauthorized cookie", () => {
    return expect(
      SchoolboxWebSocket.create(url, "invalid_cookie"),
    ).rejects.toThrow("401 unauthorised: invalid cookie");
  });

  it("closes the websocket and stops reconnection", async () => {
    ws = await SchoolboxWebSocket.create(url, cookie);
    expect(ws.isConnected()).toBe(true);

    ws.close();

    expect(ws.getState()).toBe(ConnectionState.CLOSED);
    expect(ws.isConnected()).toBe(false);
  });

  it("tracks state change when closing", async () => {
    ws = await SchoolboxWebSocket.create(url, cookie);
    const states: ConnectionState[] = [];

    ws.onStateChange((state) => {
      states.push(state);
    });

    ws.close();

    expect(states.at(-1)).toBe(ConnectionState.CLOSED);
  });

  it("fetches user notifications", async () => {
    ws = await SchoolboxWebSocket.create(url, cookie);
    let lastMessage: WebsocketMessage | undefined;

    ws.onMessage((msg) => {
      lastMessage = msg;
    });

    ws.fetch(1);
    await new Promise<void>((resolve) => {
      ws?.onMessage((msg) => {
        if ("fetch" in msg) {
          resolve();
        }
      });
      setTimeout(resolve, 1000);
    });

    // console.log(lastMessage);

    expect(lastMessage).toHaveProperty("fetch");
    if (lastMessage && "fetch" in lastMessage) {
      for (const [key, value] of Object.entries(lastMessage!.fetch)) {
        expect(key).toBeString();
        expect(key.length).toBeGreaterThan(0);
        expect(value).toBeObject();
        expect(value.id).toBeString();
        expect(value.body).toBeString();
        expect(value.icon).toBeString();
        expect(value.href).toBeString();
        expect(value.params).toBeObject();
        expect(value.meta).toBeObject();
        expect(value.timestamp).toBeNumber();
        expect(value.status).toBeString();
      }
    } else {
      throw new Error("no fetch data received");
    }
  });
});
