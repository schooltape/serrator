import * as dotenv from "dotenv";

dotenv.config();

export const { BASE_URL, JWT } = process.env;
if (!BASE_URL || !JWT) {
  throw new Error(
    !BASE_URL
      ? "BASE_URL is not defined in the environment variables"
      : "JWT is not defined in the environment variables",
  );
}
