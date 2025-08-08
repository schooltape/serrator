import { JSDOM } from "jsdom";
import { getUrlFromCss } from "./utils";
import type { SchoolboxHomepage, Tile, TileGroup } from "./types";

/**
 * route: /homepage/{id} or /homepage/code/{code}
 */
export function getHomepage(html: string): SchoolboxHomepage {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const tileGroups: TileGroup[] = Array.from(
    document.querySelectorAll(".tileList"),
  ).map((tileGroup) => {
    const tiles: Tile[] = Array.from(
      tileGroup.querySelectorAll<HTMLLIElement>(
        ".Schoolbox_Tile_Component_HomepageTileController li.tile",
      ),
    ).map((tile) => {
      return {
        title: tile.querySelector(".title")?.textContent?.trim() || "",
        link: tile.querySelector("a")?.getAttribute("href") || "",
        imageUrl: getUrlFromCss(
          dom.window.getComputedStyle(tile).backgroundImage,
        ),
      };
    });
    return tiles;
  });

  return {
    title: document.querySelector("h1")?.textContent?.trim() || "",
    tiles: tileGroups,
  };
}
