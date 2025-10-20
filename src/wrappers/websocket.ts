import WebSocket from "ws";

export class SchoolboxWebSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private cookie: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 2000; // 2 seconds
  private shouldReconnect = true;
  private errorListener: ((err: Error) => void) | null = null;

  private constructor(url: string, cookie: string) {
    this.url = url;
    this.cookie = cookie;
  }
  
  static async create(url: string, cookie: string): Promise<SchoolboxWebSocket> {
    if (!cookie)
      throw new Error("cookie is required for WebSocket connection");
    
    const instance = new SchoolboxWebSocket(url, cookie);
    await instance.#connect();
    return instance;
  }

  #connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      console.log("connecting to the websocket...");
      this.ws = new WebSocket(this.url, {
        headers: {
          Cookie: this.cookie,
        },
      });

      // 401 unauthorised error handler
      this.ws.on("message", (data) => {
        if (JSON.parse(data.toString())?.code === 401) {
          const err = new Error("401 unauthorised: invalid cookie");
          console.error(err);
          this.shouldReconnect = false;
          this.ws?.close();
          if (this.errorListener) this.errorListener(err);
          reject(err);
        }
      });
      this.ws.on("open", () => {
        console.log("successfully connected!");
        this.reconnectAttempts = 0;
        resolve(this.ws!);
      });
      this.ws.on("error", (err: any) => {
        console.error("error:", err);
        if (this.errorListener) this.errorListener(err);
        reject(err);
      });
      this.ws.on("close", () => this.#handleReconnect());
    });
  }

  #handleReconnect() {
    if (!this.shouldReconnect) {
      console.warn("not attempting to reconnect");
      return;
    }
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        console.log("attempting reconnect");
        this.#connect();
      }, this.reconnectDelay * this.reconnectAttempts); // exponential backoff
    } else {
      console.error("max reconnect attempts reached");
    }
  }

  subscribe() {
    this.#send(JSON.stringify({ subscribe: true }));
  }

  fetch(num: number) {
    this.#send(JSON.stringify({ fetch: num }));
  }

  ack(ids: string[]) {
    this.#send(JSON.stringify({ ack: ids }));
  }

  #send(data: string | Buffer) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }
  }

  close() {
    console.log("closed the websocket")
    this.shouldReconnect = false;
    this.ws?.close();
  }

  onMessage(listener: (data: WebSocket.Data) => void) {
    if (this.ws) {
      this.ws.on("message", listener);
    } else {
      throw new Error("WebSocket not connected yet");
    }
  }

  onError(listener: (err: Error) => void) {
    this.errorListener = listener;
    if (this.ws) {
      this.ws.on("error", listener);
    }
  }
}
