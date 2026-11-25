import { compare } from "bcryptjs";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { getDb, users } from "../db";

export const COOKIE_NAME = "wc_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type Role = "learner" | "admin";
export type SessionUser = { id: string; email: string; fullName: string; role: Role };

export const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: MAX_AGE_SECONDS * 1000,
  path: "/",
};

// Used so a wrong email takes about as long to reject as a wrong password.
let dummyHash: Promise<string> | null = null;
const getDummyHash = () => (dummyHash ??= hash("not-a-real-password", 12));

function secret(): string {
  if (!env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return env.JWT_SECRET;
}

function toSessionUser(u: typeof users.$inferSelect): SessionUser {
  return { id: u.id, email: u.email, fullName: u.fullName, role: u.role };
}

export async function authenticate(email: string, password: string): Promise<SessionUser | null> {
  const [user] = await getDb().select().from(users).where(eq(users.email, email)).limit(1);
  const ok = await compare(password, user?.passwordHash ?? (await getDummyHash()));
  return user && ok ? toSessionUser(user) : null;
}

export async function findUserById(id: string): Promise<SessionUser | null> {
  const [user] = await getDb().select().from(users).where(eq(users.id, id)).limit(1);
  return user ? toSessionUser(user) : null;
}

export function signSession(user: SessionUser): string {
  return jwt.sign({ sub: user.id, role: user.role }, secret(), { expiresIn: MAX_AGE_SECONDS });
}

export function verifySession(token: string): { sub: string; role: Role } | null {
  try {
    const payload = jwt.verify(token, secret());
    if (
      typeof payload === "object" &&
      typeof payload.sub === "string" &&
      (payload.role === "learner" || payload.role === "admin")
    ) {
      return { sub: payload.sub, role: payload.role };
    }
    return null;
  } catch {
    return null;
  }
}