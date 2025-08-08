import { JSDOM } from "jsdom";
import { getUrlFromCss } from "./utils";
import type { SchoolboxClass } from "./types";

/**
 * route: /learning/classes
 */
export function getClasses(html: string): SchoolboxClass[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const classes: SchoolboxClass[] = [];

  document.querySelectorAll(".v-card:has(.classes)").forEach((el) => {
    const url =
      (
        el.querySelector(".card-content > div > h3 > a") as HTMLElement
      ).getAttribute("href") ?? "";

    const id = url.split("/").pop() as string;

    const code = (el.querySelector(".card-content > div > p") as HTMLElement)
      .textContent;

    const name = (
      el.querySelector(".card-content > div > h3 > a") as HTMLElement
    ).textContent.trim();

    const imageUrl = getUrlFromCss(
      (el.querySelector("a > div.card-class-image") as HTMLElement)?.style
        .backgroundImage,
    );

    classes.push({
      id,
      code,
      url,
      name,
      imageUrl,
    });
  });

  return classes;
}
