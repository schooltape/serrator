export interface SchoolboxContext {
  fetch: typeof globalThis.fetch;
  domain: string;
  jwt: string;
}

export interface SchoolboxTimetableEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;

  // location and code are derived from the title
  location: string;
  code: string;
}

export type WebsocketMessage =
  | { fetch: Record<string, NotificationItem> }
  | { push: Record<string, NotificationItem> }
  | { ack: string[] }
  | { error: string; code: number };

export interface NotificationItem {
  id: string;
  body: string;
  icon: string;
  href: string;
  params: {
    user: Record<string, NotificationParam>;
    action: Record<string, NotificationParam>;
    title: Record<string, NotificationParam>;
  };
  meta: {
    title: string;
    author: string;
    date: string;
    thumb: string | null;
    pushBanner: string | null;
    blurb: string;
    readMore: {
      string: string;
      available: boolean;
    };
    body: string;
    byline: string;
    replyToUserIds: number[];
  };
  timestamp: number;
  status: string;
}

export interface NotificationParam {
  text: string;
  href: string | null;
  mode: number;
  time: number;
}
