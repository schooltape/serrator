import * as dotenv from "dotenv";
import { JSDOM } from "jsdom";
import type { SchoolboxContext } from "./types";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in the environment variables`);
  }
  return value;
}

export const DOMAIN = getEnv("DOMAIN");
export const JWT = getEnv("JWT");

export const ctx: SchoolboxContext = {
  domain: DOMAIN,
  jwt: JWT,
  fetch,
  parser: async (res: Response) => {
    const html = await res.text();
    const dom = new JSDOM(html);
    return dom.window.document;
  },
};
