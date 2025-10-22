import type { operations, SchoolboxContext } from "@/types";

type SchoolboxResponse =
  operations["mobileRegister"]["responses"]["201"]["content"]["application/json"];

export async function registerMobile(
  ctx: SchoolboxContext,
): Promise<SchoolboxResponse> {
  const { fetch, domain, jwt } = ctx;

  const response = await fetch(`https://${domain}/api/register/Firebase`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data: SchoolboxResponse = await response.json();
  return data;
}
