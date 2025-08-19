import { JSDOM } from "jsdom";
import { getTileGroups } from "../utils";
import type { SchoolboxHomepage } from "../types";

/**
 * route: /homepage/{id} or /homepage/code/{code}
 */
export function getHomepage(html: string): SchoolboxHomepage {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  return {
    title: document.querySelector("h1")?.textContent?.trim() || "",
    tiles: getTileGroups(dom),
  };
}
