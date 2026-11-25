import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  listInterest,
  listMessages,
  setMessageStatus,
} from "../repositories/admin.repository";

const statusBody = z.object({ status: z.enum(["new", "read", "replied"]) });
const idParam = z.string().uuid();

// Quotes every cell and neutralises spreadsheet formulas (=, +, -, @) in user-supplied text.
// Phone-style values such as "+234 800 000 0000" are left as they are.
function csvCell(value: unknown): string {
  let s = String(value ?? "");
  const looksLikeNumber = /^[+-][\d\s().-]+$/.test(s);
  if (/^[=@\t\r]/.test(s) || (/^[+-]/.test(s) && !looksLikeNumber)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function getInterest(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ items: await listInterest() });
  } catch (err) {
    next(err);
  }
}

export async function getMessages(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ items: await listMessages() });
  } catch (err) {
    next(err);
  }
}

export async function updateMessage(req: Request, res: Response, next: NextFunction) {
  const id = idParam.safeParse(req.params.id);
  const body = statusBody.safeParse(req.body);
  if (!id.success || !body.success) {
    res.status(400).json({ error: "Invalid request." });
    return;
  }
  try {
    const found = await setMessageStatus(id.data, body.data.status);
    if (!found) {
      res.status(404).json({ error: "Message not found." });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export async function exportInterestCsv(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await listInterest();
    const header = [
      "Full name",
      "Email",
      "Phone",
      "Location",
      "Current role",
      "Programme",
      "Note",
      "Consent",
      "Registered at",
    ];
    const lines = [
      header,
      ...rows.map((r) => [
        r.fullName,
        r.email,
        r.phone,
        r.location,
        r.currentRole,
        r.programme,
        r.note,
        r.consent ? "yes" : "no",
        r.createdAt.toISOString(),
      ]),
    ].map((cols) => cols.map(csvCell).join(","));

    const date = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="workcraft-interest-${date}.csv"`);
    res.send("\uFEFF" + lines.join("\r\n") + "\r\n");
  } catch (err) {
    next(err);
  }
}
