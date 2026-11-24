import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

// Loads <repo root>/.env locally. On Vercel the dashboard variables are used instead.
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().optional(),
});

export const env = schema.parse(process.env);