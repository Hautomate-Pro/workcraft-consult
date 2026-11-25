import { desc, eq } from "drizzle-orm";
import { contactMessages, getDb, interestRegistrations } from "../db";

export function listInterest() {
  return getDb()
    .select()
    .from(interestRegistrations)
    .orderBy(desc(interestRegistrations.createdAt))
    .limit(2000);
}

export function listMessages() {
  return getDb()
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(2000);
}

export async function setMessageStatus(
  id: string,
  status: "new" | "read" | "replied"
): Promise<boolean> {
  const rows = await getDb()
    .update(contactMessages)
    .set({ status })
    .where(eq(contactMessages.id, id))
    .returning({ id: contactMessages.id });
  return rows.length > 0;
}
