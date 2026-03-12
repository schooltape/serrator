import type { SchoolboxTileGroup } from "../homepage/types";

export interface SchoolboxDashboard {
  tiles: SchoolboxTileGroup[];
  navLinks: SchoolboxNavLink[];
}

export interface SchoolboxNavLink {
  name: string;
  description?: string;
  link: string;
  iconId: string;
}
