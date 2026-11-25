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

export type Role = "learner" | "admin";
export type SessionUser = { id: string; email: string; fullName: string; role: Role };

export type InterestRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  location: string | null;
  currentRole: string | null;
  programme: string;
  note: string | null;
  consent: boolean;
  createdAt: string;
};

export type MessageStatus = "new" | "read" | "replied";

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: MessageStatus;
  createdAt: string;
};

type SuccessResponse = { ok: true };

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function request(path: string, init: RequestInit = {}): Promise<Record<string, unknown>> {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: "same-origin",
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
    });
  } catch {
    throw new ApiError(0, "Unable to reach the server. Please try again later.");
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new ApiError(response.status, "The server returned an unreadable response. Please try again.");
  }

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.error === "string"
        ? result.error
        : "Your request could not be completed. Please try again.";
    throw new ApiError(response.status, message);
  }
  if (!isRecord(result)) {
    throw new ApiError(response.status, "The server returned an unexpected response. Please try again.");
  }
  if (typeof result.error === "string") throw new ApiError(response.status, result.error);
  return result;
}

function parseUser(value: unknown): SessionUser {
  if (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.email === "string" &&
    typeof value.fullName === "string" &&
    (value.role === "learner" || value.role === "admin")
  ) {
    return { id: value.id, email: value.email, fullName: value.fullName, role: value.role };
  }
  throw new ApiError(500, "The server returned an unexpected response. Please try again.");
}

function postJson(path: string, payload?: unknown) {
  return request(path, {
    method: "POST",
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
}

async function expectOk(result: Promise<Record<string, unknown>>): Promise<SuccessResponse> {
  const data = await result;
  if (data.ok === true) return { ok: true };
  throw new ApiError(500, "The server returned an unexpected response. Please try again.");
}

export const submitInterest = (payload: InterestPayload) => expectOk(postJson("/api/interest", payload));
export const submitContact = (payload: ContactPayload) => expectOk(postJson("/api/contact", payload));

export async function signIn(payload: LoginPayload): Promise<SessionUser> {
  const result = await postJson("/api/auth/login", payload);
  if (result.ok !== true) {
    throw new ApiError(500, "The server returned an unexpected response. Please try again.");
  }
  return parseUser(result.user);
}

export async function fetchMe(): Promise<SessionUser | null> {
  try {
    const result = await request("/api/auth/me");
    return parseUser(result.user);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}

export const signOut = () => expectOk(postJson("/api/auth/logout"));

export async function fetchInterest(): Promise<InterestRow[]> {
  const result = await request("/api/admin/interest");
  return Array.isArray(result.items) ? (result.items as InterestRow[]) : [];
}

export async function fetchMessages(): Promise<MessageRow[]> {
  const result = await request("/api/admin/messages");
  return Array.isArray(result.items) ? (result.items as MessageRow[]) : [];
}

export const updateMessageStatus = (id: string, status: MessageStatus) =>
  expectOk(request(`/api/admin/messages/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }));
