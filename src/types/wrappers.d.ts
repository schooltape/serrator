export interface SchoolboxTimetableEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;

  // location and code are derived from the title
  location: string;
  code: string;
}
