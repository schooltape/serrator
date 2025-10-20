import type { operations } from "@/types";

type SchoolboxResponse =
  operations["mobileRegister"]["responses"]["201"]["content"]["application/json"];

export async function registerMobile(
  baseUrl: string,
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
): Promise<SchoolboxResponse> {
  const response = await fetch(`https://${baseUrl}/api/register/Firebase`, {
    method: "POST",
  });

  const data: SchoolboxResponse = await response.json();
  return data;
}
