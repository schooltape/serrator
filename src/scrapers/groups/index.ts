import type { SchoolboxGroup } from "@/types";

/**
 * route: /groups#all-groups
 */
export function getGroups(document: Document): SchoolboxGroup[] {
  const groups = JSON.parse(
    document
      .querySelector("#manage-groups-container manage-groups")
      ?.getAttribute(":groups") as string,
  ) as SchoolboxGroup[];

  return groups;
}
