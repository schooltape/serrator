import * as dotenv from "dotenv";

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
export const ctx = { fetch, domain: DOMAIN, jwt: JWT };
