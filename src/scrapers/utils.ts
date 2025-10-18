import type { SchoolboxCard, SchoolboxTile, SchoolboxTileGroup } from "@/types";

export function getUrlFromCss(css: string) {
  return css.match(/"(.*?)"/)?.[1] ?? "";
}

export function getTileGroups(document: Document): SchoolboxTileGroup[] {
  return Array.from(document.querySelectorAll(".tileList")).map((tileGroup) => {
    const tiles: SchoolboxTile[] = Array.from(
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

  // get first text node of meta element
  const meta = el.querySelector(".card-content > div > p.meta");
  const code =
    meta?.childNodes[0]?.nodeType === 3
      ? meta.childNodes[0].textContent?.trim()
      : undefined;

  if (!code) throw new Error("card code expected");

  const name = (
    el.querySelector(".card-content > div > h3") as HTMLElement
  ).textContent.trim();

  const backgroundImage =
    (el.querySelector(".card-content > div > div.card-image") as HTMLElement)
      ?.style.backgroundImage || undefined;

  const imageUrl = backgroundImage ? getUrlFromCss(backgroundImage) : undefined;

  return {
    url,
    code,
    name,
    imageUrl,
  };
}
