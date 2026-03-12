export interface SchoolboxTimetableEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;

  // location and code are derived from the title
  location: string;
  code: string;
}

// export type Event = {
//   // e.g. Physics
//   name: string;
//   location: string;
//   code: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   date: Date;
//   period: string;
// };
