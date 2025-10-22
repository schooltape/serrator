import { JWT } from "./env";
import { JSDOM } from "jsdom";

export async function authFetchParse<T>(
  pathname: string,
  func: (document: Document) => T,
): Promise<T> {
  const response = await fetch(pathname, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });
  const html = await response.text();
  const dom = new JSDOM(html);
  return func(dom.window.document);
}
