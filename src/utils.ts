import { JWT } from "./env";
import { JSDOM } from "jsdom";
import type { Tile, TileGroup, SchoolboxCard } from "./types";

export function getUrlFromCss(css: string) {
  return css.match(/"(.*?)"/)?.[1] ?? "";
}

export function getTileGroups(dom: JSDOM): TileGroup[] {
  const document = dom.window.document;

  return Array.from(document.querySelectorAll(".tileList")).map((tileGroup) => {
    const tiles: Tile[] = Array.from(
      tileGroup.querySelectorAll<HTMLLIElement>("li.tile"),
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
}

export function getCard(el: Element): SchoolboxCard {
  const url =
    (
      el.querySelector(".card-content > div > h3 > a") as HTMLElement
    ).getAttribute("href") ?? "";

  const id = url.split("/").pop() as string;

  const name = (
    el.querySelector(".card-content > div > h3 > a") as HTMLElement
  ).textContent.trim();

  const imageUrl = getUrlFromCss(
    (el.querySelector("a > div.card-class-image") as HTMLElement)?.style
      .backgroundImage,
  );

  return {
    url,
    id,
    name,
    imageUrl,
  };
}

export async function makeAuthRequest<T>(
  url: string,
  func: (html: string) => T,
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });
  const html = await response.text();
  return func(html);
}
