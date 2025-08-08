import { JWT } from "../tests/env";

export function getUrlFromCss(css: string) {
  return css.match(/"(.*?)"/)?.[1] ?? "";
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
