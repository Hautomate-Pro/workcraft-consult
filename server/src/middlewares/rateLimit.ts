import rateLimit from "express-rate-limit";

const base = { standardHeaders: "draft-7" as const, legacyHeaders: false };

export const formLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { error: "Too many requests. Please try again in a few minutes." },
});

export const loginLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many sign-in attempts. Please try again in a few minutes." },
});