import { BASE_URL } from "@/env";
import type { operations } from "@/types";
import { getUnixTime } from "date-fns";

type SchoolboxResponse =
  operations["getCalendarAjaxFull"]["responses"]["200"]["content"]["application/json"];

/**
 * route: /calendar/ajax/full
 */
export async function getCalendar(
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  userId: number,
  start: Date,
  end: Date,
): Promise<SchoolboxResponse> {
  const params: Record<string, string> = {
    userId: userId.toString(),
    start: getUnixTime(start).toString(),
    end: getUnixTime(end).toString(),
  };

  const url = `${BASE_URL}/calendar/ajax/full${params ? `?${new URLSearchParams(params).toString()}` : ""}`;
  const response = await fetch(url);

  if (!response.ok)
    throw new Error(
      `failed to fetch calendar data: ${response.status} ${response.statusText}`,
    );

  const data: SchoolboxResponse = await response.json();
  return data;
}
