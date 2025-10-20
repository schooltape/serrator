import type { operations } from "@/types";

type SchoolboxResponse =
  operations["apiSessionGet"]["responses"]["200"]["content"]["application/json"];

export async function authSession(
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  baseUrl: string,
  jwt: string,
) {
  const response = await fetch(
    `https://${baseUrl}/api/session?jwt=${encodeURIComponent(jwt)}`,
    {
      method: "GET",
    },
  );

  // console.log(response.status);

  const setCookie = response.headers.getSetCookie();
  const data: SchoolboxResponse = await response.json();

  return { data, setCookie };
}
