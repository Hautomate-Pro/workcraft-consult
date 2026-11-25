import type { NextFunction, Request, Response } from "express";
import {
  authenticate,
  COOKIE_NAME,
  cookieOptions,
  signSession,
} from "../services/auth.service";
import { loginSchema } from "../types/schemas";
import { parseBody } from "../utils/http";

export async function login(req: Request, res: Response, next: NextFunction) {
  const data = parseBody(loginSchema, req, res);
  if (!data) return;
  try {
    const user = await authenticate(data.email, data.password);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    res.cookie(COOKIE_NAME, signSession(user), cookieOptions);
    res.json({ ok: true, user });
  } catch (err) {
    next(err);
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ ok: true });
}

export function me(_req: Request, res: Response) {
  res.json({ user: res.locals.user });
}