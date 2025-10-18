import { BASE_URL } from "@/env";
import type { SchoolboxTimetableEvent, operations } from "@/types";
import { endOfWeek, getUnixTime, parseISO, startOfWeek } from "date-fns";

/**
 * route: /calendar/ajax/full
 */
export async function getTimetable(
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  userId: number,
): Promise<SchoolboxTimetableEvent[]> {
  const date = new Date();
  const params: Record<string, string> = {
    userId: userId.toString(),
    start: getUnixTime(startOfWeek(date)).toString(),
    end: getUnixTime(endOfWeek(date)).toString(),
    timetableCalendar: "true",
  };
  const url = `${BASE_URL}/calendar/ajax/full${params ? `?${new URLSearchParams(params).toString()}` : ""}`;
  const response = await fetch(url);

  if (!response.ok)
    throw new Error(
      `failed to fetch calendar data: ${response.status} ${response.statusText}`,
    );

  const data: operations["getCalendarAjaxFull"]["responses"]["200"]["content"]["application/json"] =
    await response.json();
  // console.log(data);

  const events: SchoolboxTimetableEvent[] = [];
  for (const event of data) {
    if (
      !event.title ||
      !event.start ||
      !event.end ||
      event.allDay === undefined
    ) {
      throw new Error(
        `missing required fields in event: ${JSON.stringify(event)}`,
      );
    }

    // skip over all-day events such as day markers
    if (event.allDay) continue;

    const code = event.data?.timetable?.code
      ? event.data.timetable.code
      : event.title.match(/\(([^)]+)\)/)?.[1]?.trim();
    if (!code) {
      throw new Error("missing code in timetable event");
    }

    const location = event.data?.meta?.location
      ? event.data.meta.location
      : event.title.match(/,([^,]*)$/)?.[1]?.trim();
    if (!location) {
      throw new Error("missing location in timetable event");
    }

    events.push({
      title: event.title,
      allDay: event.allDay,
      start: parseISO(event.start),
      end: parseISO(event.end),
      code,
      location,
    });
  }

  return events;
}
