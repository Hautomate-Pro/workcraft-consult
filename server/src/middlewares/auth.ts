import type { NextFunction, Request, Response } from "express";
import { COOKIE_NAME, findUserById, verifySession, type Role } from "../services/auth.service";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];
  const session = typeof token === "string" ? verifySession(token) : null;
  if (!session) {
    res.status(401).json({ error: "Please sign in." });
    return;
  }
  try {
    const user = await findUserById(session.sub);
    if (!user) {
      res.status(401).json({ error: "Please sign in." });
      return;
    }
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireRole(role: Role) {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user?.role === role) {
      next();
      return;
    }
    res.status(403).json({ error: "You do not have access to this." });
  };
}