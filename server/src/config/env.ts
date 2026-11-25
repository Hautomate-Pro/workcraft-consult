import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

// Loads <repo root>/.env locally. On Vercel the dashboard variables are used instead.
if (!process.env.VERCEL) { 
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
}

const blankToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;
const optional = <T extends z.ZodTypeAny>(s: T) =>
  z.preprocess(blankToUndefined, s.optional());

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: optional(z.string()),
  JWT_SECRET: optional(z.string().min(32, "JWT_SECRET must be at least 32 characters")),
  ADMIN_EMAIL: optional(z.string().email()),
  ADMIN_PASSWORD: optional(z.string()),
  ADMIN_NAME: optional(z.string()),
});

export const env = schema.parse(process.env);