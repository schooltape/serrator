import type { SchoolboxCard, Tile, TileGroup } from "@/types";

export function getUrlFromCss(css: string) {
  return css.match(/"(.*?)"/)?.[1] ?? "";
}

export function getTileGroups(document: Document): TileGroup[] {
  return Array.from(document.querySelectorAll(".tileList")).map((tileGroup) => {
    const tiles: Tile[] = Array.from(
      tileGroup.querySelectorAll<HTMLLIElement>("li.tile"),
    ).map((tile) => {
      const imageAttr =
        document.defaultView?.getComputedStyle(tile).backgroundImage;
      return {
        title: tile.querySelector(".title")?.textContent?.trim() || "",
        link: tile.querySelector("a")?.getAttribute("href") || "",
        imageUrl: imageAttr ? getUrlFromCss(imageAttr) : undefined,
      };
    });
    return tiles;
  });
}

export function getCard(el: Element): SchoolboxCard {
  const url =
    el.querySelector(".card-content > div > h3 > a")?.getAttribute("href") ||
    undefined;

  const code = el
    .querySelector(".card-content > div > p.meta")
    ?.textContent?.trim();

  if (!code) throw new Error("card code expected");

  const name = (
    el.querySelector(".card-content > div > h3") as HTMLElement
  ).textContent.trim();

  const imageUrl = getUrlFromCss(
    (el.querySelector("a > div.card-class-image") as HTMLElement)?.style
      .backgroundImage,
  );

  return {
    url,
    code,
    name,
    imageUrl,
  };
}
