export type * from "./api.d.ts";
export type * from "./scrapers.d.ts";
export type * from "./wrappers.d.ts";

export interface SchoolboxContext {
  domain: string;
  jwt: string;
  fetch: typeof globalThis.fetch;
  parser: (res: Response) => Promise<Document>;
}
