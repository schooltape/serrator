import { endOfWeek, getUnixTime, parseISO, startOfWeek } from "date-fns";
import type { SchoolboxTimetableEvent } from "./types";
import { registerMobile } from "../registerMobile";
import type { SchoolboxContext } from "@/env";

/**
 * route: /calendar/ajax/full
 *
 * TODO: this API route does not return consistent data between schools,
 * so timetable data should ideally be scraped instead.
 */
export async function getTimetable(ctx: SchoolboxContext): Promise<SchoolboxTimetableEvent[]> {
  const { domain, jwt, fetch } = ctx;

  const result = await registerMobile(ctx);
  if (result.id === undefined) throw new Error("user id is undefined");
  const userId = result.id;

  const date = new Date();

  const params: Record<string, string> = {
    userId: userId.toString(),
    start: getUnixTime(startOfWeek(date)).toString(),
    end: getUnixTime(endOfWeek(date)).toString(),
    timetableCalendar: "true",
  };

  const url = `https://${domain}/calendar/ajax/full${params ? `?${new URLSearchParams(params).toString()}` : ""}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error(`failed to fetch calendar data: ${response.status} ${response.statusText}`);

  const data = await response.json();
  // console.log(data);

  const events: SchoolboxTimetableEvent[] = [];
  for (const event of data) {
    if (!event.title || !event.start || !event.end || event.allDay === undefined) {
      throw new Error(`missing required fields in event: ${JSON.stringify(event)}`);
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
