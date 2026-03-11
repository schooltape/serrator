import type {
  SchoolboxCard,
  SchoolboxNotification,
  SchoolboxTile,
  SchoolboxTileGroup,
} from "@/types";

import { parse } from "date-fns";

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

export function getNotification(el: Element): SchoolboxNotification {
  const link = el.querySelector(".card > a")?.getAttribute("href");

  if (!link) throw new Error("link expected");

  const imgUrl =
    el.querySelector(".card > a > img")?.getAttribute("src") || undefined;

  /*
    get all links
    filter out those that don't have 'user' in them (generally the main content link)
    user regex to extract userId from link, e.g. /search/user/1234 -> 1234
    filter out undefined
  */
  const userIds = Array.from(el.querySelectorAll(".card > .body > a"))
    .map((link) => link.getAttribute("href"))
    .filter((href) => href?.includes("user"))
    .map((href) => href?.match(/\d+$/)?.[0])
    .filter((id) => id !== undefined);

  const body = el
    .querySelector(".card > .body")
    ?.textContent.trim()
    .replaceAll("\n", "");

  if (!body) throw new Error("body expected");

  const unread = el.classList.contains("unread");

  const dateString = el
    .querySelector(".card > .meta > time")
    ?.getAttribute("title");

  if (!dateString) throw new Error("date expected");

  const date = parse(dateString, "EEEE d MMMM yyyy h:mma", new Date());


  const action = body.includes("posted")
    ? "posted"
    : body.includes("marked")
      ? "marked"
      : "opened";
  

  return {
    link,
    imgUrl,
    userIds,
    body,
    unread,
    date,
    action
  };
}
