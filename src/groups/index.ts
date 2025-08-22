import { JSDOM } from "jsdom";
import type { SchoolboxGroup } from "../types";
import { getCard } from "../utils";

/**
 * route: /groups#all-groups
 */
export function getGroups(html: string): SchoolboxGroup[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const groups = JSON.parse(
    document
      .querySelector("#manage-groups-container manage-groups")
      ?.getAttribute(":groups") as string,
  ) as SchoolboxGroup[];

  return groups;
}
