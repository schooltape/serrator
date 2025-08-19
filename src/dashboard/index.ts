import { JSDOM } from "jsdom";
import type { NavLink, SchoolboxDashboard } from "../types";
import { getTileGroups } from "../utils";

/**
 * route: /
 */
export function getDashboard(html: string): SchoolboxDashboard {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // get navigation links
  const navLinks: NavLink[] = Array.from(
    document.querySelectorAll<HTMLLIElement>("#overflow-nav li[data-id]"),
  ).map((li) => {
    const anchor = li.querySelector("a");
    return {
      name: anchor?.getAttribute("title")?.trim() ?? "",
      description: anchor?.querySelector("span")?.textContent?.trim() ?? "",
      link: anchor?.getAttribute("href") || "",
      iconId: anchor?.className?.replace("icon-", "").trim() ?? "",
    };
  });

  return {
    navLinks,
    tiles: getTileGroups(dom),
  };
}
