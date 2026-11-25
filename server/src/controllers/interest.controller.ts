import type { NextFunction, Request, Response } from "express";
import { insertInterest } from "../repositories/interest.repository";
import { interestSchema } from "../types/schemas";
import { parseBody } from "../utils/http";

export async function createInterest(req: Request, res: Response, next: NextFunction) {
  const data = parseBody(interestSchema, req, res);
  if (!data) return;
  try {
    // Same response whether or not the email already existed,
    // so the form can't be used to discover who has registered.
    await insertInterest(data);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
}