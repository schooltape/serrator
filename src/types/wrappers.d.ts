// the Schoolbox API is documented in api.d.ts, these wrappers are simple abstractions over the Schoolbox API
export interface SchoolboxEvent {
  title: string;
  start: Date;
  end?: Date;
  allDay: boolean;
  location?: string;
  timetable?: SchoolboxEventTimetable;
}

interface SchoolboxEventTimetable {
  code: string;
  // array of staff IDs with their associated names
  staff: Record<number, string>;
}
