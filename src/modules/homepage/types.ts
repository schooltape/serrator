export interface SchoolboxHomepage {
  title: string;
  tiles: SchoolboxTileGroup[];
  // teachers: User[];
  // students: User[];
  // socialStream: string;
  // files: File[];
  // widgets: Widget[];
}

export interface SchoolboxTile {
  title: string;
  link: string;
  imageUrl?: string;
}
export type SchoolboxTileGroup = SchoolboxTile[];
