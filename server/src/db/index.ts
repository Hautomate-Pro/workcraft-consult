import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../config/env";
import * as schema from "./schema";

let instance: ReturnType<typeof create> | null = null;

function create(url: string) {
  return drizzle(neon(url), { schema });
}

export function getDb() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!instance) instance = create(env.DATABASE_URL);
  return instance;
}

export * from "./schema";