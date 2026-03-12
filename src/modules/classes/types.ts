export interface SchoolboxCard {
  // in the format /homepage/{id}
  url?: string;
  code: string;
  name: string;
  imageUrl?: string;
}

export interface SchoolboxClass extends SchoolboxCard {
  // class code
  code: string;
}
