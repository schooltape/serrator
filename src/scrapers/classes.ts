import type { SchoolboxClass } from "@/types";
import { getCard } from "./utils";

/**
 * route: /learning/classes
 */
export function getClasses(document: Document): SchoolboxClass[] {
  const classes: SchoolboxClass[] = [];

  document.querySelectorAll(".v-card:has(.classes)").forEach((el) => {
    classes.push(getCard(el));
  });

  return classes;
}
