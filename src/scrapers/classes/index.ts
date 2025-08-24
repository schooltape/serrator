import { JSDOM } from "jsdom";
import { getCard } from "../utils";
import type { SchoolboxClass } from "..";

/**
 * route: /learning/classes
 */
export function getClasses(html: string): SchoolboxClass[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;

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
