import { Download, Mail, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Container } from "../components/Container";
import { PageHero } from "../components/PageHero";
import {
  fetchInterest,
  fetchMessages,
  updateMessageStatus,
  type InterestRow,
  type MessageRow,
  type MessageStatus,
} from "../lib/api";
import { useDocumentTitle } from "../lib/useDocumentTitle";

type Tab = "signups" | "messages";

const statusOptions: { value: MessageStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
];

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminPage() {
  useDocumentTitle("Admin");
  const [tab, setTab] = useState<Tab>("signups");
  const [interest, setInterest] = useState<InterestRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([fetchInterest(), fetchMessages()])
      .then(([interestRows, messageRows]) => {
        if (!active) return;
        setInterest(interestRows);
        setMessages(messageRows);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : "Could not load the data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return interest;
    return interest.filter((row) =>
      [row.fullName, row.email, row.phone, row.location, row.currentRole].some((value) =>
        value?.toLowerCase().includes(q)
      )
    );
  }, [interest, query]);

  const newCount = messages.filter((m) => m.status === "new").length;

  async function changeStatus(id: string, status: MessageStatus) {
    const previous = messages;
    setError("");
    setMessages((current) => current.map((m) => (m.id === id ? { ...m, status } : m)));
    try {
      await updateMessageStatus(id, status);
    } catch {
      setMessages(previous);
      setError("Could not update that message. Please try again.");
    }
  }

  const tabClass = (active: boolean) =>
    `inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
      active ? "bg-brand text-brand-fg" : "border border-line bg-surface text-fg hover:bg-surface-2"
    }`;

  return (
    <>
      <PageHero eyebrow="Admin" title="Sign-ups and messages" description="Everyone who registered interest, and everything sent through the contact form." />
      <section className="bg-bg py-10 sm:py-14">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" aria-pressed={tab === "signups"} onClick={() => setTab("signups")} className={tabClass(tab === "signups")}>
              Sign-ups ({interest.length})
            </button>
            <button type="button" aria-pressed={tab === "messages"} onClick={() => setTab("messages")} className={tabClass(tab === "messages")}>
              Messages ({messages.length})
              {newCount > 0 && (
                <span className="rounded-full bg-bad px-2 py-0.5 text-[10px] font-extrabold text-white">{newCount} new</span>
              )}
            </button>
          </div>

          {error && (
            <p role="alert" className="mt-5 rounded-lg border border-bad/30 bg-surface-2 p-3 text-sm text-bad">
              {error}
            </p>
          )}

          {loading ? (
            <p role="status" className="py-16 text-center text-sm text-muted">Loading…</p>
          ) : tab === "signups" ? (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="relative block w-full max-w-sm">
                  <span className="sr-only">Search sign-ups</span>
                  <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, email, location…"
                    className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  />
                </label>
                <a
                  href="/api/admin/interest.csv"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-surface-2 px-4 py-2 text-sm font-bold text-fg transition hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <Download size={16} aria-hidden="true" /> Download CSV
                </a>
              </div>

              {filtered.length === 0 ? (
                <p className="mt-8 rounded-xl border border-line bg-surface p-8 text-center text-sm text-muted">
                  {interest.length === 0 ? "No sign-ups yet." : "No sign-ups match your search."}
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Phone</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Location</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Role</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filtered.map((row) => (
                        <tr key={row.id} className="align-top">
                          <td className="px-4 py-3 font-semibold text-fg">
                            {row.fullName}
                            {row.note && <p className="mt-1 max-w-xs text-xs font-normal text-muted">{row.note}</p>}
                          </td>
                          <td className="px-4 py-3 text-fg">
                            <a href={`mailto:${row.email}`} className="hover:text-accent hover:underline">{row.email}</a>
                          </td>
                          <td className="px-4 py-3 text-muted">{row.phone ?? "—"}</td>
                          <td className="px-4 py-3 text-muted">{row.location ?? "—"}</td>
                          <td className="px-4 py-3 text-muted">{row.currentRole ?? "—"}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(row.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {messages.length === 0 ? (
                <p className="rounded-xl border border-line bg-surface p-8 text-center text-sm text-muted">No messages yet.</p>
              ) : (
                messages.map((m) => (
                  <article key={m.id} className="rounded-xl border border-line bg-surface p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-base font-bold text-fg">{m.subject || "(No subject)"}</h3>
                        <p className="mt-1 text-sm text-muted">
                          {m.name} ·{" "}
                          <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                            <Mail size={13} aria-hidden="true" />
                            {m.email}
                          </a>{" "}
                          · {formatDate(m.createdAt)}
                        </p>
                      </div>
                      <label className="text-xs font-semibold text-muted">
                        <span className="sr-only">Status for message from {m.name}</span>
                        <select
                          value={m.status}
                          onChange={(event) => changeStatus(m.id, event.target.value as MessageStatus)}
                          className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm font-semibold text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-fg">{m.message}</p>
                  </article>
                ))
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
