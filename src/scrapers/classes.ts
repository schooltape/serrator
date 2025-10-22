import type { SchoolboxClass, SchoolboxContext } from "@/types";
import { getCard } from "./utils";

/**
 * route: /learning/classes
 */
export async function getClasses(
  ctx: SchoolboxContext,
): Promise<SchoolboxClass[]> {
  const { domain, jwt, fetch, parser } = ctx;

  const document = await parser(
    await fetch(`https://${domain}/learning/classes`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  );

  const classes: SchoolboxClass[] = [];

  document.querySelectorAll(".v-card:has(.classes)").forEach((el) => {
    classes.push(getCard(el));
  });

  return classes;
}
