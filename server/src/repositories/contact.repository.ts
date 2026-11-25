import { contactMessages, getDb, type NewContactMessage } from "../db";

export async function insertContactMessage(data: NewContactMessage): Promise<void> {
  await getDb().insert(contactMessages).values(data);
}