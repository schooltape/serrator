import { BASE_URL, JWT } from "./env";

export function authFetchParams(
  pathname: string,
  params: URLSearchParams,
): Promise<Response> {
  return fetch(`${BASE_URL}${pathname}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${JWT}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function authFetchParse<T>(
  pathname: string,
  func: (html: string) => T,
): Promise<T> {
  const response = await fetch(pathname, {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });
  const html = await response.text();
  return func(html);
}
