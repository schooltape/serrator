import type { SchoolboxClass } from "@/types";
import { getCard } from "../utils";

/**
 * route: /learning/classes
 */
export function getClasses(document: Document): SchoolboxClass[] {
  const classes: SchoolboxClass[] = [];

  document.querySelectorAll(".v-card:has(.classes)").forEach((el) => {
    const code = (el.querySelector(".card-content > div > p") as HTMLElement)
      .textContent;
    const cardInfo = getCard(el);

    classes.push({
      ...cardInfo,
      code,
    });
  });

  return classes;
}
