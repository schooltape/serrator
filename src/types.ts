export interface SchoolboxDashboard {
  tiles: TileGroup[];
  navLinks: NavLink[];
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
