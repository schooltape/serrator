export interface SchoolboxNotification {
  link: string;
  imgUrl?: string;
  userIds: string[]; // can have mulitple users, e.g. squashed posts on a social stream
  body: string;
  unread: boolean;
  date: Date;
  action: "posted" | "replied" | "opened" | "marked" | "overdue" | null;
}
