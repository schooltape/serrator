import * as dotenv from "dotenv";

dotenv.config();

export default function getEnv() {
  const BASE_URL = process.env.BASE_URL;
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in the environment variables");
  }
  const JWT = process.env.JWT;
  if (!JWT) {
    throw new Error("JWT is not defined in the environment variables");
  }

  return { BASE_URL, JWT };
}
