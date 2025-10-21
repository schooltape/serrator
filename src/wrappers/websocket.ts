import WebSocket from "ws";

export enum ConnectionState {
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  RECONNECTING = "RECONNECTING",
  CLOSED = "CLOSED",
  FAILED = "FAILED",
}

export class SchoolboxWebSocket {
  #ws: WebSocket | null = null;
  #url: string;
  #cookie: string;
  #reconnectAttempts = 0;
  #maxReconnectAttempts = 4;
  #reconnectDelay = 2000;
  #shouldReconnect = false;
  #state: ConnectionState = ConnectionState.CONNECTING;
  #messageListeners: Array<(data: WebSocket.Data) => void> = [];
  #errorListeners: Array<(err: Error) => void> = [];
  #stateChangeListeners: Array<(state: ConnectionState) => void> = [];

  private constructor(url: string, cookie: string) {
    this.#url = url;
    this.#cookie = cookie;
  }

  static async create(
    url: string,
    cookie: string,
  ): Promise<SchoolboxWebSocket> {
    if (!cookie) throw new Error("cookie is required for WebSocket connection");

    const instance = new SchoolboxWebSocket(url, cookie);
    await instance.#connect();
    return instance;
  }

  #connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.#cleanup();
      this.#setState(
        this.#reconnectAttempts === 0
          ? ConnectionState.CONNECTING
          : ConnectionState.RECONNECTING,
      );

      console.log(
        `${this.#reconnectAttempts === 0 ? "connecting" : "reconnecting"} to websocket...`,
      );

      this.#ws = new WebSocket(this.#url, {
        headers: {
          Cookie: this.#cookie,
        },
      });

      const handleOpen = () => {
        console.log("connected to websocket :3");
        this.#ws?.send(JSON.stringify({ subscribe: true }));

        this.#ws?.once("message", (data) => {
          try {
            const parsed = JSON.parse(data.toString());
            if (parsed?.error) {
              this.#ws?.close();
              reject(new Error(`error ${parsed.code}: ${parsed.error}`));
            } else if (parsed?.subscribe === true) {
              this.#shouldReconnect = true;
              this.#setState(ConnectionState.CONNECTED);

              // attach listeners
              for (const listener of this.#messageListeners) {
                this.#ws?.on("message", listener);
              }
              for (const listener of this.#errorListeners) {
                this.#ws?.on("error", listener);
              }

              resolve();
            } else {
              reject(new Error("unexpected response while opening websocket"));
            }
          } catch (err) {
            reject(err);
          }
        });
      };

      const handleError = (err: Error) => {
        console.error("websocket error:", err);
        this.#emitError(err);
      };

      const handleClose = () => {
        if (this.#state === ConnectionState.CLOSED) return;
        this.#handleReconnect();
      };

      const handleMessage = (data: WebSocket.Data) => {
        this.#emitMessage(data);
      };

      this.#ws.once("open", handleOpen);
      this.#ws.once("error", (err) => {
        handleError(err);
        reject(err);
      });
      this.#ws.on("close", handleClose);
      this.#ws.on("message", handleMessage);
      this.#ws.on("error", handleError);
    });
  }

  #handleReconnect() {
    if (!this.#shouldReconnect) {
      console.warn("not attempting to reconnect");
      this.#setState(ConnectionState.CLOSED);
      return;
    }

    if (this.#reconnectAttempts < this.#maxReconnectAttempts) {
      this.#reconnectAttempts++;
      const delay = this.#reconnectDelay * 2 ** (this.#reconnectAttempts - 1);

      console.log(
        `reconnect attempt ${this.#reconnectAttempts}/${this.#maxReconnectAttempts} in ${delay}ms`,
      );

      setTimeout(() => {
        this.#connect().catch((err) => {
          console.error("reconnect failed:", err);
        });
      }, delay);
    } else {
      console.error("max reconnect attempts reached");
      this.#setState(ConnectionState.FAILED);
      this.#emitError(new Error("max reconnection attempts reached"));
    }
  }

  #cleanup() {
    if (this.#ws) {
      this.#ws.removeAllListeners();
      if (
        this.#ws.readyState === WebSocket.OPEN ||
        this.#ws.readyState === WebSocket.CONNECTING
      ) {
        this.#ws.close();
      }
    }
  }

  #emitMessage(data: WebSocket.Data) {
    for (const listener of this.#messageListeners) {
      try {
        listener(data);
      } catch (err) {
        console.error("error in message listener:", err);
      }
    }
  }

  #emitError(err: Error) {
    for (const listener of this.#errorListeners) {
      try {
        listener(err);
      } catch (listenerErr) {
        console.error("error in error listener:", listenerErr);
      }
    }
  }

  #setState(state: ConnectionState) {
    if (this.#state === state) return;
    this.#state = state;

    for (const listener of this.#stateChangeListeners) {
      try {
        listener(state);
      } catch (err) {
        console.error("error in state change listener:", err);
      }
    }
  }

  #send(data: string | Buffer) {
    if (this.#ws && this.#ws.readyState === WebSocket.OPEN) {
      this.#ws.send(data);
    } else {
      console.warn("cannot send: websocket not connected");
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

  close() {
    console.log("closing websocket");
    this.#shouldReconnect = false;
    this.#setState(ConnectionState.CLOSED);
    this.#cleanup();
  }

  onMessage(listener: (data: WebSocket.Data) => void) {
    this.#messageListeners.push(listener);
  }

  onError(listener: (err: Error) => void) {
    this.#errorListeners.push(listener);
  }

  onStateChange(listener: (state: ConnectionState) => void) {
    this.#stateChangeListeners.push(listener);
    listener(this.#state);
  }

  getState(): ConnectionState {
    return this.#state;
  }

  isConnected(): boolean {
    return this.#state === ConnectionState.CONNECTED;
  }
}
