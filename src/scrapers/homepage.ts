import type { SchoolboxHomepage } from "@/types";
import { getTileGroups } from "./utils";

/**
 * route: /homepage/{id} or /homepage/code/{code}
 */
export function getHomepage(document: Document): SchoolboxHomepage {
  return {
    title: document.querySelector("h1")?.textContent?.trim() || "",
    tiles: getTileGroups(document),
  };
}
