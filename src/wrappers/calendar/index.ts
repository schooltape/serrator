import { getUnixTime, parseISO } from "date-fns";
import type { SchoolboxEvent } from "..";
import type { operations } from "../../api";

/**
 * route: /calendar/ajax/full
 */
export async function getCalendar(
  fetch: (pathname: string, params: URLSearchParams) => Promise<Response>,
  userId: number,
  start: Date,
  end: Date,
  timetable: boolean,
): Promise<SchoolboxEvent[]> {
  const params: Record<string, string> = {
    userId: userId.toString(),
    start: getUnixTime(start).toString(),
    end: getUnixTime(end).toString(),
  };
  if (timetable) {
    params.timetableCalendar = "true";
  }

  const response = await fetch(
    "/calendar/ajax/full",
    new URLSearchParams(params),
  );

  // console.log(response.status); // e.g. 200
  // console.log(response.statusText); // e.g. "OK"
  const data: operations["getCalendarAjaxFull"]["responses"]["200"]["content"]["application/json"] =
    await response.json();

  const events: SchoolboxEvent[] = [];
  for (const event of data) {
    if (!event.title || !event.start || event.allDay === undefined) {
      throw new Error(
        `Missing required fields in event: ${JSON.stringify(event)}`,
      );
    }
    events.push({
      title: event.title,
      allDay: event.allDay,
      start: parseISO(event.start),
      ...(event.end ? { end: parseISO(event.end) } : {}),
      ...(event.data?.meta?.location
        ? { location: event.data.meta.location }
        : {}),
      ...(timetable
        ? event.data?.timetable
          ? {
              timetable: {
                code: event.data.timetable.code ?? "",
                staff: Object.fromEntries(
                  Object.entries(event.data.timetable.staff || {}).map(
                    ([key, value]) => [Number(key), value],
                  ),
                ),
              },
            }
          : {}
        : {}),
    });
  }

  return events;
}
