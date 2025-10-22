import type { operations, SchoolboxContext } from "@/types";
import { getUnixTime } from "date-fns";
import { registerMobile } from "./registerMobile";

type SchoolboxResponse =
  operations["getCalendarAjaxFull"]["responses"]["200"]["content"]["application/json"];

/**
 * route: /calendar/ajax/full
 */
export async function getCalendar(
  ctx: SchoolboxContext,
  start: Date,
  end: Date,
): Promise<SchoolboxResponse> {
  const { fetch, domain, jwt } = ctx;

  const result = await registerMobile(ctx);
  if (result.id === undefined) throw new Error("user id is undefined");
  const userId = result.id;

  const params: Record<string, string> = {
    userId: userId.toString(),
    start: getUnixTime(start).toString(),
    end: getUnixTime(end).toString(),
  };

  const url = `https://${domain}/calendar/ajax/full${params ? `?${new URLSearchParams(params).toString()}` : ""}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok)
    throw new Error(
      `failed to fetch calendar data: ${response.status} ${response.statusText}`,
    );

  const data: SchoolboxResponse = await response.json();
  return data;
}
