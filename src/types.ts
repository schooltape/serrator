export interface SchoolboxDashboard {
  tiles: TileGroup[];
  navLinks: NavLink[];
}

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
export interface SchoolboxHomepage {
  title: string;
  tiles: TileGroup[];
  // teachers: User[];
  // students: User[];
  // socialStream: string;
  // files: File[];
  // widgets: Widget[];
}

export interface SchoolboxClass {
  id: string;
  code: string;
  url: string;
  name: string;
  imageUrl: string;
}

export interface Tile {
  title: string;
  link: string;
  imageUrl: string;
}
export type TileGroup = Tile[];

export interface NavLink {
  name: string;
  description: string;
  link: string;
  iconId: string;
}
