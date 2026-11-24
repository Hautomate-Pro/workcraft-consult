import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const userRole = pgEnum("user_role", ["learner", "admin"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  role: userRole("role").notNull().default("learner"),
  createdAt: createdAt(),
});

export const interestRegistrations = pgTable(
  "interest_registrations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    location: text("location"),
    currentRole: text("current_role"),
    programme: text("programme").notNull().default("pmp-bootcamp"),
    note: text("note"),
    consent: boolean("consent").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("interest_email_programme_idx").on(t.email, t.programme),
  ]
);

export const messageStatus = pgEnum("message_status", ["new", "read", "replied"]);

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: messageStatus("status").notNull().default("new"),
  createdAt: createdAt(),
});

export type User = typeof users.$inferSelect;
export type InterestRegistration = typeof interestRegistrations.$inferSelect;
export type NewInterestRegistration = typeof interestRegistrations.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;