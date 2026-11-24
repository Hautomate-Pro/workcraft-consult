import type { Request, Response } from "express";

export function getHealth(_req: Request, res: Response) {
  res.json({
    status: "ok",
    service: "workcraft-consult-api",
    time: new Date().toISOString(),
  });
}