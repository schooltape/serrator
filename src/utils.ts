import { BASE_URL, JWT } from "./env";
import { JSDOM } from "jsdom";

export function authFetchParams(
  pathname: string,
  params?: URLSearchParams,
): Promise<Response> {
  return fetch(
    `${BASE_URL}${pathname}${params ? `?${params.toString()}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
}

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
