import type { SchoolboxCard, Tile, TileGroup } from "@/types";

export function getUrlFromCss(css: string) {
  return css.match(/"(.*?)"/)?.[1] ?? "";
}

export function getTileGroups(document: Document): TileGroup[] {
  return Array.from(document.querySelectorAll(".tileList")).map((tileGroup) => {
    const tiles: Tile[] = Array.from(
      tileGroup.querySelectorAll<HTMLLIElement>("li.tile"),
    ).map((tile) => {
      return {
        title: tile.querySelector(".title")?.textContent?.trim() || "",
        link: tile.querySelector("a")?.getAttribute("href") || "",
        imageUrl: getUrlFromCss(
          document.defaultView
            ? document.defaultView.getComputedStyle(tile).backgroundImage
            : "",
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
