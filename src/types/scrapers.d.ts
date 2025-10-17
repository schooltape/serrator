import { components } from "./api";

export interface SchoolboxDashboard {
  tiles: TileGroup[];
  navLinks: NavLink[];
}

export type SchoolboxUser = components["schemas"]["userShort"];

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

export interface SchoolboxCard {
  // in the format /homepage/{id}
  url?: string;
  code: string;
  name: string;
  imageUrl: string;
}

export interface SchoolboxClass extends SchoolboxCard {
  // class code
  code: string;
}

export interface Tile {
  title: string;
  link: string;
  imageUrl?: string;
}
export type TileGroup = Tile[];

export interface NavLink {
  name: string;
  description: string;
  link: string;
  iconId: string;
}

namespace SchoolboxTimetable {
  export type Event = {
    // e.g. Physics
    name: string;
    location: string;
    code: string;
    date: string;
    startTime: string;
    endTime: string;
    date: Date;
    period: string;
  };
}
