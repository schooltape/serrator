import type { SchoolboxContext, SchoolboxHomepage } from "@/types";
import { getTileGroups } from "./utils";

/**
 * route: /homepage/{id} or /homepage/code/{code}
 */
export async function getHomepage(
  ctx: SchoolboxContext,
  pathname: string,
): Promise<SchoolboxHomepage> {
  if (!pathname.startsWith("/"))
    throw new Error("expected pathname to begin with /");

  const { domain, jwt, fetch, parser } = ctx;

  const document = await parser(
    await fetch(`https://${domain}${pathname}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  );

  return {
    title: document.querySelector("h1")?.textContent?.trim() || "",
    tiles: getTileGroups(document),
  };
}
