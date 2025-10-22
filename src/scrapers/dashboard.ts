import type {
  SchoolboxNavLink,
  SchoolboxDashboard,
  SchoolboxContext,
} from "@/types";
import { getTileGroups } from "./utils";

/**
 * route: /
 */
export async function getDashboard(
  ctx: SchoolboxContext,
): Promise<SchoolboxDashboard> {
  const { domain, jwt, fetch, parser } = ctx;

  const document = await parser(
    await fetch(`https://${domain}/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  );

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
