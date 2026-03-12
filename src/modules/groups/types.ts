export interface SchoolboxGroup {
  id: number;
  name: string;
  enrolmentStatus: "enroled" | "notEnroled" | "pending";
  /** hex colour code (without #) */
  colour: string;
  coverImageHash: string | null;
  isNotificationsOn: boolean;
  isForceFollow: boolean;
  isMsgDisabled: boolean;
  isFavourite: boolean;
  type: "private" | "moderated" | "free";
  isAccessAdmin: boolean;
  isAccessWrite: boolean;
  isAccessRead: boolean;
  isPrivate: boolean;
  modifyLink: boolean;
  hasHomepage: boolean;
}
