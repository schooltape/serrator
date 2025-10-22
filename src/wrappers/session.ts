import type { operations } from "@/types";

type SchoolboxResponse =
  operations["apiSessionGet"]["responses"]["200"]["content"]["application/json"];

export async function authSession(
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  domain: string,
  jwt: string,
) {
  const response = await fetch(
    `https://${domain}/api/session?jwt=${encodeURIComponent(jwt)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  // console.log(response.status);

  const cookie = response.headers.getSetCookie()?.[0];
  const data: SchoolboxResponse = await response.json();

  if (!cookie) throw new Error("no Set-Cookie header in response");

  return { data, cookie };
}
