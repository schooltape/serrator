import * as dotenv from "dotenv";

dotenv.config();

export const { BASE_URL, JWT, CLASS_CODE } = process.env;
if (!BASE_URL || !JWT || !CLASS_CODE) {
  throw new Error(
    !BASE_URL
      ? "BASE_URL is not defined in the environment variables"
      : !JWT
        ? "JWT is not defined in the environment variables"
        : "CLASS_CODE is not defined in the environment variables",
  );
}
