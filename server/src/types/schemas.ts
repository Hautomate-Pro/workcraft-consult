import { z } from "zod";

const text = (label: string, min: number, max: number) =>
  z
    .string({ required_error: `${label} is required.`, invalid_type_error: `${label} is required.` })
    .trim()
    .min(min, `${label} is required.`)
    .max(max, `${label} is too long.`);

const optionalText = (label: string, max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().max(max, `${label} is too long.`).optional()
  );

const email = z
  .string({ required_error: "Email is required.", invalid_type_error: "Email is required." })
  .trim()
  .toLowerCase()
  .email("Enter a valid email address.")
  .max(254, "Email is too long.");

export const interestSchema = z.object({
  fullName: text("Full name", 2, 120),
  email,
  phone: optionalText("Phone", 30),
  location: optionalText("Location", 120),
  currentRole: optionalText("Current role", 120),
  note: optionalText("Note", 1000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to be contacted to continue." }),
  }),
  programme: z.literal("pmp-bootcamp"),
});

export const contactSchema = z.object({
  name: text("Name", 2, 120),
  email,
  subject: optionalText("Subject", 150),
  message: z
    .string({ required_error: "Message is required.", invalid_type_error: "Message is required." })
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(3000, "Message is too long."),
});

export const loginSchema = z.object({
  email,
  password: z
    .string({ required_error: "Password is required.", invalid_type_error: "Password is required." })
    .min(1, "Password is required.")
    .max(200, "Password is too long."),
});