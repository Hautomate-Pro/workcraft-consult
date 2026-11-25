import type { Request, Response } from "express";
import type { z } from "zod";

/** Validates req.body. On failure it sends a 400 with a readable message and returns null. */
export function parseBody<T>(
  schema: z.ZodType<T, z.ZodTypeDef, unknown>,
  req: Request,
  res: Response
): T | null {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues[0]?.message ?? "Invalid request." });
    return null;
  }
  return result.data;
}