import { getDb, interestRegistrations, type NewInterestRegistration } from "../db";

/** Returns true if a new row was saved, false if this email was already registered. */
export async function insertInterest(data: NewInterestRegistration): Promise<boolean> {
  const rows = await getDb()
    .insert(interestRegistrations)
    .values(data)
    .onConflictDoNothing({
      target: [interestRegistrations.email, interestRegistrations.programme],
    })
    .returning({ id: interestRegistrations.id });
  return rows.length > 0;
}