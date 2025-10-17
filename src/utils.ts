import { JWT } from "./env";
import { JSDOM } from "jsdom";

export async function authFetchParams(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${JWT}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
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
