import type { NextFunction, Request, Response } from "express";
import { insertContactMessage } from "../repositories/contact.repository";
import { contactSchema } from "../types/schemas";
import { parseBody } from "../utils/http";

export async function createContactMessage(req: Request, res: Response, next: NextFunction) {
  const data = parseBody(contactSchema, req, res);
  if (!data) return;
  try {
    await insertContactMessage(data);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
}