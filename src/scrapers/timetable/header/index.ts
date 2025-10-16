import type { SchoolboxTimetable } from "@/types";

/**
 * route: /
 */
export function getTimetableHeader(
  document: Document,
): SchoolboxTimetable.Header[] {
  const elements = Array.from(
    document.querySelectorAll(".timetable > thead > tr > th"),
  );
  return elements.map((el) => {
    const times = el.querySelector("time")?.textContent.split("–");
    // console.log(times);
    if (times?.[0] === undefined || times?.[1] === undefined)
      throw new Error("could not scrape times from timetable header");

    return {
      name: Array.from(el.childNodes)
        .filter((node) => node.nodeType === 3)
        .map((x) => x.textContent?.trim())
        .join(""),
      startTime: times[0],
      endTime: times[1],
    };
  });
}
