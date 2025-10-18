import type { SchoolboxNavLink, SchoolboxDashboard } from "@/types";
import { getTileGroups } from "./utils";

/**
 * route: /
 */
export function getDashboard(document: Document): SchoolboxDashboard {
  // get navigation links
  const navLinks: SchoolboxNavLink[] = Array.from(
    document.querySelectorAll<HTMLLIElement>("#overflow-nav li[data-id]"),
  ).map((li) => {
    const anchor = li.querySelector("a");

    const name = anchor?.querySelector("span")?.textContent?.trim();
    const description = anchor?.getAttribute("title")?.trim() || undefined;
    const link = anchor?.getAttribute("href");
    const iconId = anchor?.className?.replace("icon-", "").trim();

    if (!name || !link || !iconId)
      throw new Error("missing required fields on nav link");

    return {
      name,
      description,
      link,
      iconId,
    };
  });

  return {
    navLinks,
    tiles: getTileGroups(document),
  };
}
