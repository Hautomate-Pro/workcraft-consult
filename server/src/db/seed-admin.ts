import { hash } from "bcryptjs";
import { env } from "../config/env";
import { getDb, users } from "./index";

async function main() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first");
  }
  if (ADMIN_PASSWORD.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  const email = ADMIN_EMAIL.trim().toLowerCase();
  const passwordHash = await hash(ADMIN_PASSWORD, 12);

  await getDb()
    .insert(users)
    .values({ email, passwordHash, fullName: ADMIN_NAME ?? "Admin", role: "admin" })
    .onConflictDoUpdate({ target: users.email, set: { passwordHash, role: "admin" } });

  console.log(`Admin ready: ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});