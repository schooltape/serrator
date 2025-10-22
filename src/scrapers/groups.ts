import type { SchoolboxContext, SchoolboxGroup } from "@/types";

/**
 * route: /groups#all-groups
 */
export async function getGroups(
  ctx: SchoolboxContext,
): Promise<SchoolboxGroup[]> {
  const { domain, jwt, fetch, parser } = ctx;

  const document = await parser(
    await fetch(`https://${domain}/groups#all-groups`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  );

  const groups = JSON.parse(
    document
      .querySelector("#manage-groups-container manage-groups")
      ?.getAttribute(":groups") as string,
  ) as SchoolboxGroup[];

  return groups;
}
