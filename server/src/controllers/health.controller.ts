import type { Request, Response } from "express";
import { sql } from "drizzle-orm";
import { getDb } from "../db";

export function getHealth(_req: Request, res: Response) {
  res.json({
    status: "ok",
    service: "workcraft-consult-api",
    time: new Date().toISOString(),
  });
}

export async function getDbHealth(_req: Request, res: Response) {
  try {
    await getDb().execute(sql`select 1`);
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    console.error("DB health check failed:", err);
    res.status(503).json({ status: "error", database: "unreachable" });
  }
}