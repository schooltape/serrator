import { JSDOM } from "jsdom";
import { getTileGroups, getUrlFromCss } from "../utils";
import type { SchoolboxHomepage, Tile, TileGroup } from "../types";

/**
 * route: /homepage/{id} or /homepage/code/{code}
 */
export function getHomepage(html: string): SchoolboxHomepage {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const tileGroups: TileGroup[] = getTileGroups(dom);

  return {
    title: document.querySelector("h1")?.textContent?.trim() || "",
    tiles: tileGroups,
  };
}
