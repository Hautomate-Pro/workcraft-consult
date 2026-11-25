export type InterestPayload = {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  currentRole?: string;
  note?: string;
  consent: boolean;
  programme: "pmp-bootcamp";
};

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

type SuccessResponse = { ok: true };
type ErrorResponse = { error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function postJson(
  path: string,
  payload: InterestPayload | ContactPayload | LoginPayload,
): Promise<SuccessResponse> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to reach the server. Please try again later.");
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an unreadable response. Please try again.");
  }

  if (!response.ok) {
    const message = isRecord(result) && typeof result.error === "string"
      ? result.error
      : "Your request could not be completed. Please try again.";
    throw new Error(message);
  }
  if (isRecord(result) && result.ok === true) return { ok: true };
  if (isRecord(result) && typeof result.error === "string") throw new Error(result.error);
  throw new Error("The server returned an unexpected response. Please try again.");
}

export const submitInterest = (payload: InterestPayload) => postJson("/api/interest", payload);
export const submitContact = (payload: ContactPayload) => postJson("/api/contact", payload);
export const signIn = (payload: LoginPayload) => postJson("/api/auth/login", payload);
